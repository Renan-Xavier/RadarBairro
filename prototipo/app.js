// Controle de estado do aplicativo RadarBairro

let siglaEstadoAtual = "SP";
let categoriaFiltro = "geral";
let bairroSelecionado = dadosEstados["SP"].bairros[0]; // Comeca em Pinheiros
let listaRelatos = [...relatosIniciais];
let categoriaWazeSelecionada = "energia";

const nomesCategorias = {
  geral: "Nota Geral",
  agua: "Água",
  energia: "Energia",
  alagamento: "Alagamento",
  seguranca: "Segurança",
  calcadas: "Calçadas"
};

function obterCorPorNota(nota) {
  if (nota >= 4.0) return "#16a34a"; // Verde (Bom)
  if (nota >= 3.0) return "#d97706"; // Amarelo (Regular / Atencao)
  return "#dc2626";                 // Vermelho (Critico)
}

function obterStatusPorNota(nota) {
  if (nota >= 4.0) return "Bom para morar";
  if (nota >= 3.0) return "Atenção em pontos";
  return "Crítico em infraestrutura";
}

// Renderiza os poligonos e marcadores de nota no mapa SVG
function desenharMapaBairros(termoBusca = "") {
  const grupoPoligonos = document.getElementById("camada-bairros");
  const grupoPins = document.getElementById("camada-pins");
  grupoPoligonos.innerHTML = "";
  grupoPins.innerHTML = "";

  const estado = dadosEstados[siglaEstadoAtual];
  const termo = termoBusca.trim().toLowerCase();

  estado.bairros.forEach((bairro) => {
    const bateBusca = !termo || bairro.nome.toLowerCase().includes(termo) || bairro.regiao.toLowerCase().includes(termo);
    const notaAtual = bairro.notas[categoriaFiltro];
    const cor = obterCorPorNota(notaAtual);
    const estaSelecionado = bairroSelecionado && bairroSelecionado.id === bairro.id;

    // Poligono colorido do bairro (Mapa de Calor)
    const poligono = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poligono.setAttribute("points", bairro.poligono);
    poligono.setAttribute("fill", cor);
    poligono.setAttribute("fill-opacity", bateBusca ? (estaSelecionado ? "0.52" : "0.34") : "0.10");
    poligono.setAttribute("stroke", cor);
    poligono.setAttribute("stroke-width", estaSelecionado ? "3.5" : "2");
    poligono.setAttribute("stroke-dasharray", estaSelecionado ? "none" : "5,3");
    poligono.setAttribute("class", "poligono-bairro" + (estaSelecionado ? " selecionado" : ""));
    poligono.onclick = () => selecionarBairroNoMapa(bairro);
    grupoPoligonos.appendChild(poligono);

    // Marcador estilo pilula com nome e nota em cima do bairro
    const grupoPin = document.createElementNS("http://www.w3.org/2000/svg", "g");
    grupoPin.setAttribute("class", "pin-grupo");
    grupoPin.setAttribute("opacity", bateBusca ? "1" : "0.35");
    grupoPin.onclick = () => selecionarBairroNoMapa(bairro);

    const larguraCaixa = Math.max(82, bairro.nome.length * 6.2 + 36);
    const xCaixa = bairro.centroX - larguraCaixa / 2;
    const yCaixa = bairro.centroY - 14;

    const fundoPin = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    fundoPin.setAttribute("x", xCaixa);
    fundoPin.setAttribute("y", yCaixa);
    fundoPin.setAttribute("width", larguraCaixa);
    fundoPin.setAttribute("height", 26);
    fundoPin.setAttribute("rx", 13);
    fundoPin.setAttribute("fill", estaSelecionado ? "#0f172a" : "#ffffff");
    fundoPin.setAttribute("stroke", cor);
    fundoPin.setAttribute("stroke-width", "2");
    grupoPin.appendChild(fundoPin);

    const bolinhaNota = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bolinhaNota.setAttribute("x", xCaixa + 4);
    bolinhaNota.setAttribute("y", yCaixa + 4);
    bolinhaNota.setAttribute("width", 26);
    bolinhaNota.setAttribute("height", 18);
    bolinhaNota.setAttribute("rx", 9);
    bolinhaNota.setAttribute("fill", cor);
    grupoPin.appendChild(bolinhaNota);

    const textoNota = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textoNota.setAttribute("x", xCaixa + 17);
    textoNota.setAttribute("y", yCaixa + 16.5);
    textoNota.setAttribute("text-anchor", "middle");
    textoNota.setAttribute("fill", "#ffffff");
    textoNota.setAttribute("font-size", "10");
    textoNota.setAttribute("font-weight", "800");
    textoNota.textContent = notaAtual.toFixed(1);
    grupoPin.appendChild(textoNota);

    const textoNome = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textoNome.setAttribute("x", xCaixa + 34 + (larguraCaixa - 38) / 2);
    textoNome.setAttribute("y", yCaixa + 16.5);
    textoNome.setAttribute("text-anchor", "middle");
    textoNome.setAttribute("fill", estaSelecionado ? "#ffffff" : "#0f172a");
    textoNome.setAttribute("font-size", "10");
    textoNome.setAttribute("font-weight", "700");
    textoNome.textContent = bairro.nome;
    grupoPin.appendChild(textoNome);

    grupoPins.appendChild(grupoPin);
  });
}

