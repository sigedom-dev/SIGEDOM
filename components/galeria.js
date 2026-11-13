const galeria = document.getElementById("galeria");
function criarQuadrado(nomeArquivo, caminhoPersonalizado = null) {
    const quadrado = document.createElement("div");
    const imagem = document.createElement("img");
    const titulo = document.createElement("p");

    quadrado.className = "quadrado-placeholder";

    imagem.src = caminhoPersonalizado ??
        "../assets/img/galeria/" + encodeURIComponent(nomeArquivo);

    titulo.textContent = nomeArquivo.replace(/\.[^.]+$/, "");

    quadrado.append(imagem, titulo);
    galeria.appendChild(quadrado);
}

fotos.forEach(nomeArquivo => criarQuadrado(nomeArquivo));

const fotosBanner = fotos.map(nomeArquivo => ({
    nome: nomeArquivo,
    src: "../assets/img/galeria/" + encodeURIComponent(nomeArquivo)
}));

const imagemBanner = document.getElementById("imagem-banner");
const imagemFundo = document.getElementById("imagem-fundo");
const tituloBanner = document.getElementById("titulo-banner");

const setaAnterior = document.getElementById("seta-anterior");
const setaProxima = document.getElementById("seta-proxima");

let indiceBanner = 0;

function atualizarBanner() {
    if (fotosBanner.length === 0) return;
    const fotoAtual = fotosBanner[indiceBanner];
    const nomeArquivo = fotoAtual.nome;
    imagemBanner.classList.remove("fade");
    void imagemBanner.offsetWidth;

    const caminhoImagem = fotoAtual.src;
    imagemFundo.src = caminhoImagem;
    imagemBanner.src = caminhoImagem;
    imagemBanner.classList.add("fade");
    const titulo = nomeArquivo.replace(/\.[^.]+$/, "");
    imagemBanner.alt = titulo;
    tituloBanner.textContent = titulo;

}

setaProxima.addEventListener("click", function() {
    if (fotosBanner.length === 0) return;
    indiceBanner = (indiceBanner + 1) % fotosBanner.length;
    atualizarBanner();
});


setaAnterior.addEventListener("click", function() {
    if (fotosBanner.length === 0) return;
    indiceBanner = (indiceBanner - 1 + fotosBanner.length) % fotosBanner.length;
    atualizarBanner();
});


atualizarBanner();
// BOTÃO DE UPLOAD

const botaoUpload = document.getElementById("botao");
const arquivoMidia = document.getElementById("arquivo-midia");

botaoUpload.addEventListener("click", () => {
    arquivoMidia.click();
});

// AVISO DE UPLOAD

let temporizadorAviso;

function mostrarAviso(mensagem) {
    const aviso = document.getElementById("aviso-upload");
    const textoAviso = document.getElementById("mensagem-aviso");

    textoAviso.textContent = mensagem;

    aviso.classList.add("mostrar");

    clearTimeout(temporizadorAviso);

    temporizadorAviso = setTimeout(() => {
        aviso.classList.remove("mostrar");
    }, 3500);
}

// BANCO DE IMAGENS DO NAVEGADOR

function abrirBancoMidias() {
    return new Promise((resolve, reject) => {
        const pedido = indexedDB.open("galeria-midias-locais", 1);

        pedido.onupgradeneeded = () => {
            const banco = pedido.result;

            if (!banco.objectStoreNames.contains("imagens")) {
                banco.createObjectStore("imagens", {
                    keyPath: "id",
                    autoIncrement: true
                });
            }
        };

        pedido.onsuccess = () => resolve(pedido.result);
        pedido.onerror = () => reject(pedido.error);
    });
}

const bancoPronto = abrirBancoMidias();


// RECUPERAR FOTOS ARMAZENADAS

function listarFotosSalvas(banco) {
    return new Promise((resolve, reject) => {
        const pedido = banco.transaction("imagens", "readonly")
            .objectStore("imagens")
            .getAll();

        pedido.onsuccess = () => resolve(pedido.result);
        pedido.onerror = () => reject(pedido.error);
    });
}


// SALVAR NOVA FOTO

async function salvarFotoNoBanco(arquivo) {
    const banco = await bancoPronto;

    return new Promise((resolve, reject) => {
        const transacao = banco.transaction("imagens", "readwrite");
        transacao.objectStore("imagens").add({
            nome: arquivo.name,
            imagem: arquivo
        });

        transacao.oncomplete = () => resolve();
        transacao.onerror = () => reject(transacao.error);
    });
}

// CRIAR QUADRADINHO E INSERIR NO CARROSSEL

function adicionarFotoNaPagina(nome, arquivo) {
    const url = URL.createObjectURL(arquivo);

    criarQuadrado(nome, url);

    fotosBanner.push({
        nome: nome,
        src: url
    });
}

// RECARREGAR FOTOS SALVAS

async function carregarFotosSalvas() {
    try {
        const banco = await bancoPronto;
        const fotosSalvas = await listarFotosSalvas(banco);

        fotosSalvas.forEach(foto => {
            adicionarFotoNaPagina(foto.nome, foto.imagem);
        });

    } catch (erro) {
        console.error("Não foi possível recuperar as fotos locais:", erro);
    }
}

const carregamentoInicial = carregarFotosSalvas();

// QUANDO O USUÁRIO ESCOLHER UMA IMAGEM

arquivoMidia.addEventListener("change", async () => {
    const arquivo = arquivoMidia.files?.[0];

    arquivoMidia.value = "";

    if (!arquivo) return;

    const tiposAceitos = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif"
    ];

    if (!tiposAceitos.includes(arquivo.type)) {
        alert("Escolha uma imagem JPG, PNG, WEBP ou GIF.");
        return;
    }

    if (arquivo.size > 10 * 1024 * 1024) {
        alert("Escolha uma imagem de até 10 MB.");
        return;
    }

    await carregamentoInicial;

    let foiSalvo = true;

    try {
        await salvarFotoNoBanco(arquivo);
    } catch (erro) {
        foiSalvo = false;
        console.error("Falha ao salvar imagem:", erro);
    }

    adicionarFotoNaPagina(arquivo.name, arquivo);

    indiceBanner = fotosBanner.length - 1;
    atualizarBanner();

    if (!foiSalvo) {
        alert(
            "Foto exibida, mas não pôde ser armazenada. " +
            "Ela sumirá quando você atualizar a página."
        );
    }
});