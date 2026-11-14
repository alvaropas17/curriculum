# Imagen de portada estilo $100M Offers

Referencia: páginas de *$100M Offers* que Álvaro pasó en Codex (13 nov 2026): viñetas dibujadas a mano en marcos negros gruesos, muñecos de palitos, rotulador rojo («YOU ARE HERE!»), flechas, y pruebas reales (tablas, capturas).

Receta (funcionó en la tarjeta del caso portada):
- Lienzo 1600×900 blanco. Titular arriba en `Permanent Marker` negro + giro en rojo `#d8231f` («Mismo producto. *Otra portada.*»). No repetir el título de la tarjeta.
- Dos viñetas con marco negro de 7px: «ANTES: cifras» / «DESPUÉS: lo que ganas» en `Caveat`.
- Dentro, capturas REALES (antes en gris, después en color).
- Rotulador rojo: elipse rodeando lo que falla y lo que funciona, flechas SVG hacia frases cortas («¿Y yo qué gano?», «¡ESTO lo quiero!»).
- Muñeco de palitos SVG: triste con «???» en el antes; brazos arriba y sonrisa en el después.
- Render: Chrome headless `--headless=new --allow-file-access-from-files --virtual-time-budget=4000 --window-size=1600,900 --screenshot=...` (fuera del sandbox para cargar Google Fonts). Convertir a webp con PIL (quality 88).
- En la tarjeta: `object-fit:contain`, fondo blanco y `aspect-ratio:16/9`, para que no se corte el titular dibujado; añadir `?v=N` al src al cambiarla.

Plantilla HTML usada: `D:/Proyectos propios/curriculum/tmp/cover/hormozi.html`.
