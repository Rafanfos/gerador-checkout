const listadas = (atividades) => {
  let id = 0;
  atividades.forEach(({ atividade, tipo }) => {
    id++;
    let itemLista = document.createElement("li");
    let tituloAtividade = document.createElement("span");
    let tituloCategoria = document.createElement("span");
    let botaoRemover = document.createElement("img");

    if (tipo === "Contato ativo" || tipo === "/pergunta") {
      tituloAtividade.classList.add("nomeAluno");
    } else {
      tituloAtividade.classList.add("outros");
    }

    tituloAtividade.innerText = atividade;
    tituloCategoria.innerText = tipo;
    tituloCategoria.classList.add("categoria");
    tituloCategoria.classList.add(tipo.match(/[A-Z]/gi).join(""));
    botaoRemover.id = id;
    botaoRemover.classList.add("remover");
    botaoRemover.src = "./src/img/botao-remover.png";

    lista.append(itemLista);
    itemLista.append(tituloAtividade, tituloCategoria, botaoRemover);
  });
};

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
    let contatosAtivos = atividades.filter(
      ({ tipo }) => tipo === "Contato ativo"
    );

    contatosAtivos.forEach(({ atividade }) => {
      item1.innerText += ` @${atividade}`;
    });
  }

  if (!categorias.includes("/pergunta")) {
    item2.innerText = "2 - Null";
  } else {
    item2.innerText = "2 -";
    let contatosAtivos = atividades.filter(({ tipo }) => tipo === "/pergunta");

    contatosAtivos.forEach(({ atividade }) => {
      item2.innerText += ` @${atividade}`;
    });
  }

  if (!categorias.includes("Outras atividades")) {
    item3.innerText = "3 - Null";
  } else {
    item3.innerText = "3 -";
    let contatosAtivos = atividades.filter(
      ({ tipo }) => tipo === "Outras atividades"
    );

    contatosAtivos.forEach(({ atividade }) => {
      item3.innerText += ` @${atividade}`;
    });
  }

  if (!categorias.includes("Pendências")) {
    item4.innerText = "4 - Null";
  } else {
    item4.innerText = "4 -";
    let contatosAtivos = atividades.filter(({ tipo }) => tipo === "Pendências");

    contatosAtivos.forEach(({ atividade }) => {
      item4.innerText += ` @${atividade}`;
    });
  }
  let botaoCopiarCodigo = document.createElement("button");
  botaoCopiarCodigo.classList.add("copiarCodigo");
  botaoCopiarCodigo.innerText = "COPIAR";

  let codigo = `${item1.innerText}\n${item2.innerText}\n${item3.innerText}\n${item4.innerText}`;

  lista.append(item1, item2, item3, item4, botaoCopiarCodigo);

  chamaCopiarCodigo(codigo);
};
