(() => {
  const EN = {
    saltar: 'Skip to the search',
    'nav-trabajo': 'work', 'nav-limites': 'limits', 'nav-cta': 'Let’s talk',
    'hero-meta': 'Álvaro Pastor · web developer and AI · Murcia, Spain',
    'hero-1': 'Don’t trust me.', 'hero-2': 'Check.',
    'hero-sub': 'I build software that helps AI agents remember what they did and prove what they say. This site works the same way: ask, and every answer comes with its source.',
    'q-label': 'Ask about my work',
    'car-1': 'One minute.', 'car-2': 'Four seconds.', 'car-antes': 'Before', 'car-despues': 'After',
    'car-texto': 'Both bars run in real time. This is how long the development environment took to start at AGE2, before and after I reorganised Docker to use its cache. Keep scrolling if you like: the top one isn’t done yet.',
    'car-repetir': 'Run again',
    'car-fuente': 'source: AGE2 internship, Feb–Jun 2026 · “before” is approximate (~1 min) · company work, no public link',
    'pro-titulo': 'Your agent already talked about this. Now it can find it.',
    'pro-sub': 'Every coding agent stores its conversations its own way. history_search reads them all without touching them, and returns exact references instead of guesses.',
    'pro-cap': 'real CLI output, trimmed, from a test conversation written for this example',
    'reg-1': 'Read-only.', 'reg-1p': 'It never writes to, indexes or migrates your histories.',
    'reg-2': 'It never switches source silently.', 'reg-2p': 'Reading another agent takes your request, and the reason is recorded.',
    'reg-3': 'Empty is not proof.', 'reg-3p': 'Gaps are reported. Not finding something doesn’t mean it never happened.',
    'fic-1': 'agents: Claude Code, Codex, OpenCode, Pi, omp and Pi Pocket',
    'fic-2': 'pip packages, accounts or network calls',
    'fic-3': 'offline tests passing on a clean clone, 6 Nov 2026',
    'fic-4': 'optional, for Codex and Claude Code',
    'pro-cta': 'See how it works', 'pro-gh': 'Read the code',
    'med-titulo': 'I also measure where I don’t win.',
    'med-texto': 'I rewrote a Python history reader in Rust. Before retiring the original I checked that both answered the same: 12 of 12 exit codes and identical output, except for a cleaner error message in Rust.',
    'med-texto2': 'Then I measured. Search barely improves, because SQLite does the work. That goes in the report too.',
    'med-cap': 'How many times faster Rust is than Python',
    'med-b1': 'Dump a full session', 'med-b2': 'Mixed workload', 'med-b3': 'Startup', 'med-b4': 'Text search',
    'med-fuente': 'source: oc-v2-sessions-bench · 7 runs per case, ABBA alternation · one machine and one data snapshot · private repo, on request',
    'tra-titulo': 'What I decided, and what it cost me.',
    'dato-decidi': 'I decided', 'dato-costo': 'It cost me', 'dato-parte': 'My part',
    'c1-meta': 'final project · AI education platform · beta',
    'c1-lema': 'Upload your notes and AI builds the practice. Every mistake steers the next review.',
    'c1-d': 'A fallback system between AI models, so a processing failure doesn’t take the service down.',
    'c1-c': 'Controlling prompts, validating every answer and watching the cost per call.',
    'c1-p': 'Backend: API, data, AI and real-time multiplayer. The frontend was mainly built by my project partner.',
    'c2-meta': 'clickable prototype', 'c2-t': 'Ticket panel',
    'c2-lema': 'Deciding on a ticket at a glance.',
    'c2-d': 'Priority before detail, with a text label as well as colour. The transcript opens only when needed.',
    'c3-meta': 'professional work · no screenshots, for confidentiality', 'c3-t': 'Email templates for iTop',
    'c3-lema': 'Seven templates so the brand survives Outlook.',
    'c3-d': 'Adapt every layout to Outlook’s limited HTML and embed the logo in base64, the only reliable way to show it.',
    'c4-meta': 'first real job · live site',
    'c4-d': 'A sponsor carousel with visual hierarchy, because not all of them carried the same weight.',
    'c4-lema': 'I was offered the site before I had finished training.',
    'c4-c': 'I underestimated the time. That’s where I learned the difference between an optimistic deadline and a real one.',
    'c5-meta': 'how I work', 'c5-t': 'Processes with AI',
    'c5-lema': 'One file that goes with the agent into every project.',
    'c5-d': 'Turn my criteria into a shared base: surface doubts, change only what’s needed and define when a task is done.',
    'tra-nota': 'case studies are in Spanish',
    'ini-titulo': 'Nobody asked me for any of this.',
    'ini-texto': 'When something annoys me twice, I turn it into a tool. I have 20 agent skills of my own and several utilities in Rust, Python and PowerShell.',
    u1: 'Point at an element on a page and the agent gets its selector, HTML, styles and a crop.',
    u2: 'One MCP configuration, synced to five different agents.',
    u3: 'From a closed window to signature, module and stack, without opening a debugger.',
    u4: 'Inspects and presses native Windows dialogs from Rust, through FFI.',
    u5: 'Saves and restores agent configuration states with git.',
    'ini-fuente': 'source: author metadata in my local skills, 6 Nov 2026 · personal use, code not published',
    'lim-titulo': 'What this site won’t sell you.',
    'lim-1': 'I’m a junior. My professional experience adds up to just over a year, internship included.',
    'lim-2': 'history_search is only tested on Windows.',
    'lim-3': 'LudoScript is in beta, and AI generation is still being tested.',
    'lim-4': 'My benchmarks come from a single machine. They’re one concrete measurement, not a universal truth.',
    'lim-5': 'Some of what I describe lives in private repos or at companies. I always mark it, and I can show the private work if you ask.',
    'ori-titulo': 'First I studied why people choose things. Then I learned to build them.',
    'ori-1': 'Degree in Marketing and Sales Management, UCAM',
    'ori-2': 'Higher Technician in Web Development, FP San Antonio',
    'ori-3': 'Inversus: corporate sites and the Gala Imparables landing page',
    'ori-4': 'AGE2: Docker, automation and LLMs in production',
    'con-titulo': 'Your turn.',
    'con-sub': 'Ask me what the search couldn’t answer. I’m based in Murcia, Spain, and open to on-site, remote or hybrid work.',
    'con-cv': 'Request my CV',
  };
  const UI = {
    es: {
      placeholder: 'Pregunta lo que le preguntarías a un candidato',
      nota: (n) => `Sin IA y sin servidor: búsqueda literal en ${n} entradas que he escrito yo. Si algo no está, te lo dirá.`,
      cabecera: (n, t) => `${n} ${n === 1 ? 'resultado' : 'resultados'} · ${t} entradas leídas`,
      fuente: 'fuente',
      acceso: { publico: 'público', privado: 'privado, bajo petición', empresa: 'empresa, sin enlace', limite: 'límite declarado' },
      mas: (n) => `Ver ${n} más`,
      vacioT: 'Eso no prueba que no lo haya hecho.',
      vacioP: 'Solo significa que no está entre estas entradas.',
      vacioA: 'Pregúntamelo a mí',
      asunto: 'Una pregunta que tu web no supo contestar',
      seg: (v) => `${v.toFixed(1).replace('.', ',')} s`,
      listo: 'listo',
      termAria: 'Ejemplo de búsqueda con history_search',
      ingles: 'Switch to English', etiqueta: 'EN', langBtn: 'en',
    },
    en: {
      placeholder: 'Ask what you’d ask a candidate',
      nota: (n) => `No AI, no server: a literal search across ${n} entries I wrote myself. If something isn’t there, it will say so.`,
      cabecera: (n, t) => `${n} ${n === 1 ? 'result' : 'results'} · ${t} entries read`,
      fuente: 'source',
      acceso: { publico: 'public', privado: 'private, on request', empresa: 'company work, no link', limite: 'declared limit' },
      mas: (n) => `Show ${n} more`,
      vacioT: 'That doesn’t prove I haven’t done it.',
      vacioP: 'It only means it isn’t among these entries.',
      vacioA: 'Ask me directly',
      asunto: 'A question your site could not answer',
      seg: (v) => `${v.toFixed(1)} s`,
      listo: 'done',
      termAria: 'Example search with history_search',
      ingles: 'Cambiar a español', etiqueta: 'ES', langBtn: 'es',
    },
  };

  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s) => document.querySelector(s);
  const entrada = $('#q');
  const zona = $('#resultados');
  const chips = $('#chips');
  const datos = window.EVIDENCIAS;
  let idioma = 'es';

  /* ---------- búsqueda ---------- */

  const normalizar = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ+#]+/g, ' ').trim();
  const VACIAS = new Set(('que como cual cuales porque deberia has hecho hacer haber llevado haces hiciste sabes sabe tienes tiene eres es son estas esta este esto eso de del la el los las un una unos unas y o a en con para por sobre tu tus te mi mis me se lo al algo alguna algun alguno mas muy si ha hay han sido ser ya '
    + 'what why how which have has had you your did do does can could are is was were the a an of in on for to with about and or any some know built ever been').split(' '));
  const FRASES = [
    [/\bno (sabes|sabe|puedes|tienes|has)\b/g, 'limite'], [/\b(cant|cannot|can t|dont|don t)\b/g, 'limite'],
    [/\bdebilidad\w*|\bweakness\w*|\bpuntos? debil\w*|\blimitacion\w*|\blimits?\b/g, 'limite'],
    [/\bshipped\b|\bship\b/g, 'produccion'], [/\bjs\b/g, 'javascript'], [/\bai\b/g, 'ia'], [/\bagents?\b/g, 'agentes'],
  ];
  const consulta = (texto) => {
    let q = normalizar(texto);
    FRASES.forEach(([re, cambio]) => { q = q.replace(re, cambio); });
    return [...new Set(q.split(' ').filter((p) => p && !VACIAS.has(p)))];
  };
  const coincide = (palabra, termino) => palabra === termino
    || (termino.length >= 4 && palabra.startsWith(termino.slice(0, Math.max(4, termino.length - 2))));

  const indice = datos.map((d) => ({
    d,
    titulo: normalizar(d.titulo).split(' '),
    tags: normalizar(d.tags).split(' '),
    texto: normalizar(`${d.es} ${d.en}`).split(' '),
  }));
  const buscar = (terminos) => indice.map((e) => {
    let puntos = 0;
    terminos.forEach((t) => {
      if (e.titulo.some((p) => coincide(p, t))) puntos += 3;
      if (e.tags.some((p) => coincide(p, t))) puntos += 2;
      if (e.texto.some((p) => coincide(p, t))) puntos += 1;
    });
    return { d: e.d, puntos };
  }).filter((r) => r.puntos > 0).sort((a, b) => b.puntos - a.puntos);

  const escapar = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const subrayar = (texto, terminos) => escapar(texto).replace(/[\p{L}\p{N}+#]+/gu, (p) => (
    terminos.some((t) => coincide(normalizar(p), t)) ? `<mark>${p}</mark>` : p));

  const tarjeta = ({ d }, terminos) => {
    const ui = UI[idioma];
    const nombre = escapar(d.fuente[idioma]);
    const externo = d.url && d.url.startsWith('http');
    const enlace = d.url
      ? `<a href="${d.url}"${externo ? ' target="_blank" rel="noopener noreferrer"' : ''}>${nombre}</a>`
      : nombre;
    return `<article class="ev ev-${d.acceso}"><p>${subrayar(d[idioma], terminos)}</p>`
      + `<p class="fuente">${ui.fuente}: ${enlace} · ${ui.acceso[d.acceso]}</p></article>`;
  };

  let ultimo = '';
  const pintar = (texto) => {
    ultimo = texto;
    const ui = UI[idioma];
    const terminos = consulta(texto);
    if (!texto.trim()) { zona.innerHTML = ''; return; }
    const encontrados = terminos.length ? buscar(terminos) : [];
    const visibles = encontrados.slice(0, 4);
    const resto = encontrados.length - visibles.length;
    const cabecera = `<p class="res-cabecera"><span>${ui.cabecera(encontrados.length, datos.length)}</span><span>incomplete: ${encontrados.length ? 'false' : 'true'}</span></p>`;
    if (!encontrados.length) {
      const correo = `mailto:contacto@alvaropastor.dev?subject=${encodeURIComponent(ui.asunto)}&body=${encodeURIComponent(texto)}`;
      zona.innerHTML = `${cabecera}<div class="vacio"><p class="vacio-t">${ui.vacioT}</p><p>${ui.vacioP} <a href="${correo}" data-umami-event="pregunta-sin-respuesta">${ui.vacioA}</a></p></div>`;
      return;
    }
    zona.innerHTML = cabecera + visibles.map((r) => tarjeta(r, terminos)).join('')
      + (resto > 0 ? `<button class="boton-linea res-mas" type="button">${ui.mas(resto)}</button>` : '');
    const mas = zona.querySelector('.res-mas');
    if (mas) {
      mas.addEventListener('click', () => {
        mas.insertAdjacentHTML('beforebegin', encontrados.slice(4).map((r) => tarjeta(r, terminos)).join(''));
        mas.remove();
      });
    }
  };

  let escribiendo = null;
  const pararEscritura = () => { clearTimeout(escribiendo); escribiendo = null; };
  const escribir = (texto, alTerminar) => {
    pararEscritura();
    if (reducido) { entrada.value = texto; alTerminar(); return; }
    let i = 0;
    const paso = () => {
      entrada.value = texto.slice(0, ++i);
      if (i < texto.length) escribiendo = setTimeout(paso, 28 + Math.random() * 34);
      else { escribiendo = null; alTerminar(); }
    };
    paso();
  };
  const preguntar = (texto) => {
    entrada.value = texto;
    pintar(texto);
    chips.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === texto)));
  };

  let espera;
  entrada.addEventListener('input', () => {
    pararEscritura();
    chips.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    clearTimeout(espera);
    espera = setTimeout(() => pintar(entrada.value), 120);
  });
  entrada.addEventListener('focus', pararEscritura);
  $('#consola').addEventListener('submit', (e) => { e.preventDefault(); pintar(entrada.value); });

  const pintarChips = () => {
    chips.innerHTML = '';
    window.PREGUNTAS.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = p[idioma];
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => {
        pararEscritura();
        preguntar(p[idioma]);
        if (window.umami) window.umami.track('pregunta-sugerida', { pregunta: i + 1 });
      });
      chips.append(b);
    });
  };

  /* ---------- idioma ---------- */

  const nodos = [...document.querySelectorAll('[data-t]')].map((n) => ({ n, es: n.innerHTML, clave: n.dataset.t }));
  const botonIdioma = $('#idioma');
  const aplicarIdioma = (siguiente) => {
    idioma = siguiente === 'en' ? 'en' : 'es';
    const ui = UI[idioma];
    document.documentElement.lang = idioma;
    nodos.forEach(({ n, es, clave }) => { n.innerHTML = idioma === 'en' && EN[clave] ? EN[clave] : es; });
    const notaCasos = document.querySelector('[data-t="tra-nota"]');
    notaCasos.hidden = idioma !== 'en';
    entrada.placeholder = ui.placeholder;
    $('#consola-nota').textContent = ui.nota(datos.length);
    $('#terminal').setAttribute('aria-label', ui.termAria);
    botonIdioma.textContent = ui.etiqueta;
    botonIdioma.lang = ui.langBtn;
    botonIdioma.setAttribute('aria-label', ui.ingles);
    document.querySelectorAll('.barra-valor').forEach((v) => {
      v.textContent = idioma === 'en' ? v.textContent.replace(',', '.') : v.textContent.replace('.', ',');
    });
    document.querySelectorAll('[data-lang-link]').forEach((a) => {
      const url = new URL(a.href);
      url.searchParams.set('lang', idioma);
      a.href = url.href;
    });
    pintarChips();
    try { localStorage.setItem('portfolio-language', idioma); } catch { /* Sin almacenamiento, español por defecto. */ }
  };
  botonIdioma.addEventListener('click', () => {
    pararEscritura();
    aplicarIdioma(idioma === 'es' ? 'en' : 'es');
    const url = new URL(location.href);
    url.searchParams.set('lang', idioma);
    history.replaceState(null, '', url);
    const i = window.PREGUNTAS.findIndex((p) => p.es === ultimo || p.en === ultimo);
    if (i >= 0) preguntar(window.PREGUNTAS[i][idioma]);
    else if (ultimo) pintar(ultimo);
    pintarCarrera();
  });

  /* ---------- carrera en tiempo real ---------- */

  const ANTES = 60;
  const DESPUES = 4;
  const barraAntes = $('#barra-antes');
  const barraDespues = $('#barra-despues');
  const tiempoAntes = $('#tiempo-antes');
  const tiempoDespues = $('#tiempo-despues');
  let inicio = null;
  let marco = null;
  let transcurrido = 0;

  function pintarCarrera() {
    const ui = UI[idioma];
    const a = Math.min(transcurrido, ANTES);
    const d = Math.min(transcurrido, DESPUES);
    barraAntes.style.transform = `scaleX(${a / ANTES})`;
    barraDespues.style.transform = `scaleX(${d / DESPUES})`;
    tiempoAntes.textContent = a >= ANTES ? `${ui.seg(ANTES)} · ${ui.listo}` : ui.seg(a);
    tiempoDespues.textContent = d >= DESPUES ? `${ui.seg(DESPUES)} · ${ui.listo}` : ui.seg(d);
    barraDespues.classList.toggle('terminada', d >= DESPUES);
  }
  const correr = (ahora) => {
    transcurrido = (ahora - inicio) / 1000;
    pintarCarrera();
    marco = transcurrido < ANTES ? requestAnimationFrame(correr) : null;
  };
  const arrancar = () => {
    cancelAnimationFrame(marco);
    inicio = performance.now();
    transcurrido = 0;
    marco = requestAnimationFrame(correr);
  };
  $('#repetir').addEventListener('click', () => {
    if (window.umami) window.umami.track('repetir-carrera');
    if (reducido) { transcurrido = 0; pintarCarrera(); setTimeout(() => { transcurrido = ANTES; pintarCarrera(); }, 300); return; }
    arrancar();
  });

  /* ---------- arranque ---------- */

  const pedido = new URL(location.href).searchParams.get('lang');
  let guardado = null;
  try { guardado = localStorage.getItem('portfolio-language'); } catch { /* Español por defecto. */ }
  aplicarIdioma(pedido === 'en' || pedido === 'es' ? pedido : guardado === 'en' ? 'en' : 'es');

  if (reducido) { transcurrido = ANTES; }
  pintarCarrera();
  const seccionCarrera = $('#carrera');
  if (!reducido && 'IntersectionObserver' in window) {
    const vigia = new IntersectionObserver((vistas) => {
      if (vistas.some((v) => v.isIntersecting)) { arrancar(); vigia.disconnect(); }
    }, { threshold: 0.45 });
    vigia.observe(seccionCarrera);
  }

  const barras = $('#barras');
  if ('IntersectionObserver' in window) {
    const vigiaBarras = new IntersectionObserver((vistas) => {
      if (vistas.some((v) => v.isIntersecting)) { barras.classList.add('visible'); vigiaBarras.disconnect(); }
    }, { threshold: 0.4 });
    vigiaBarras.observe(barras);
  } else {
    barras.classList.add('visible');
  }

  const primera = window.PREGUNTAS[0][idioma];
  setTimeout(() => {
    if (entrada.value || document.activeElement === entrada) return;
    escribir(primera, () => preguntar(primera));
  }, reducido ? 0 : 500);
})();
