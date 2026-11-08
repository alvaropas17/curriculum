// Genera dist-marketing/: copia de la web para servirla en marketing.alvaropastor.dev.
//
// Es la misma web, con tres diferencias aplicadas solo a la copia:
//   1. canonical, og:url, og:image y demás URLs absolutas apuntan al subdominio
//      (indexable, se auto-referencia; las páginas sin canonical lo reciben).
//   2. Sin el script de Umami (no se usa).
//   3. robots.txt, sitemap.xml y llms.txt apuntando al subdominio.
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
  'notas.html',
  'x.html',
  'gh.html',
  'ig.html',
  'li.html',
  'karpathy.md',
  'llms.txt',
  'robots.txt',
  'sitemap.xml',
  'herramientas',
  'proyecto',
  'styles',
  'scripts',
  'img',
  'fonts',
  'video',
];
const EXCLUIR_RUTAS = ['img/antes', 'scripts/build-marketing.mjs'];

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

// Solo reescribe URLs absolutas https://alvaropastor.dev; el correo
// contacto@alvaropastor.dev y los utm_source=alvaropastor.dev no cambian.
function aSubdominio(texto) {
  return texto.replaceAll(`https://${HOST_PRINCIPAL}`, `https://${HOST}`);
}

function transformarHtml(html, rutaRelativa) {
  let out = aSubdominio(html.replace(UMAMI, ''));
  const noindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(out);
  if (rutaRelativa !== '404.html' && !noindex && !/rel=["']canonical["']/i.test(out)) {
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

for (const nombre of ['robots.txt', 'sitemap.xml', 'llms.txt', 'karpathy.md']) {
  const ruta = join(SALIDA, nombre);
  if (existsSync(ruta)) writeFileSync(ruta, aSubdominio(readFileSync(ruta, 'utf8')));
}
for (const ruta of ficheros(join(SALIDA, 'herramientas'))) {
  if (ruta.endsWith('.md')) writeFileSync(ruta, aSubdominio(readFileSync(ruta, 'utf8')));
}

console.log(`dist-marketing listo: ${html} páginas HTML, host ${HOST}`);
