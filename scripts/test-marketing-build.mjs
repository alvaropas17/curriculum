import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const run = (env = {}) => execFileSync(process.execPath, ['scripts/build-marketing.mjs'], {
  cwd: root, env: { ...process.env, ...env }, encoding: 'utf8', timeout: 10000,
});
console.log(run());
const output = join(root, 'dist-marketing');
assert.deepEqual(readdirSync(output).sort(), ['404.html', '_redirects', 'index.html', 'robots.txt', 'sitemap.xml']);
const html = readFileSync(join(output, 'index.html'), 'utf8');
assert.ok(html.includes('https://marketing.alvaropastor.dev/"'));
assert.ok(html.includes('href="#"'));
assert.ok(html.includes('marketing-language'));
assert.ok(!html.includes('analytics-consent.js'));
assert.ok(!/href=["']https?:\/\/alvaropastor\.dev/i.test(html));
assert.ok(!/src=["']\.\.\//i.test(html));
assert.ok(!html.includes('portfolio-language'));
for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
  new vm.Script(match[1]);
}
const sitemap = readFileSync(join(output, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, 1);
assert.ok(!sitemap.includes('herramientas'));
assert.throws(() => run({ MARKETING_HOST: 'bad.example/path' }));
assert.throws(() => run({ MARKETING_OUTPUT: '..' }));
console.log('PASS: independent output, canonical URL, old URL redirect, inline JavaScript syntax, and invalid configuration rejection.');
