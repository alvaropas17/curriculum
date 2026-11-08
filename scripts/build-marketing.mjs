// Genera dist-marketing/: copia de la web para servirla en marketing.alvaropastor.dev.
//
// Es la misma web, con tres diferencias aplicadas solo a la copia:
//   1. <link rel="canonical"> propio (indexable, se auto-referencia).
//   2. Sin el script de Umami (no se usa).
//   3. robots.txt y sitemap.xml apuntando al subdominio.
//
// Uso:  node scripts/build-marketing.mjs
// Cloudflare Pages: build command `node scripts/build-marketing.mjs`, output `dist-marketing`.
// Cambiar el host:  MARKETING_HOST=otro.alvaropastor.dev node scripts/build-marketing.mjs

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = join(RAIZ, 'dist-marketing');
const HOST = process.env.MARKETING_HOST || 'marketing.alvaropastor.dev';
const HOST_PRINCIPAL = 'alvaropastor.dev';

// Solo lo público. Quedan fuera cv.html y el PDF (privados), app/, supabase/, research/, etc.
const INCLUIR = [
  'index.html',
  '404.html',
  'karpathy.md',
  'robots.txt',
  'sitemap.xml',
  'herramientas',
  'proyecto',
  'styles',
  'scripts',
  'img',
  'fonts',
];
const EXCLUIR_RUTAS = ['img/antes'];

const UMAMI = /[ \t]*<script\b[^>]*cloud\.umami\.is[^>]*>\s*<\/script>[ \t]*\r?\n?/gi;

function* ficheros(dir) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) yield* ficheros(ruta);
    else yield ruta;
  }
}

function urlCanonica(rutaRelativa) {
  const p = rutaRelativa.split(sep).join('/');
  return p === 'index.html' ? `https://${HOST}/` : `https://${HOST}/${p}`;
}

function transformarHtml(html, rutaRelativa) {
  let out = html.replace(UMAMI, '');
  if (rutaRelativa !== '404.html' && !/rel=["']canonical["']/i.test(out)) {
    const etiqueta = `    <link rel="canonical" href="${urlCanonica(rutaRelativa)}" />\n`;
    out = out.replace(/<\/head>/i, `${etiqueta}</head>`);
  }
  return out;
}

rmSync(SALIDA, { recursive: true, force: true });
mkdirSync(SALIDA, { recursive: true });

for (const entrada of INCLUIR) {
  const origen = join(RAIZ, entrada);
  if (!existsSync(origen)) {
    console.warn(`aviso: no existe ${entrada}, se omite`);
    continue;
  }
  cpSync(origen, join(SALIDA, entrada), {
    recursive: true,
    filter: (src) => {
      const rel = relative(RAIZ, src).split(sep).join('/');
      return !EXCLUIR_RUTAS.some((x) => rel === x || rel.startsWith(`${x}/`));
    },
  });
}

let html = 0;
for (const ruta of ficheros(SALIDA)) {
  const rel = relative(SALIDA, ruta);
  if (rel.endsWith('.html')) {
    const original = readFileSync(ruta, 'utf8');
    writeFileSync(ruta, transformarHtml(original, rel));
    html++;
  }
}

// El mailto de contacto sigue siendo contacto@alvaropastor.dev: no se toca a propósito.
for (const nombre of ['robots.txt', 'sitemap.xml']) {
  const ruta = join(SALIDA, nombre);
  if (existsSync(ruta)) {
    const texto = readFileSync(ruta, 'utf8').replaceAll(`https://${HOST_PRINCIPAL}/`, `https://${HOST}/`);
    writeFileSync(ruta, texto);
  }
}

console.log(`dist-marketing listo: ${html} páginas HTML, host ${HOST}`);
