(() => {
  const EN = {
    'nav-inicio': 'home', 'nav-cta': 'Write to me',
    'not-titulo': 'Notes.', 'not-intro': 'What I measure and learn while building and sharing my tools. Real numbers, even when they’re small.',
    'n1-f': '6 Nov 2026 · GitHub and X',
    'n1-t': '61 clones and 2 visitors: why I don’t believe my own number.',
    'n1-d1': 'Launch post views', 'n1-d2': 'Clicks on the GitHub link', 'n1-d3': 'Unique repository visitors',
    'n1-d4': 'Unique clones', 'n1-d5': 'Stars',
    'n1-p1': '61 clones look like 61 interested people, but only 2 opened the page. 104 of the 126 clones came in three straight days after launch.',
    'n1-p2': '<strong>My theory:</strong> the ones cloning are agents, not people. An agent doesn’t open the page.',
    'n2-f': '3 Nov 2026 · X analytics',
    'n2-t': 'I posted less and each post did twice as well.',
    'n2-d1': '1 Nov · 12 posts', 'n2-v1': '25 views/post',
    'n2-d2': '2 Nov · 9 posts', 'n2-v2': '38 views/post',
    'n2-d3': '3 Nov · 7 posts (day not over)', 'n2-v3': '56 views/post',
    'n2-d4': 'Best post, a question', 'n2-v4': '133 views',
    'n2-d5': 'Standalone statements', 'n2-v5': '18–28 views',
    'n2-p1': 'I had an agent pull the data from my profile and compare it by day. The posts that opened a conversation did best.',
    'n2-p2': '<strong>What I learned:</strong> three days prove nothing, but they give me something to test: fewer statements and more real questions.',
  };
  const nodos = [...document.querySelectorAll('[data-t]')].map((n) => ({ n, es: n.innerHTML, clave: n.dataset.t }));
  const titulo = { es: document.title, en: 'Notes · Álvaro Pastor' };
  const boton = document.querySelector('#idioma');
  let idioma = 'es';

  const aplicar = (siguiente) => {
    idioma = siguiente === 'en' ? 'en' : 'es';
    document.documentElement.lang = idioma;
    document.title = titulo[idioma];
    nodos.forEach(({ n, es, clave }) => { n.innerHTML = idioma === 'en' && EN[clave] ? EN[clave] : es; });
    boton.textContent = idioma === 'es' ? 'EN' : 'ES';
    boton.lang = idioma === 'es' ? 'en' : 'es';
    boton.setAttribute('aria-label', idioma === 'es' ? 'Switch to English' : 'Cambiar a español');
    document.querySelectorAll('[data-lang-link]').forEach((a) => {
      const url = new URL(a.href);
      url.searchParams.set('lang', idioma);
      a.href = url.href;
    });
  };
  boton.addEventListener('click', () => {
    aplicar(idioma === 'es' ? 'en' : 'es');
    try { localStorage.setItem('portfolio-language', idioma); } catch { /* Sin almacenamiento dura hasta recargar. */ }
    const url = new URL(location.href);
    url.searchParams.set('lang', idioma);
    history.replaceState(null, '', url);
  });

  const pedido = new URL(location.href).searchParams.get('lang');
  let guardado = null;
  try { guardado = localStorage.getItem('portfolio-language'); } catch { /* Sin almacenamiento. */ }
  const delNavegador = (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
  aplicar(pedido === 'es' || pedido === 'en' ? pedido : guardado === 'es' || guardado === 'en' ? guardado : delNavegador);
})();
