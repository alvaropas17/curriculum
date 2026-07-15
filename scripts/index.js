(() => {
  const indicePanoramico = document.querySelector('.indice-4k');
  if (!indicePanoramico) return;

  const seccionesIndice = [...indicePanoramico.querySelectorAll('a')]
    .map((enlace) => ({ enlace, seccion: document.querySelector(enlace.getAttribute('href')) }))
    .filter(({ seccion }) => seccion);

  const actualizarIndice = () => {
    let activa = seccionesIndice[0];
    seccionesIndice.forEach((item) => {
      if (item.seccion.getBoundingClientRect().top <= window.innerHeight * 0.42) activa = item;
    });
    seccionesIndice.forEach((item) => item.enlace.classList.toggle('activo', item === activa));
  };

  window.addEventListener('scroll', actualizarIndice, { passive: true });
  actualizarIndice();
})();

/* --- Formulario de contacto en el footer --- */
document.addEventListener('submit', async (e) => {
  const form = e.target.closest('#form-contacto');
  if (!form) return;
  e.preventDefault();

  const btn = form.querySelector('button');
  const msjEl = form.querySelector('.pie-forma-msj') || (() => {
    const el = document.createElement('p');
    el.className = 'pie-forma-msj';
    form.appendChild(el);
    return el;
  })();

  msjEl.className = 'pie-forma-msj';
  msjEl.textContent = '';
  btn.textContent = 'Enviando…';
  btn.disabled = true;

  try {
    const res = await fetch('/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email.value,
        empresa: form.empresa.value,
      }),
    });

    if (!res.ok) throw new Error('Error al enviar');

    msjEl.className = 'pie-forma-msj ok';
    msjEl.textContent = 'Enviado ✓';
    form.email.value = '';
    form.empresa.value = '';
  } catch {
    msjEl.className = 'pie-forma-msj error';
    msjEl.textContent = 'Error al enviar. Intenta de nuevo.';
  } finally {
    btn.textContent = 'Enviar';
    btn.disabled = false;
  }
});
