(() => {
  // Inglés. ES cuenta el caso del comando de despliegue; EN, el del guion escrito en inglés.
  const EN = {
    'nav-ejemplos': 'real case', 'nav-como': 'how it works', 'nav-instalar': 'install', 'nav-preguntas': 'questions',

    'hero-label': 'Start here',
    'hero-1': 'You already solved this.',
    'hero-2': 'Get the answer back.',
    'hero-sub': 'A decision, a fix, a script. Agent History Search searches your past chats and returns the passage with its source, so you can get back to work.',
    'hero-cta': 'See how it happened',
    'hero-gh': 'Install for free',
    'sello-1': 'Open source', 'sello-2': 'Local', 'sello-3': 'Read-only', 'sello-4': 'No accounts',

    'map-label': 'What you will see',
    'map-1': 'How I got here', 'map-1p': 'A real case, with its measurement.',
    'map-2': 'How it works', 'map-2p': 'What you ask and what your agent does.',
    'map-3': 'What it reads and what it doesn’t', 'map-3p': 'Privacy, limits and requirements.',
    'map-4': 'Install it and try it', 'map-4p': 'One prompt and your first search.',
    'map-here': 'You are here',

    'hist-label': 'I · How I got here',
    'proof-title': 'I remembered one line. <span class="marca">It recovered the script.</span>',
    'hist-date': 'November 12, 2026, late at night.',
    'hist-1': 'I was continuing a launch video in a new Claude Code session. The script already existed. I needed that earlier draft, not a new one.',
    'hist-2': 'I remembered one line from it. I didn’t know which chat it was in.',
    'hist-back': 'Earlier, in another session…',
    'hist-3': 'The draft had been written and left there. It was still saved in the history. It just had to be found.',
    'hist-4': 'So I asked Claude to search for that line.',
    'proof-result': 'What it recovered',
    'proof-quote': '“I thought my agent had no memory. Wrong. The history was on my disk all along. It just couldn\'t read it.”',
    'proof-source': 'A passage from the earlier script, written in English and recovered on November 12. I kept the measurement so I could show it.',
    'proof-search-number': '748',
    'proof-expand-number': '135',
    'proof-search': 'find the script',
    'proof-expand': 'expand the result',
    'proof-details': 'Measurement and evidence',
    'proof-method': 'Search: 22:27:16.813 → 22:27:17.561 UTC (748 ms). Expansion: 22:27:19.352 → 22:27:19.487 UTC (135 ms). Calls and responses were paired by ID in the log.',
    'proof-limit': 'One real case on my computer, not an average or a guarantee. Excludes agent thinking between calls and total response time. The expansion requested 2,500 characters of context and returned a 2,038-character message.',
    'proof-evidence': 'View the evidence excerpt →',
    'proof-private': 'No chat identifiers, local paths or complete conversations.',
    'proof-second-label': 'Not the only time · November 13',
    'proof-second-body': 'The next day, it recovered the exact command I had used to publish my marketing site, written in a Pocket session the day before. Search: 226 ms. Expansion: 150 ms.',
    'proof-second-evidence': 'View the second case measurement →',
    'hist-turn': 'The natural question is <em>how</em>. That is what the rest of this page is about.',

    'how-label': 'II · How it works',
    'use-title': 'You say what you remember. <span class="marca">Your agent does the rest.</span>',
    'use-1': '1. Ask in your own words',
    'use-prompt': '“Find the video script we worked on in another session. I remember the line ‘Last week that cost me’. Recover the draft and show me its source.”',
    'use-prompt-note': 'You don’t have to write the tool parameters yourself.',
    'use-2': '2. The agent runs a focused search',
    'use-search': '{ "action": "search",\n  "query": "Last week that cost me",\n  "limit": 5 }',
    'use-search-result': 'It returns one short match, with its agent, date and reference.',
    'use-3': '3. It expands only the match that fits',
    'use-expand': '{ "action": "expand",\n  "ref": "&lt;chosen reference from the search&gt;",\n  "context": 2500 }',
    'use-answer': 'It reads just enough around that match and shows where it came from, so you can check it.',
    'lan-video': 'Video walkthrough, in English with captions.',

    'tru-label': 'III · What it reads and what it doesn’t',
    'tru-titulo': 'Exact references, not guesses.',
    'reg-1': 'Read-only.', 'reg-1p': 'It reads messages without changing them or deleting your conversations.',
    'reg-2': 'You choose what it reads.', 'reg-2p': 'It only reads another agent’s history if you authorize it and ask. It never switches source on its own, not even after an error.',
    'reg-3': 'Empty is not proof.', 'reg-3p': 'It reports its gaps. Not finding something doesn’t mean it never happened.',
    'faq-1': 'Do my conversations leave my computer?',
    'faq-1r': 'The tool doesn’t use the network. What it finds goes to your agent, so it reaches that agent’s model like any other text you show it.',
    'faq-3': 'Does it work on Mac or Linux?',
    'faq-3r': 'I don’t know yet. It’s tested on Windows and has no external packages, but I haven’t validated it on other systems.',
    'fic-1': 'supported agents', 'fic-2': 'pip packages, accounts or API keys',
    'fic-3': 'offline tests passing', 'fic-4': 'free and open source',

    'ins-label': 'IV · Install it and try it',
    'ins-titulo': 'Your agent installs it for you.',
    'ins-1': 'Download the repository.', 'ins-1a': 'Open GitHub',
    'ins-2': 'Open your agent with access to that folder and paste this prompt.',
    'ins-3': 'Start a new session and run your first test.', 'ins-3a': 'See the request',
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
    'trial-label': 'Your first test',
    'trial-title': 'Pick something you have already solved.',
    'trial-intro': 'Open a new session and adapt this request to one of your decisions:',
    'trial-prompt': 'Search my past conversations for the decision about [topic]. I remember [a phrase or detail]. Recover the message and show me its source.',
    'trial-copy': 'Copy request',
    'trial-close': 'The more exact words from the conversation you include, the sooner it finds it. If it retrieves what you remember and you can locate the original message, it works.',

    'gui-titulo': 'Step by step.',
    'gui-1': '1 · Check Python and the package',
    'gui-1r': 'In PowerShell, from the downloaded folder. The tests do not read your conversations; if they fail, fix the error before going on.',
    'gui-2': '2 · Choose which histories you authorize',
    'gui-2r': 'Usual Windows paths; check yours. The agent only reads another source when you ask it to.',
    'gui-3': '3 · Validate the path before reading',
    'gui-3r': '<code>--plan</code> validates the arguments, but it does not open the history or prove the path exists.',
    'gui-4': '4 · Connect it by hand',
    'gui-4r': 'Claude Code (assumes the package is at C:/Tools/agent-history-search):',
    'gui-4r2': 'Codex: add this block to your config.toml without replacing the file. Paths must be absolute.',
    'gui-4r3': 'OpenCode, Pi, omp and Pi Pocket use <code>history_search.py</code> with its skill. If OpenCode or Pi Pocket is open and has a WAL file, use the included snapshot tool or close the app. Do not delete the WAL.',
    'gui-5': '5 · Check the connection',
    'gui-5r': 'In a new session, ask it to list your most recent conversation with its source and ID, without showing the content, and check that it calls the MCP tool (or the script). Then search for a word you know is there. If you set up MCP, a test with the script does not prove MCP works.',
    'gui-6': 'What your agent can do',
    'gui-6r': '<strong>Search</strong> for a literal phrase in past conversations. <strong>List and read</strong> recent sessions, or one by its exact ID. <strong>Inspect calls</strong> with <code>--tool-calls</code>: commands, arguments and results, with failures marked only when the history proves them.',
    'gui-l1': 'Full guide', 'gui-l2': 'Guide per agent',

    'cie-titulo': 'Next time, start with what you already know.',
    'cie-p': 'Thanks for reading this far. If you try it, tell me on X what your agent recovered.',
    'close-install': 'Install for free',
    'cie-x': 'Follow on X',
    'pie-autor': 'Made by Álvaro Pastor.',
    'pie-bio': 'Web developer in Murcia, Spain. I work with coding agents every day and post what I build on X.',
    'pie-otros': 'Other work (in Spanish)', 'pie-procesos': 'Processes with AI', 'pie-tickets': 'Ticket panel',
    'pie-sigue': 'Follow me',
  };

  const ROTULOS = {
    es: { copiado: 'Copiado', fallo: 'Selecciona y copia', aria: 'Cambiar a español' },
    en: { copiado: 'Copied', fallo: 'Select and copy', aria: 'Cambiar a español' },
  };

  const $ = (s) => document.querySelector(s);
  const nodos = [...document.querySelectorAll('[data-t]')].map((n) => ({ n, es: n.innerHTML, clave: n.dataset.t }));
  const titulo = { es: document.title, en: 'Agent History Search · Get your earlier answers back' };
  const boton = $('#idioma');
  const copiar = $('#copiar');
  let idioma = 'es';

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
    const trialStatus = document.getElementById('trial-status');
    if (trialStatus) trialStatus.textContent = '';
    // Cada idioma abre con su caso: la evidencia principal y la secundaria se intercambian.
    const primaryEvidence = document.querySelector('[data-t="proof-evidence"]');
    const secondaryEvidence = document.querySelector('[data-t="proof-second-evidence"]');
    if (primaryEvidence && secondaryEvidence) {
      primaryEvidence.href = idioma === 'en' ? '/evidence/caso.html?caso=script&lang=' + idioma : '/evidence/caso.html?caso=deploy&lang=' + idioma;
      secondaryEvidence.href = idioma === 'en' ? '/evidence/caso.html?caso=deploy&lang=' + idioma : '/evidence/caso.html?caso=script&lang=' + idioma;
    }
  };
  boton.addEventListener('click', () => {
    aplicar(idioma === 'es' ? 'en' : 'es');
    try { localStorage.setItem('portfolio-language', idioma); } catch { /* Sin almacenamiento dura hasta recargar. */ }
    const url = new URL(location.href);
    url.searchParams.set('lang', idioma);
    history.replaceState(null, '', url);
  });

  const copyTrial = document.getElementById('copiar-prueba');
  copyTrial?.addEventListener('click', async () => {
    const status = document.getElementById('trial-status');
    try {
      await navigator.clipboard.writeText(document.getElementById('trial-prompt').textContent);
      status.textContent = idioma === 'en' ? 'Copied. Replace the brackets with your own topic.' : 'Copiado. Sustituye los corchetes por tu tema.';
    } catch {
      status.textContent = idioma === 'en' ? 'Select the request above and copy it.' : 'Selecciona la petición de arriba y cópiala.';
    }
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

  $('#video')?.addEventListener('play', () => {
    if (window.umami) window.umami.track('reproducir-video');
  }, { once: true });

  // Sin elección previa manda el idioma del navegador: español si lo usa, inglés en el resto.
  const pedido = new URL(location.href).searchParams.get('lang');
  let guardado = null;
  try { guardado = localStorage.getItem('portfolio-language'); } catch { /* Sin almacenamiento. */ }
  const delNavegador = (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
  aplicar(pedido === 'es' || pedido === 'en' ? pedido : guardado === 'es' || guardado === 'en' ? guardado : delNavegador);
})();
