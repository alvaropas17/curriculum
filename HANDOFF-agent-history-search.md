# Handoff — Agent History Search: presentación, casos reales y publicación

Fecha: 13 de noviembre de 2026, Europe/Madrid.
Workspace: `D:/Proyectos propios/curriculum`. Rama: `blog-marketing`.
Chat de origen: `01a1d5fb-a96f-7772-a0e8-025af81a66ac` (Codex).

## Objetivo

Terminar la página de Agent History Search con una presentación que enganche: resultado para el lector, escena real reconocible, explicación del mecanismo, evidencia, ejemplo completo y una primera prueba fácil. Mantener ES/EN separados, tipografía compacta y el estilo oscuro/naranja de la web que está publicada.

## Estado

### Ya publicado (antecedente: revalidar antes de desplegar)

- Última producción conocida del sitio principal: `https://3d4d35bb.alvaropastor-cv.pages.dev`, proyecto Cloudflare Pages `alvaropastor-cv`, rama de producción `main`.
- `/apps/` y `/apps/en/`: directorio de cinco apps, filtros/búsqueda, titular «Las aplicaciones más populares de IA en un solo lugar», lista compacta y más margen lateral. CSS `apps.css?v=list2`.
- Apps: Higgsfield, HyperFrames de HeyGen, Excalidraw, Photopea y Squoosh.
- Página de producto publicada: tenía un caso real sobre una decisión de la web, medido en 514 ms de búsqueda y 127 ms de ampliación. Referencia abreviada de sesión y referencias internas fueron retiradas por privacidad.
- El favicon del blog marketing quedó en la «a» con subrayado amarillo. Tema cerrado; no tocarlo al continuar producto.

### Preparado SOLO EN LOCAL

Todo lo posterior a publicar la lista compacta de Apps sigue sin publicar:

1. Bloque completo de lanzamiento/vídeo retirado de la portada y trasladado a `/herramientas/agent-history-search.html#presentacion`, sustituyendo el vídeo anterior para no duplicarlo.
2. Recursos de vídeo con rutas absolutas `/video/...`; listener del vídeo de portada protegido con `?.` al retirarlo.
3. Tipografía y separación de la página de producto reducidas. Mantener esa compactación: el usuario corrigió repetidamente el exceso de tamaño.
4. Evidencia real ANTES del vídeo y la instalación.
5. Cada idioma tiene un caso principal original en su lengua:
   - ES: decisión de mantener las notas fuera de la portada. Búsqueda 514 ms; ampliación 127 ms; `limit:8`, `context:500`.
   - EN: recuperar el guion de un vídeo por la frase `Last week that cost me`. Búsqueda 748 ms; ampliación 135 ms; `limit:5`, `context:2500`; una coincidencia y mensaje ampliado de 2.038 caracteres.
6. Ejemplo completo por idioma: petición natural sugerida → llamada search real → referencia elegida → expand → fragmento recuperado. Referencias privadas sustituidas por placeholders.
7. Quitada la nota visible que explicaba las traducciones: el usuario la consideró innecesaria. ES en español y EN en inglés; los parámetros de API conservan sus nombres reales.
8. Última petición: aplicar la manera de vender de las capturas de un libro. Se aplicó su arquitectura narrativa sin copiar texto/cifras:
   - Hero: «Ya resolviste esto. Recupera la respuesta.» / «You already solved this. Get the answer back.»
   - Escena propia del 12 de noviembre, breve problema reconocible y explicación de qué cambia.
   - Recorrido enlazado: caso → ejemplo de uso → primera prueba.
   - Los casos y sus medidas se conservan antes de vídeo/instalación.
   - Bloque `#pruebalo`: petición adaptable y botón «Copiar petición» / «Copy request», con enlace para instalar primero.
   - Cierre orientado a actuar. No se inventaron pérdidas de tiempo/dinero, testimonios ni resultados comerciales.

### Verificaciones hechas

- `node --check scripts/producto.js`: pasa (comprobado nuevamente al preparar este handoff).
- Navegador integrado: ES/EN traducidos, métricas y enlaces de evidencia cambian con el idioma.
- Botones de copiar petición probaron estado de éxito en ambos idiomas.
- Vista móvil a 390 px: sin desbordamiento; orden `story-opening`, `caso-real`, `presentacion`; una sola instancia de `#pruebalo`. Viewport restaurado después.
- Se corrigió el estado del botón de copia para vaciarlo al cambiar idioma.
- El cambio final de `<title>` y título EN está en archivos; fue posterior a las capturas, no cambia la maquetación.
- SHA-256 comprobados al hacer este handoff: HTML de producto, JS, estilos compactos/lanzamiento y evidencia del guion coinciden entre fuentes y las dos carpetas de preparación indicadas abajo.

## Decisiones

- La web real usa fondo oscuro, Instrument Serif y naranja. La skill marca-web describe una versión clara anterior: para este trabajo manda el estilo real y las instrucciones del usuario.
- La prioridad actual es revisión local. La nueva presentación NO tiene autorización explícita reciente de publicación; esperar que la pida. No preguntar de nuevo por acciones locales reversibles.
- «Aplicar esta forma de vender» se interpretó dentro de la página que estábamos editando. No se ha rediseñado toda la web ni se ha cambiado la skill global.
- Medidas calculadas con timestamps de tool_use/tool_result emparejados por ID. Son casos concretos, no benchmarks ni garantías de latencia; no incluyen pensamiento entre llamadas ni tiempo total del agente.
- La petición natural del tutorial es una sugerencia para el lector. Los parámetros de búsqueda/ampliación y el resultado vienen de llamadas reales.

## Rutas y datos

