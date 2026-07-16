(() => {
  const capturas = [
    { src: '../img/ludoscript-home.png', etiqueta: 'Home', alt: 'LudoScript Home', texto: 'Home la puerta de entrada a la plataforma.' },
    { src: '../img/ludoscript-quiz.png', etiqueta: 'Quiz', alt: 'Quiz de LudoScript', texto: 'Quiz preparación y práctica con preguntas.' },
    { src: '../img/ludoscript-resultado-final.png', etiqueta: 'Resultados', alt: 'Resultado final de LudoScript', texto: 'Resultados feedback tras completar la sesión.' },
    { src: '../img/progreso.png', etiqueta: 'Progreso', alt: 'Panel de progreso de LudoScript', texto: 'Progreso seguimiento de evolución y puntos débiles.' },
    { src: '../img/aprendizaje.png', etiqueta: 'Aprendizaje', alt: 'Pantalla de aprendizaje de LudoScript', texto: 'Aprendizaje repaso de conceptos dentro del flujo.' }
  ];

  const galeriaImagen = document.querySelector('#galeria-imagen');
  const galeriaEtiqueta = document.querySelector('#galeria-etiqueta');
  const galeriaTitulo = document.querySelector('#galeria-titulo');
  const galeriaPuntos = document.querySelector('#galeria-puntos');
  const lightbox = document.querySelector('#lightbox');
  const lightboxImagen = document.querySelector('#lightbox-imagen');
  const galeriaMarco = document.querySelector('.galeria-marco');
  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!galeriaImagen || !galeriaEtiqueta || !galeriaTitulo || !galeriaPuntos || !lightbox || !lightboxImagen || !galeriaMarco) return;

  let indiceActivo = 0;
  let temporizadorGaleria;
  const intervaloGaleria = 3600;

  const mostrarCaptura = (indice) => {
    indiceActivo = (indice + capturas.length) % capturas.length;
    const captura = capturas[indiceActivo];
    const puntos = galeriaPuntos.querySelectorAll('.galeria-punto');

    puntos.forEach((punto, posicion) => punto.classList.toggle('activo', posicion === indiceActivo));
    galeriaImagen.style.opacity = '0';

    window.setTimeout(() => {
      galeriaImagen.src = captura.src;
      galeriaImagen.alt = captura.alt;
      galeriaEtiqueta.textContent = captura.etiqueta;
      galeriaTitulo.textContent = captura.texto;
      lightboxImagen.src = captura.src;
      lightboxImagen.alt = captura.alt + ' ampliado';
      galeriaImagen.style.opacity = '1';
    }, 120);
  };

  const detenerAutoplayGaleria = () => window.clearInterval(temporizadorGaleria);
  const iniciarAutoplayGaleria = () => {
    if (movimientoReducido || lightbox.classList.contains('abierto')) return;
    detenerAutoplayGaleria();
    temporizadorGaleria = window.setInterval(() => mostrarCaptura(indiceActivo + 1), intervaloGaleria);
  };
  const reiniciarAutoplayGaleria = () => {
    detenerAutoplayGaleria();
    iniciarAutoplayGaleria();
  };

  capturas.forEach((captura, indice) => {
    const punto = document.createElement('button');
    punto.className = 'galeria-punto' + (indice === 0 ? ' activo' : '');
    punto.type = 'button';
    punto.setAttribute('aria-label', 'Ver captura ' + captura.etiqueta);
    punto.addEventListener('click', () => {
      mostrarCaptura(indice);
      reiniciarAutoplayGaleria();
    });
    galeriaPuntos.appendChild(punto);
  });

  document.querySelector('#galeria-anterior')?.addEventListener('click', () => {
    mostrarCaptura(indiceActivo - 1);
    reiniciarAutoplayGaleria();
  });
  document.querySelector('#galeria-siguiente')?.addEventListener('click', () => {
    mostrarCaptura(indiceActivo + 1);
    reiniciarAutoplayGaleria();
  });
  galeriaMarco.addEventListener('mouseenter', detenerAutoplayGaleria);
  galeriaMarco.addEventListener('mouseleave', iniciarAutoplayGaleria);
  galeriaMarco.addEventListener('focusin', detenerAutoplayGaleria);
  galeriaMarco.addEventListener('focusout', iniciarAutoplayGaleria);
  galeriaPuntos.addEventListener('mouseenter', detenerAutoplayGaleria);
  galeriaPuntos.addEventListener('mouseleave', iniciarAutoplayGaleria);
  iniciarAutoplayGaleria();

  const cerrarLightbox = () => {
    lightbox.classList.remove('abierto');
    document.body.style.overflow = '';
    iniciarAutoplayGaleria();
  };

  galeriaImagen.addEventListener('click', () => {
    detenerAutoplayGaleria();
    lightbox.classList.add('abierto');
    document.body.style.overflow = 'hidden';
  });
  lightbox.addEventListener('click', cerrarLightbox);
  lightboxImagen.addEventListener('click', (evento) => evento.stopPropagation());
  document.querySelector('#lightbox-cerrar')?.addEventListener('click', cerrarLightbox);
  document.querySelector('#lightbox-anterior')?.addEventListener('click', (evento) => {
    evento.stopPropagation();
    mostrarCaptura(indiceActivo - 1);
  });
  document.querySelector('#lightbox-siguiente')?.addEventListener('click', (evento) => {
    evento.stopPropagation();
    mostrarCaptura(indiceActivo + 1);
  });
  window.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') cerrarLightbox();
    if (!lightbox.classList.contains('abierto')) return;
    if (evento.key === 'ArrowLeft') mostrarCaptura(indiceActivo - 1);
    if (evento.key === 'ArrowRight') mostrarCaptura(indiceActivo + 1);
  });
})();
