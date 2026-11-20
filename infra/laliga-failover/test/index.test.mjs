// node --test infra/laliga-failover/test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decidir, leerLista, leerMarca, revisar } from '../src/index.js';

const IP_CF = ['188.114.96.5', '188.114.97.5'];
const IP6_CF = ['2a06:98c1:3120::5'];
const MIN = 60_000;

/** Simula DoH, hayahora y la API de Cloudflare con registros en memoria. */
function mundo({ bloqueadas = [], hayahoraFalla = false } = {}) {
  const estado = {
    bloqueadas,
    hayahoraFalla,
    parches: [],
    registros: [
      { id: '1', type: 'CNAME', name: 'alvaropastor.dev', content: 'web.netlify.app', proxied: true, comment: null },
      { id: '2', type: 'CNAME', name: 'www.alvaropastor.dev', content: 'web.netlify.app', proxied: true, comment: null },
      { id: '3', type: 'CNAME', name: 'marketing.alvaropastor.dev', content: 'mkt.pages.dev', proxied: true, comment: null },
    ],
  };
  const json = (cuerpo, status = 200) => new Response(JSON.stringify(cuerpo), { status, headers: { 'content-type': 'application/json' } });
  estado.fetch = async (url, opciones = {}) => {
    const u = new URL(url);
    if (u.hostname === 'cloudflare-dns.com') {
      const nombre = u.searchParams.get('name');
      const tipo = u.searchParams.get('type');
      const reg = estado.registros.find((r) => r.name === nombre);
      const conProxy = nombre === 'estado.alvaropastor.dev' || reg?.proxied;
      if (!conProxy) return json({ Answer: [{ type: 1, data: '75.2.60.5' }] });
      return json({ Answer: (tipo === 'A' ? IP_CF : IP6_CF).map((data) => ({ type: tipo === 'A' ? 1 : 28, data })) });
    }
    if (u.hostname === 'hayahora.futbol') {
      if (estado.hayahoraFalla) return new Response('caído', { status: 503 });
      return new Response(estado.bloqueadas.join('\n') + '\n');
    }
    if (u.hostname === 'api.cloudflare.com') {
      assert.equal(opciones.headers.authorization, 'Bearer token-de-prueba');
      const m = /\/dns_records\/(\w+)$/.exec(u.pathname);
      if (opciones.method === 'PATCH' && m) {
        const reg = estado.registros.find((r) => r.id === m[1]);
        const cambio = JSON.parse(opciones.body);
        estado.parches.push({ id: reg.id, ...cambio });
        Object.assign(reg, cambio, { comment: cambio.comment || null });
        return json({ success: true, result: reg });
      }
      const nombre = u.searchParams.get('name');
      return json({ success: true, result: estado.registros.filter((r) => r.name === nombre).map((r) => ({ ...r })) });
    }
    throw new Error(`URL inesperada: ${url}`);
  };
  return estado;
}

const env = {
  ZONE_ID: 'zona',
  CF_API_TOKEN: 'token-de-prueba',
  SONDA: 'estado.alvaropastor.dev',
  REGISTROS: 'alvaropastor.dev,www.alvaropastor.dev,marketing.alvaropastor.dev',
  ESPERA_MINUTOS: '15',
};

test('sin bloqueo no toca nada', async () => {
  const m = mundo();
  const informe = await revisar(env, { fetchFn: m.fetch, ahora: Date.parse('2026-11-14T16:00:00Z') });
  assert.equal(informe.bloqueada, false);
  assert.deepEqual(m.parches, []);
});

