// Builds an independent marketing site. Never copies the technology portfolio.
// Cloudflare Pages: node scripts/build-marketing.mjs, output dist-marketing.
// Existing output is renamed to a backup so local builds remain reversible.
import { copyFileSync, existsSync, mkdtempSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
let html = readFileSync(join(root, 'proyecto/marketing-emocional.html'), 'utf8');
html = html.replace(/\s*<script\b[^>]*src=["']\.\.\/scripts\/analytics-consent\.js["'][^>]*>\s*<\/script>/i, '');
html = html.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="https://${host}/" />`);
html = html.replace('href="../index.html#tfg"', 'href="#"');
html = html.replaceAll('portfolio-language', 'marketing-language');
// The back control now returns to the beginning of this same study.
if (/href=["'](?:https?:\/\/alvaropastor\.dev|\.\.\/index\.html)/i.test(html)) {
  throw new Error('The marketing page must not link to the technology portfolio.');
}
writeFileSync(join(staging, 'index.html'), html);
copyFileSync(join(root, 'img/marketing-social.png'), join(staging, 'marketing-social.png'));
writeFileSync(join(staging, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://${host}/sitemap.xml\n`);
writeFileSync(join(staging, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://${host}/</loc></url></urlset>\n`);
writeFileSync(join(staging, '_redirects'), '/proyecto/marketing-emocional.html / 301\n/index.html / 301\n');
writeFileSync(join(staging, '404.html'), '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Página no encontrada · Marketing</title><body><h1>Página no encontrada</h1><a href="/">Volver al estudio de marketing</a></body></html>');
if (existsSync(output)) {
  renameSync(output, `${output}.backup-${Date.now()}`);
}
renameSync(staging, output);
console.log(`Marketing site ready: ${output} (one study, no technology pages).`);
