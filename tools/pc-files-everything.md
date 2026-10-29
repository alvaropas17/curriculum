# `pc-files-everything`

Skill y helper para responder preguntas sobre ficheros de todo el PC sin saber en
qué carpeta están.

- Skill: `C:\Users\alvar\.agents\skills\pc-files-everything\` (`SKILL.md`, `README.md`).
- Helper: `scripts\pc-files-everything.py` (wrapper: `pc-files-everything.cmd`).
- No tiene índice propio: consulta el índice de Everything (HTTP en
  `127.0.0.1:8080`) y cae a un recorrido del sistema de archivos (`walk`) como
  respaldo.

## Qué aporta

**Responde preguntas, no listados.** Seis verbos cubren las preguntas habituales:
`exists` (¿existe la ruta?), `where` (¿dónde está?), `count` (¿cuántos, cuánto ocupan,
cuál es el más reciente?), `newest` (los N más recientes), `find` (como `where` con
filtros de fecha) y `group` (agrupado por extensión o carpeta). La salida son hechos
agregados o rutas acotadas, nunca un volcado que hay que resumir después.

**Rapidez donde `find` no llega.** El índice resuelve barridos amplios en
milisegundos: medido 0,2–0,9 s por consulta frente a ~2 s del recorrido, y casos como
2 339 `.ps1` bajo `HOME` en 0,1 s frente a un `find` que no terminó en 150 s.

**Varias preguntas por llamada.** `--also` agrupa subconsultas y `--brief` devuelve
solo el valor pedido. Medido: 4 preguntas en una llamada, unos 140 tokens y 0,2 s.

**Procedencia explícita.** La salida normal indica `SOURCE=index|walk`. Si se usa el
respaldo, se conserva `INDEX_DOWN=1` incluso con `--brief`: no hay degradación
silenciosa. Tampoco se ocultan `INCOMPLETE=1`, `ERROR=` ni `PRUNED_DIRS=`.

**Coherencia entre backends.** `--name` viaja al índice como `wfn:` y además se
verifica con `fnmatch` en Python, así que índice y recorrido aplican el mismo criterio
de nombre. Los agregados de `count` y `group` enumeran el conjunto completo e ignoran
`--cap`; si superan el techo de enumeración devuelven error en vez de un total
parcial.

**Recorrido sensato.** El `walk` poda por nombre exacto de carpeta (`node_modules`,
`.git`, `__pycache__`, `.venv`, `windows`, `winsxs`, `$recycle.bin`, y
`debug`/`release` solo bajo `target/`), no por subcadena, y publica cuántas carpetas
podó.

**Lectura dentro de candidatos.** `content` aplica una regex solo a los ficheros que
acota el índice: búsqueda de contenido sin barrer el disco entero.

**Tolerancia a erratas opcional.** `--typos` sugiere nombres parecidos cuando la
búsqueda exacta no da nada. Es opt-in, solo para `where`/`find`, se etiqueta como
sugerencia y nunca se presenta como identidad ni como ausencia probada.

## Límites reales

- No sustituye a `grep`/`rg` para buscar texto dentro de un repositorio, ni a
  `where.exe`, `git ls-files`, `npm root -g` o `reg query` para lo que no es disco.
- `exists` se responde contra el sistema de archivos, no contra el índice: Everything
  no es autoritativo para "no existe".
- Las raíces amplias (`C:\`, `D:\`, `HOME`, `APPDATA`, `ProgramFiles`…) se deniegan
  si la consulta no lleva discriminador (`--name`, `--filter`, `--pattern`, `--since`,
  `--until`).
- El índice solo cuenta ficheros: las carpetas no entran en recuentos, bytes, más
  recientes ni grupos.
- El índice no poda, así que en árboles con `node_modules` índice y recorrido
  divergen a propósito; no toda diferencia es un fallo.
- `--typos` exige índice disponible y puede devolver `INCOMPLETE=1`; cero sugerencias
  incompletas no demuestra ausencia.
- Para tamaño acumulado por carpeta o inventarios de espacio, la skill remite a
  WizTree.

## Cuándo usarla

- "¿Cuántos X hay en tal carpeta?", "¿dónde está el archivo Y?".
- "¿Cuál es el más reciente?", "¿existe esta ruta?".
- Cuando `glob` no sirve porque no se sabe la carpeta.
- Antes de escribir un sondeo nuevo para localizar ficheros.