// Abre a aba inferior (Bottom Sheet estilo QuintoAndar) quando clica no bairro
function selecionarBairroNoMapa(bairro) {
  bairroSelecionado = bairro;
  desenharMapaBairros(document.getElementById("campo-busca").value);
  atualizarAbaInferior();
  atualizarTelaRaioX();

  const aba = document.getElementById("aba-inferior");
  const fab = document.getElementById("botao-fab");
  aba.classList.add("aberta");
  fab.classList.add("com-aba-aberta");
}

function fecharAbaInferior() {
  document.getElementById("aba-inferior").classList.remove("aberta");
  document.getElementById("botao-fab").classList.remove("com-aba-aberta");
}

function atualizarAbaInferior() {
  if (!bairroSelecionado) return;
  const b = bairroSelecionado;
  const notaFoco = b.notas[categoriaFiltro];
  const cor = obterCorPorNota(notaFoco);

  document.getElementById("aba-nome-bairro").textContent = b.nome;
  document.getElementById("aba-sub-bairro").textContent = `${b.cidade} · ${b.regiao} · ${b.avaliacoes} relatos`;

  const selo = document.getElementById("aba-selo-nota");
  selo.style.backgroundColor = cor;
  selo.textContent = `${notaFoco.toFixed(1)} · ${nomesCategorias[categoriaFiltro]}`;

  document.getElementById("aba-resumo-curto").textContent = b.resumoIA;
  document.getElementById("aba-nota-agua").textContent = b.notas.agua.toFixed(1);
  document.getElementById("aba-nota-energia").textContent = b.notas.energia.toFixed(1);
  document.getElementById("aba-nota-alagamento").textContent = b.notas.alagamento.toFixed(1);
}

// Troca a pilula de filtro no topo do mapa
function filtrarCategoriaMapa(novaCategoria, elementoBotao) {
  categoriaFiltro = novaCategoria;
  document.querySelectorAll(".pilula").forEach((btn) => btn.classList.remove("ativa"));
  if (elementoBotao) {
    elementoBotao.classList.add("ativa");
  }
  desenharMapaBairros(document.getElementById("campo-busca").value);
  atualizarAbaInferior();
}

// Troca o estado (SP, RJ, MG)
function trocarEstadoMapa(novaSigla) {
  siglaEstadoAtual = novaSigla;
  const listaBairros = dadosEstados[novaSigla].bairros;
  bairroSelecionado = listaBairros[0];
  document.getElementById("campo-busca").value = "";
  desenharMapaBairros();
  atualizarAbaInferior();
  atualizarTelaRaioX();
  preencherSelectBairrosModal();
}

