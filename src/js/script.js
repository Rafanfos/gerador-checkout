const add = document.querySelector(".botao1");
const select = document.querySelector("select");
const lista = document.querySelector(".lista");
const categoria = select.value;
const atendimentos = [];

add.addEventListener("click", () => {
  const input = document.querySelector("#input");
  const atendimento = input.value;
  const select = document.querySelector("select");
  const categoria = select.value;

  atendimentos.push({ atividade: atendimento, tipo: categoria });
  lista.innerHTML = "";
  console.log(atendimentos);
  listadas(atendimentos);
});

const listadas = (atividades) => {
  atividades.forEach(({ atividade, tipo }) => {
    let itemLista = document.createElement("li");
    let tituloAtividade = document.createElement("span");
    let tituloCategoria = document.createElement("span");

    tituloAtividade.innerText = atividade;
    tituloCategoria.innerText = tipo;

    lista.append(itemLista);
    itemLista.append(tituloAtividade, tituloCategoria);
  });
};
