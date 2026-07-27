(() => {
  document.querySelectorAll('.ticket-boton').forEach((boton) => {
    boton.addEventListener('click', () => {
      const transcripcion = document.getElementById(boton.getAttribute('aria-controls'));
      const abierta = transcripcion.classList.toggle('abierta');
      boton.setAttribute('aria-expanded', String(abierta));
      boton.textContent = abierta ? 'Ocultar transcripción' : 'Ver transcripción';
    });
  });
  document.querySelectorAll('[data-ticket-accion]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const estado = boton.closest('.tickets-app').querySelector('.ticket-estado');
      estado.textContent = boton.dataset.ticketAccion === 'aceptado' ? 'Ticket marcado como aceptado.' : 'Ticket marcado como descartado.';
    });
  });
})();