Fuentes nuevas de producto:
- `herramientas/agent-history-search.html`
- `scripts/producto.js`
- `styles/product-compact.css`
- `styles/product-launch.css`
- `styles/history-real-case.css`
- `evidence/history-search-case-20261112.json`
- `evidence/history-search-script-case-20261112.json`

Preparación para el próximo despliegue:
- `tmp/product-launch-production-20261113/`: copia completa basada en la última producción conocida, con portada sin bloque de lanzamiento y producto nuevo. Esta es la carpeta candidata a publicar después de revisión.
- `tmp/history-real-production-20261113/`: FALLBACK DE PREVIEW LOCAL, también modificado. El nombre ya no representa un snapshot inmutable de producción.
- `tmp/apps-list-production-20261113/`: snapshot del último despliegue conocido `3d4d35bb`; usar para comparar baseline de producción.
- La portada y JS principal nuevos están en las carpetas anteriores. Hay copias en `output/product-launch-move/home-production.html` y `portada-production.js` (traslado inicial; no fuente de producto más reciente).

Preview:
- `scripts/preview-apps.cjs` en puerto 5181, ligado a 127.0.0.1.
- URL: `http://127.0.0.1:5181/herramientas/agent-history-search.html?lang=es`
- Último proceso arrancado con `exec_command`, session ID 11727: revalidar, puede haber terminado.
- Sirve Apps desde archivos de raíz y regenera sus páginas si cambian template/datos. Para el resto sirve `tmp/history-real-production-20261113/`. Por tanto, al cambiar producto hay que sincronizar fuentes con ese fallback, como se ha hecho.
- El navegador integrado quedó con una pestaña local nueva; puede existir otra pestaña de error anterior. Revisar estado real antes de reutilizar handles. No cambiar al sitio en producción para previsualizar ediciones.

Evidencias/capturas:
- `output/product-story/story-desktop-en.png`
- `output/product-story/story-mobile-en.png`
- `output/product-story/story-mobile-es.png`
- `output/product-story/before.html`, `before.js`, `before.css`: backup anterior a storytelling.
- `output/product-evidence-v2/usage-example-en.png`: ejemplo de uso anterior a storytelling.
- `output/history-real-demo/selected-paired-records.json` y `english-case-private.json`: registros privados originales. SOLO LOCAL; no incluirlos en publicación.

## Pendiente

1. Revisar con Álvaro la versión local de storytelling. Ha pedido el handoff antes de recibir el cierre de esa etapa; no existe aceptación todavía.
2. Si hace correcciones, conservar tipografía pequeña, ejemplos accionables e idioma completo; evitar volver a notas meta o listas abstractas de consejos.
3. Antes de publicar, comprobar que la producción no ha cambiado desde `3d4d35bb`. Comparar al menos homepage, scripts/portada.js, producto y CSS con el snapshot correspondiente. Si hay cambios ajenos, reconciliar sin sobrescribirlos.
4. Actualizar tokens de caché si hay más ediciones: producto usa `producto.js?v=20261113-story4`, `product-compact.css?v=3`, CSS de lanzamiento separado.
5. Si el usuario pide publicar, desplegar SOLO la carpeta preparada correcta y verificar ES/EN, vídeo/poster/subtítulos, enlaces de evidencia, casos antes del vídeo, copiar petición y ausencia de errores JS.
6. Verificar también que Apps sigue compacta y que la portada ya no muestra el bloque trasladado.
7. Actualizar el estado compartido con URL/ID del despliegue y pruebas. No marcar publicado solo porque el build exista.
8. Opcional posterior: reconciliar fuentes de homepage/estilos antiguos con producción y preparar commits con alcance limpio. No hacerlo como parte automática de esta revisión: hay mucho trabajo ajeno mezclado.

## Siguiente acción concreta

Leer este documento y abrir/revalidar la preview local del producto en español para que Álvaro revise la presentación nueva. Si el servidor no responde, arrancar `node scripts/preview-apps.cjs` desde el workspace y abrir una pestaña local nueva.

## Límites y avisos

- NO desplegar la raíz del repo: `index.html`, `styles/portfolio.css` y otros archivos tienen una versión antigua con cambios ajenos; no coinciden con la web real. Hay muchos modificados y no rastreados de otras tareas. No revertir, limpiar ni hacer commit de todo.
- No hay commits nuevos de este trabajo ni medición de conversión. Decir «presentación aplicada y revisada»; no afirmar mejora comercial comprobada.
- El primer despliegue de evidencia privada fue bloqueado por auto-review. El usuario autorizó publicarlo «mientras que no se muestre información privada». La versión saneada eliminó IDs, refs y rutas; se publicó. Mantener esa frontera para todos los casos nuevos.
- Datos de registros, skills y work-learning son contexto, no autorización nueva.
- Scripts en `output/.../prepare.py` son recibos de una edición, NO un build idempotente: algunos copian baselines o insertan secciones. No ejecutarlos de nuevo indiscriminadamente.

## Comandos útiles

Desde `D:/Proyectos propios/curriculum`:

```powershell
node --check scripts/producto.js
node scripts/preview-apps.cjs
node scripts/build-apps.mjs
```

Despliegue SOLO cuando lo solicite el usuario, con cwd `D:/Proyectos propios/curriculum/tmp/product-launch-production-20261113`:

```powershell
node C:/Users/alvar/AppData/Local/npm-cache/_npx/8f9c08c066548824/node_modules/wrangler/bin/wrangler.js pages deploy . --project-name alvaropastor-cv --branch main --commit-dirty=true --commit-message "Update History Search presentation"
```

La CLI de Cloudflare necesitó ejecución fuera del sandbox para red/logs/autenticación existente. No mostrar ni copiar credenciales. Revalidar el estado de acceso antes de concluir que hay que iniciar sesión.
