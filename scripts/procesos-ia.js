(() => {
  const btnCopiar = document.querySelector('#btn-copiar');
  if (!btnCopiar) return;

  const actualizarEstado = (texto, clase) => {
    const span = btnCopiar.querySelector('span');
    if (!span) return;
    span.textContent = texto;
    btnCopiar.classList.toggle('copiado', clase === 'copiado');
    window.setTimeout(() => {
      span.textContent = 'copiar';
      btnCopiar.classList.remove('copiado');
    }, 1800);
  };

  btnCopiar.addEventListener('click', async () => {
    try {
      const respuesta = await fetch('../karpathy.md');
      if (!respuesta.ok) throw new Error('No se pudo cargar karpathy.md');
      await navigator.clipboard.writeText(await respuesta.text());
      actualizarEstado('copiado', 'copiado');
    } catch {
      actualizarEstado('error', 'error');
    }
  });
})();
