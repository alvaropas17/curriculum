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
