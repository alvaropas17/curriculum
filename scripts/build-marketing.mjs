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
  { source: 'proyecto/marketing-arranque.html', path: 'arranque/' },
  { source: 'proyecto/marketing-plantillas.html', path: 'plantillas/' },
  { source: 'proyecto/marketing-prompts.html', path: 'prompts/' },
  { source: 'proyecto/marketing-automatizar.html', path: 'automatizar/' },
  { source: 'proyecto/marketing-tickets.html', path: 'tickets/' },
  { source: 'proyecto/marketing-lineas.html', path: 'lineas/' },
  { source: 'proyecto/marketing-webs.html', path: 'webs/' },
  { source: 'proyecto/marketing-portada-v2.html', path: 'portada-v2/', noindex: true },
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
  html = html.replace(/href="(?:\.\/)?marketing-portada\.html#cierre"/g, 'href="/#cierre"');
  html = html.replace(/href="(?:\.\/)?marketing-emocional\.html"/g, 'href="/tfg/"');
  html = html.replace(/href="(?:\.\/)?ocio-conglomerados\.html"/g, 'href="/ocio/"');
  html = html.replace(/href="(?:\.\/)?marketing-beta\.html"/g, 'href="/x-post-audit/"');
  html = html.replace(/href="(?:\.\/)?marketing-portada-caso\.html"/g, 'href="/portada/"');
  html = html.replace(/href="(?:\.\/)?marketing-(arranque|plantillas|prompts|automatizar|tickets|lineas)\.html"/g, 'href="/$1/"');
  html = html.replace(/href="(?:\.\/)?marketing-webs\.html"/g, 'href="/webs/"');
  html = html.replace('<script type="application/json" id="webs-datos">{}</script>', () => `<script type="application/json" id="webs-datos">${datosWebs}</script>`);
  html = html.replaceAll('../styles/caso-jane.css', '/assets/jane/caso-jane.css');
  html = html.replaceAll('../styles/portada-caso.css', '/assets/portada-caso/portada-caso.css');
  html = html.replaceAll('../assets/portada-caso/', '/assets/portada-caso/');
  html = html.replaceAll('../assets/articulo/', '/assets/articulo/');
  html = html.replace(/href="(?:\.\/)?marketing-portada-v2\.html"/g, 'href="/portada-v2/"');
  html = html.replaceAll('../assets/miniaturas/', '/assets/miniaturas/');
  html = html.replaceAll('portfolio-language', 'marketing-language');
  if (/href=["'](?:https?:\/\/alvaropastor\.dev|\.\.\/index\.html)/i.test(html)) {
    throw new Error('The marketing pages must not link to the technology portfolio.');
  }
  if (process.env.DOMPICK === '1') html = html.replace('</body>', '<script>(()=>{const h=location.hostname;if(h!=="localhost"&&h!=="127.0.0.1"&&!h.endsWith(".localhost"))return;const s=document.createElement("script");s.src="http://127.0.0.1:47823/overlay.js?"+Date.now();s.onload=()=>{try{window.__domPick&&window.__domPick.show()}catch{}};document.documentElement.append(s)})()</script>\n</body>');
  return html;
}
for (const page of pages) {
  const dir = join(staging, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), prepare(page));
}
// Versión estática en inglés del TFG: X y otros rastreadores no ejecutan JavaScript, así que
// el título, la descripción y la imagen de la tarjeta tienen que estar ya en inglés en el HTML.
const tfgEs = readFileSync(join(staging, 'tfg/index.html'), 'utf8');
const enTitle = 'I showed 4 ads to 169 people. The winner sold nothing.';
const enDescription = '169 people told me what they felt watching 4 ads. The scariest one was remembered best; the most liked one left people sad. 5 minutes, 3 bets and 3 rules for your next ad.';
const escAttr = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const swap = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`English TFG page: ${pattern} not found.`);
  return html.replace(pattern, () => value);
};
let tfgEn = tfgEs;
tfgEn = swap(tfgEn, /<html lang="es">/, '<html lang="en">');
tfgEn = swap(tfgEn, /<title>[^<]*<\/title>/, `<title>${enTitle} · Álvaro Pastor</title>`);
tfgEn = swap(tfgEn, /<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escAttr(enDescription)}" />`);
tfgEn = swap(tfgEn, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="https://${host}/en/tfg/" />\n  <link rel="alternate" hreflang="es" href="https://${host}/tfg/" />\n  <link rel="alternate" hreflang="en" href="https://${host}/en/tfg/" />\n  <link rel="alternate" hreflang="x-default" href="https://${host}/tfg/" />`);
tfgEn = swap(tfgEn, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escAttr(enTitle)}" />`);
tfgEn = swap(tfgEn, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escAttr(enDescription)}" />\n  <meta property="og:locale" content="en_US" />`);
tfgEn = swap(tfgEn, /assets\/og\/tfg\.jpg/, 'assets/og/tfg-en.jpg');
tfgEn = swap(tfgEn, /<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${escAttr(enTitle)}" />`);
// En esta URL el idioma por defecto es el inglés; ?lang=es sigue permitiendo cambiarlo.
tfgEn = swap(tfgEn, /aplicar\(pedido === "es" \|\| pedido === "en" \? pedido : guardado === "es" \|\| guardado === "en" \? guardado : "es"\);/, 'aplicar(pedido === "es" || pedido === "en" ? pedido : "en");');
mkdirSync(join(staging, 'en/tfg'), { recursive: true });
writeFileSync(join(staging, 'en/tfg/index.html'), tfgEn);
for (const name of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png']) {
  copyFileSync(join(root, 'assets/marketing', name), join(staging, name));
}
// Caso de la portada propia: estilos compartidos con el formato de transformación y capturas.
// Plantilla común de artículos.
const articuloAssets = join(staging, 'assets/articulo');
mkdirSync(articuloAssets, { recursive: true });
copyFileSync(join(root, 'assets/articulo/articulo.css'), join(articuloAssets, 'articulo.css'));
const caseAssets = join(staging, 'assets/jane');
mkdirSync(caseAssets, { recursive: true });
copyFileSync(join(root, 'styles/caso-jane.css'), join(caseAssets, 'caso-jane.css'));
const portadaAssets = join(staging, 'assets/portada-caso');
mkdirSync(portadaAssets, { recursive: true });
copyFileSync(join(root, 'styles/portada-caso.css'), join(portadaAssets, 'portada-caso.css'));
for (const name of ['antes.webp', 'despues.webp', 'antes-movil.webp', 'despues-movil.webp', 'antes-en.webp', 'despues-en.webp', 'antes-movil-en.webp', 'despues-movil-en.webp', 'portada-tarjeta.webp', 'portada-tarjeta-en.webp']) {
  copyFileSync(join(root, 'assets/portada-caso', name), join(portadaAssets, name));
}
// Miniaturas dibujadas de los artículos (tarjeta de la portada y cabecera de cada artículo), en español e inglés.
const miniAssets = join(staging, 'assets/miniaturas');
mkdirSync(miniAssets, { recursive: true });
copyFileSync(join(root, 'assets/miniaturas/lineas-prueba.webp'), join(miniAssets, 'lineas-prueba.webp'));
for (const slug of ['arranque', 'plantillas', 'prompts', 'automatizar', 'tickets', 'lineas']) {
  for (const suffix of ['', '-en']) copyFileSync(join(root, 'assets/miniaturas', `${slug}${suffix}.webp`), join(miniAssets, `${slug}${suffix}.webp`));
}
// Imágenes de vista previa (og:image) para X y otras redes.
const ogAssets = join(staging, 'assets/og');
mkdirSync(ogAssets, { recursive: true });
for (const name of ['tfg.jpg', 'tfg-en.jpg', 'blog.jpg', 'portada.jpg', 'arranque.jpg', 'plantillas.jpg', 'prompts.jpg', 'automatizar.jpg', 'tickets.jpg', 'lineas.jpg']) {
  copyFileSync(join(root, 'assets/og', name), join(ogAssets, name));
}
const urls = [...pages.filter((page) => !page.noindex).map((page) => page.path), 'en/tfg/'].map((path) => `<url><loc>https://${host}/${path}</loc></url>`).join('');
writeFileSync(join(staging, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://${host}/sitemap.xml\n`);
writeFileSync(join(staging, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`);
writeFileSync(join(staging, '_redirects'), '/proyecto/marketing-emocional.html /tfg/ 301\n/proyecto/ocio-conglomerados.html /ocio/ 301\n/index.html / 301\n/beta /x-post-audit/ 301\n/beta/ /x-post-audit/ 301\n/jane /portada/ 301\n/jane/* /portada/ 301\n');
writeFileSync(join(staging, '404.html'), '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Página no encontrada · Marketing</title><body><h1>Página no encontrada</h1><a href="/">Volver a la portada de marketing</a></body></html>');
if (existsSync(output)) {
  renameSync(output, `${output}.backup-${Date.now()}`);
}
renameSync(staging, output);
console.log(`Marketing site ready: ${output} (blog, articles and homepage transformation case).`);
