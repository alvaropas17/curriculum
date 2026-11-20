// Worker con cron: cuando LaLiga hace que los operadores bloqueen las IPs de Cloudflare
// de esta zona, quita el proxy (nube gris) de los registros elegidos para que los
// visitantes vayan directos a Netlify. Cuando el bloqueo termina, vuelve a ponerlo.
//
// Fuente de bloqueos: https://hayahora.futbol (sondas en Movistar, Digi, Vodafone,
// Orange y MásMóvil). Solo cambia el modo del proxy; nunca a dónde apunta un registro.

const LISTA_BLOQUEOS = 'https://hayahora.futbol/estado/blocked-any.txt';
const DOH = 'https://cloudflare-dns.com/dns-query';
const API = 'https://api.cloudflare.com/client/v4';
const MARCA = 'laliga-failover';
const TTL_GRIS = 60;

/** Lista de texto plano de hayahora: una IP por línea. */
export function leerLista(texto) {
  const ips = new Set();
  for (const linea of texto.split(/\r?\n/)) {
    const ip = linea.trim().toLowerCase();
    if (ip && !ip.startsWith('#')) ips.add(ip);
  }
  return ips;
}

/** IPs (A y AAAA) a las que resuelve un nombre, por DNS sobre HTTPS. */
export async function resolver(nombre, fetchFn = fetch) {
  const ips = [];
  for (const tipo of ['A', 'AAAA']) {
    const res = await fetchFn(`${DOH}?name=${encodeURIComponent(nombre)}&type=${tipo}`, {
      headers: { accept: 'application/dns-json' },
    });
    if (!res.ok) throw new Error(`DoH ${nombre} ${tipo}: HTTP ${res.status}`);
    const datos = await res.json();
    const codigo = tipo === 'A' ? 1 : 28;
    for (const r of datos.Answer ?? []) if (r.type === codigo) ips.push(String(r.data).toLowerCase());
  }
  return ips;
}

/** Lee el estado que el propio Worker dejó en el comentario del registro. */
export function leerMarca(comentario) {
  const m = /^laliga-failover: (gris|libre) desde (\S+)$/.exec(comentario ?? '');
  if (!m) return null;
  const desde = Date.parse(m[2]);
  return Number.isNaN(desde) ? null : { estado: m[1], desde };
}

/**
 * Qué hacer con un registro. Devuelve null si no hay que tocarlo, o el cambio a aplicar.
 * - Bloqueado y con proxy: nube gris.
 * - Sin bloqueo y en gris puesto por el Worker: espera `esperaMin` minutos sin bloqueo
 *   y vuelve a naranja. Un gris puesto a mano (sin marca) no se toca.
 * - Registros que apuntan a *.pages.dev nunca se ponen en gris: sin proxy no funcionan.
 */
export function decidir({ registro, bloqueada, ahora, esperaMin = 15, modo = 'auto' }) {
  if (/\.pages\.dev\.?$/i.test(registro.content ?? '')) return null;
  const marca = leerMarca(registro.comment);
  const iso = new Date(ahora).toISOString();
  const gris = { proxied: false, ttl: TTL_GRIS, comment: `${MARCA}: gris desde ${iso}` };
  const naranja = { proxied: true, ttl: 1, comment: '' };

  if (modo === 'gris') return registro.proxied ? gris : null;
  if (modo === 'naranja') return registro.proxied ? null : naranja;

  if (bloqueada) {
    if (registro.proxied) return gris;
    if (marca?.estado === 'libre') return { comment: `${MARCA}: gris desde ${iso}` };
    return null;
  }
  if (registro.proxied || !marca) return null;
  if (marca.estado === 'gris') return { comment: `${MARCA}: libre desde ${iso}` };
  return ahora - marca.desde >= esperaMin * 60_000 ? naranja : null;
}

function nombres(env) {
  return String(env.REGISTROS ?? '')
    .split(',')
    .map((n) => n.trim().toLowerCase())
    .filter(Boolean);
}

