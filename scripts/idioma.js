// Exact text translations preserve links, icons and the original Spanish copy.
(() => {
  const translations = {
    "2 · Comprueba Python y el paquete": "2 · Check Python and the package",
    "En PowerShell, desde la carpeta descargada, comprueba Python y ejecuta la ayuda y las pruebas offline. Estas pruebas no necesitan leer tus conversaciones. Si fallan, resuelve el error antes de continuar.": "In PowerShell, from the downloaded folder, check Python and run the help command and offline tests. These checks do not need to read your conversations. If they fail, resolve the error before continuing.",
    "3 · Elige los historiales autorizados": "3 · Choose the authorized histories",
    "Selecciona el agente desde el que lo usarás y qué historiales puede consultar. Las rutas siguientes son las habituales en Windows; comprueba las de tu instalación. Añadir una fuente al MCP permite consultarla, pero el agente solo debe usar otra fuente cuando se lo pidas explícitamente.": "Choose the agent you will use and the histories it may read. The paths below are common Windows defaults; check your own installation. Adding a source to MCP allows access, but the agent should query another source only when you explicitly request it.",
    "Agente": "Agent",
    "Ruta habitual": "Default path",
    "4 · Valida la ruta antes de leer": "4 · Validate the route before reading",
    "Este ejemplo es para Claude Code. Ajusta host y store al agente y al historial elegidos. --plan valida los argumentos, pero no abre el historial ni demuestra que la ruta exista o se pueda leer.": "This example is for Claude Code. Adjust host and store to the agent and history you chose. --plan validates arguments, but does not open the history or prove that the path exists or is readable.",
    "5 · Conecta tu agente": "5 · Connect your agent",
    "6 · Comprueba la conexión en una sesión nueva": "6 · Check the connection in a new session",
    "Si configuraste MCP, una prueba con el script no demuestra que MCP funcione. Confirma una llamada real a la herramienta del servidor configurado. Si falla, revisa el error antes de cambiar de modalidad.": "If you configured MCP, a successful script test does not prove that MCP works. Confirm an actual tool call from the configured server. If it fails, review the error before switching interfaces.",
    "instalación": "setup",
    "Empieza con tu agente o instálalo tú": "Let your agent set it up, or do it yourself",
    "Requisitos: Windows 10/11 (plataforma probada), Python 3.10 o superior con sqlite3. Sin paquetes pip ni cuentas. Guarda el repositorio en una carpeta estable antes de configurar tu agente.": "Requirements: Windows 10/11 (tested platform), Python 3.10 or newer with sqlite3. No pip packages or accounts. Keep the repository in a stable folder before configuring your agent.",
    "1 · Descarga el repositorio": "1 · Download the repository",
    "Abre GitHub y usa Code → Download ZIP, o clona el repositorio. Extrae el paquete y abre tu agente con acceso a esa carpeta.": "Open GitHub and choose Code → Download ZIP, or clone the repository. Extract the package and open your agent with access to that folder.",
    "2 · Pídele a tu agente que lo configure": "2 · Ask your agent to configure it",
    "Copia este prompt y completa los campos entre corchetes. La instalación usará MCP en Codex y Claude Code; en los demás agentes, el script.": "Copy this prompt and fill in the bracketed fields. Setup will use MCP in Codex and Claude Code; other agents will use the script.",
    "Copiar prompt": "Copy prompt",
    "3 · Comprueba la conexión": "3 · Check the connection",
    "Abre una sesión nueva y pide que liste tu conversación más reciente, indicando la fuente y el ID sin mostrar el contenido. Comprueba que llama a history_search del MCP, o al script si usas el helper. Después prueba una búsqueda con una palabra que sepas que existe.": "Open a new session and ask it to list your latest conversation, reporting the source and ID without showing its contents. Check that it calls the MCP history_search tool, or the script when using the helper. Then try a search for a term you know exists.",
    "Prefiero instalarlo manualmente": "I prefer manual setup",
    "Claude Code · MCP en PowerShell": "Claude Code · MCP in PowerShell",
    "Este ejemplo supone que has guardado el paquete en C:/Tools/agent-history-search. Ajusta la ruta si elegiste otra carpeta. Autoriza inicialmente solo el historial de Claude Code.": "This example assumes the package is at C:/Tools/agent-history-search. Adjust the path if you chose another folder. It initially authorizes only Claude Code history.",
    "Codex · configuración MCP": "Codex · MCP configuration",
    "Añade este bloque a tu config.toml de Codex sin sustituir el archivo completo. Cambia YOUR_USER y la ruta del paquete por las tuyas; las rutas deben ser absolutas.": "Add this block to your Codex config.toml without replacing the entire file. Replace YOUR_USER and the package path with your own; use absolute paths.",
    "Otros agentes · helper de Python": "Other agents · Python helper",
    "OpenCode, Pi, omp y Pi Pocket usan por ahora history_search.py junto con la skill o las instrucciones locales. Sigue la guía por agente para configurar las rutas de historial.": "OpenCode, Pi, omp and Pi Pocket currently use history_search.py with the skill or local instructions. Follow the per-agent guide to configure history paths.",
    "OpenCode y Pi Pocket: si la base de datos está abierta y tiene un archivo WAL, necesitas una copia consistente mediante la herramienta de snapshot incluida, o cerrar la aplicación y comprobar que ya no hay WAL. No borres el WAL.": "OpenCode and Pi Pocket: if the database is open and has a WAL file, use the included snapshot tool to make a consistent copy, or close the app and check that no WAL remains. Do not delete the WAL.",
    "Guía completa y requisitos": "Full guide and requirements",
    "Guía por agente": "Per-agent guide",
    "Prompt completo del repositorio": "Full repository setup prompt",
    "Instalar": "Set up",
    "Configura Agent History Search en este equipo. Repositorio: https://github.com/alvaropas17/agent-history-search Carpeta del paquete: [RUTA ABSOLUTA] Agente que usaré: [codex / claude / opencode / pi / omp / pocket] Historiales que autorizo a leer: [FUENTES Y RUTAS] Lee el README y la documentación de instalación de la versión descargada. Comprueba Python 3.10+, sqlite3, la ayuda del CLI y las pruebas offline. Para Codex o Claude Code, configura el MCP incluido history_mcp.py con un host fijo y solo los historiales autorizados. Para el resto, configura el helper history_search.py y su skill o instrucciones locales. Antes de editar configuración, muestra los cambios propuestos y haz una copia de seguridad. No sustituyas archivos completos ni toques otros MCP. Si faltan rutas o autorizaciones, pregúntame. No cambies de fuente tras un error o un resultado vacío. No modifiques historiales ni borres WAL. Verifica la conexión real con una lectura mínima autorizada y dime cómo comprobarla en una sesión nueva. Si falta alguna prueba, indícalo.": "Set up Agent History Search on this computer.\nRepository: https://github.com/alvaropas17/agent-history-search\nPackage folder: [ABSOLUTE PATH]\nAgent I will use: [codex / claude / opencode / pi / omp / pocket]\nHistories I authorize you to read: [SOURCES AND PATHS]\n\nRead the README and setup documentation in the downloaded version.\nCheck Python 3.10+, sqlite3, CLI help and the offline tests.\nFor Codex or Claude Code, configure the included history_mcp.py MCP server\nwith a fixed host and only authorized stores. For other agents, configure\nthe history_search.py helper and its skill or local instructions.\nBefore editing config, show the proposed changes and create a backup.\nDo not replace entire config files or change unrelated MCP servers.\nAsk me for missing paths or permissions. Do not switch sources after\nerrors or empty results. Do not modify histories or delete WAL files.\nVerify the actual connection with a minimal authorized read, and explain\nhow to check it in a new session. Report any checks still pending.",
    "casos de uso": "use cases",
    "Recupera el trabajo que ya hiciste": "Recover the work you already did",
    "Describe lo que recuerdas: para qué servía una herramienta, una decisión pendiente, un error o un archivo que entregaste. El agente busca en los historiales que le hayas autorizado a leer y responde con referencias que puedes comprobar.": "Describe what you remember: what a tool did, a pending decision, an error or a file you delivered. Your agent searches the histories you have allowed it to read and answers with references you can check.",
    "01 · Encuentra una herramienta": "01 · Find a tool",
    "«¿Qué herramienta usamos la semana pasada para revisar la seguridad de las skills?»": "“Which tool did we use to scan skills for security last week?”",
    "No necesitas recordar el nombre. Dale al agente pistas sobre lo que hacía y cuándo la usaste. Puede buscar esas pistas y leer los fragmentos de conversación relacionados para identificar la herramienta y recuperar la referencia original.": "You do not need to remember its name. Give your agent clues about what it did and when you used it. It can search those clues and read matching conversation passages to identify the tool and recover the original reference.",
    "En el vídeo, esta búsqueda recupera SkillSpector. Puedes volver al contexto en el que apareció y comprobar por qué la elegiste, sin reconstruir la búsqueda desde cero.": "In the video, this search recovers SkillSpector. You can return to the context where it appeared and check why you chose it, without starting the search from scratch.",
    "02 · Recupera una decisión": "02 · Recover a decision",
    "«¿Qué decidimos sobre el rediseño de la web y por qué?»": "“What did we decide about the website redesign, and why?”",
    "Recupera el acuerdo que quedó en una conversación anterior: qué opción elegiste, qué alternativas descartaste y los motivos que dejaste escritos. Puedes acotar la búsqueda por tema o fecha, aunque no recuerdes la sesión exacta.": "Recover an agreement recorded in a past conversation: which option you chose, which alternatives you ruled out and the reasons you wrote down. Narrow the search by topic or date, even if you cannot remember the exact session.",
    "Sirve para continuar una implementación o explicar una decisión a otro agente. La respuesta se apoya en lo que consta en el historial y puede ampliar el mensaje original si necesitas más contexto.": "Use it to continue an implementation or explain a decision to another agent. The answer is grounded in the saved history, and the original message can be expanded when you need more context.",
    "03 · Reutiliza una solución": "03 · Reuse a working fix",
    "«Este error ya lo arreglamos. ¿Qué cambio funcionó la última vez?»": "“We fixed this error before. Which change worked last time?”",
    "Busca el mensaje de error o describe el síntoma para localizar la conversación donde lo resolviste. Si se guardaron las llamadas a herramientas, también puedes recuperar los comandos, sus argumentos y los resultados registrados.": "Search for the error message or describe the symptom to locate the conversation where you solved it. If tool calls were saved, you can also recover commands, their arguments and their recorded results.",
    "Distingue los intentos fallidos del cambio que tuvo un resultado documentado. Así puedes revisar una solución anterior antes de probarla de nuevo; si el historial no confirma que funcionó, no debe presentarla como comprobada.": "Distinguish failed attempts from a change with a documented result. Review a previous solution before trying it again; if the history does not confirm that it worked, the agent should not present it as verified.",
    "04 · Localiza un archivo entregado": "04 · Locate a delivered file",
    "«¿Dónde guardamos la versión final del informe que preparaste?»": "“Where did we save the final version of the report you prepared?”",
    "Busca por el proyecto, el contenido del documento o la fecha aproximada para recuperar el nombre y la ruta mencionados al entregarlo. También puede ayudarte a distinguir la versión final de los borradores cuando esa diferencia quedó registrada.": "Search by project, document contents or approximate date to recover the filename and path mentioned when it was delivered. It can also help distinguish the final version from drafts when that distinction was recorded.",
    "Recupera la referencia de la conversación, no el archivo en sí. Que una ruta aparezca en el historial no confirma que el archivo siga ahí ni que su contenido no haya cambiado.": "It recovers the conversation reference, not the file itself. A path in the history does not confirm that the file is still there or that its contents have not changed.",
    "05 · Retoma el trabajo": "05 · Pick up where you left off",
    "«Retoma lo que estábamos haciendo: ¿qué quedó terminado y cuál era el siguiente paso?»": "“Pick up where we left off: what was finished, and what was the next step?”",
    "Lee la conversación anterior para recuperar el objetivo, los avances y los pendientes que quedaron escritos. Es útil al abrir una sesión nueva o cuando quieres continuar desde otro agente sin volver a explicar todo el contexto.": "Read the previous conversation to recover the goal, progress and outstanding work recorded there. Useful when starting a new session or continuing from another agent without explaining all the context again.",
    "Si el contexto está en otro agente, indica qué historial quieres consultar y autoriza su lectura. La búsqueda no cambia de fuente en silencio: tú eliges qué historiales puede leer.": "If the context lives with another agent, specify which history to consult and authorize access. Search does not silently switch sources: you choose which histories it may read.",
    "Cómo conectarlo a tu agente": "How to connect it to your agent",
    "Disponible como MCP para Codex y Claude Code. Para OpenCode, Pi, omp y Pi Pocket, de momento se usa como helper: un script de Python que ejecuta el agente.": "Available as an MCP server for Codex and Claude Code. For OpenCode, Pi, omp and Pi Pocket, it is currently available as a helper: a Python script run by the agent.",
    "Dale a tu agente el prompt de instalación del repositorio y elige qué historiales puede leer. Consulta GitHub para ver las instrucciones de cada modalidad.": "Give your agent the setup prompt from the repository and choose which histories it may read. See GitHub for setup instructions for each option.",
    "El helper es un script de Python sin dependencias externas, cuentas ni acceso a red para buscar. El agente lo ejecuta y recibe JSON; en Codex y Claude Code también puedes usar la integración MCP. Abajo, dos flujos reales sacados de mis propias sesiones (en inglés, abreviados).": "The helper is a Python script with no external dependencies, accounts or network access needed for searching. The agent runs it and receives JSON; Codex and Claude Code can also use the MCP integration. Below are two real workflows from my own sessions (in English, abridged).",
    'Una suite de herramientas para agentes de IA que sigue creciendo': 'A growing suite of tools for AI agents',
    'Haz más con IA.': 'Get more done with AI.',
    'Con menos esfuerzo por tu parte.': 'With less work from you.',
    'Ayuda a tus agentes a recordar, buscar y verificar para dedicar menos tiempo a repetir contexto, encontrar información y revisar su trabajo.': 'Help your agents remember, search and verify so you spend less time repeating context, finding information and checking their work.',
    'Explorar herramientas': 'Explore the tools',
    'herramientas': 'tools', 'Herramientas': 'Tools', 'contacto': 'contact',
    'Hablemos': 'Let’s talk', 'herramientas propias': 'tools I build',
    'Herramientas para trabajar con': 'Tools for working with', 'agentes de IA': 'AI agents',
    'Utilidades pequeñas que construyo para que los agentes recuerden, busquen y verifiquen mejor. Cada una explica qué problema resuelve, cómo funciona y dónde está el código.': 'Small utilities I build to help agents remember, search and verify better. Each one explains the problem it solves, how it works and where to find the code.',
    'Ver herramientas': 'Explore tools', 'Ver CV': 'View CV',
    'Lo que voy construyendo': 'What I’m building',
    'Cada herramienta tiene su propia página con la explicación y el enlace a GitHub.': 'Each tool has its own page with an explanation and a link to GitHub.',
    'herramienta · agentes de ia': 'tool · AI agents',
    'Busca en conversaciones anteriores con agentes de código (Claude Code, Codex, OpenCode, Pi, Pi Pocket) para recuperar decisiones y contexto sin volver a preguntar. Solo lectura, sin dependencias.': 'Search past conversations with coding agents (Claude Code, Codex, OpenCode, Pi, Pi Pocket) to recover decisions and context without asking again. Read-only, with no dependencies.',
    'Cómo funciona': 'How it works', '¿Hablamos?': 'Let’s talk',
    'Si te interesa alguna herramienta o quieres colaborar, escríbeme.': 'Interested in a tool or want to collaborate? Get in touch.',
    'Escríbeme': 'Email me', 'o directamente:': 'or directly:',
    '© 2026 Álvaro Pastor · herramientas para agentes de IA.': '© 2026 Álvaro Pastor · tools for AI agents.',
    'Abrir menú': 'Open menu', 'Ver la herramienta history_search': 'Explore the history_search tool',
    'Ilustración de history_search: búsqueda en el historial de conversaciones con agentes': 'history_search illustration: searching past conversations with agents',
    'Álvaro Pastor · Herramientas para agentes de IA': 'Álvaro Pastor · Tools for AI agents',
    'Herramientas propias para trabajar mejor con agentes de IA, por Álvaro Pastor: cómo funcionan, qué problema resuelven y dónde está el código.': 'Tools built by Álvaro Pastor to work better with AI agents: how they work, the problems they solve and where to find the code.',
    'Álvaro Pastor Currículum': 'Álvaro Pastor Résumé',
    'Currículum de Álvaro Pastor, desarrollador web full-stack con base de marketing.': 'Résumé of Álvaro Pastor, a full-stack web developer with a background in marketing.',
    'Volver': 'Back', 'Volver al portfolio': 'Back to portfolio', 'Descargar CV en PDF': 'Download CV (PDF, Spanish)',
    'Perfil profesional': 'Professional profile', 'Desarrollador web · automatización · integración de IA': 'Web developer · automation · AI integration',
    'Disponible para presencial en Murcia o Lorca, remoto e híbrido': 'Available for on-site work in Murcia or Lorca, remote and hybrid roles',
    'Datos de contacto': 'Contact details', 'Enlaces profesionales': 'Professional links', 'Murcia, España': 'Murcia, Spain',
    'Técnico Superior en Desarrollo de Aplicaciones Web (DAW) con experiencia previa en Marketing y Dirección Comercial. Perfil junior híbrido orientado a desarrollo web (JavaScript, Node.js, APIs REST, SQL), integración práctica de IA generativa y automatización de procesos con Git. Experiencia construyendo producto completo (usuarios, backend, integración con modelos de IA) aplicando criterio de producto y marketing a decisiones técnicas. Abierto a nuevas oportunidades en modalidad presencial en Murcia o Lorca, y remota o híbrida, en equipos donde desarrollo, producto e IA estén conectados.': 'Web Application Development graduate with previous experience in Marketing and Sales Management. A junior developer focused on web development (JavaScript, Node.js, REST APIs, SQL), practical generative AI integration and process automation with Git. Experience building complete products (users, backend, AI model integration), applying product and marketing judgment to technical decisions. Open to on-site opportunities in Murcia or Lorca, and remote or hybrid roles in teams that connect development, product and AI.',
    'Áreas clave': 'Core skills', 'Desarrollo web': 'Web development', 'Bases de datos': 'Databases',
    'IA y automatización': 'AI and automation', 'Herramientas y despliegue': 'Tools and deployment',
    'Gemini API, DeepSeek, Qwen, LM Studio, agentes de IA, Bash': 'Gemini API, DeepSeek, Qwen, LM Studio, AI agents, Bash',
    'Experiencia profesional': 'Work experience', 'Desarrollo Web, Automatización e IA': 'Web Development, Automation and AI',
    'Prácticas Formativas AGE2': 'AGE2 Internship', 'Febrero 2026 Junio 2026': 'February 2026 – June 2026',
    'Reduje el tiempo de arranque del entorno de desarrollo de aproximadamente 1 minuto a 4 segundos, reorganizando la configuración de Docker para aprovechar su sistema de caché.': 'Reduced development environment startup time from about 1 minute to 4 seconds by reorganizing the Docker configuration to take advantage of caching.',
    'Diseñé plantillas corporativas de email reutilizables para reducir el tiempo de producción de comunicaciones y unificar la imagen de marca entre proyectos.': 'Designed reusable corporate email templates to reduce production time and keep branding consistent across projects.',
    'Rediseñé la estrategia de prompting y gestión de contexto de los modelos de lenguaje (LLM), mejorando la fiabilidad y consistencia de las respuestas en producción.': 'Redesigned LLM prompting and context management to improve the reliability and consistency of responses in production.',
    'Automaticé tareas repetitivas del equipo mediante scripts en Bash, reduciendo el trabajo manual en procesos de desarrollo y despliegue.': 'Automated repetitive team tasks with Bash scripts, reducing manual work in development and deployment processes.',
    'Marketing Digital y Desarrollo Web': 'Digital Marketing and Web Development', 'Marzo 2025 Octubre 2025': 'March 2025 – October 2025',
    'Colaboré en la creación de páginas web corporativas, aplicando estrategias de producto y marketing al desarrollo web.': 'Helped build corporate websites, applying product and marketing strategies to web development.',
    'Participé en la planificación de la estrategia de marketing digital de la empresa.': 'Contributed to planning the company’s digital marketing strategy.',
    'Desarrollé la maquetación y funcionalidad de una landing page para un evento corporativo, con HTML, CSS y JavaScript.': 'Built the layout and functionality of a corporate event landing page using HTML, CSS and JavaScript.',
    'Proyecto destacado': 'Featured project', 'LudoScript Plataforma Educativa con IA': 'LudoScript AI Educational Platform', 'Proyecto Principal / TFG': 'Main Project / Final Degree Project',
    'Diseñé y desarrollé el backend (Express, JWT, Socket.IO, PostgreSQL) de una plataforma educativa con quizzes, flashcards, clases, ranking y panel de administración generados con IA a partir de documentos PDF.': 'Designed and developed the backend (Express, JWT, Socket.IO, PostgreSQL) of an educational platform with AI-generated quizzes and flashcards from PDFs, classes, rankings and an admin dashboard.',
    'Diseñé una arquitectura de fallback entre modelos de IA para garantizar la continuidad del servicio ante fallos de procesamiento, explorando tecnologías nuevas a partir de mi base en bases de datos y programación.': 'Designed a fallback architecture across AI models to maintain service during processing failures, exploring new technologies using my database and programming background.',
    'Integré la API de Gemini para generar preguntas y flashcards automáticamente a partir del contenido subido por el usuario.': 'Integrated the Gemini API to automatically generate questions and flashcards from user-uploaded content.',
    'Colaboré en el frontend (Vue 3 + Vite), desarrollado principalmente por un compañero de TFG, ajustando partes puntuales para su correcta integración con la lógica del backend.': 'Contributed to the frontend (Vue 3 + Vite), primarily developed by a project teammate, making targeted changes to integrate it with the backend.',
    'Formación académica': 'Education', 'Técnico Superior en Desarrollo de Aplicaciones Web (DAW)': 'Higher Vocational Diploma in Web Application Development (DAW)',
    'Grado en Marketing y Dirección Comercial': 'Bachelor’s Degree in Marketing and Sales Management',
    '— herramientas': '— tools', 'problema': 'problem', 'cómo funciona': 'how it works', 'ejemplos': 'examples', 'reglas': 'rules',
    '← volver al portfolio': '← back to portfolio', 'herramientas · agentes de ia': 'tools · AI agents',
    'Recuperar lo que ya se habló,': 'Recover what was already discussed,', 'sin volver a preguntarlo.': 'without asking again.',
    'es un helper de solo lectura que busca en las conversaciones anteriores con agentes de código. El agente obtiene referencias exactas y responde con tu propio historial, no con suposiciones.': 'is a read-only helper that searches past conversations with coding agents. The agent gets exact references and answers from your own history, without guessing.',
    'solo lectura': 'read-only', 'Ver en GitHub': 'View on GitHub', 'Cada agente guarda su historial por su cuenta': 'Each agent stores its own history',
    'Trabajo con varios agentes de código y cada uno guarda sus conversaciones en un formato distinto. Cuando una decisión quedó escrita en una sesión de hace días, encontrarla a mano significa abrir ficheros de sesión enormes o, peor, volver a explicarlo todo.': 'I work with several coding agents, each storing conversations in a different format. When a decision was recorded days ago, finding it manually means opening huge session files or explaining everything again.',
    'Un agente que no recuerda lo que ya se habló repite preguntas y rehace trabajo.': 'An agent that cannot remember past discussions repeats questions and work.',
    'le da una forma barata y verificable de consultar ese historial.': 'gives it an efficient, verifiable way to consult that history.',
    'sin la herramienta': 'without the tool', 'con la herramienta': 'with the tool', 'Contexto perdido': 'Lost context',
    'Se pregunta de nuevo lo ya decidido y se reconstruye a mano qué pasó en una sesión.': 'Decisions are asked about again, and sessions have to be reconstructed manually.',
    'Evidencia acotada': 'Focused evidence', 'Una búsqueda devuelve entradas identificadas, que se amplían por ID sin cargar la conversación entera.': 'A search returns identified entries that can be expanded by ID without loading the entire conversation.',
    'funcionamiento': 'how it works', 'Qué hace y cómo se usa': 'What it does and how to use it',
    'El helper es un script de Python sin dependencias externas, cuentas ni acceso a red para buscar. El agente lo ejecuta y recibe JSON. El servidor MCP opcional (Codex y Claude Code) ejecuta ese mismo helper y devuelve el mismo JSON. Abajo, dos flujos reales sacados de mis propias sesiones (en inglés, abreviados).': 'The helper is a Python script with no external dependencies, accounts or network access to search. The agent runs it and receives JSON. The optional MCP server (Codex and Claude Code) runs that same helper and returns the same JSON. Below are two real flows from my own sessions (abridged).',
    'Disponible como MCP para Codex y Claude Code. Para OpenCode, Pi, omp y Pi Pocket, de momento se usa como helper: un script de Python que ejecuta el agente.': 'Available as an MCP server for Codex and Claude Code. For OpenCode, Pi, omp and Pi Pocket it is used as a helper for now: a Python script the agent runs.',
    'Cómo conectarlo a tu agente': 'How to connect it to your agent',
    'Dale a tu agente el prompt de instalación del repositorio y elige qué historiales puede leer. Consulta GitHub para ver las instrucciones de cada modalidad.': 'Give your agent the repository’s setup prompt and choose which histories it may read. See GitHub for the instructions for each mode.',
    '1. Buscar': '1. Search', '2. Listar y leer': '2. List and read', '3. Inspeccionar llamadas': '3. Inspect tool calls',
    'Encuentra una frase literal en conversaciones pasadas, sin distinguir mayúsculas y con soporte Unicode.': 'Find a literal phrase in past conversations, with case-insensitive matching and Unicode support.',
    'Muestra las sesiones recientes y lee una por su ID exacto, opcionalmente alrededor de una entrada concreta.': 'List recent sessions and read one by its exact ID, optionally around a specific entry.',
    'Con': 'With', 'devuelve comandos, argumentos y resultados, y marca fallos solo si el historial lo prueba.': 'returns commands, arguments and results, marking failures only when the history proves them.',
    'Diseñada para no sacar conclusiones falsas': 'Designed to avoid false conclusions', 'Solo lectura': 'Read-only',
    'qué hace': 'what it does', 'por qué': 'why', 'Nunca escribe, indexa ni migra tus historiales.': 'Never writes, indexes or migrates your history.',
    'Consultar el pasado no debe poder alterarlo.': 'Consulting the past should never alter it.', 'Sin cambiar de fuente en silencio': 'No silent source switching',
    'Lee el agente en el que estás. Otro historial exige petición explícita (': 'Reads the current agent’s history. Another history requires an explicit request (', 'y': 'and',
    'Tras un error o un resultado vacío no salta a otro almacén ni afirma que algo no ocurrió.': 'After an error or an empty result, it never switches stores or claims something did not happen.',
    'Honestidad sobre los huecos': 'Honest about gaps', 'Límites, ficheros omitidos y resultados parciales se declaran en': 'Limits, skipped files and partial results are declared in',
    'Un vacío incompleto no es prueba de ausencia.': 'An incomplete empty result is not proof of absence.', 'código abierto': 'open source',
    'El código y las instrucciones de instalación, en': 'Code and installation instructions on',
    'Compatible con Claude Code, Codex, OpenCode, Pi, omp y Pi Pocket.': 'Works with Claude Code, Codex, OpenCode, Pi, omp and Pi Pocket.',
    'history_search · herramienta de solo lectura para historiales de agentes.': 'history_search · a read-only tool for agent histories.', 'Arriba': 'Back to top',
    'history_search: buscar en el historial de agentes · Álvaro Pastor': 'history_search: search agent history · Álvaro Pastor',
    'history_search es un helper de solo lectura para buscar en conversaciones anteriores con Claude Code, Codex, OpenCode, Pi y Pi Pocket.': 'history_search is a read-only helper for searching past conversations with Claude Code, Codex, OpenCode, Pi and Pi Pocket.'
  };
  const normalize = (text) => text.replace(/\s+/g, ' ').trim();
  const entries = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, pre, code') && node.parentElement.id !== 'prompt-instalacion') continue;
    const english = translations[normalize(node.nodeValue)];
    if (english) entries.push({ node, spanish: node.nodeValue, english });
  }
  const attributes = [];
  document.querySelectorAll('[aria-label], [alt], meta[name="description"]').forEach((element) => {
    for (const name of ['aria-label', 'alt', 'content']) {
      const spanish = element.getAttribute(name);
      if (spanish && translations[normalize(spanish)]) attributes.push({ element, name, spanish, english: translations[normalize(spanish)] });
    }
  });
  const container = document.querySelector('.cv-acciones, .nav-fila');
  if (!container) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'idioma-boton';
  container.insertBefore(button, container.querySelector('.nav-burger'));
  const cta = container.querySelector('.nav-cta');
  if (cta) {
    const actions = document.createElement('div');
    actions.className = 'nav-acciones';
    container.insertBefore(actions, cta);
    actions.append(cta, button);
  }
  const siteRoot = new URL('../', document.currentScript.src);
  const translatedPages = new Set(['', 'index.html', 'cv.html', 'herramientas/history-search.html']
    .map((path) => new URL(path, siteRoot).pathname));
  const pageLinks = [...document.querySelectorAll('a[href]')].filter((link) => {
    if (link.hasAttribute('download') || link.getAttribute('href').startsWith('#')) return false;
    const url = new URL(link.href);
    return url.origin === location.origin && translatedPages.has(url.pathname);
  });
  const requestedLanguage = () => new URL(location.href).searchParams.get('lang');
  const validLanguage = (value) => value === 'es' || value === 'en';
  let language = 'es';
  const apply = (next) => {
    language = next === 'en' ? 'en' : 'es';
    document.documentElement.lang = language;
    entries.forEach(({ node, spanish, english }) => {
      node.nodeValue = language === 'en' ? spanish.replace(/\S[\s\S]*\S|\S/, english) : spanish;
    });
    attributes.forEach(({ element, name, spanish, english }) => element.setAttribute(name, language === 'en' ? english : spanish));
    button.textContent = language === 'es' ? 'EN' : 'ES';
    button.lang = language === 'es' ? 'en' : 'es';
    button.setAttribute('aria-label', language === 'es' ? 'Switch to English' : 'Cambiar a español');
    button.title = language === 'es' ? 'English' : 'Español';
    pageLinks.forEach((link) => {
      const url = new URL(link.href);
      url.searchParams.set('lang', language);
      link.href = url.href;
    });
    try { localStorage.setItem('portfolio-language', language); } catch { /* Storage may be unavailable. */ }
  };
  button.addEventListener('click', () => {
    apply(language === 'es' ? 'en' : 'es');
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.pushState(null, '', url);
  });
  let saved;
  try { saved = localStorage.getItem('portfolio-language'); } catch { /* Spanish is the default. */ }
  const initialLanguage = validLanguage(saved) ? saved : 'es';
  apply(validLanguage(requestedLanguage()) ? requestedLanguage() : initialLanguage);
  window.addEventListener('popstate', () => {
    const requested = requestedLanguage();
    apply(validLanguage(requested) ? requested : initialLanguage);
  });
})();
