document.addEventListener("DOMContentLoaded", () => {
    const parametros = new URLSearchParams(window.location.search);
    const valor = Number(parametros.get("valor"));
    const elementoValor = document.getElementById("valor-doacao");

    if (Number.isFinite(valor) && valor > 0 && elementoValor) {
        elementoValor.textContent = valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }
});
