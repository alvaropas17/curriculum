import assert from 'node:assert/strict';
import { readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://marketing.alvaropastor.dev';
const routes = new Map([
    ['/', readFileSync(resolve(root, 'dist-marketing/index.html'), 'utf8')],
    ['/tfg/', readFileSync(resolve(root, 'dist-marketing/tfg/index.html'), 'utf8')],
    ['/ocio/', readFileSync(resolve(root, 'dist-marketing/ocio/index.html'), 'utf8')],
]);
const browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_PATH ? { executablePath: process.env.BROWSER_PATH } : {}),
});
const errors = [];
let checks = 0;
const check = (value, message) => { assert.ok(value, message); checks++; };
async function switchTo(page, language) {
    const toggle = page.locator('#idioma');
    if (await toggle.count()) await toggle.click();
    else await page.locator(`[data-language="${language}"]`).click();
}
try {
    const context = await browser.newContext({ locale: 'en-GB', reducedMotion: 'reduce' });
    await context.route('**/*', route => {
        const url = new URL(route.request().url());
        const html = url.origin === origin && routes.get(url.pathname);
        return html ? route.fulfill({ contentType: 'text/html', body: html }) : route.abort();
    });
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    page.on('pageerror', error => errors.push(error.message));
    for (const path of routes.keys()) {
        await page.goto(origin + path + '?lang=en');
        check(await page.locator('html').getAttribute('lang') === 'en', path + ' URL English');
        check(await page.locator('#idioma, [data-language]').count() > 0, path + ' language switch exists');
        await switchTo(page, 'es');
        check(await page.locator('html').getAttribute('lang') === 'es', path + ' switch Spanish');
        await page.reload();
        check(await page.locator('html').getAttribute('lang') === 'es', path + ' reload Spanish');
        await page.evaluate(() => localStorage.setItem('marketing-language', 'en'));
        await page.goto(origin + path);
        check(await page.locator('html').getAttribute('lang') === 'en', path + ' stored English');
        await page.goto(origin + path + '?lang=es');
        check(await page.locator('html').getAttribute('lang') === 'es', path + ' URL overrides storage');
        await page.evaluate(() => localStorage.clear());
        await page.goto(origin + path + '?lang=invalid');
        check(await page.locator('html').getAttribute('lang') === 'es', path + ' invalid language defaults Spanish');
    }
    await page.goto(origin + '/?lang=en');
    check((await page.locator('h1').textContent()).includes('gut'), 'Home English headline');
    check(await page.locator('[data-filtro]').count() === 0, 'Home has no topic filters');
    check((await page.locator('#primera-apuesta').textContent()).includes('Make your first bet'), 'English hero button');
    await page.locator('#primera-apuesta').click();
    check(await page.locator('#juego-prueba').isVisible(), 'Hero button opens the bet');
    await page.locator('.votar').first().click();
    check(await page.locator('.elegida .votar').textContent() === 'Your vote', 'English vote');
    check((await page.locator('#veredicto').textContent()).includes('You picked Colon'), 'English result');
    check((await page.locator('.barra-ap b').first().textContent()) === '6.5', 'English decimal format');
    check((await page.locator('#retar').getAttribute('href')).includes('lang%3Den'), 'Share preserves English');
    await page.locator('#idioma').click();
    check(await page.locator('.elegida .votar').textContent() === 'Tu voto', 'Vote survives switch');
    check((await page.locator('.barra-ap b').first().textContent()) === '6,5', 'Spanish decimal format');
    await page.locator('#idioma').click();
    await page.locator('#juguete').press('Enter');
    check((await page.locator('#sello').textContent()).includes('memory'), 'English toy');
    await page.locator('.acciones-estudio a').click();
    check(new URL(page.url()).pathname === '/tfg/', 'Navigate to TFG');
    check(await page.locator('html').getAttribute('lang') === 'en', 'TFG inherits English');
    await page.locator('#volver').click();
    check(new URL(page.url()).pathname === '/', 'TFG returns home');
    check(await page.locator('html').getAttribute('lang') === 'en', 'Home retains English');
    await page.locator('[data-publicacion="consumidor"]').click();
    check(new URL(page.url()).pathname === '/ocio/', 'Navigate to leisure');
    check(await page.locator('html').getAttribute('lang') === 'en', 'Leisure inherits English');
    mkdirSync(resolve(root, 'output'), { recursive: true });
    for (const [path, name] of [['/', 'home'], ['/tfg/', 'tfg'], ['/ocio/', 'leisure']]) {
        await page.goto(origin + path + '?lang=en');
        for (const width of [1366, 390]) {
            await page.setViewportSize({ width, height: 900 });
            for (const theme of ['light', 'dark']) {
                await page.evaluate(theme => {
                    document.documentElement.dataset.tema = theme;
                    document.querySelectorAll('.sube, .aparece').forEach(n => n.classList.add('visto'));
                    scrollTo({ top: 0, behavior: 'instant' });
                }, theme);
                check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name + ' overflow ' + width + '/' + theme);
                await page.screenshot({ path: resolve(root, `output/english-${name}-${width}-${theme}.png`) });
            }
        }
    }
    await context.close();
    const blocked = await browser.newContext({ reducedMotion: 'reduce' });
    await blocked.addInitScript(() => {
        Storage.prototype.getItem = () => { throw new Error('Storage blocked'); };
        Storage.prototype.setItem = () => { throw new Error('Storage blocked'); };
    });
    await blocked.route('**/*', route => {
        const url = new URL(route.request().url());
        const html = url.origin === origin && routes.get(url.pathname);
        return html ? route.fulfill({ contentType: 'text/html', body: html }) : route.abort();
    });
    const noStorage = await blocked.newPage();
    noStorage.setDefaultTimeout(5000);
    noStorage.on('pageerror', error => errors.push(error.message));
    for (const path of routes.keys()) {
        await noStorage.goto(origin + path + '?lang=en');
        check(await noStorage.locator('html').getAttribute('lang') === 'en', path + ' blocked storage');
        await switchTo(noStorage, 'es');
        check(await noStorage.locator('html').getAttribute('lang') === 'es', path + ' switch with blocked storage');
    }
    await blocked.close();
    check(errors.length === 0, 'No browser errors: ' + errors.join('; '));
    console.log(`PASS: ${checks} language, navigation, interaction, storage and responsive checks; 12 screenshots. External media blocked.`);
} finally {
    await browser.close();
}
