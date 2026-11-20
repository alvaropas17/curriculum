import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const data = JSON.parse(readFileSync('data/apps-directory.json', 'utf8').replace(/^\uFEFF/, ''));
const ids = new Set();
for (const app of data.apps) {
  assert.ok(/^[a-z0-9-]+$/.test(app.id) && !ids.has(app.id), 'Unique app ID'); ids.add(app.id);
  assert.equal(new URL(app.url).protocol, 'https:'); assert.equal(new URL(app.source).protocol, 'https:');
  assert.ok(data.categories.some(c => c.id === app.category));
  for (const lang of ['es', 'en']) for (const key of ['description', 'kind', 'use']) assert.ok(app[key][lang]);
}
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels = {
  es: {title:'Aplicaciones útiles', intro:'Mi directorio de apps para crear, diseñar y resolver tareas. Una lista a mano para encontrar la herramienta cuando hace falta.', eyebrow:'El directorio de Álvaro', h1:'Las aplicaciones más populares de IA', accent:'en un solo lugar', all:'Todas', search:'Buscar por nombre, tarea o descripción', clear:'Limpiar búsqueda', use:'Para qué sirve', open:'Abrir app', count:'aplicaciones', empty:'Ninguna aplicación coincide con tu búsqueda.', reset:'Ver todas las apps', home:'Inicio', directory:'Directorio', notes:'Notas', footer:'Directorio personal · Álvaro Pastor', toggle:'EN', toggleLabel:'Read in English', alternate:'/apps/en/?lang=en', note:'Una lista personal en crecimiento. Los enlaces llevan a las webs oficiales; cada servicio tiene sus propias condiciones de acceso.'},
  en: {title:'Useful apps', intro:'My app directory for creating, designing and getting things done. A handy list to find the right tool when I need it.', eyebrow:'Álvaro’s directory', h1:'The most popular AI apps', accent:'in one place', all:'All', search:'Search by name, task or description', clear:'Clear search', use:'What it is useful for', open:'Open app', count:'apps', empty:'No apps match your search.', reset:'Show all apps', home:'Home', directory:'Directory', notes:'Notes', footer:'Personal directory · Álvaro Pastor', toggle:'ES', toggleLabel:'Leer en español', alternate:'/apps/?lang=es', note:'A growing personal list. Links go to official websites; each service has its own access terms.'}
};
for (const lang of ['es', 'en']) {
  const t = labels[lang];
  const cards = data.apps.map(a => `<article class="app-card" data-id="${a.id}" data-category="${a.category}"><div class="app-meta"><span>${escape(data.categories.find(c=>c.id===a.category)[lang])}</span><span>${escape(a.kind[lang])}</span></div><h2><a href="${escape(a.url)}" target="_blank" rel="noopener noreferrer">${escape(a.name)} <span aria-hidden="true">↗</span></a></h2><p>${escape(a.description[lang])}</p><div class="app-use"><span class="etiqueta">${t.use}</span><p>${escape(a.use[lang])}</p></div><a class="app-open" href="${escape(a.url)}" target="_blank" rel="noopener noreferrer" aria-label="${t.open}: ${escape(a.name)}">${t.open} <span aria-hidden="true">↗</span><span class="app-domain">${escape(new URL(a.url).hostname.replace(/^www\./,''))}</span></a></article>`).join('\n');
  const filters = [{id:'all',[lang]:t.all}, ...data.categories].map(c => `<button type="button" data-category="${c.id}" aria-pressed="${c.id==='all'}">${escape(c[lang])} <span>${c.id==='all'?data.apps.length:data.apps.filter(a=>a.category===c.id).length}</span></button>`).join('');
  let html = readFileSync('apps/template.html', 'utf8');
  for (const [key, value] of Object.entries({...t, lang, canonical:lang==='es'?'/apps/':'/apps/en/', cards, filters, countText:`${data.apps.length} ${t.count}`})) html=html.replaceAll(`{{${key}}}`,value);
  html = html.replace('{{clientData}}', JSON.stringify({lang, labels:t, apps:data.apps}).replaceAll('<','\\u003c'));
  assert.ok(!/\{\{\w+\}\}/.test(html));
  const dir=lang==='es'?'apps':'apps/en'; mkdirSync(dir,{recursive:true});writeFileSync(`${dir}/index.html`,html);
}
console.log(`Directory ready: ${data.apps.length} apps, Spanish + English`);
