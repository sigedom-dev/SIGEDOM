document.addEventListener("DOMContentLoaded", () => {
    const parametros = new URLSearchParams(window.location.search);
    const valor = Number(parametros.get("valor"));
    const elementoValor = document.getElementById("valor-doacao");
    const campoCodigo = document.getElementById("codigo-pix");
    const botaoCopiar = document.getElementById("copiar-cod");
    const mensagem = document.getElementById("mensagem-pix");

    if (Number.isFinite(valor) && valor > 0 && elementoValor) {
        elementoValor.textContent = valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // O backend ou provedor de pagamento deve preencher o código Pix real.
    // Depois de receber o código, habilite o botão:
    // campoCodigo.value = resposta.codigoPix;
    // botaoCopiar.disabled = false;

    if (botaoCopiar && campoCodigo && mensagem) {
        botaoCopiar.addEventListener("click", async () => {
            if (!campoCodigo.value.trim()) {
                mensagem.textContent = "O código Pix ainda não foi disponibilizado.";
                return;
            }

            try {
                await navigator.clipboard.writeText(campoCodigo.value.trim());
                mensagem.textContent = "Código Pix copiado.";
            } catch {
                campoCodigo.focus();
                campoCodigo.select();
                mensagem.textContent = "Não foi possível copiar automaticamente. Selecione o código e copie manualmente.";
            }
        });
    }
});
