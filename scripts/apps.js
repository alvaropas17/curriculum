(() => {
  const data = JSON.parse(document.getElementById('directory-data').textContent);
  const query = document.getElementById('app-search');
  const buttons = [...document.querySelectorAll('.directory-filters button')];
  const cards = [...document.querySelectorAll('.app-card')];
  const clear = document.getElementById('clear-search');
  const count = document.getElementById('directory-count');
  const empty = document.getElementById('directory-empty');
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const search = new Map(data.apps.map(a=>[a.id,normalize([a.name,a.url,...Object.values(a.description),...Object.values(a.use),...Object.values(a.kind)].join(' '))]));
  let category = 'all';
  const initial = new URL(location.href);
  query.value = initial.searchParams.get('q') || '';
  if (buttons.some(b=>b.dataset.category===initial.searchParams.get('category'))) category=initial.searchParams.get('category');
  function render() {
    const q = normalize(query.value.trim()); let n=0;
    for (const card of cards) {
      card.hidden = !((category==='all'||card.dataset.category===category) && (!q||search.get(card.dataset.id).includes(q)));
      if (!card.hidden) n++;
    }
    for (const button of buttons) button.setAttribute('aria-pressed',String(button.dataset.category===category));
    count.textContent = data.lang==='en' ? `${n} ${n===1?'app':'apps'}` : `${n} ${n===1?'aplicación':'aplicaciones'}`;
    empty.hidden = n!==0; clear.hidden = !query.value;
    const url = new URL(location.href);
    if (query.value) url.searchParams.set('q',query.value); else url.searchParams.delete('q');
    if (category!=='all') url.searchParams.set('category',category); else url.searchParams.delete('category');
    history.replaceState(null,'',url);
    const language = document.getElementById('directory-language'), alternate = new URL(language.href);
    for(const key of ['q','category']) {if(url.searchParams.has(key))alternate.searchParams.set(key,url.searchParams.get(key));else alternate.searchParams.delete(key)}
    language.href=alternate.href;
  }
  buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;render()}));
  query.addEventListener('input',render);
  clear.addEventListener('click',()=>{query.value='';render();query.focus()});
  document.getElementById('reset-directory').addEventListener('click',()=>{query.value='';category='all';render();query.focus()});
  try { localStorage.setItem('portfolio-language',data.lang); } catch { /* Browsing without storage. */ }
  render();
})();
