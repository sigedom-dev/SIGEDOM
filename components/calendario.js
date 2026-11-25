const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const tituloMes = document.getElementById("titulo-mes");
const grade = document.getElementById("dias");

let dataAtual = new Date();
let ano = dataAtual.getFullYear();
let mes = dataAtual.getMonth();

const pad = (n) => String(n).padStart(2, "0");

function renderizar() {
  tituloMes.textContent = `${MESES[mes]}, ${ano}`;
  grade.innerHTML = "";

  const primeiroDiaSemana = new Date(ano, mes, 1).getDay(); // 0 = domingo
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const hoje = new Date();

  // células vazias antes do dia 1
  for (let i = 0; i < primeiroDiaSemana; i++) {
    const vazio = document.createElement("div");
    vazio.className = "dia dia--vazio";
    grade.appendChild(vazio);
  }

  // dias do mês
  for (let d = 1; d <= totalDias; d++) {
    const dia = document.createElement("div");
    dia.className = "dia";
    dia.dataset.data = `${ano}-${pad(mes + 1)}-${pad(d)}`;

    if (d === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
      dia.classList.add("dia--hoje");
    }

    dia.innerHTML = `<span class="dia__numero">${d}</span><div class="dia__eventos"></div>`;
    grade.appendChild(dia);
  }

  // avisa que o mês mudou
  document.dispatchEvent(new CustomEvent("calendario:mes-alterado", {
    detail: { ano, mes: mes + 1 }
  }));
}

function mudarMes(delta) {
  mes += delta;
  if (mes < 0)  { mes = 11; ano--; }
  if (mes > 11) { mes = 0;  ano++; }
  renderizar();
}

document.getElementById("mes-anterior").addEventListener("click", () => mudarMes(-1));
document.getElementById("mes-seguinte").addEventListener("click", () => mudarMes(1));

renderizar();