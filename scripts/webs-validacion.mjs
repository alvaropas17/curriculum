// Reglas de la lista de webs de seguidores. Las usan el build, el script para añadir
// webs y la función que recibe las propuestas, para que una sola definición decida qué entra.
// Por ahora solo entran dos temas. Para abrir otro, basta con añadirlo aquí.
export const TEMAS = [
  { id: 'ia', nombre: 'Inteligencia artificial' },
  { id: 'tecnologia', nombre: 'Tecnología' },
];

const limpio = (valor) => (typeof valor === 'string' ? valor.replace(/\s+/g, ' ').trim() : '');

// Devuelve { ok, errores, web }. `web` es la entrada normalizada, sin campos desconocidos.
export function validarWeb(entrada, { exigirFecha = false } = {}) {
  const errores = [];
  const nombre = limpio(entrada?.nombre);
  const descripcion = limpio(entrada?.descripcion);
  const tema = limpio(entrada?.tema);
  let autor = limpio(entrada?.autor).replace(/^@/, '');
  const fecha = limpio(entrada?.fecha);

  if (nombre.length < 2 || nombre.length > 60) errores.push('El nombre debe tener entre 2 y 60 caracteres.');
  if (descripcion.length < 10 || descripcion.length > 160) errores.push('La descripción debe tener entre 10 y 160 caracteres.');
  if (/[<>]/.test(nombre + descripcion)) errores.push('No se admite HTML en el nombre ni en la descripción.');
  if (!TEMAS.some((t) => t.id === tema)) errores.push(`El tema debe ser uno de: ${TEMAS.map((t) => t.id).join(', ')}.`);
  if (!/^[A-Za-z0-9_]{1,15}$/.test(autor)) errores.push('El usuario de X no es válido (1 a 15 letras, números o guion bajo).');
  if (fecha ? !/^\d{4}-(0[1-9]|1[0-2])$/.test(fecha) : exigirFecha) errores.push('La fecha debe tener el formato AAAA-MM.');

  let url = '';
  try {
    const parsed = new URL(limpio(entrada?.url));
    const host = parsed.hostname;
    const privado = host === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(host) || host.includes(':') || !host.includes('.') || host.endsWith('.local');
    if (parsed.protocol !== 'https:') errores.push('La dirección debe usar https.');
    else if (parsed.username || parsed.password) errores.push('La dirección no puede llevar usuario ni contraseña.');
    else if (privado) errores.push('La dirección debe ser un dominio público.');
    else url = parsed.href;
  } catch {
    errores.push('La dirección no es una URL válida.');
  }

  const web = { nombre, url, autor: `@${autor}`, tema, descripcion };
  if (fecha) web.fecha = fecha;
  return { ok: errores.length === 0, errores, web };
}

// Dominio sin «www.», que es lo que se enseña en la tarjeta y sirve para detectar repetidas.
export const dominio = (url) => new URL(url).hostname.replace(/^www\./, '');

// Valida la lista completa: cada entrada y que no haya dos webs del mismo dominio.
export function validarLista(webs) {
  if (!Array.isArray(webs)) return { ok: false, errores: ['El fichero debe contener una lista.'], webs: [] };
  const errores = [];
  const vistos = new Set();
  const normalizadas = webs.map((entrada, i) => {
    const r = validarWeb(entrada, { exigirFecha: true });
    r.errores.forEach((e) => errores.push(`#${i + 1} ${entrada?.nombre ?? ''}: ${e}`));
    if (r.web.url) {
      const d = dominio(r.web.url);
      if (vistos.has(d)) errores.push(`#${i + 1} ${r.web.nombre}: el dominio ${d} ya está en la lista.`);
      vistos.add(d);
    }
    return r.web;
  });
  return { ok: errores.length === 0, errores, webs: normalizadas };
}
