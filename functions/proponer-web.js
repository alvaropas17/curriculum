// Recibe la propuesta de una web para la lista de seguidores (marketing.alvaropastor.dev/webs/).
// No publica nada: la valida con las reglas del build y se la manda a Álvaro por correo para que
// decida. Usa las mismas variables que contacto.js: RESEND_API_KEY, FROM_EMAIL y TO_EMAIL.
import { dominio, validarWeb } from '../scripts/webs-validacion.mjs';

const json = (cuerpo, status = 200) => new Response(JSON.stringify(cuerpo), {
  status,
  headers: { 'Content-Type': 'application/json' },
});
const escapar = (texto) => texto.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  try {
    const datos = await request.json();
    // Campo trampa que un visitante no ve: si viene relleno es un bot. Se responde que sí
    // para no darle pistas, pero no se envía nada.
    if (typeof datos?.sitio_extra === 'string' && datos.sitio_extra.trim()) return json({ ok: true });

    const { ok, errores, web } = validarWeb(datos);
    if (!ok) return json({ error: errores.join(' ') }, 400);

    web.fecha = new Date().toISOString().slice(0, 7);
    const filas = [['App', web.nombre], ['Dirección', web.url], ['Usuario en X', web.autor], ['Tema', web.tema], ['Descripción', web.descripcion]]
      .map(([campo, valor]) => `<p><strong>${campo}:</strong> ${escapar(valor)}</p>`).join('');
    // El JSON va escapado: se puede copiar tal cual a proyecto/marketing-webs.json.
    const html = `${filas}<p>Para publicarla, añade esto a <code>proyecto/marketing-webs.json</code>:</p><pre>${escapar(JSON.stringify(web, null, 2))}</pre>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: env.TO_EMAIL,
        subject: `App propuesta: ${dominio(web.url)}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error('Resend error:', await res.text());
      return json({ error: 'No se pudo enviar' }, 500);
    }
    return json({ ok: true });
  } catch (e) {
    console.error('proponer-web error:', e);
    return json({ error: 'Error interno' }, 500);
  }
}
