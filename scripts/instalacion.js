(() => {
  const button = document.querySelector('#copiar-instalacion');
  if (!button) return;
  button.addEventListener('click', async () => {
    const prompt = document.querySelector('#prompt-instalacion');
    const status = document.querySelector('#estado-copia');
    const english = document.documentElement.lang === 'en';
    try {
      await navigator.clipboard.writeText(prompt.textContent);
      status.textContent = english ? 'Prompt copied. Paste it into your agent.' : 'Prompt copiado. Pégalo en tu agente.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(prompt);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = english ? 'Text selected. Press Ctrl+C to copy it.' : 'Texto seleccionado. Pulsa Ctrl+C para copiarlo.';
    }
  });
})();
