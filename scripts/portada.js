(() => {
  const EN = {
    'nav-ejemplos': 'examples', 'nav-instalar': 'install', 'nav-preguntas': 'questions',
    'hero-1': 'You remember.', 'hero-2': 'Your agent doesn’t.',
    'hero-sub': 'Agent History Search lets it search your past conversations and answer with a source you can check.',
    'hero-cta': 'Install for free', 'hero-gh': 'See the code',
    'sello-1': 'Open source', 'sello-2': 'Local', 'sello-3': 'Read-only', 'sello-4': 'No accounts',
    agentes: 'Works with',
    'eje-titulo': 'Ask it what you already talked about.',
    'eje-nota': 'Illustrative examples. Real answers come from your own history.',
    'con-titulo': 'Stop explaining everything all over again.',
    sin: 'Without it', con: 'With it',
    'sin-1': 'You repeat the context every session.',
    'sin-2': 'You open huge files to find one sentence.',
    'sin-3': 'You redo a fix that already worked.',
    'con-1': 'You ask the agent you already use.',
    'con-2': 'You get the exact message, with session and date.',
    'con-3': 'You check the source before trusting it.',
    'tru-titulo': 'Exact references, not guesses.',
    'tru-cap': 'Real CLI output, trimmed, from a test conversation.',
    'reg-1': 'Read-only.', 'reg-1p': 'It never writes to, indexes or migrates your histories.',
    'reg-2': 'You choose what it reads.', 'reg-2p': 'It never switches source silently. Reading another agent takes your request.',
    'reg-3': 'Empty is not proof.', 'reg-3p': 'It reports its gaps. Not finding something doesn’t mean it never happened.',
    'fic-1': 'supported agents', 'fic-2': 'pip packages, accounts or API keys',
    'fic-3': 'offline tests passing', 'fic-4': 'free and open source',
    'ins-titulo': 'Your agent installs it for you.',
    'ins-1': 'Download the repository.', 'ins-1a': 'Open GitHub',
    'ins-2': 'Open your agent with access to that folder and paste this prompt.',
    'ins-3': 'Start a new session and ask about something you already did.',
    'ins-req': 'Requirements: Windows 10/11 and Python 3.10 or newer.',
    'ins-guia': 'I prefer the step-by-step guide',
    'ins-prompt': 'setup prompt', 'ins-copiar': 'Copy',
    prompt: `Set up Agent History Search on this computer.
Repository: https://github.com/alvaropas17/agent-history-search
Package folder: [ABSOLUTE PATH]
Agent I will use: [codex / claude / opencode / pi / omp / pocket]
Histories I authorize you to read: [SOURCES AND PATHS]

Read the README and setup documentation in the downloaded version.
Check Python 3.10+, sqlite3, CLI help and the offline tests.
For Codex or Claude Code, configure the included history_mcp.py MCP server
with a fixed host and only authorized stores. For other agents, configure
the history_search.py helper and its skill or local instructions.
Before editing config, show the proposed changes and create a backup.
Do not replace entire config files or change unrelated MCP servers.
Ask me for missing paths or permissions. Do not switch sources after
errors or empty results. Do not modify histories or delete WAL files.
Verify the actual connection with a minimal authorized read, and explain
how to check it in a new session. Report any checks still pending.`,
    'faq-titulo': 'Before you install it.',
    'faq-1': 'Do my conversations leave my computer?',
    'faq-1r': 'The tool doesn’t use the network. What it finds goes to your agent, so it reaches that agent’s model like any other text you show it.',
    'faq-2': 'How much does it cost?',
    'faq-2r': 'Nothing. It’s open source under the MIT license, with no accounts or API keys.',
    'faq-3': 'Does it work on Mac or Linux?',
    'faq-3r': 'I don’t know yet. It’s tested on Windows and has no external packages, but I haven’t validated it on other systems.',
    'faq-4': 'How does it connect to my agent?',
    'faq-4r': 'Codex and Claude Code can use the included MCP server. OpenCode, Pi, omp and Pi Pocket use a Python script with its skill.',
    'faq-5': 'Can one agent read another agent’s history?',
    'faq-5r': 'Only if you authorize it and ask. It never switches source on its own, not even after an error or an empty result.',
    'cie-titulo': 'You already did the work. Ask your agent to find it.',
    'cie-x': 'Follow on X',
    'pie-autor': 'Made by Álvaro Pastor.',
    'pie-bio': 'Web developer in Murcia, Spain. I work with coding agents every day and post what I build on X.',
    'pie-otros': 'Other work (in Spanish)', 'pie-procesos': 'Processes with AI', 'pie-tickets': 'Ticket panel',
    'pie-sigue': 'Follow me',
  };

  const EJEMPLOS = [
    {
      es: { tab: 'Una decisión', q: '¿Qué decidimos sobre el rediseño y por qué?', a: 'Elegiste la portada A. Descartaste la B porque escondía la demo y la C porque pesaba demasiado en móvil.', f: 'Claude Code · 12 oct · entrada a1' },
      en: { tab: 'A decision', q: 'What did we decide about the redesign, and why?', a: 'You chose homepage A. You ruled out B because it hid the demo, and C because it was too heavy on mobile.', f: 'Claude Code · 12 Oct · entry a1' },
      busca: 'search "rediseño"',
    },
    {
      es: { tab: 'Un arreglo', q: 'Este error de CORS ya lo arreglamos. ¿Qué funcionó?', a: 'El primer intento falló. Lo que resolvió el error fue añadir el origen de producción a la lista del servidor, según el resultado registrado.', f: 'Codex · 3 oct · entrada 41' },
      en: { tab: 'A fix', q: 'We already fixed this CORS error. What worked?', a: 'The first attempt failed. What solved it was adding the production origin to the server’s list, according to the recorded result.', f: 'Codex · 3 Oct · entry 41' },
      busca: 'search "CORS" --tool-calls',
    },
    {
      es: { tab: 'Una herramienta', q: '¿Qué herramienta usamos para revisar la seguridad de las skills?', a: 'SkillSpector. La instalaste para analizar una carpeta de skills e informar de patrones de riesgo sin ejecutar nada.', f: 'Pi Pocket · 15 oct · entrada 7' },
      en: { tab: 'A tool', q: 'Which tool did we use to scan skills for security?', a: 'SkillSpector. You installed it to analyse a skills folder and report risky patterns without running anything.', f: 'Pi Pocket · 15 Oct · entry 7' },
      busca: 'search "security skills"',
    },
    {
      es: { tab: 'Un archivo', q: '¿Dónde guardamos la versión final del informe?', a: 'Se entregó en informes/final-v3.pdf. Esa ruta consta en el historial, pero no comprueba que el archivo siga ahí.', f: 'OpenCode · 28 sep · entrada 112' },
      en: { tab: 'A file', q: 'Where did we save the final version of the report?', a: 'It was delivered at reports/final-v3.pdf. That path is in the history, but that doesn’t prove the file is still there.', f: 'OpenCode · 28 Sep · entry 112' },
      busca: 'search "informe final"',
    },
    {
      es: { tab: 'Nada', q: '¿Hablamos alguna vez de Kubernetes?', a: 'No he encontrado nada en este historial. La lectura quedó incompleta, así que no puedo asegurar que no pasara.', f: 'Claude Code · incomplete: true' },
      en: { tab: 'Nothing', q: 'Did we ever talk about Kubernetes?', a: 'I found nothing in this history. The read was incomplete, so I can’t say it never happened.', f: 'Claude Code · incomplete: true' },
      busca: 'search "Kubernetes"',
    },
  ];

  const ROTULOS = {
    es: { tu: 'tú', agente: 'agente', fuente: 'fuente', copiado: 'Copiado', fallo: 'Selecciona y copia', aria: 'Cambiar a español' },
    en: { tu: 'you', agente: 'agent', fuente: 'source', copiado: 'Copied', fallo: 'Select and copy', aria: 'Cambiar a español' },
  };

  const $ = (s) => document.querySelector(s);
  const nodos = [...document.querySelectorAll('[data-t]')].map((n) => ({ n, es: n.innerHTML, clave: n.dataset.t }));
  const titulo = { es: document.title, en: 'Agent History Search · You remember. Your agent doesn’t.' };
  const pestanas = $('#pestanas');
  const chat = $('#chat');
  const boton = $('#idioma');
  const copiar = $('#copiar');
  let idioma = 'es';
  let activo = 0;

  const seguro = (t) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  const pintarEjemplo = () => {
    const e = EJEMPLOS[activo];
    const t = e[idioma];
    const r = ROTULOS[idioma];
    chat.innerHTML = `<p class="chat-q"><span>${r.tu}</span>${seguro(t.q)}</p>`
      + `<p class="chat-tool">history_search ${seguro(e.busca)}</p>`
      + `<p class="chat-a"><span>${r.agente}</span>${seguro(t.a)}</p>`
      + `<p class="chat-f">${r.fuente}: ${seguro(t.f)}</p>`;
  };
  const pintarPestanas = () => {
    pestanas.innerHTML = '';
    EJEMPLOS.forEach((e, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = e[idioma].tab;
      b.setAttribute('aria-pressed', String(i === activo));
      b.addEventListener('click', () => {
        activo = i;
        pestanas.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', String(j === i)));
        pintarEjemplo();
        if (window.umami) window.umami.track('ver-ejemplo', { ejemplo: EJEMPLOS[i].en.tab });
      });
      pestanas.append(b);
    });
  };

  const aplicar = (siguiente) => {
    idioma = siguiente === 'en' ? 'en' : 'es';
    document.documentElement.lang = idioma;
    document.title = titulo[idioma];
    nodos.forEach(({ n, es, clave }) => { n.innerHTML = idioma === 'en' && EN[clave] ? EN[clave] : es; });
    boton.textContent = idioma === 'es' ? 'EN' : 'ES';
    boton.lang = idioma === 'es' ? 'en' : 'es';
    boton.setAttribute('aria-label', idioma === 'es' ? 'Switch to English' : ROTULOS.es.aria);
    document.querySelectorAll('[data-lang-link]').forEach((a) => {
      const url = new URL(a.href);
      url.searchParams.set('lang', idioma);
      a.href = url.href;
    });
    pintarPestanas();
    pintarEjemplo();
    try { localStorage.setItem('portfolio-language', idioma); } catch { /* Sin almacenamiento se usa el idioma del navegador. */ }
  };
  boton.addEventListener('click', () => {
    aplicar(idioma === 'es' ? 'en' : 'es');
    const url = new URL(location.href);
    url.searchParams.set('lang', idioma);
    history.replaceState(null, '', url);
  });

  copiar.addEventListener('click', async () => {
    const texto = $('#prompt').textContent;
    let hecho = false;
    try {
      await navigator.clipboard.writeText(texto);
      hecho = true;
    } catch {
      const rango = document.createRange();
      rango.selectNodeContents($('#prompt'));
      const seleccion = getSelection();
      seleccion.removeAllRanges();
      seleccion.addRange(rango);
      // El navegador integrado de X y otras apps puede negar la API del portapapeles.
      hecho = document.execCommand('copy');
    }
    const original = copiar.textContent;
    copiar.textContent = hecho ? ROTULOS[idioma].copiado : ROTULOS[idioma].fallo;
    setTimeout(() => { copiar.textContent = original; }, 1800);
    if (hecho && window.umami) window.umami.track('copiar-prompt');
  });

  $('#video').addEventListener('play', () => {
    if (window.umami) window.umami.track('reproducir-video');
  }, { once: true });

  // Quien llega desde X puede no hablar español: sin elección previa, manda el navegador.
  const pedido = new URL(location.href).searchParams.get('lang');
  let guardado = null;
  try { guardado = localStorage.getItem('portfolio-language'); } catch { /* Sin almacenamiento. */ }
  const delNavegador = (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
  aplicar(pedido === 'es' || pedido === 'en' ? pedido : guardado === 'es' || guardado === 'en' ? guardado : delNavegador);
})();
