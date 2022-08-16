select.addEventListener("click", () => {
  const categoria = select.value;
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
  const atendimento = input.value
    .trim()
    .normalize("NFD")
    .replace(/[^A-Z-.\s]/gi, "");
  let categoria = select.value;

  if (atendimento !== "") {
    const ativ = { atividade: atendimento, tipo: categoria, aId: id };
    atendimentos.push(ativ);
    addItem(ativ);
    armazenamento(atendimentos);
    input.value = "";
    addToast.showToast();
  }
});

input.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    id++;
    const input = document.querySelector("#input");
    const atendimento = input.value
      .trim()
      .normalize("NFD")
      .replace(/[^A-Z-.\s]/gi, "");
    let categoria = select.value;

    if (atendimento !== "") {
      const ativ = { atividade: atendimento, tipo: categoria, aId: id };
      atendimentos.push(ativ);
      addItem(ativ);
      armazenamento(atendimentos);
      input.value = "";
    }
    event.preventDefault();
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
  limparToast.showToast();
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
    removerToast.showToast();
  }
});

const chamaCopiarCodigo = (codigo) => {
  const copiarCodigo = document.querySelector(".copiarCodigo");
  copiarCodigo.addEventListener("click", () => {
    navigator.clipboard.writeText(codigo);
    copiadoToast.showToast();
  });
};

const chamaVoltar = () => {
  const voltar = document.querySelector(".voltar");
  voltar.addEventListener("click", () => {
    lista.innerHTML = "";
    atendimentos.forEach((atendimento) => addItem(atendimento));
  });
};