// Busca por nome do bairro ou estado
function pesquisarNoMapa(valor) {
  const termo = valor.trim().toLowerCase();
  if (termo === "rj" || termo.includes("rio de janeiro")) {
    document.getElementById("seletor-uf").value = "RJ";
    trocarEstadoMapa("RJ");
    return;
  }
  if (termo === "mg" || termo.includes("belo horizonte") || termo.includes("minas")) {
    document.getElementById("seletor-uf").value = "MG";
    trocarEstadoMapa("MG");
    return;
  }

  const encontrado = dadosEstados[siglaEstadoAtual].bairros.find((b) =>
    b.nome.toLowerCase().includes(termo)
  );
  if (encontrado) {
    bairroSelecionado = encontrado;
    atualizarAbaInferior();
    atualizarTelaRaioX();
  }
  desenharMapaBairros(valor);
}

// Preenche a tela Raio-X (Estilo Airbnb: Resumo da IA + Barras Horizontais)
function atualizarTelaRaioX() {
  if (!bairroSelecionado) return;
  const b = bairroSelecionado;
  const corGeral = obterCorPorNota(b.notas.geral);

  document.getElementById("raiox-nome").textContent = b.nome;
  document.getElementById("raiox-cidade").textContent = `${b.cidade} (${b.regiao}) · ${obterStatusPorNota(b.notas.geral)}`;

  const notaEl = document.getElementById("raiox-nota-geral");
  notaEl.textContent = b.notas.geral.toFixed(1);
  notaEl.style.color = corGeral;
  document.getElementById("raiox-total-aval").textContent = `${b.avaliacoes} moradores avaliaram`;

  document.getElementById("raiox-texto-ia").textContent = b.resumoIA;

  const metricas = [
    { chave: "agua", titulo: "Abastecimento de Água", valor: b.notas.agua },
    { chave: "energia", titulo: "Estabilidade de Energia Elétrica", valor: b.notas.energia },
    { chave: "alagamento", titulo: "Drenagem (Livre de Alagamentos)", valor: b.notas.alagamento },
    { chave: "seguranca", titulo: "Iluminação Pública e Segurança", valor: b.notas.seguranca },
    { chave: "calcadas", titulo: "Calçadas e Acessibilidade", valor: b.notas.calcadas }
  ];

  const containerBarras = document.getElementById("raiox-container-barras");
  containerBarras.innerHTML = "";

  metricas.forEach((m) => {
    const percentual = Math.round((m.valor / 5) * 100);
    const corBarra = obterCorPorNota(m.valor);
    const div = document.createElement("div");
    div.className = "linha-barra";
    div.innerHTML = `
      <div class="rotulo-barra">
        <span>${m.titulo}</span>
        <strong style="color:${corBarra}">${m.valor.toFixed(1)} / 5.0</strong>
      </div>
      <div class="trilho-barra">
        <div class="preenchimento-barra" style="width:${percentual}%; background:${corBarra}"></div>
      </div>
    `;
    containerBarras.appendChild(div);
  });

  const ulProblemas = document.getElementById("raiox-lista-problemas");
  ulProblemas.innerHTML = "";
  b.problemasComuns.forEach((prob) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="ponto-alerta"></span><span>${prob}</span>`;
    ulProblemas.appendChild(li);
  });
}

// Renderiza o Feed da Comunidade (Estilo Colab com botao Apoiar)
function renderizarFeedColab() {
  const container = document.getElementById("container-lista-feed");
  container.innerHTML = "";

  listaRelatos.forEach((relato) => {
    const card = document.createElement("div");
    card.className = "card-relato-colab";
    card.innerHTML = `
      <div class="topo-card-colab">
        <div class="autor-relato">
          <strong>${relato.morador}</strong>
          <span>${relato.tempoMoradia} · ${relato.horario}</span>
        </div>
        <span class="tag-categoria-relato" style="background:${relato.corCategoria}">${relato.tituloCategoria}</span>
      </div>
      <div class="endereco-relato">${relato.bairroNome} — ${relato.endereco}</div>
      <p class="texto-relato">${relato.texto}</p>
      <div class="rodape-card-colab">
        <span class="status-protocolo">${relato.status}</span>
        <button class="btn-apoiar-colab ${relato.apoiadoPorMim ? 'apoiado' : ''}" onclick="alternarApoioRelato(${relato.id})">
          ${relato.apoiadoPorMim ? 'Apoiado' : 'Apoiar'} (${relato.apoios})
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function alternarApoioRelato(idRelato) {
  const item = listaRelatos.find((r) => r.id === idRelato);
  if (!item) return;

  if (item.apoiadoPorMim) {
    item.apoiadoPorMim = false;
    item.apoios -= 1;
  } else {
    item.apoiadoPorMim = true;
    item.apoios += 1;
    mostrarToast("Confirmação registrada. Seu apoio atualiza o mapa do bairro.");
  }
  renderizarFeedColab();
}

// Controle do Modal estilo Waze (Botao FAB de Relatar Problema)
function abrirModalWaze() {
  preencherSelectBairrosModal();
  document.getElementById("modal-waze").classList.add("aberto");
}

function fecharModalWaze() {
  document.getElementById("modal-waze").classList.remove("aberto");
}

function preencherSelectBairrosModal() {
  const select = document.getElementById("waze-select-bairro");
  select.innerHTML = "";
  dadosEstados[siglaEstadoAtual].bairros.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = `${b.nome} (${b.cidade})`;
    if (bairroSelecionado && b.id === bairroSelecionado.id) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });
}

