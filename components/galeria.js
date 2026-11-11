const galeria = document.getElementById("galeria");
function criarQuadrado (nomeArquivo) {
    const quadrado = document.createElement("div");
    const imagem = document.createElement("img");
    const titulo = document.createElement("p");
    quadrado.className = "quadrado-placeholder";
    imagem.src = "../assets/img/galeria/" + encodeURIComponent(nomeArquivo);
    titulo.textContent = nomeArquivo.replace(/\.[^.]+$/, "");
    quadrado.append(imagem, titulo);
    galeria.appendChild(quadrado);
}

fotos.forEach(criarQuadrado);

const imagemBanner = document.getElementById("imagem-banner");
const imagemFundo = document.getElementById("imagem-fundo");
const tituloBanner = document.getElementById("titulo-banner");

const setaAnterior = document.getElementById("seta-anterior");
const setaProxima = document.getElementById("seta-proxima");

let indiceBanner = 0;

function atualizarBanner() {
    const nomeArquivo = fotos[indiceBanner];
    imagemBanner.classList.remove("fade");
    void imagemBanner.offsetWidth;

    const caminhoImagem = "../assets/img/galeria/" + encodeURIComponent(nomeArquivo);

    imagemFundo.src = caminhoImagem;
    imagemBanner.src = caminhoImagem;
    imagemBanner.classList.add("fade");
    const titulo = nomeArquivo.replace(/\.[^.]+$/, "");
    imagemBanner.alt = titulo;
    tituloBanner.textContent = titulo;

}

setaProxima.addEventListener("click", function() {
    indiceBanner = (indiceBanner + 1) % fotos.length;
    atualizarBanner();
});


setaAnterior.addEventListener("click", function() {
    indiceBanner = (indiceBanner - 1 + fotos.length) % fotos.length;
    atualizarBanner();
});


atualizarBanner();