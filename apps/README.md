# Directorio personal de aplicaciones

Datos: `data/apps-directory.json`. Cada entrada tiene nombre, URL oficial, categoría y textos `es`/`en` (descripción, uso y tipo). `source` conserva la referencia oficial consultada.

Generar ambas páginas: `node scripts/build-apps.mjs`.

Fuentes: `apps/template.html`, `scripts/apps.js`, `styles/apps.css` y `apps/home-section.html`.

Rutas: `/apps/` y `/apps/en/`. `?lang=en` en `/apps/` abre la versión inglesa. La búsqueda y categoría viajan en la URL y se conservan al cambiar de idioma.

Publicación de esta etapa: `tmp/apps-directory-production-20261113`, partiendo de la versión anterior publicada. La raíz local conserva un `index.html` distinto con trabajo ajeno: no publicar toda la raíz ni sustituirlo por el staging. La portada y su diccionario inglés actualizados están en `output/apps-directory/home-production.html` y `output/apps-directory/portada-production.js` hasta reconciliar las fuentes del sitio principal.

El catálogo anterior de seguidores (`proyecto/marketing-webs.json`) y su función de propuestas no alimentan este directorio. Se conservan para no modificar el trabajo independiente de marketing.
