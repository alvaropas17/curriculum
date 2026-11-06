(() => {
  const EN = {
    'nav-demo': 'demo', 'nav-caja': 'mcp & helpers', 'nav-notas': 'notes', 'nav-cta': 'Write to me',
    'contacto-x': 'Message me on X',
    'hero-1': 'Your agent is smart.', 'hero-2': 'But it’s working blind.',
    'hero-sub': 'It can’t remember what you did, can’t find your files and doesn’t know what you’re pointing at. I’m Álvaro Pastor, a developer, and I build the MCP servers and helpers that fix that.',
    'hero-cta': 'See the difference', 'hero-cta2': 'See the MCP servers and helpers',
    'cif-1': 'MCP servers of my own', 'cif-2': 'custom skills for agents',
    'cif-3': 'agents my public tool can search', 'cif-4': 'to count 2,339 files across a user profile',
    'dem-titulo': 'Ask your agent this.',
    'dem-nota': 'Illustrative conversations. The commands and capabilities are real.',
    'caj-titulo': 'What it’s missing. What I gave it.',
    'caj-mcp': 'MCP servers', 'caj-helpers': 'Helpers and skills',
    'c-publico': 'Public · see it', 'c-privado': 'In development · not published', 'c-word': 'Early development · not published', 'c-pedir': 'Ask me on X', 'c-piloto': 'Unpublished pilot',
    'c1-t': 'It can’t remember what you did.',
    'c1-p': 'Tell it what was in that answer and it recovers it from your chats with six agents, with the exact source.',
    'c2-t': 'It doesn’t know what you’re pointing at.',
    'c2-p': 'Mark an element on a page and it gets the selector, HTML, styles and a crop. In React, Next and Svelte, also the file and line.',
    'c3-t': 'It can’t find your files.',
    'c3-p': 'Answers where something is across the whole PC using the Everything index. It counted 2,339 files in 0.1 s; <code>find</code> still hadn’t finished after 150 s.',
    'c4-t': 'It can’t make you a real Word document.',
    'c4-p': 'Controls Microsoft Word through its own interface, with no clicks or clipboard. It only touches documents it created.',
    'c5-t': 'It loads skills it won’t use.',
    'c5-p': 'Sees compact descriptions of Matt Pocock’s skills and loads only the one it needs.',
    'h1-t': 'You configure the same thing in every agent.',
    'h1-p': 'One MCP source, synced with Claude Code, Codex, Pi, Pi Pocket and OpenCode.',
    'h2-t': 'It swallows a whole page for one fact.',
    'h2-p': 'Reads the page once, stores clean text and answers without dumping it into context.',
    'h3-t': 'It stops at any window.',
    'h3-p': 'Controls Windows apps and windows. With <code>win-dialog</code>, it inspects and clicks native dialogs from Rust.',
    'h4-t': 'An app closes and nobody knows why.',
    'h4-p': 'Gets to the crash signature, module and stack without opening a debugger.',
    'h5-t': 'It touches your config and there’s no way back.',
    'h5-p': 'Saves and restores your agents’ configuration states with git.',
    'lan-etiqueta': 'Install it today · free and open source',
    'lan-gancho': 'That answer is still in another chat. Your agent can bring it back.',
    'lan-p': 'Tell it what the answer said and it searches your past conversations. It brings it back with the exact source so you can check it. Local and read-only.',
    'lan-cta': 'See how it works',
    'cri-titulo': 'Give it access without losing control.',
    'reg-1': 'They don’t fail silently.',
    'reg-1p': 'If the index goes down, <code>find-everything</code> warns with <code>INDEX_DOWN=1</code>. If a read is incomplete, History Search says so too.',
    'reg-2': 'They touch as little as possible.',
    'reg-2p': 'History Search is read-only. <code>word-mcp</code> doesn’t open your documents, and deleting needs you to accept a dialog.',
    'reg-3': 'I publish what barely improves too.',
    'reg-3p': 'Moving my history reader to Rust gained ×5.55 dumping sessions and only ×1.27 searching. Both numbers go in the report.',
    'cri-nota': 'Everything is tested on Windows. Measurements come from a single machine: specific, not universal.',
    'vot-titulo': 'Which one should I publish first?',
    'vot-p': 'So far only Agent History Search is public. The rest is still in development. Tell me which one would help you.',
    'vot-cta': 'Tell me on X',
    'not-titulo': 'What I’m measuring.',
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
    'cie-titulo': 'What can’t your agent do?',
    'cie-p': 'Tell me about it and I’ll tell you how I’d tackle it.',
  };

  const PETICIONES = [
    {
      tool: 'history_search · search',
      es: { tab: 'Recordar', pide: '¿Qué decidimos sobre el rediseño?', sin: 'No tengo acceso a conversaciones anteriores. ¿Me lo recuerdas?', con: 'Elegiste la portada A porque la B escondía la demo. Fuente: Claude Code, 12 oct, entrada a1.' },
      en: { tab: 'Remember', pide: 'What did we decide about the redesign?', sin: 'I don’t have access to previous conversations. Can you remind me?', con: 'You chose homepage A because B hid the demo. Source: Claude Code, 12 Oct, entry a1.' },
    },
    {
      tool: 'dompick_pending',
      es: { tab: 'Señalar', pide: 'Cambia este botón.', sin: '¿Qué botón? Descríbeme dónde está.', con: 'Recibido: selector, HTML, estilos y recorte. Está en Hero.tsx, línea 42.' },
      en: { tab: 'Point', pide: 'Change this button.', sin: 'Which button? Describe where it is.', con: 'Received: selector, HTML, styles and a crop. It’s in Hero.tsx, line 42.' },
    },
    {
      tool: 'find_everything · where',
      es: { tab: 'Encontrar', pide: '¿Dónde dejé el informe final?', sin: 'Dime en qué carpeta lo busco.', con: 'Está en D:\\Informes\\final-v3.pdf. Lo he sacado del índice de todo el PC.' },
      en: { tab: 'Find', pide: 'Where did I leave the final report?', sin: 'Tell me which folder to search.', con: 'It’s at D:\\Reports\\final-v3.pdf. I got it from the index of the whole PC.' },
    },
    {
      tool: 'word_create_document · word_insert_image',
      es: { tab: 'Crear', pide: 'Pásalo a un Word con esta imagen.', sin: 'Te dejo el texto para que lo pegues tú.', con: 'Documento creado en Word con el texto y la imagen. No he tocado ningún otro archivo.' },
      en: { tab: 'Create', pide: 'Put this in a Word document with this image.', sin: 'Here’s the text for you to paste yourself.', con: 'Document created in Word with the text and the image. I didn’t touch any other file.' },
    },
    {
      tool: 'win-dialog',
      es: { tab: 'Actuar', pide: 'Pulsa Aceptar en ese diálogo.', sin: 'No puedo interactuar con las ventanas de tu escritorio.', con: 'He inspeccionado el diálogo, he encontrado Aceptar y lo he pulsado.' },
      en: { tab: 'Act', pide: 'Click OK in that dialog.', sin: 'I can’t interact with your desktop windows.', con: 'I inspected the dialog, found OK and clicked it.' },
    },
  ];

  const ROTULOS = {
    es: { sin: 'sin esto', con: 'con esto' },
    en: { sin: 'without it', con: 'with it' },
  };

  const $ = (s) => document.querySelector(s);
  const nodos = [...document.querySelectorAll('[data-t]')].map((n) => ({ n, es: n.innerHTML, clave: n.dataset.t }));
  const titulo = { es: document.title, en: 'Álvaro Pastor · Your agent is smart. But it’s working blind' };
  const velocidad = { es: '0,1 s', en: '0.1 s' };
  const pestanas = $('#pestanas');
  const duelo = $('#duelo');
  const boton = $('#idioma');
  let idioma = 'es';
  let activo = 0;

  const seguro = (t) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  const pintarPeticion = () => {
    const p = PETICIONES[activo];
    const t = p[idioma];
    const r = ROTULOS[idioma];
    duelo.innerHTML = `<p class="pide">«${seguro(t.pide)}»</p>`
      + '<div class="duelo">'
      + `<div class="duelo-sin"><p class="etiqueta">${r.sin}</p><p>${seguro(t.sin)}</p></div>`
      + `<div class="duelo-con"><p class="etiqueta">${r.con}</p><p class="duelo-tool">${seguro(p.tool)}</p><p>${seguro(t.con)}</p></div>`
      + '</div>';
  };
  const pintarPestanas = () => {
    pestanas.innerHTML = '';
    PETICIONES.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = p[idioma].tab;
      b.setAttribute('aria-pressed', String(i === activo));
      b.addEventListener('click', () => {
        activo = i;
        pestanas.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', String(j === i)));
        pintarPeticion();
        if (window.umami) window.umami.track('ver-demo-peticion', { peticion: PETICIONES[i].en.tab });
      });
      pestanas.append(b);
    });
  };

  const aplicar = (siguiente) => {
    idioma = siguiente === 'en' ? 'en' : 'es';
    document.documentElement.lang = idioma;
    document.title = titulo[idioma];
    nodos.forEach(({ n, es, clave }) => { n.innerHTML = idioma === 'en' && EN[clave] ? EN[clave] : es; });
    document.querySelectorAll('.cifras dt')[3].textContent = velocidad[idioma];
    boton.textContent = idioma === 'es' ? 'EN' : 'ES';
    boton.lang = idioma === 'es' ? 'en' : 'es';
    boton.setAttribute('aria-label', idioma === 'es' ? 'Switch to English' : 'Cambiar a español');
    document.querySelectorAll('[data-lang-link]').forEach((a) => {
      const url = new URL(a.href);
      url.searchParams.set('lang', idioma);
      a.href = url.href;
    });
    pintarPestanas();
    pintarPeticion();
  };
  boton.addEventListener('click', () => {
    aplicar(idioma === 'es' ? 'en' : 'es');
    try { localStorage.setItem('portfolio-language', idioma); } catch { /* Sin almacenamiento dura hasta recargar. */ }
    const url = new URL(location.href);
    url.searchParams.set('lang', idioma);
    history.replaceState(null, '', url);
  });

  $('#video').addEventListener('play', () => {
    if (window.umami) window.umami.track('reproducir-video');
  }, { once: true });

  // Sin elección previa manda el idioma del navegador: español si lo usa, inglés en el resto.
  const pedido = new URL(location.href).searchParams.get('lang');
  let guardado = null;
  try { guardado = localStorage.getItem('portfolio-language'); } catch { /* Sin almacenamiento. */ }
  const delNavegador = (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
  aplicar(pedido === 'es' || pedido === 'en' ? pedido : guardado === 'es' || guardado === 'en' ? guardado : delNavegador);
})();
