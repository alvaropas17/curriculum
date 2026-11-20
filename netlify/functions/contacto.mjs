// Formulario de contacto en Netlify. Reutiliza la misma función que Cloudflare Pages
// (functions/contacto.js) para que solo haya una versión de la lógica.
// Variables en Netlify: RESEND_API_KEY, FROM_EMAIL, TO_EMAIL.
import { onRequest } from '../../functions/contacto.js';

export default (request) => onRequest({ request, env: process.env });

export const config = { path: '/contacto' };
