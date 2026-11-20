// Añade una web a la lista de seguidores tras validarla con las mismas reglas que el build.
// Uso: node scripts/anadir-web.mjs --nombre "Mi web" --url https://ejemplo.dev --autor @usuario --tema ia --descripcion "Qué hace, en una frase"
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dominio, validarLista, validarWeb } from './webs-validacion.mjs';

const fichero = resolve(dirname(fileURLToPath(import.meta.url)), '../proyecto/marketing-webs.json');
const args = process.argv.slice(2);
const entrada = {};
for (let i = 0; i < args.length; i += 2) {
  const clave = args[i]?.replace(/^--/, '');
  if (!clave || args[i + 1] === undefined) { console.error(`Falta el valor de ${args[i]}`); process.exit(1); }
  entrada[clave] = args[i + 1];
}
entrada.fecha ??= new Date().toISOString().slice(0, 7);

const lista = JSON.parse(readFileSync(fichero, 'utf8'));
const { ok, errores, web } = validarWeb(entrada, { exigirFecha: true });
if (!ok) { console.error(errores.join('\n')); process.exit(1); }
if (lista.some((w) => dominio(w.url) === dominio(web.url))) { console.error(`El dominio ${dominio(web.url)} ya está en la lista.`); process.exit(1); }

lista.push(web);
const comprobacion = validarLista(lista);
if (!comprobacion.ok) { console.error(comprobacion.errores.join('\n')); process.exit(1); }
writeFileSync(fichero, JSON.stringify(lista, null, 2) + '\n');
console.log(`Añadida: ${web.nombre} (${dominio(web.url)}). Ya hay ${lista.length} en la lista. Ejecuta npm run build:marketing para verla.`);
