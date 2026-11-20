import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outName = 'tmp/marketing-test-output';
const output = join(root, outName);
rmSync(output, { recursive: true, force: true });
const run = (env = {}) => execFileSync(process.execPath, ['scripts/build-marketing.mjs'], {
  cwd: root, env: { ...process.env, MARKETING_OUTPUT: outName, ...env }, encoding: 'utf8', timeout: 10000,
});
console.log(run());
assert.deepEqual(readdirSync(output).sort(), ['404.html', '_redirects', 'apple-touch-icon.png', 'arranque', 'assets', 'automatizar', 'en', 'favicon.ico', 'favicon.svg', 'index.html', 'lineas', 'ocio', 'plantillas', 'portada', 'portada-v2', 'prompts', 'robots.txt', 'sitemap.xml', 'tfg', 'tickets', 'webs', 'x-post-audit']);

const pages = { '': 'index.html', 'tfg/': 'tfg/index.html', 'ocio/': 'ocio/index.html', 'x-post-audit/': 'x-post-audit/index.html', 'portada/': 'portada/index.html', 'arranque/': 'arranque/index.html', 'plantillas/': 'plantillas/index.html', 'prompts/': 'prompts/index.html', 'automatizar/': 'automatizar/index.html', 'tickets/': 'tickets/index.html', 'lineas/': 'lineas/index.html', 'webs/': 'webs/index.html' };
for (const [path, file] of Object.entries(pages)) {
  assert.ok(existsSync(join(output, file)), `${file} missing`);
  const html = readFileSync(join(output, file), 'utf8');
  assert.ok(html.includes('href="/favicon.svg?v=a1"') && html.includes('href="/apple-touch-icon.png?v=a1"'), `${file} favicon`);
  assert.ok(html.includes(`<link rel="canonical" href="https://marketing.alvaropastor.dev/${path}" />`), `${file} canonical`);
  assert.ok(!html.includes('analytics-consent.js'), `${file} analytics`);
  assert.ok(!/href=["']https?:\/\/alvaropastor\.dev/i.test(html), `${file} portfolio link`);
  assert.ok(!/href=["']\.\.\/index\.html/i.test(html), `${file} relative portfolio link`);
  assert.ok(!/src=["']\.\.\//i.test(html), `${file} relative src`);
  assert.ok(!html.includes('portfolio-language'), `${file} language key`);
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/type=["']application\/(?:ld\+)?json["']/i.test(match[1])) { JSON.parse(match[2]); continue; }
    new vm.Script(match[2]);
  }
}

const home = readFileSync(join(output, 'index.html'), 'utf8');
assert.ok(home.includes('Trabajo Fin de Grado'), 'home presents the TFG');
assert.equal((home.match(/data-filtro=/g) || []).length, 0, 'no topic filters on the homepage');
assert.ok(home.includes('id="primera-apuesta"'), 'one hero button leads to the bet');
assert.ok(home.includes('[hidden] { display: none !important; }'), 'hidden quiz stays hidden');
assert.ok(home.indexOf('id="entrada-tfg"') < home.indexOf('id="entrada-portada"') && home.indexOf('id="entrada-portada"') < home.indexOf('id="apuesta"'), 'homepage article follows the TFG before the quiz');
assert.equal((home.match(/id="entrada-portada"/g) || []).length, 1, 'homepage article appears once');
assert.ok(!home.includes('id="proximo"') && !/cl[ií]nex|kleenex/i.test(home), 'the Kleenex teaser is removed');
assert.ok(home.includes('id="pega"') && home.includes('mailto:contacto@alvaropastor.dev'), 'closing offer is one paste-your-site form');
assert.ok(home.indexOf('id="juguete"') < home.indexOf('id="entrada-tfg"'), 'the tap demo sits in the hero');
assert.ok(home.includes('family=Newsreader') && !/family=Inter|"Inter"|JetBrains|Lexend|Instrument|Bricolage|Plex/.test(home), 'one serif typeface: Newsreader');
assert.ok(!home.includes('aria-label="Sobre el autor"'), 'author promotion is removed');
assert.equal((home.match(/<h1\b/g) || []).length, 1, 'blog home has one main heading');
assert.ok(home.includes('datetime="2024-06"'), 'TFG has its publication month');
assert.ok(home.includes('datetime="2024-04"'), 'leisure entry has its publication month');
assert.ok(home.includes('href="/tfg/"') && home.includes('href="/ocio/"'), 'home links to both posts');
assert.ok(home.indexOf('href="/tfg/"') < home.indexOf('href="/ocio/"'), 'TFG comes before the leisure post');
assert.ok(!/href="(?:marketing-emocional|ocio-conglomerados|marketing-portada)\.html"/.test(home), 'local file links are rewritten');
assert.ok(readFileSync(join(output, 'tfg/index.html'), 'utf8').includes('marketing-language'));
const tfgEn = readFileSync(join(output, 'en/tfg/index.html'), 'utf8');assert.ok(tfgEn.includes('<html lang="en">') && tfgEn.includes('<title>I showed 4 ads to 169 people. The winner sold nothing. · Álvaro Pastor</title>'), 'English TFG has an English title in the HTML');assert.ok(tfgEn.includes('og:title" content="I showed 4 ads') && tfgEn.includes('assets/og/tfg-en.jpg') && tfgEn.includes('hreflang="es"'), 'English TFG has English card tags and image');assert.ok(existsSync(join(output, 'assets/og/tfg-en.jpg')), 'English card image is published');
assert.ok(readFileSync(join(output, 'tfg/index.html'), 'utf8').includes('href="/"'), 'TFG links back to the home');
assert.ok(readFileSync(join(output, 'ocio/index.html'), 'utf8').includes('href="/"'), 'post links back to the home');
const beta = readFileSync(join(output, 'x-post-audit/index.html'), 'utf8');
assert.ok(beta.includes('href="/"'), 'beta page links back to the home');
assert.ok(!beta.includes('marketing-portada.html'), 'beta local links are rewritten');

const sitemap = readFileSync(join(output, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, 13, 'twelve pages plus the English TFG');
const caso = readFileSync(join(output, 'portada/index.html'), 'utf8');
assert.ok(home.includes('href="/portada/"'), 'home links to the homepage case');
assert.ok(!/jane/i.test(home), 'Jane is no longer on the blog home');
assert.ok(caso.includes('src="/assets/portada-caso/antes.webp"') && caso.includes('src="/assets/portada-caso/despues.webp"') && caso.includes('data-src-en="/assets/portada-caso/despues-en.webp"'), 'both comparison images are rewritten');
for (const file of ['assets/portada-caso/antes.webp', 'assets/portada-caso/despues.webp', 'assets/portada-caso/antes-movil.webp', 'assets/portada-caso/despues-movil.webp', 'assets/portada-caso/antes-en.webp', 'assets/portada-caso/despues-en.webp', 'assets/portada-caso/antes-movil-en.webp', 'assets/portada-caso/despues-movil-en.webp', 'assets/jane/caso-jane.css', 'assets/portada-caso/portada-caso.css']) assert.ok(existsSync(join(output, file)), file);
assert.ok(caso.includes('href="/assets/portada-caso/portada-caso.css"') && !/cdn\.tailwindcss|<script[^>]+src=/i.test(caso), 'the case page uses local CSS and no external scripts');
assert.ok(!existsSync(join(output, 'jane')), 'Jane case is no longer built');
assert.ok(!sitemap.includes('herramientas'));
const webs = readFileSync(join(output, 'webs/index.html'), 'utf8');
assert.ok(home.includes('href="/webs/"'), 'home links to the followers list');
assert.ok(webs.includes('href="/"'), 'webs page links back to the home');
assert.ok(!webs.includes('marketing-webs.html') && !webs.includes('<script type="application/json" id="webs-datos">{}</script>'), 'webs data is injected and links are rewritten');
const datosWebs = JSON.parse(webs.match(/<script type="application\/json" id="webs-datos">([\s\S]*?)<\/script>/)[1]);
assert.deepEqual(datosWebs.temas.map((t) => t.id), ['ia', 'tecnologia'], 'only AI and technology topics are offered');
assert.ok(Array.isArray(datosWebs.webs), 'webs list is embedded');
assert.ok(sitemap.includes('https://marketing.alvaropastor.dev/webs/'), 'webs page is indexed');
const redirects = readFileSync(join(output, '_redirects'), 'utf8');
assert.ok(redirects.includes('/proyecto/marketing-emocional.html /tfg/ 301'));
assert.ok(redirects.includes('/proyecto/ocio-conglomerados.html /ocio/ 301'));
assert.ok(redirects.includes('/beta /x-post-audit/ 301'));
assert.ok(redirects.includes('/beta/ /x-post-audit/ 301'));
assert.ok(redirects.includes('/jane /portada/ 301') && redirects.includes('/jane/* /portada/ 301'), 'old Jane URLs redirect to the new case');
assert.ok(!sitemap.includes('/beta/'), 'old beta URL is not indexed');
assert.throws(() => run({ MARKETING_HOST: 'bad.example/path' }));
assert.throws(() => run({ MARKETING_OUTPUT: '..' }));
rmSync(output, { recursive: true, force: true });
console.log('PASS: six pages, homepage case assets, Jane redirects, canonical URLs, back links, redirects, inline JavaScript syntax and invalid configuration rejection.');
