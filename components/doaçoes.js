document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-doacao");
  const campoValor = document.getElementById("valor-doacao");
  const mensagem = document.getElementById("mensagem-doacao");

  if (!formulario || !campoValor) return;

  formulario.addEventListener("submit", (evento) => {
    const valor = Number(campoValor.value);
    if (!Number.isFinite(valor) || valor <= 0) {
      evento.preventDefault();
      mensagem.textContent = "Informe um valor de doação maior que zero.";
      campoValor.focus();
      return;
    }

    const botao = evento.submitter;
    if (botao && botao.formAction) {
      const destino = new URL(botao.formAction, window.location.href);
      destino.searchParams.set("valor", valor.toFixed(2));
      evento.preventDefault();
      window.location.href = destino.href;
    }
  });
});