function escolherIconeWaze(categoria, elemento) {
  categoriaWazeSelecionada = categoria;
  document.querySelectorAll(".item-icone-waze").forEach((el) => el.classList.remove("selecionado"));
  elemento.classList.add("selecionado");
}

function enviarRelatoWaze() {
  const idBairro = document.getElementById("waze-select-bairro").value;
  const rua = document.getElementById("waze-input-rua").value.trim() || "Rua principal do bairro";
  const comentario = document.getElementById("waze-input-texto").value.trim() || "Problema acontecendo agora nesta quadra, vários vizinhos afetados.";

  const bairroObj = dadosEstados[siglaEstadoAtual].bairros.find((b) => b.id === idBairro) || bairroSelecionado;

  const mapaInfoCategoria = {
    agua: { titulo: "Falta de Água", cor: "#0284c7" },
    energia: { titulo: "Queda de Energia", cor: "#d97706" },
    alagamento: { titulo: "Rua Alagada", cor: "#7c3aed" },
    iluminacao: { titulo: "Poste Apagado", cor: "#475569" },
    calcadas: { titulo: "Calçada Quebrada", cor: "#059669" },
    seguranca: { titulo: "Alerta de Segurança", cor: "#dc2626" }
  };

  const infoCat = mapaInfoCategoria[categoriaWazeSelecionada] || mapaInfoCategoria.energia;

  const novoRelato = {
    id: Date.now(),
    bairroId: bairroObj.id,
    bairroNome: `${bairroObj.nome} · ${bairroObj.cidade}`,
    endereco: rua,
    morador: "Renan Xavier (Você)",
    tempoMoradia: "Morador verificado",
    horario: "Agora mesmo",
    categoria: categoriaWazeSelecionada,
    tituloCategoria: infoCat.titulo,
    corCategoria: infoCat.cor,
    texto: comentario,
    apoios: 1,
    apoiadoPorMim: true,
    status: "Aguardando confirmação de vizinhos"
  };

  listaRelatos.unshift(novoRelato);
  document.getElementById("waze-input-rua").value = "";
  document.getElementById("waze-input-texto").value = "";

  fecharModalWaze();
  renderizarFeedColab();
  navegarParaAba("visao-feed");
  mostrarToast("Relato publicado no Feed da Comunidade e no Mapa.");
}

// Navegacao entre as 3 abas principais (Mapa, Raio-X, Comunidade)
function navegarParaAba(idVisao) {
  document.querySelectorAll(".visao").forEach((v) => v.classList.remove("ativa"));
  document.getElementById(idVisao).classList.add("ativa");

  document.querySelectorAll(".item-menu-inferior").forEach((btn) => btn.classList.remove("ativo"));
  const mapaBotoes = {
    "visao-mapa": "menu-btn-mapa",
    "visao-raiox": "menu-btn-raiox",
    "visao-feed": "menu-btn-feed"
  };
  const idBtn = mapaBotoes[idVisao];
  if (idBtn) {
    document.getElementById(idBtn).classList.add("ativo");
  }
}

