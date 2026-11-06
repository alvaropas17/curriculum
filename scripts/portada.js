(() => {
  const EN = {
    'nav-problemas': 'problems', 'nav-herramientas': 'tools', 'nav-notas': 'notes', 'nav-cta': 'Write to me',
    seguir: 'Follow on X', 'contacto-x': 'Message me on X',
    'hero-1': 'Doing the same thing again?', 'hero-2': 'I turn it into a tool.',
    'hero-sub': 'I’m Álvaro Pastor, a developer. I work with AI and build tools that take repetitive work off my plate. These are the ones that already work.',
    'hero-cta': 'See what already works',
    'cif-1': 'wait after each change in a dev environment', 'cif-2': 'coding agents my tool can search',
    'cif-3': 'custom skills for agents', 'cif-4': 'faster after rewriting a reader in Rust',
    'lan-titulo': 'I know I solved this with AI, but I can’t find the conversation.',
    'lan-p': 'Ask your agent and it searches your past conversations. It answers with the exact source so you can check it. Free, local and read-only.',
    'lan-cta': 'See how it works',
    'car-titulo': 'A one-minute wait. On every change.',
    'car-p': 'Every change meant running <code>docker compose down</code> and bringing everything back up. I saw where the time was going and decided to restart only what changed. I built the script with AI’s help and the wait dropped to 4 seconds. These bars run in real time.',
    'car-antes': 'Before', 'car-despues': 'After',
    'car-fuente': 'Work at a company, no public link. “Before” is approximate.',
    'tra-titulo': 'Do any of these sound familiar?',
    'tra-aviso': 'Case studies are in Spanish.',
    'p1-e': 'LudoScript · AI education platform · beta',
    'p1-t': 'You study without knowing what you’re getting wrong.',
    'p1-p': 'Upload your notes and AI generates the practice. Every mistake guides the next review.',
    'p1-d': 'I built the backend: API, data, AI and real-time multiplayer, with fallback between models so one failure doesn’t take the service down.',
    'p2-e': 'Gala Imparables · live website',
    'p2-t': 'Every sponsor competes for the same attention.',
    'p2-p': 'A carousel that gives each one the weight it deserves.',
    'p3-e': 'Ticket panel · prototype',
    'p3-t': 'Incidents you can’t read at a glance.',
    'p3-p': 'Priority before detail. The transcript only opens when it’s needed.',
    'p4-e': 'iTop templates',
    'p4-t': 'Your emails break in Outlook.',
    'p4-p': 'Seven templates adapted so the brand arrives intact.',
    'p5-e': 'Processes with AI',
    'p5-t': 'You repeat the same instructions in every project.',
    'p5-p': 'One file that goes with the agent into all of them.',
    'rea-1': '“Wow, who made this?”',
    'rea-2': 'Even the admin team knew who had made those designs.',
    'her-titulo': 'If you work with agents, this happens to you.',
    'her-p': 'It happens to me too. Whenever something cost me time twice, I built the fix. That’s 20 skills so far, plus utilities in Rust, Python and PowerShell.',
    'u-1': 'Explaining to your agent which button you want to change.',
    'u-1p': 'point at it and the agent gets its selector, HTML, styles and a crop.',
    'u-2': 'Configuring the same thing in five agents.',
    'u-2p': 'one MCP configuration, synced with all of them.',
    'u-3': 'A window closes and you don’t know why.',
    'u-3p': 'gets to the signature, module and stack without opening a debugger.',
    'u-4': 'A Windows dialog blocks your agent.',
    'u-4p': 'inspects and clicks it from Rust.',
    'u-5': 'You change the config and can’t go back.',
    'u-5p': 'saves and restores states with git.',
    'u-nota': 'Personal use. Code not published yet.',
    'cri-titulo': 'If something barely improves, I’ll tell you.',
    'cri-1': 'dumping a full session, after rewriting my history reader in Rust.',
    'cri-2': 'on text search, because SQLite sets the pace there. That number goes in the report too.',
    'reg-1': 'I check before retiring.', 'reg-1p': 'Before dropping the Python version, 12 out of 12 exit codes matched Rust.',
    'reg-2': 'I test what I publish.', 'reg-2p': 'Agent History Search passes 97 offline tests on a clean clone.',
    'reg-3': 'I say where it ends.', 'reg-3p': 'I’ve only tested it on Windows, and its page says so before you install it.',
    'cri-nota': 'Benchmark: 7 runs per case on a single machine. A specific measurement, not a universal truth.',
    'not-titulo': 'What I’m measuring.',
    'n1-f': '6 Nov 2026 · GitHub and X',
    'n1-t': '61 clones and 2 visitors: why I don’t believe my own number.',
    'n1-d1': 'Launch post views', 'n1-d2': 'Clicks on the GitHub link', 'n1-d3': 'Unique repository visitors',
    'n1-d4': 'Unique clones', 'n1-d5': 'Stars',
    'n1-p1': '61 clones look like 61 interested people, but only 2 opened the page. 104 of the 126 clones came in three straight days after launch. Some are mine, and I suspect many are automated.',
    'n1-p2': '<strong>What I learned:</strong> I can’t say the tool doesn’t convince people, because almost nobody has reached it. What I need to measure now is the gap between the post and the link.',
    'n2-f': '3 Nov 2026 · X analytics',
    'n2-t': 'I posted less and each post did twice as well.',
    'n2-d1': '1 Nov · 12 posts', 'n2-v1': '25 views/post',
    'n2-d2': '2 Nov · 9 posts', 'n2-v2': '38 views/post',
    'n2-d3': '3 Nov · 7 posts (day not over)', 'n2-v3': '56 views/post',
    'n2-d4': 'Best post, a question', 'n2-v4': '133 views',
    'n2-d5': 'Standalone statements', 'n2-v5': '18–28 views',
    'n2-p1': 'I had an agent pull the data from my profile and compare it by day. The posts that opened a conversation did best.',
    'n2-p2': '<strong>What I learned:</strong> three days prove nothing, but they give me something to test: fewer statements and more real questions.',
    'cie-titulo': 'What are you doing again?',
    'cie-p': 'Tell me about it and I’ll tell you how I’d tackle it.',
  };

  const $ = (s) => document.querySelector(s);
  const nodos = [...document.querySelectorAll('[data-t]')].map((n) => ({ n, es: n.innerHTML, clave: n.dataset.t }));
  const titulo = { es: document.title, en: 'Álvaro Pastor · Doing the same thing again? I turn it into a tool' };
  const cifra = { es: '×5,55', en: '×5.55' };
  const cifraBaja = { es: '×1,27', en: '×1.27' };
  const boton = $('#idioma');
  let idioma = 'es';

  const aplicar = (siguiente) => {
    idioma = siguiente === 'en' ? 'en' : 'es';
    document.documentElement.lang = idioma;
    document.title = titulo[idioma];
    nodos.forEach(({ n, es, clave }) => { n.innerHTML = idioma === 'en' && EN[clave] ? EN[clave] : es; });
    document.querySelectorAll('.cifras dt')[3].textContent = cifra[idioma];
    $('.comparativa-cifra').textContent = cifra[idioma];
    $('.comparativa-baja').textContent = cifraBaja[idioma];
    boton.textContent = idioma === 'es' ? 'EN' : 'ES';
    boton.lang = idioma === 'es' ? 'en' : 'es';
    boton.setAttribute('aria-label', idioma === 'es' ? 'Switch to English' : 'Cambiar a español');
    document.querySelectorAll('[data-lang-link]').forEach((a) => {
      const url = new URL(a.href);
      url.searchParams.set('lang', idioma);
      a.href = url.href;
    });
    try { localStorage.setItem('portfolio-language', idioma); } catch { /* Sin almacenamiento se usa el idioma del navegador. */ }
  };
  boton.addEventListener('click', () => {
    aplicar(idioma === 'es' ? 'en' : 'es');
    const url = new URL(location.href);
    url.searchParams.set('lang', idioma);
    history.replaceState(null, '', url);
  });

  $('#video').addEventListener('play', () => {
    if (window.umami) window.umami.track('reproducir-video');
  }, { once: true });

  // La carrera solo arranca al verla. Sin JS, o con movimiento reducido, se queda en su estado final.
  const ANTES = 60;
  const DESPUES = 4;
  const pintar = (t) => {
    const formato = (s) => s.toFixed(1).replace('.', idioma === 'es' ? ',' : '.');
    $('#barra-antes').style.width = `${(Math.min(t, ANTES) / ANTES) * 100}%`;
    $('#barra-despues').style.width = `${(Math.min(t, DESPUES) / ANTES) * 100}%`;
    $('#tiempo-antes').textContent = t >= ANTES ? '≈ 60 s' : `${formato(t)} s`;
    $('#tiempo-despues').textContent = t >= DESPUES ? '4 s ✓' : `${formato(t)} s`;
  };
  const correr = () => {
    const inicio = performance.now();
    const paso = (ahora) => {
      const t = (ahora - inicio) / 1000;
      pintar(t);
      if (t < ANTES) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const vigia = new IntersectionObserver((vistas) => {
      if (vistas.some((v) => v.isIntersecting)) {
        vigia.disconnect();
        correr();
      }
    }, { threshold: 0.4 });
    vigia.observe($('#carrera'));
  }

  // Quien llega desde X puede no hablar español: sin elección previa, manda el navegador.
  const pedido = new URL(location.href).searchParams.get('lang');
  let guardado = null;
  try { guardado = localStorage.getItem('portfolio-language'); } catch { /* Sin almacenamiento. */ }
  const delNavegador = (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
  aplicar(pedido === 'es' || pedido === 'en' ? pedido : guardado === 'es' || guardado === 'en' ? guardado : delNavegador);
})();
