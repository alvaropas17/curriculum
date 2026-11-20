# Web accesible en días de partido

Los días de fútbol, Movistar, Digi, Vodafone, Orange y MásMóvil bloquean IPs de Cloudflare por orden de LaLiga. `alvaropastor.dev` resuelve a 188.114.96.5 y 188.114.97.5, y esas dos IPs han caído unas 18 veces en cada operador entre septiembre y noviembre de 2026 (datos de hayahora.futbol).

## Cómo queda montado

```
Normal:    visitante → Cloudflare (nube naranja) → Netlify
Bloqueo:   visitante → Netlify directo (nube gris)
```

- **Netlify** aloja las dos webs y el formulario (`netlify.toml`, `netlify/functions/contacto.mjs`, `netlify/marketing/netlify.toml`).
- **Cloudflare** sigue llevando el DNS y hace de proxy el resto del tiempo.
- **Este Worker** (`laliga-failover`) se ejecuta cada 2 minutos. Mira si las IPs de Cloudflare de la zona están en `hayahora.futbol/estado/blocked-any.txt`:
  - Si están bloqueadas, pone en gris `alvaropastor.dev`, `www` y `marketing`, con TTL de 60 s.
  - Cuando llevan 15 minutos sin bloqueo, vuelve a ponerlas en naranja.
  - Solo cambia el proxy, nunca el destino. Deja su estado en el comentario del registro (`laliga-failover: …`).
  - No toca un gris que hayas puesto a mano ni un registro que apunte a `*.pages.dev`.
  - Si hayahora no responde, no cambia nada.
- **Pages ya no se usa.** Si el DNS deja de apuntar a Pages, el dominio se desactiva y da errores al volver (lo dice la documentación de Pages). Por eso no se alterna entre Pages y Netlify.

## 1. Netlify (tú)

1. Crea la cuenta y elige **Add new project → Import an existing project → GitHub → `alvaropas17/curriculum`**.
   - Rama: la misma que publica hoy Pages.
   - El resto lo lee de `netlify.toml`: publica la raíz tal cual, sin build.
2. En **Project configuration → Environment variables** añade `RESEND_API_KEY`, `FROM_EMAIL` y `TO_EMAIL`, con los mismos valores que en el proyecto de Pages.
3. Crea un **segundo proyecto** con el mismo repo para marketing. En **Build settings**, pon **Base directory = `netlify/marketing`**. El comando y la carpeta los toma de `netlify/marketing/netlify.toml`.
4. Prueba las dos en su dirección `*.netlify.app`, incluido el formulario de contacto.

## 2. Pasar el dominio a Netlify (en Cloudflare y Netlify)

1. Cloudflare → `alvaropastor.dev` → **SSL/TLS → Overview**: modo **Full (strict)**.
2. En Netlify:
   - Web principal: **Domain management → Add domain → `alvaropastor.dev`**. Ya incluye `www`.
   - Proyecto de marketing: añade `marketing.alvaropastor.dev`.
3. Cloudflare → **DNS**. Cambia estos tres registros y déjalos **en gris** de momento:

   | Nombre | Tipo | Destino |
   |---|---|---|
   | `alvaropastor.dev` | CNAME | `<tu-web>.netlify.app` |
   | `www` | CNAME | `<tu-web>.netlify.app` |
   | `marketing` | CNAME | `<tu-marketing>.netlify.app` |

4. Espera a que Netlify muestre el certificado en **Domain management → HTTPS**. Suelen ser unos minutos.
5. Pon los tres registros **en naranja**.
6. En el proyecto de Pages, quita los dominios personalizados. Ya aparecerán como inactivos.

Netlify renueva su certificado cuando ve su propio DNS, y lo ve cada fin de semana de partido, mientras los registros están en gris.

## 3. El Worker

1. Crea un token: Cloudflare → **My Profile → API Tokens → Create Token** → plantilla **Edit zone DNS**. En **Zone Resources** elige **Include → Specific zone → `alvaropastor.dev`**.
2. Copia el **Zone ID** (Overview de `alvaropastor.dev`, columna derecha) en `wrangler.toml`, en `ZONE_ID`.
3. En esta carpeta:

   ```bash
   npx wrangler login
   npx wrangler secret put CF_API_TOKEN
   npx wrangler deploy
   ```

   - `login` vuelve a pedir permisos: hoy falta `zone:read`.
   - `secret put` te pide pegar el token. Así no queda en ningún fichero.
4. Abre `https://estado.alvaropastor.dev`. Enseña en JSON las IPs, si hay bloqueo y qué haría, sin cambiar nada.

## Uso diario

- Ver lo que hace: `npx wrangler tail`, o los logs del Worker en el panel.
- Forzar un modo: en `wrangler.toml` pon `MODO = "gris"` o `MODO = "naranja"` y ejecuta `npx wrangler deploy`. Para volver al automático, `MODO = "auto"`.
- Pruebas: `npm test`.