async function cf(env, ruta, opciones = {}, fetchFn = fetch) {
  const res = await fetchFn(`${API}${ruta}`, {
    ...opciones,
    headers: { authorization: `Bearer ${env.CF_API_TOKEN}`, 'content-type': 'application/json' },
  });
  const datos = await res.json().catch(() => ({}));
  if (!res.ok || datos.success === false) {
    throw new Error(`Cloudflare API ${ruta}: HTTP ${res.status} ${JSON.stringify(datos.errors ?? '')}`);
  }
  return datos.result;
}

async function registrosDe(env, fetchFn) {
  const lista = [];
  for (const nombre of nombres(env)) {
    const result = await cf(env, `/zones/${env.ZONE_ID}/dns_records?name=${encodeURIComponent(nombre)}`, {}, fetchFn);
    lista.push(...result.filter((r) => ['A', 'AAAA', 'CNAME'].includes(r.type)));
  }
  return lista;
}

/** Una pasada completa: mira el bloqueo y ajusta los registros. Devuelve el informe. */
export async function revisar(env, { ahora = Date.now(), fetchFn = fetch } = {}) {
  const informe = { ahora: new Date(ahora).toISOString(), modo: env.MODO || 'auto', cambios: [] };
  const registros = await registrosDe(env, fetchFn);
  informe.registros = registros.map((r) => ({ nombre: r.name, destino: r.content, proxy: r.proxied, nota: r.comment ?? '' }));

  // IPs de Cloudflare de la zona: la sonda (siempre con proxy) y los registros que aún lo tienen.
  const conProxy = registros.filter((r) => r.proxied).map((r) => r.name);
  const sondas = [...new Set([env.SONDA, ...conProxy].filter(Boolean))];
  const ips = new Set();
  for (const nombre of sondas) for (const ip of await resolver(nombre, fetchFn)) ips.add(ip);
  informe.ipsCloudflare = [...ips];
  if (ips.size === 0) {
    informe.error = 'No se han podido resolver las IPs de Cloudflare de la zona; no se cambia nada.';
    return informe;
  }

  const res = await fetchFn(LISTA_BLOQUEOS, { cf: { cacheTtl: 60 } });
  if (!res.ok) {
    informe.error = `hayahora.futbol respondió HTTP ${res.status}; no se cambia nada.`;
    return informe;
  }
  const bloqueadas = leerLista(await res.text());
  informe.ipsBloqueadas = [...ips].filter((ip) => bloqueadas.has(ip));
  const bloqueada = informe.ipsBloqueadas.length > 0;
  informe.bloqueada = bloqueada;

  const esperaMin = Number(env.ESPERA_MINUTOS ?? 15);
  const soloLectura = env.MODO === 'solo-lectura';
  const modo = soloLectura ? 'auto' : env.MODO || 'auto';
  for (const registro of registros) {
    const cambio = decidir({ registro, bloqueada, ahora, esperaMin, modo });
    if (!cambio) continue;
    if (soloLectura) {
      informe.cambios.push({ nombre: registro.name, pendiente: true, ...cambio });
      continue;
    }
    await cf(env, `/zones/${env.ZONE_ID}/dns_records/${registro.id}`, { method: 'PATCH', body: JSON.stringify(cambio) }, fetchFn);
    informe.cambios.push({ nombre: registro.name, ...cambio });
  }
  return informe;
}

export default {
  async scheduled(_evento, env, ctx) {
    ctx.waitUntil(
      revisar(env).then(
        (informe) => console.log(JSON.stringify(informe)),
        (error) => console.error(`${MARCA}: ${error.stack ?? error}`),
      ),
    );
  },

  // https://<SONDA>/ enseña el estado actual sin cambiar nada.
  async fetch(request, env) {
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });
    try {
      const informe = await revisar({ ...env, MODO: 'solo-lectura' }, {});
      return Response.json(informe, { headers: { 'cache-control': 'no-store' } });
    } catch (error) {
      return Response.json({ error: String(error.message ?? error) }, { status: 500 });
    }
  },
};
