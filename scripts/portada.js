(() => {
  const EN = {
    'nav-lanzamiento': 'launch', 'nav-trabajo': 'work', 'nav-herramientas': 'tools', 'nav-hablemos': 'contact',
    seguir: 'Follow on X',
    'hero-1': 'If it annoys me twice,', 'hero-2': 'I turn it into a tool.',
    'hero-sub': 'I’m Álvaro Pastor, a web and AI developer. I build web products and tools for coding agents, and I share how they come together on X.',
    'hero-cta': 'See what I’ve built', 'hero-cta2': 'Work with me',
    'cif-1': 'dev environment startup', 'cif-2': 'coding agents supported by my search tool',
    'cif-3': 'custom skills for agents', 'cif-4': 'faster after rewriting a reader in Rust',
    'lan-etiqueta': 'Latest launch · free and open source',
    'lan-1': 'You remember.', 'lan-2': 'Your agent doesn’t.',
    'lan-p': 'Your agent searches your past conversations and answers with a source you can check. Local and read-only.',
    'lan-cta': 'Learn more and install',
    'car-titulo': 'One minute. Four seconds.',
    'car-p': 'I reorganised Docker to make use of its cache, and AGE2’s dev environment stopped taking a minute to start. These bars run in real time.',
    'car-antes': 'Before', 'car-despues': 'After',
    'car-fuente': 'Internship at AGE2, 2026. “Before” is approximate. Company work, no public link.',
    'tra-titulo': 'I build products too.',
    'tra-aviso': 'Case studies are in Spanish.',
    'p1-e': 'AI education platform · beta',
    'p1-p': 'Upload your notes and AI generates the practice. Every mistake guides the next review.',
    'p1-d': 'I built the backend: API, data, AI and real-time multiplayer, with fallback between models so one failure doesn’t take the service down.',
    'p2-e': 'First real client · live',
    'p2-p': 'The website for an awards gala, with a carousel that gives each sponsor the weight it deserves.',
    'p3-e': 'Clickable prototype', 'p3-t': 'Ticket panel',
    'p3-p': 'Decide on an incident at a glance: priority before detail.',
    'p4-e': 'Professional work', 'p4-t': 'iTop templates',
    'p4-p': 'Seven email templates so the brand survives Outlook.',
    'p5-e': 'How I work', 'p5-t': 'Processes with AI',
    'p5-p': 'One file that goes with the agent into every project.',
    'her-titulo': 'Nobody asked me for any of this.',
    'her-p': 'I have 20 custom skills for agents and utilities in Rust, Python and PowerShell. Agent History Search came from here. I’ll share the next one on X.',
    'u-1': 'Point at an element on a page and the agent gets its selector, HTML, styles and a crop.',
    'u-2': 'One MCP configuration, synced across five different agents.',
    'u-3': 'From a closed window to signature, module and stack, without opening a debugger.',
    'u-4': 'Inspects and clicks native Windows dialogs from Rust.',
    'u-5': 'Saves and restores agent configuration states with git.',
    'u-nota': 'Personal use. Code not published yet.',
    'cri-titulo': 'I also show you where I barely win.',
    'cri-1': 'dumping a full session, after rewriting my history reader in Rust.',
    'cri-2': 'on text search, because SQLite sets the pace there. That number goes in the report too.',
    'reg-1': 'I check before retiring.', 'reg-1p': 'Before dropping the Python version, 12 out of 12 exit codes matched Rust.',
    'reg-2': 'I test what I publish.', 'reg-2p': 'Agent History Search passes 97 offline tests on a clean clone.',
    'reg-3': 'I say where it ends.', 'reg-3p': 'I’ve only tested it on Windows, and its page says so before you install it.',
    'cri-nota': 'Benchmark: 7 runs per case on a single machine. A specific measurement, not a universal truth.',
    'qui-titulo': 'First I studied why people choose things. Then I learned to build them.',
    'qui-p': 'I have a degree in Marketing and a higher diploma in Web Application Development. I have a little over a year of professional experience, internships included, and I work with coding agents every day.',
    'ofr-titulo': 'What you can call me for',
    'ofr-1': 'Building your website or product, from design to deployment.',
    'ofr-2': 'Adding AI to your product, with failures and cost under control.',
    'ofr-3': 'Getting coding agents working in your team.',
    'cie-titulo': 'What annoys you twice?',
    'cie-p': 'Tell me about it. I’m based in Murcia, Spain, and open to on-site, remote or hybrid work.',
    'cie-cta': 'Write to me',
  };

  const $ = (s) => document.querySelector(s);
  const nodos = [...document.querySelectorAll('[data-t]')].map((n) => ({ n, es: n.innerHTML, clave: n.dataset.t }));
  const titulo = { es: document.title, en: 'Álvaro Pastor · If it annoys me twice, I turn it into a tool' };
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