function gerarRelatorioComunitario() {
  mostrarToast(`Dossiê comunitário de ${bairroSelecionado.nome} gerado em PDF para envio à ouvidoria.`);
}

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast-sistema");
  toast.textContent = mensagem;
  toast.classList.add("visivel");
  setTimeout(() => {
    toast.classList.remove("visivel");
  }, 2600);
}

// Cenas prontas para demonstracao rapida e captura de prints para os slides
function aplicarCenaDemonstracao(numeroCena, botaoAtalho) {
  if (botaoAtalho) {
    document.querySelectorAll(".btn-atalho").forEach((b) => b.classList.remove("ativo"));
    botaoAtalho.classList.add("ativo");
  }

  fecharModalWaze();

  if (numeroCena === 1) {
    // Cena 1: Mapa de Calor Geral + Aba Inferior aberta em Vila Mariana (Verde)
    siglaEstadoAtual = "SP";
    categoriaFiltro = "geral";
    document.querySelectorAll(".pilula").forEach((p) => p.classList.remove("ativa"));
    document.getElementById("pilula-geral").classList.add("ativa");
    navegarParaAba("visao-mapa");
    const vilaMariana = dadosEstados["SP"].bairros.find((b) => b.id === "vila_mariana");
    selecionarBairroNoMapa(vilaMariana);
  } else if (numeroCena === 2) {
    // Cena 2: Filtro de Energia ativado + Aba Inferior em Santo Amaro (Vermelho/Critico)
    siglaEstadoAtual = "SP";
    categoriaFiltro = "energia";
    document.querySelectorAll(".pilula").forEach((p) => p.classList.remove("ativa"));
    document.getElementById("pilula-energia").classList.add("ativa");
    navegarParaAba("visao-mapa");
    const santoAmaro = dadosEstados["SP"].bairros.find((b) => b.id === "santo_amaro");
    selecionarBairroNoMapa(santoAmaro);
  } else if (numeroCena === 3) {
    // Cena 3: Filtro de Agua ativado + Aba Inferior em Itaquera (Critico em Agua)
    siglaEstadoAtual = "SP";
    categoriaFiltro = "agua";
    document.querySelectorAll(".pilula").forEach((p) => p.classList.remove("ativa"));
    document.getElementById("pilula-agua").classList.add("ativa");
    navegarParaAba("visao-mapa");
    const itaquera = dadosEstados["SP"].bairros.find((b) => b.id === "itaquera");
    selecionarBairroNoMapa(itaquera);
  } else if (numeroCena === 4) {
    // Cena 4: Raio-X do Bairro estilo Airbnb com Resumo da IA e Barras (Pinheiros)
    siglaEstadoAtual = "SP";
    bairroSelecionado = dadosEstados["SP"].bairros.find((b) => b.id === "pinheiros");
    atualizarTelaRaioX();
    navegarParaAba("visao-raiox");
  } else if (numeroCena === 5) {
    // Cena 5: Modal Escuro estilo Waze com icones grandes para relatar problema
    siglaEstadoAtual = "SP";
    navegarParaAba("visao-mapa");
    abrirModalWaze();
    document.getElementById("waze-input-rua").value = "Rua Simão Álvares, 715";
    document.getElementById("waze-input-texto").value = "Transformador piscou duas vezes depois da chuva forte, rua meia-fase.";
  } else if (numeroCena === 6) {
    // Cena 6: Feed Comunitario estilo Colab com botao Apoiar
    navegarParaAba("visao-feed");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  desenharMapaBairros();
  atualizarAbaInferior();
  atualizarTelaRaioX();
  renderizarFeedColab();
  selecionarBairroNoMapa(dadosEstados["SP"].bairros[1]); // Vila Mariana aberta por padrao

  // Verifica parametros de URL para captura automatica das telas
  const params = new URLSearchParams(window.location.search);
  if (params.get("modo") === "captura") {
    document.body.classList.add("modo-captura");
  }
  const cenaParam = parseInt(params.get("cena") || "0", 10);
  if (cenaParam >= 1 && cenaParam <= 6) {
    aplicarCenaDemonstracao(cenaParam);
  }
});
