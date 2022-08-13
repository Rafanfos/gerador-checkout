select.addEventListener("click", () => {
  const categoria = select.value;
  const input = document.querySelector("#input");
  const label = document.querySelector("label");
  if (categoria === "Outras atividades") {
    label.innerText = "";
    input.placeholder = "Digite as atividades";
  } else if (categoria === "Pendências") {
    label.innerText = "";
    input.placeholder = "Digite as pendências";
  } else {
    label.innerText = "@";
    input.placeholder = "Digite o @ dos alunos";
  }
});

add.addEventListener("click", () => {
  id++;
  const input = document.querySelector("#input");
  const atendimento = input.value.trim();
  let categoria = select.value;
  if (categoria === "Outras atividades" || categoria === "/pergunta") {
    categoria = categoria.replace(/[@]/gi, "");
  }
  if (atendimento !== "") {
    const ativ = { atividade: atendimento, tipo: categoria, aId: id };
    atendimentos.push(ativ);
    addItem(ativ);
    armazenamento(atendimentos);
    input.value = "";
  }
});

botaoGerar.addEventListener("click", () => {
  lista.innerHTML = "";
  geradorCodigo(atendimentos);
});

limpar.addEventListener("click", () => {
  id = 0;
  lista.innerHTML = "";
  atendimentos.splice(0, atendimentos.length);
  localStorage.clear();
});

lista.addEventListener("click", (event) => {
  id--;
  const clicado = event.target;
  if (clicado.tagName === "IMG") {
    const indice = atendimentos.findIndex(({ id }) => id === clicado.id);
    const listaProxima = clicado.closest("li");
    atendimentos.splice(indice, 1);
    listaProxima.remove();
    localStorage.clear();
    armazenamento(atendimentos);
  }
});

const chamaCopiarCodigo = (codigo) => {
  const copiarCodigo = document.querySelector(".copiarCodigo");
  copiarCodigo.addEventListener("click", () => {
    navigator.clipboard.writeText(codigo);
  });
};

function armazenamento(arr) {
  localStorage.setItem(`atendimentos`, JSON.stringify(arr));
}
