# `history_search`

Herramienta nativa de Pi Pocket para buscar en conversaciones anteriores.

- Código: `C:\Users\alvar\dev\pi-pocket\src\server\history-tool.ts` (registro en `src\server\reload.ts`, pruebas en `test\history-tool.test.ts`).
- Datos: `C:\Users\alvar\.pi-pocket\pocket.sqlite` (con `-wal`/`-shm`).
- Otras fuentes (`pi`, `omp`, `opencode`): delega en `~\.agents\skills\shared-scripts\scripts\history-route.py`.

## Qué aporta

**Recupera contexto ya pagado.** Evita volver a preguntar al usuario cosas que ya
explicó, y evita repetir trabajo cuya decisión, ruta o convención ya quedó escrita
en una conversación anterior. Es la vía barata frente a reconstruir historial a mano
o leer ficheros de sesión completos.

**Fuente correcta por defecto.** El host es la instancia de Pocket actual, también
para subagentes, con independencia del directorio de trabajo o del modelo. Eso evita
el error clásico de buscar en el almacén equivocado y concluir que una conversación
no existió.

**Búsqueda acotada, no volcado.** Filtra por texto, fechas, conversación, modelo,
proveedor, esfuerzo de razonamiento y uso de herramientas. Los filtros son exactos y
se combinan, así que sirve tanto para "¿dónde hablamos de X?" como para preguntas
agregadas: qué conversaciones usaron cierta herramienta más de N veces, o dónde hubo
fallos de una herramienta concreta.

**Evidencia con procedencia.** Devuelve entradas identificadas que se pueden expandir
por ID, con contexto limitado. Permite citar lo que se dijo sin confundirlo con el
estado actual del sistema.

**Auditoría sin efectos secundarios.** Es de solo lectura: no modifica historiales,
no refresca índices ni los reconstruye. Los recuentos agregados completos que su
interfaz no cubre se pueden obtener con consultas directas de solo lectura, dejando
constancia de esa limitación.

**Reglas que evitan conclusiones falsas.** Un resultado vacío o un error no autoriza
a cambiar de almacén en silencio ni a afirmar que algo no ocurrió; se puede repetir
la búsqueda acotando más. Las observaciones de configuración no tienen marca de
tiempo real y no prueban el esfuerzo de razonamiento generado. La rama activa no se
verifica.

## Límites reales

- En Pocket hace falta al menos un criterio: `query`, `entry`, intervalo de fechas,
  `toolUses`, `toolCalls`, `model`, `provider` o `thinkingEffort`. `conversation`
  solo estrecha, no inicia la búsqueda.
- `model`, `provider`, `thinkingEffort`, `toolUses` y `toolCalls` son exclusivos de
  Pocket; el filtro de modelo/proveedor se aplica al mismo mensaje del asistente.
- Para `pi`, `omp` y `opencode` se exige `query` y un `sourceReason` que justifique
  la petición explícita del usuario.
- `toolUses` cuenta llamadas almacenadas, incluidas las fallidas o bloqueadas, no
  menciones en el texto.
- Cada conversación de subagente es un registro aparte.

## Cuándo usarla

- "¿Qué hablamos antes de X?", "recupera la decisión sobre Y".
- "¿Por qué elegimos esta ruta o este comando?".
- "¿Qué conversaciones fallaron con esta herramienta?".
- Antes de afirmar que un tema nunca se trató.
