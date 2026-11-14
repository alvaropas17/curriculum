---
name: vender-como-hormozi
description: Reescribir una página web, artículo, tarjeta de blog, portada o imagen de portada para que provoque la entrada, con el formato de Alex Hormozi — títulos con patrones de sus vídeos más vistos («Dame N minutos y te enseño…», «Si eres X, lee esto», «Hice X a N personas. Pasó Y»), entradilla centrada en el lector, error con nombre propio, un solo botón, índice de promesas, oferta concreta al cierre, y miniaturas dibujadas a mano estilo $100M Offers (muñecos de palitos, rotulador rojo, antes/después). Usar cuando Álvaro pida «hazlo más magnético», «que quieran entrar», «véndelo mejor», «como Hormozi», «título llamativo», «imagen de portada que provoque», o mejorar el copy de una página de marketing.alvaropastor.dev o similar.
---

# Vender como Hormozi

Método probado en marketing.alvaropastor.dev (14 nov 2026): portada del blog, caso `/portada/` y TFG `/tfg/`. A Álvaro le encantó el resultado («esto es jesucristo»). Aplica el método entero, no solo el título.

Referencias: patrones de títulos con vistas reales en [references/titulos.md](references/titulos.md); estilo visual de $100M Offers y plantilla de imagen en [references/imagen.md](references/imagen.md).

## Regla de oro: el título promete, la página cumple

Un título magnético que la página no cumple quema la confianza. Tras cambiar el título, revisa que la entradilla, el índice y el cierre entreguen lo prometido. Nunca inventes resultados: si no hay datos de conversión, no digas que vende más; un título puede nombrar el problema del lector («por qué tu portada no vende») sin afirmar lo que tu cambio logró.

## Orden de trabajo

1. **Lee la página entera** (texto plano del HTML construido) y apunta qué promete cada titular.
2. **Título** con un patrón de [titulos.md](references/titulos.md). Propón 3–4, recomienda uno; si Álvaro elige, aplícalo en: `<h1>`, `<title>`, `og:title`, el título que pone el JS al cambiar de idioma, y la tarjeta que enlaza a la página.
3. **Los seis cambios de página** (abajo).
4. **Coherencia de cifras**: si el título usa una cifra (169) y otro texto usa otra (311), reescribe para que no parezca contradicción («se los envié a 311 y 169 respondieron»).
5. **Spoilers**: si la página tiene apuestas o juegos, avisa si el título revela la respuesta; decide con Álvaro.
6. **Versión en inglés** de todo (data-en, diccionario EN o lista de traducciones del JS).
7. Build, test, revisión en navegador (escritorio, móvil sin scroll horizontal, EN, consola) y publicar solo si Álvaro lo pidió en la conversación.

## Los seis cambios de página

1. **Entradilla sobre el lector, no sobre ti.** Mal: «Construyo herramientas que…». Bien: «Casi todas las portadas fallan por lo mismo: … A mí me pasó con la mía. Aquí tienes X real y una prueba de cinco segundos para la tuya.»
2. **Ponle nombre al error** (Hormozi nombra todo: «Grand Slam Offer»). Ej.: «cifras de escaparate» = cifras que solo entiende quien ya sabe lo que hay detrás. Úsalo en titular de sección, en la frase giro y en la prueba final.
3. **Un solo botón arriba**, con lo que gana: «Ver por qué no vende ↓», «Baja y haz la primera apuesta». Dos botones compiten (y contradicen la regla «un solo paso siguiente»).
4. **Índice y titulares de sección como promesas**, no etiquetas: «Cómo lo hice» → «Cómo cambiarla sin saber diseño»; «Cuatro decisiones» → «4 reglas que puedes copiar hoy»; «Pruébalo» → «La prueba de 5 segundos»; «¿Sientes como los demás?» → «¿Sientes como 169 personas? Compruébalo en un minuto».
5. **Anuncia el regalo arriba**: lo que se lleva el lector (prueba, plantilla, test) va en la entradilla o la etiqueta del hero: «5 minutos · 3 apuestas · 3 reglas para tu próximo anuncio».
6. **Oferta concreta al cierre**: no «Cuéntamelo por X» sino «Mándame tu portada y te digo qué cifra de escaparate quitaría primero». Compromete tiempo de Álvaro: menciónaselo.

Conserva las secciones honestas («Lo que no demuestra», «aviso honesto»): hacen creíble lo demás.

## Tarjetas de blog

Cada tarjeta: título con patrón + resumen que repita el error con nombre + botón con resultado («Ver qué respondieron →» mejor que «Leer el estudio →»). Próximamente: «Cómo hacer que tu marca sea la palabra que usa todo el mundo» (resultado concreto, sin revelar el juego).

## Imagen de portada

Estilo pizarra de $100M Offers, nunca una captura bonita sin más. Ver [imagen.md](references/imagen.md).

## Límites

- acquisition.com prohíbe automatizar o guardar sus cursos: no transcribir. Los títulos públicos de YouTube sí se pueden leer (yt-dlp `--flat-playlist` o ego-browser).
- Álvaro se presenta como desarrollador; esta skill es para sus piezas de marketing y para vender su trabajo, no para cambiar su posicionamiento.
