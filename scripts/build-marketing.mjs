// Builds an independent marketing site. Never copies the technology portfolio.
// Cloudflare Pages: node scripts/build-marketing.mjs, output dist-marketing.
// Existing output is renamed to a backup so local builds remain reversible.
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TEMAS, validarLista } from './webs-validacion.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const host = process.env.MARKETING_HOST || 'marketing.alvaropastor.dev';
if (!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(host)) {
  throw new Error('MARKETING_HOST must be a hostname, without a scheme or path.');
}
const output = resolve(root, process.env.MARKETING_OUTPUT || 'dist-marketing');
const outputRelative = relative(root, output);
if (!outputRelative || outputRelative.startsWith('..') || isAbsolute(outputRelative)) {
  throw new Error('Output must be a child directory of the project.');
}
const staging = mkdtempSync(join(root, '.marketing-build-'));
// Editorial pages and independent transformation cases.
const pages = [
  { source: 'proyecto/marketing-portada.html', path: '' },
  { source: 'proyecto/marketing-emocional.html', path: 'tfg/' },
  { source: 'proyecto/ocio-conglomerados.html', path: 'ocio/' },
  { source: 'proyecto/marketing-beta.html', path: 'x-post-audit/' },
  { source: 'proyecto/marketing-portada-caso.html', path: 'portada/' },
  { source: 'proyecto/marketing-webs.html', path: 'webs/' },
];
// Lista de webs de seguidores: se valida y se incrusta en la página. Si una entrada no cumple
// las reglas (tema, https, dominio repetido...), el build falla en vez de publicarla.
const listaWebs = validarLista(JSON.parse(readFileSync(join(root, 'proyecto/marketing-webs.json'), 'utf8')));
if (!listaWebs.ok) throw new Error(`proyecto/marketing-webs.json no es válido:\n${listaWebs.errores.join('\n')}`);
const datosWebs = JSON.stringify({ temas: TEMAS, webs: listaWebs.webs }).replace(/</g, '\\u003c');
function prepare({ source, path }) {
  let html = readFileSync(join(root, source), 'utf8');
  html = html.replace('</head>', '  <link rel="icon" href="/favicon.ico?v=a1" sizes="32x32">\n  <link rel="icon" href="/favicon.svg?v=a1" type="image/svg+xml">\n  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=a1">\n</head>');
  html = html.replace(/\s*<script\b[^>]*src=["']\.\.\/scripts\/analytics-consent\.js["'][^>]*>\s*<\/script>/i, '');
  if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="https://${host}/${path}" />`);
  } else {
    html = html.replace('</title>', `</title>\n  <link rel="canonical" href="https://${host}/${path}" />`);
  }
  // The back control returns to the blog home.
  html = html.replace(/href="\.\.\/index\.html(?:#tfg)?"/g, 'href="/"');
  // Source pages link to each other by file name so they work when opened locally.
  html = html.replace(/href="(?:\.\/)?marketing-portada\.html"/g, 'href="/"');
  html = html.replace(/href="(?:\.\/)?marketing-emocional\.html"/g, 'href="/tfg/"');
  html = html.replace(/href="(?:\.\/)?ocio-conglomerados\.html"/g, 'href="/ocio/"');
  html = html.replace(/href="(?:\.\/)?marketing-beta\.html"/g, 'href="/x-post-audit/"');
  html = html.replace(/href="(?:\.\/)?marketing-portada-caso\.html"/g, 'href="/portada/"');
  html = html.replace(/href="(?:\.\/)?marketing-webs\.html"/g, 'href="/webs/"');
  html = html.replace('<script type="application/json" id="webs-datos">{}</script>', () => `<script type="application/json" id="webs-datos">${datosWebs}</script>`);
  html = html.replaceAll('../styles/caso-jane.css', '/assets/jane/caso-jane.css');
  html = html.replaceAll('../assets/portada-caso/', '/assets/portada-caso/');
  html = html.replaceAll('portfolio-language', 'marketing-language');
  if (/href=["'](?:https?:\/\/alvaropastor\.dev|\.\.\/index\.html)/i.test(html)) {
    throw new Error('The marketing pages must not link to the technology portfolio.');
  }
  return html;
}
for (const page of pages) {
  const dir = join(staging, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), prepare(page));
}
for (const name of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png']) {
  copyFileSync(join(root, 'assets/marketing', name), join(staging, name));
}
// Caso de la portada propia: estilos compartidos con el formato de transformación y capturas.
const caseAssets = join(staging, 'assets/jane');
mkdirSync(caseAssets, { recursive: true });
copyFileSync(join(root, 'styles/caso-jane.css'), join(caseAssets, 'caso-jane.css'));
const portadaAssets = join(staging, 'assets/portada-caso');
mkdirSync(portadaAssets, { recursive: true });
for (const name of ['antes.webp', 'despues.webp', 'antes-movil.webp', 'despues-movil.webp', 'portada-tarjeta.webp']) {
  copyFileSync(join(root, 'assets/portada-caso', name), join(portadaAssets, name));
}
const urls = pages.map((page) => `<url><loc>https://${host}/${page.path}</loc></url>`).join('');
writeFileSync(join(staging, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://${host}/sitemap.xml\n`);
writeFileSync(join(staging, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`);
writeFileSync(join(staging, '_redirects'), '/proyecto/marketing-emocional.html /tfg/ 301\n/proyecto/ocio-conglomerados.html /ocio/ 301\n/index.html / 301\n/beta /x-post-audit/ 301\n/beta/ /x-post-audit/ 301\n/jane /portada/ 301\n/jane/* /portada/ 301\n');
writeFileSync(join(staging, '404.html'), '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Página no encontrada · Marketing</title><body><h1>Página no encontrada</h1><a href="/">Volver a la portada de marketing</a></body></html>');
if (existsSync(output)) {
  renameSync(output, `${output}.backup-${Date.now()}`);
}
renameSync(staging, output);
console.log(`Marketing site ready: ${output} (blog, articles and homepage transformation case).`);
