const galeria = document.getElementById("galeria");
function criarQuadrado (nomeArquivo) {
    const quadrado = document.createElement("div");
    const imagem = document.createElement("img");
    const titulo = document.createElement("p");
    quadrado.className = "quadrado-placeholder";
    imagem.src = "assets/img/galeria/" + encodeURIComponent(nomeArquivo);
    titulo.textContent = nomeArquivo.replace(/\.[^.]+$/, "");
    quadrado.append(imagem, titulo);
    galeria.appendChild(quadrado);
}

fotos.forEach(criarQuadrado);