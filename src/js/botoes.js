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
  const input = document.querySelector("#input");
  const atendimento = input.value.trim();
  const categoria = select.value;
  const ativ = { atividade: atendimento, tipo: categoria };
  atendimentos.push(ativ);
  lista.innerHTML = "";
  listadas(atendimentos);
  armazenamento(atendimentos);
});

botaoGerar.addEventListener("click", () => {
  lista.innerHTML = "";
  geradorCodigo(atendimentos);
});

limpar.addEventListener("click", () => {
  lista.innerHTML = "";
  atendimentos.splice(0, atendimentos.length);
  localStorage.clear();
});

lista.addEventListener("click", (event) => {
  const clicado = event.target;
  if (clicado.tagName === "IMG") {
    const indice = +clicado.id - 1;
    const listaProxima = clicado.closest("li");
    listaProxima.remove();
    atendimentos.splice(indice, 1);
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
