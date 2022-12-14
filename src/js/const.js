const body = document.querySelector("body");
const add = document.querySelector(".add");
const lista = document.querySelector(".lista");
const arrayStorage = Object.values(localStorage);
const botaoGerar = document.querySelector(".gerar");
const limpar = document.querySelector(".limpar");
const select = document.querySelector("select");
let atendimentos = buscarStorage() || [];
let id = buscarId() || 0;
const input = document.querySelector("input");

const addItem = (atendimento) => {
  let itemLista = document.createElement("li");
  let tituloAtividade = document.createElement("span");
  let categoriaERemover = document.createElement("div");
  let tituloCategoria = document.createElement("span");
  let botaoRemover = document.createElement("img");

  if (
    atendimento.tipo === "Contato ativo" ||
    atendimento.tipo === "/pergunta"
  ) {
    tituloAtividade.classList.add("nomeAluno");
  } else {
    tituloAtividade.classList.add("outros");
  }

  tituloAtividade.innerText = atendimento.atividade;
  tituloCategoria.innerText = atendimento.tipo;
  tituloCategoria.classList.add("categoria");
  tituloCategoria.classList.add(atendimento.tipo.match(/[A-Z]/gi).join(""));
  categoriaERemover.classList.add("categoria-e-remover");
  botaoRemover.id = id;
  botaoRemover.classList.add("remover");
  botaoRemover.src = "./src/img/botao-remover.png";

  lista.append(itemLista);
  itemLista.append(tituloAtividade, categoriaERemover);
  categoriaERemover.append(tituloCategoria, botaoRemover);
};

function buscarId() {
  if (atendimentos.length) {
    return atendimentos[atendimentos.length - 1].aId;
  }
}

function buscarStorage() {
  let arrStorage = JSON.parse(localStorage.getItem("atendimentos"));
  return arrStorage;
}

const geradorCodigo = (atividades) => {
  let categorias = [];
  let item1 = document.createElement("li");
  let item2 = document.createElement("li");
  let item3 = document.createElement("li");
  let item4 = document.createElement("li");

  atividades.forEach(({ tipo }) => {
    categorias.push(tipo);
  });

  if (!categorias.includes("Contato ativo")) {
    item1.innerText = "1 - Null";
  } else {
    item1.innerText = "1 -";
    let contatos = atividades.filter(({ tipo }) => tipo === "Contato ativo");

    contatos.forEach(({ atividade }) => {
      item1.innerText += ` @${atividade}`;
    });
  }

  if (!categorias.includes("/pergunta")) {
    item2.innerText = "2 - Null";
  } else {
    item2.innerText = "2 -";
    let contatos = atividades.filter(({ tipo }) => tipo === "/pergunta");

    contatos.forEach(({ atividade }) => {
      item2.innerText += ` @${atividade}`;
    });
  }

  if (!categorias.includes("Outras atividades")) {
    item3.innerText = "3 - Null";
  } else {
    item3.innerText = "3 -";
    let contatos = atividades.filter(
      ({ tipo }) => tipo === "Outras atividades"
    );

    contatos.forEach(({ atividade }) => {
      item3.innerText += ` ${atividade}`;
    });
  }

  if (!categorias.includes("Pend??ncias")) {
    item4.innerText = "4 - Null";
  } else {
    item4.innerText = "4 -";
    let contatos = atividades.filter(({ tipo }) => tipo === "Pend??ncias");

    contatos.forEach(({ atividade }) => {
      item4.innerText += ` ${atividade}`;
    });
  }
  let botoesCodigo = document.createElement("div");
  botoesCodigo.classList.add("botoesCodigo");

  let botaoCopiarCodigo = document.createElement("button");
  botaoCopiarCodigo.classList.add("copiarCodigo");
  botaoCopiarCodigo.innerText = "COPIAR";

  let botaoVoltar = document.createElement("button");
  botaoVoltar.classList.add("voltar");
  botaoVoltar.innerText = "VOLTAR";

  let codigo = `${item1.innerText}\n${item2.innerText}\n${item3.innerText}\n${item4.innerText}`;

  lista.append(item1, item2, item3, item4, botoesCodigo);
  botoesCodigo.append(botaoCopiarCodigo, botaoVoltar);
  chamaCopiarCodigo(codigo);
  chamaVoltar();
};

function armazenamento(arr) {
  localStorage.setItem(`atendimentos`, JSON.stringify(arr));
}

atendimentos.forEach((atendimento) => addItem(atendimento));
