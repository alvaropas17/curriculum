# Sistema de contenido: cómo mejora solo

## Archivos
- `referentes/*.md`: una ficha por pieza ajena que funcionó (cifras, pieza, por qué, qué copiar).
- `patrones.md`: los patrones vigentes, cada uno con sus pruebas y su resultado.
- `registro.csv`: cada pieza propia publicada.

## Registro de cada pieza propia
`fecha,red,url,patron,objetivo,hipotesis,vistas,guardados,envios,respuestas,visitas_perfil,clics,seguidores_ganados,nota`

- `patron`: el nombre en `patrones.md` (p. ej. `enemigo-slop`, `personaje-queja`, `traduccion-guia`).
- `objetivo`: `alcance` o `venta`.
- `hipotesis`: qué esperas y por qué, antes de publicar. Sin hipótesis no hay aprendizaje.
- Las métricas se toman a las 48 h.

## Métricas que deciden
- Alcance: (guardados + envíos) / vistas. Los likes no cuentan.
- Venta: visitas al perfil, clics y mensajes directos por cada 1.000 vistas.
- Siempre se compara con **tu propia mediana** de las últimas 4 semanas, nunca con la cuenta de otro.

## Ciclo semanal (domingo, 30 min)
1. **Medir**: rellenar las métricas a 48 h de las piezas de la semana.
2. **Juzgar cada patrón** que lleve 3 o más pruebas:
   - mediana ≥ 2× tu mediana → **se queda** y sube su cuota;
   - entre 1× y 2× → otra prueba, cambiando una sola cosa;
   - < 1× tras 3 pruebas → **se descarta** y se anota por qué.
3. **Un experimento por semana**: cambia una sola variable (gancho, formato, hora o personaje), no todo a la vez.
4. **Buscar referentes nuevos**: 3–5 piezas que hayan funcionado esa semana en tu tema. Salen de quien cita o responde a los referentes que ya tienes, de lo que es tendencia en GitHub y de las noticias de IA.
5. **Reutilizar**: tu 10 % mejor pasa a otra red (hilo, reel, LinkedIn, nota en la web).
6. **Actualizar** `patrones.md` con lo aprendido.

## Reglas
- Una pieza ajena es una pista; tres pruebas propias son un patrón.
- Copiar la estructura, nunca el personaje, el dibujo ni el texto.
- Si un patrón deja de funcionar dos semanas seguidas, vuelve a prueba.

## De X a la web y al resto de redes (17 nov 2026)

X es el laboratorio: publicar ahí cuesta poco y se mide en 48 h. Solo lo que gana pasa a la web y a otras redes.

### Qué formato usar según lo que quieres
| Quiero… | Patrón | Skill |
|---|---|---|
| Que lo envíen (alcance) | `noticia-24h` con una metáfora, el mismo día | `explicar-por-dentro` (A) |
| Que lo guarden y lo envíen | `por-dentro` | `explicar-por-dentro` |
| Respuestas y seguidores que vuelvan | `serie-tu-decides` | `historia-elige-final` |
| Guardados con poco esfuerzo | `aceptarias` | `historia-elige-final` |
| Una pieza de referencia | `guia-escalones` (hilo numerado) | `explicar-por-dentro` (C) |

Primera línea con `desire-hooks`; revisión final con la lista de `contenido-compartible`.

### Semana tipo (1 pieza al día; el resto, respuestas a cuentas grandes)
- **Lunes:** `por-dentro` sobre algo de IA o desarrollo que la gente usa (agentes, MCP, memoria de los chats, por qué alucina).
- **Martes:** episodio de `serie-tu-decides` con encuesta de X de 24 h. Idea: «Acabas de lanzar tu SaaS. 0 usuarios. 30 días de ahorro.»
- **Miércoles:** `noticia-24h` si hay noticia (caída, lanzamiento, filtración). Si no la hay, `mito-viral` de IA o marketing.
- **Jueves:** siguiente episodio de la serie, que abre con el resultado de la votación.
- **Viernes:** `aceptarias` (por ejemplo, un agente que trabaja mientras duermes).
- **Sábado:** `guia-escalones`: hilo que junta lo de la semana.
- **Domingo:** ciclo semanal de arriba (medir, juzgar, un experimento).

Si un día hay noticia grande, va la noticia y se mueve lo demás.

### Del tuit ganador a la web y a otras redes
Ganador = (guardados + envíos) / vistas ≥ 2× tu mediana, a las 48 h.
1. **Web** (marketing.alvaropastor.dev/notas). Una entrada ampliada con:
   - las fuentes;
   - la prueba con `<details>`;
   - la plantilla o las reglas, copiables;
   - el botón «Envíaselo a…»;
   - la imagen OG.
   La serie se publica como una sola página con todos los episodios y el resultado de cada votación.
2. **Instagram:** reel o carrusel con el mismo texto. Tipografía animada con la palabra clave resaltada y un dibujo fijo (estilo speedy_devv o saveo). Navegar despacio con la cuenta.
3. **LinkedIn, opcional:** la versión `por-dentro` o `noticia-24h` con un párrafo de lección profesional.
4. **Vuelta a X:** responder al tuit original con el enlace a la entrada. Nunca poner el enlace en el primer tuit.

### Cosas que no se negocian
- Cifras con fuente. Si no se puede comprobar, no se pone.
- Si la historia es inventada, que se note. Si se presenta como real, que haya pasado.
- La parte 2 se publica siempre. Con menos de 20 votos se decide igual y se dice el número real.
- La estructura se copia. El personaje, el dibujo y el texto, nunca.
