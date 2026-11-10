// Genera dist-marketing/: copia de la web para servirla en marketing.alvaropastor.dev.
//
// Es la misma web, con cuatro diferencias aplicadas solo a la copia:
//   1. canonical, og:url, og:image y demás URLs absolutas apuntan al subdominio
//      (indexable, se auto-referencia; las páginas sin canonical lo reciben).
//   2. Sin el script de Umami (no se usa).
//   3. robots.txt, sitemap.xml y llms.txt apuntando al subdominio.
//   4. El TFG de marketing emocional: sección en la portada (es/en) y URL en el sitemap.
//      La portada principal no lo enlaza porque no habla de marketing.
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

// ---------- solo en la copia de marketing ----------
const TFG = 'proyecto/marketing-emocional.html';
const MINIATURAS = ['WDlf21iG_zo', 'aRQDXP3sSNg', 'CCEGnaLICO4', 'ik-Hd2QfrnI'];
const SECCION_TFG = `
        <!-- Solo en marketing.alvaropastor.dev: el TFG -->
        <section class="lanzamiento tfg" id="tfg" aria-labelledby="tfg-titulo">
            <div class="marco">
                <p class="etiqueta" data-t="tfg-etiqueta">Antes del código · TFG de marketing, 2024</p>
                <h2 id="tfg-titulo" data-t="tfg-titulo">El miedo se recuerda</h2>
                <div class="lanzamiento-rejilla">
                    <a class="tfg-tira" href="./${TFG}" data-lang-link aria-hidden="true" tabindex="-1">
                        ${MINIATURAS.map((id) => `<img src="https://i.ytimg.com/vi/${id}/mqdefault.jpg" alt="" loading="lazy" width="320" height="180" />`).join('\n                        ')}
                    </a>
                    <div>
                        <p class="lanzamiento-nombre" data-t="tfg-gancho">El anuncio que más miedo dio fue el que mejor se recordó.</p>
                        <p class="lanzamiento-texto" data-t="tfg-p">Mi trabajo de fin de grado, contado como una historia interactiva: cuatro anuncios, 169 encuestas y lo que pasa en tu cerebro cuando ves uno. Con apuestas, y una prueba para compararte con la muestra.</p>
                        <div class="acciones">
                            <a class="boton boton-senal" href="./${TFG}" data-lang-link data-t="tfg-cta">Leer la historia</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
`;
const ESTILO_TFG = `    <style>
      .tfg { background: var(--fondo); border-top: 1px solid rgba(242, 239, 233, 0.08); }
      .tfg-tira { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; border-radius: 5px; overflow: hidden; }
      .tfg-tira img { width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; display: block; filter: grayscale(0.5) brightness(0.8); transition: filter 0.4s; }
      .tfg-tira:hover img { filter: none; }
    </style>
`;
const EN_TFG = {
  'tfg-etiqueta': 'Before code · marketing thesis, 2024',
  'tfg-titulo': 'Fear sticks',
  'tfg-gancho': 'The ad that scared people most was the one they remembered best.',
  'tfg-p': 'My undergraduate thesis, told as an interactive story: four ads, 169 surveys and what happens in your brain when you watch one. With bets, and a test to compare yourself with the sample.',
  'tfg-cta': 'Read the story',
};

function exigir(texto, patron, donde) {
  if (!texto.includes(patron)) throw new Error(`${donde}: no encuentro «${patron}» para añadir el TFG`);
}

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
  if (rutaRelativa === 'index.html') {
    exigir(out, '<!-- Cierre -->', 'index.html');
    out = out.replace('<!-- Cierre -->', `${SECCION_TFG.trim()}

        <!-- Cierre -->`).replace(/<\/head>/i, `${ESTILO_TFG}</head>`);
  }
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
// Textos en inglés de la sección del TFG, en la copia de portada.js.
{
  const ruta = join(SALIDA, 'scripts', 'portada.js');
  const js = readFileSync(ruta, 'utf8');
  exigir(js, 'const EN = {', 'scripts/portada.js');
  writeFileSync(ruta, js.replace('const EN = {', `const EN = {
    ...${JSON.stringify(EN_TFG)},`));
}
{
  const ruta = join(SALIDA, 'sitemap.xml');
  const xml = readFileSync(ruta, 'utf8');
  exigir(xml, '</urlset>', 'sitemap.xml');
  const url = `  <url>
    <loc>https://${HOST}/${TFG}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>
`;
  writeFileSync(ruta, xml.replace('</urlset>', `${url}</urlset>`));
}

for (const ruta of ficheros(join(SALIDA, 'herramientas'))) {
  if (ruta.endsWith('.md')) writeFileSync(ruta, aSubdominio(readFileSync(ruta, 'utf8')));
}

console.log(`dist-marketing listo: ${html} páginas HTML, host ${HOST}`);
