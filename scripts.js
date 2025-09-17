const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function letConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (event) => {
  const arquivo = event.target.files[0];

  if (arquivo) {
    try {
      const conteudoDoArquivo = await letConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (error) {
      console.error("Erro na leitura do arquivo: " + error);
    }
  }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-tag")) {
    const tagARemover = event.target.parentElement;
    listaTags.removeChild(tagARemover);
  }
});

const tagsDisponiveis = [
  "Front-end",
  "Programação",
  "Data-Science",
  "Intercâmbio",
];

async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}

inputTags.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificaTagsDisponiveis(tagTexto);
        if (tagExiste) {
          const tagNova = document.createElement("li");
          tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag" />`;
          listaTags.appendChild(tagNova);
          inputTags.value = "";
        } else {
          alert("Tag não encontrada.");
        }
      } catch (error) {
        alert("Erro ao verificar existência da tag." + error);
      }
    }
  }
});