test('ciclo completo: bloqueo, espera y vuelta al proxy', async () => {
  const m = mundo({ bloqueadas: ['1.2.3.4', '188.114.97.5'] });
  const t0 = Date.parse('2026-11-14T16:00:00Z');

  // Empieza el bloqueo: apex y www a gris; marketing (pages.dev) no se toca.
  let informe = await revisar(env, { fetchFn: m.fetch, ahora: t0 });
  assert.equal(informe.bloqueada, true);
  assert.deepEqual(informe.ipsBloqueadas, ['188.114.97.5']);
  assert.deepEqual(m.parches.map((p) => [p.id, p.proxied, p.ttl]), [['1', false, 60], ['2', false, 60]]);
  assert.equal(m.registros[2].proxied, true);

  // Sigue bloqueado: con todo en gris, la sonda sigue dando las IPs de Cloudflare.
  m.parches.length = 0;
  informe = await revisar(env, { fetchFn: m.fetch, ahora: t0 + 2 * MIN });
  assert.equal(informe.bloqueada, true);
  assert.deepEqual(m.parches, []);

  // Termina: primero solo marca "libre desde".
  m.bloqueadas = [];
  await revisar(env, { fetchFn: m.fetch, ahora: t0 + 120 * MIN });
  assert.deepEqual(m.parches.map((p) => p.comment.split(' desde')[0]), ['laliga-failover: libre', 'laliga-failover: libre']);
  assert.equal(m.registros[0].proxied, false);

  // Vuelve un momento (pasa al final de los partidos): se cancela la cuenta atrás.
  m.parches.length = 0;
  m.bloqueadas = ['188.114.96.5'];
  await revisar(env, { fetchFn: m.fetch, ahora: t0 + 125 * MIN });
  assert.deepEqual(m.parches.map((p) => [p.proxied, p.comment.split(' desde')[0]]), [[undefined, 'laliga-failover: gris'], [undefined, 'laliga-failover: gris']]);

  // Libre otra vez: marca, y a los 10 min aún no vuelve; a los 15 sí.
  m.bloqueadas = [];
  await revisar(env, { fetchFn: m.fetch, ahora: t0 + 130 * MIN });
  m.parches.length = 0;
  await revisar(env, { fetchFn: m.fetch, ahora: t0 + 140 * MIN });
  assert.deepEqual(m.parches, []);
  await revisar(env, { fetchFn: m.fetch, ahora: t0 + 145 * MIN });
  assert.deepEqual(m.parches.map((p) => [p.id, p.proxied, p.ttl, p.comment]), [['1', true, 1, ''], ['2', true, 1, '']]);
  assert.equal(m.registros[0].comment, null);
});

test('un gris puesto a mano no se toca', async () => {
  const m = mundo();
  m.registros[0].proxied = false;
  await revisar(env, { fetchFn: m.fetch, ahora: Date.now() });
  assert.deepEqual(m.parches, []);
});

test('si hayahora falla no cambia nada', async () => {
  const m = mundo({ hayahoraFalla: true });
  const informe = await revisar(env, { fetchFn: m.fetch, ahora: Date.now() });
  assert.match(informe.error, /HTTP 503/);
  assert.deepEqual(m.parches, []);
});

test('solo lectura informa sin cambiar', async () => {
  const m = mundo({ bloqueadas: IP_CF });
  const informe = await revisar({ ...env, MODO: 'solo-lectura' }, { fetchFn: m.fetch, ahora: Date.now() });
  assert.equal(informe.cambios.length, 2);
  assert.ok(informe.cambios.every((c) => c.pendiente));
  assert.deepEqual(m.parches, []);
});

test('modos forzados', () => {
  const r = { content: 'web.netlify.app', proxied: true, comment: null };
  assert.equal(decidir({ registro: r, bloqueada: false, ahora: 0, modo: 'gris' }).proxied, false);
  assert.equal(decidir({ registro: { ...r, proxied: false }, bloqueada: true, ahora: 0, modo: 'naranja' }).proxied, true);
});

test('IPv6 y lista con comentarios', () => {
  assert.deepEqual([...leerLista('# cabecera\n2A06:98C1:3120::5\r\n\n1.1.1.1\n')], ['2a06:98c1:3120::5', '1.1.1.1']);
  assert.equal(leerMarca('otra cosa'), null);
  assert.equal(leerMarca('laliga-failover: gris desde 2026-11-14T16:00:00.000Z').estado, 'gris');
});
