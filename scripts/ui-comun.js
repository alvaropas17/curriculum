(() => {
  const botonMenu = document.querySelector('#boton-menu');
  const menuMovil = document.querySelector('#menu-movil');

  if (botonMenu && menuMovil) {
    botonMenu.addEventListener('click', () => {
      const abierto = menuMovil.classList.toggle('abierto');
      botonMenu.setAttribute('aria-expanded', String(abierto));
    });

    menuMovil.querySelectorAll('a').forEach((enlace) => {
      enlace.addEventListener('click', () => {
        menuMovil.classList.remove('abierto');
        botonMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const elementosRevelar = document.querySelectorAll('.revelar');
  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!movimientoReducido && 'IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    elementosRevelar.forEach((elemento) => observador.observe(elemento));
  } else {
    elementosRevelar.forEach((elemento) => elemento.classList.add('visible'));
  }
})();
