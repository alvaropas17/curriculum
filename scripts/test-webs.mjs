// Pruebas de las reglas de la lista de webs y de la función que recibe propuestas.
import assert from 'node:assert/strict';
import { onRequest } from '../functions/proponer-web.js';
import { TEMAS, validarLista, validarWeb } from './webs-validacion.mjs';

const buena = { nombre: 'Mi agente', url: 'https://www.ejemplo.dev/inicio', autor: '@alguien', tema: 'ia', descripcion: 'Un agente que ordena mis notas de clase.' };

// Solo IA y tecnología.
assert.deepEqual(TEMAS.map((t) => t.id), ['ia', 'tecnologia']);
assert.ok(validarWeb(buena).ok);
assert.equal(validarWeb({ ...buena, autor: 'alguien' }).web.autor, '@alguien', 'el @ se normaliza');
for (const [campo, valor] of [
  ['tema', 'cocina'], ['tema', ''], ['url', 'http://ejemplo.dev'], ['url', 'https://localhost:3000'], ['url', 'https://192.168.1.4'],
  ['url', 'https://user:pass@ejemplo.dev'], ['url', 'javascript:alert(1)'], ['url', 'no es una url'], ['url', 'https://sinpunto'],
  ['nombre', 'x'], ['nombre', '<b>hola</b>'], ['descripcion', 'corta'], ['descripcion', 'a'.repeat(161)], ['autor', 'tiene espacios'], ['autor', 'a'.repeat(16)],
]) assert.equal(validarWeb({ ...buena, [campo]: valor }).ok, false, `${campo}=${valor} debe rechazarse`);
assert.equal(Object.keys(validarWeb({ ...buena, admin: true }).web).includes('admin'), false, 'no se cuelan campos');

// La lista exige fecha y no admite dos webs del mismo dominio.
assert.ok(validarLista([{ ...buena, fecha: '2026-11' }]).ok);
assert.equal(validarLista([buena]).ok, false, 'falta la fecha');
assert.equal(validarLista([{ ...buena, fecha: '2026-11' }, { ...buena, nombre: 'Otra', url: 'https://ejemplo.dev/otra', fecha: '2026-11' }]).ok, false, 'dominio repetido');
assert.equal(validarLista({}).ok, false);

// Función: no publica, avisa por correo y filtra bots y datos inválidos.
const llamadas = [];
globalThis.fetch = async (url, init) => { llamadas.push({ url, init }); return new Response('{}', { status: 200 }); };
const env = { RESEND_API_KEY: 'k', FROM_EMAIL: 'a@b.c', TO_EMAIL: 'd@e.f' };
const post = (cuerpo, metodo = 'POST') => onRequest({ request: new Request('https://x.test/proponer-web', { method: metodo, body: metodo === 'POST' ? JSON.stringify(cuerpo) : undefined }), env });

assert.equal((await post(null, 'GET')).status, 405);
assert.equal((await post({ ...buena, tema: 'cocina' })).status, 400);
assert.equal(llamadas.length, 0, 'una propuesta inválida no envía correo');
assert.equal((await post({ ...buena, sitio_extra: 'soy un bot' })).status, 200);
assert.equal(llamadas.length, 0, 'el campo trampa no envía correo');
const ok = await post({ ...buena, nombre: 'Web <script>' .replace('<script>', 'ok') });
assert.equal(ok.status, 200);
assert.equal(llamadas.length, 1);
const correo = JSON.parse(llamadas[0].init.body);
assert.equal(correo.to, 'd@e.f');
assert.ok(correo.subject.includes('ejemplo.dev'));
assert.ok(!/<script/i.test(correo.html), 'el contenido del visitante va escapado');
const xss = await post({ ...buena, descripcion: 'Descripción con <img src=x onerror=1> dentro' });
assert.equal(xss.status, 400, 'el HTML se rechaza');
globalThis.fetch = async () => new Response('fallo', { status: 500 });
assert.equal((await post(buena)).status, 500);
console.log('PASS: topics limited to AI and technology, input validation, duplicate domains, honeypot, escaped email and failure handling.');
