function carregarHead(){
    const tituloPagina = document.title || "Página";

    const headContent = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${tituloPagina}</title>
        <link rel="stylesheet" href="../css/style.css">
        <script src="../components/script.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
    `;

    document.head.insertAdjacentHTML('beforeend', headContent);
}


function carregarNavbar(){
    const navbar = document.getElementById("navbar");
    if(!navbar) return;

    const paginaAtual = window.location.pathname.split("/").pop();

    navbar.innerHTML = `
        <nav class="navbar">
            <a href="calendario.html" class="logo">
                <img src="../assets/img/Logo Grupo Cultural.png">
            </a>
            <div class="nav-links">
                <a href="../pages/sobre.html" class="${paginaAtual === 'sobre.html' ? 'active' : ''}">
                    <img class="icon" src="../assets/icons/Sobre.svg" alt="Sobre">
                    <span>Sobre</span>
                </a>
                <a href="../pages/calendario.html" class="${paginaAtual === 'calendario.html' ? 'active' : ''}">
                    <img class="icon" src="../assets/icons/Calendario.svg" alt="Calendário">
                    <span>Calendário</span>
                </a>
                <a href="../pages/galeria.html" class="${paginaAtual === 'galeria.html' ? 'active' : ''}">
                    <img class="icon" src="../assets/icons/Galeria.svg" alt="Galeria">
                    <span>Galeria</span>
                </a>
                <a href="../pages/doacoes.html" class="${paginaAtual.startsWith('doacoes') ? 'active' : ''}">
                    <img class="icon coracao" src="../assets/icons/Doacao.svg" alt="Doações">
                    <span>Doações</span>
                </a>
            </div>
            <div class="user-container">
                <img class="profile" src="../assets/icons/Avatar generico.svg" alt="Meu perfil">
                <div class="user-info">
                    <span>Meu perfil</span>
                    <img class="seta-icon" src="../assets/icons/Seta-bandeja-perfil.svg">
                </div>
            </div>
        </nav>
    `;
}

function carregarRodape(){
    const rodape = document.getElementById("rodape");
    if (!rodape) return;

    rodape.innerHTML = `
        <footer class="rodape">
            <div class="conteudo-rodape">
                <h3>PARCEIROS E REDES DE CONTATO:</h3>
                
                <div class="rodape-links">
                    <a href="https://instagram.com/grupodommauricio" target="_blank" aria-label="Instagram">
                        <img src="../assets/icons/icon instagram.svg" alt="Instagram">
                        <span>@grupodommauricio</span>
                    </a>
                    <a href="https://facebook.com/mauricioGC" target="_blank" aria-label="Facebook">
                        <img src="../assets/icons/icon facebook.svg" alt="Facebook">
                        <span>mauricioGC</span>
                    </a>
                    <a href="https://youtube.com/@grupoculturaldedommauricio3986" target="_blank" aria-label="YouTube">
                        <img src="../assets/icons/icon youtube.svg" alt="YouTube">
                        <span>@grupoculturaldedommauricio3986</span>
                    </a>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=grupoculturaldedommauricio@gmail.com" aria-label="E-mail">
                        <img src="../assets/icons/icon email.svg" alt="E-mail">
                        <span>grupoculturaldedommauricio@gmail.com</span>
                    </a>
                </div>
            </div>
            <div class="logo-parceiros">
                    <img src="../assets/img/Logo Grupo Cultural.png" alt="Logo Dom Mauricio">
                    <span>ESTE PROJETO É APOIADO PELO MINISTÉRIO DA CULTURA E PELA SECRETARIA DA CULTURA DO CEARÁ COM RECURSOS PROVENIENTES DA LEI FERDERAL N°14.399 DE JULHO DE 2022</span>
                    <img src="../assets/img/Logo governo do estado ceará.png" alt="Logo Governo do Estado do Ceará">
                    <img src="../assets/img/Logos cultura.png" alt="Logo PNAB, Ministério da Cultura e Governo Federal Brasil">
                </div>
        </footer>
    `;

}

document.addEventListener("DOMContentLoaded", () => {
    carregarHead();
    carregarNavbar();
    carregarRodape();
});