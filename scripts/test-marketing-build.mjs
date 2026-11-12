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
assert.deepEqual(readdirSync(output).sort(), ['404.html', '_redirects', 'index.html', 'ocio', 'robots.txt', 'sitemap.xml', 'tfg']);

const pages = { '': 'index.html', 'tfg/': 'tfg/index.html', 'ocio/': 'ocio/index.html' };
for (const [path, file] of Object.entries(pages)) {
  assert.ok(existsSync(join(output, file)), `${file} missing`);
  const html = readFileSync(join(output, file), 'utf8');
  assert.ok(html.includes(`<link rel="canonical" href="https://marketing.alvaropastor.dev/${path}" />`), `${file} canonical`);
  assert.ok(!html.includes('analytics-consent.js'), `${file} analytics`);
  assert.ok(!/href=["']https?:\/\/alvaropastor\.dev/i.test(html), `${file} portfolio link`);
  assert.ok(!/href=["']\.\.\/index\.html/i.test(html), `${file} relative portfolio link`);
  assert.ok(!/src=["']\.\.\//i.test(html), `${file} relative src`);
  assert.ok(!html.includes('portfolio-language'), `${file} language key`);
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    new vm.Script(match[1]);
  }
}

const home = readFileSync(join(output, 'index.html'), 'utf8');
assert.ok(home.includes('Trabajo Fin de Grado'), 'home presents the TFG');
assert.equal((home.match(/<h1\b/g) || []).length, 1, 'blog home has one main heading');
assert.ok(home.includes('datetime="2024-06"'), 'TFG has its publication month');
assert.ok(home.includes('datetime="2024-04"'), 'leisure entry has its publication month');
assert.ok(home.includes('href="/tfg/"') && home.includes('href="/ocio/"'), 'home links to both posts');
assert.ok(home.indexOf('href="/tfg/"') < home.indexOf('href="/ocio/"'), 'TFG comes before the leisure post');
assert.ok(!/href="(?:marketing-emocional|ocio-conglomerados|marketing-portada)\.html"/.test(home), 'local file links are rewritten');
assert.ok(readFileSync(join(output, 'tfg/index.html'), 'utf8').includes('marketing-language'));
assert.ok(readFileSync(join(output, 'tfg/index.html'), 'utf8').includes('href="/"'), 'TFG links back to the home');
assert.ok(readFileSync(join(output, 'ocio/index.html'), 'utf8').includes('href="/"'), 'post links back to the home');

const sitemap = readFileSync(join(output, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, 3);
assert.ok(!sitemap.includes('herramientas'));
const redirects = readFileSync(join(output, '_redirects'), 'utf8');
assert.ok(redirects.includes('/proyecto/marketing-emocional.html /tfg/ 301'));
assert.ok(redirects.includes('/proyecto/ocio-conglomerados.html /ocio/ 301'));
assert.throws(() => run({ MARKETING_HOST: 'bad.example/path' }));
assert.throws(() => run({ MARKETING_OUTPUT: '..' }));
rmSync(output, { recursive: true, force: true });
console.log('PASS: three pages, canonical URLs, back links, old URL redirects, inline JavaScript syntax and invalid configuration rejection.');
