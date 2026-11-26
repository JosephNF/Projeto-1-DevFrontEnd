// chave única do local storage onde ficam todos os usuários
const CHAVE_USUARIOS = "usuarios";

// elementos da página
const formulario = document.getElementById("form-usuario");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoPesquisa = document.getElementById("pesquisa");
const lista = document.getElementById("lista-usuarios");
const botaoLimpar = document.getElementById("botao-limpar");
const botaoExcluirTodos = document.getElementById("botao-excluir-todos");

// lê o array de usuários do local storage
function lerUsuarios() {
    const dados = localStorage.getItem(CHAVE_USUARIOS);

    if (dados === null) {
        return [];
    }

    return JSON.parse(dados);
}

// grava o array de usuários no local storage
function salvarUsuarios(usuarios) {
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

// coloca zero à esquerda: 5 vira "05"
function doisDigitos(numero) {
    return numero < 10 ? "0" + numero : numero;
}

// data e hora atual no formato dd/mm/aaaa hh:mm
function dataAtual() {
    const agora = new Date();
    const dia = doisDigitos(agora.getDate());
    const mes = doisDigitos(agora.getMonth() + 1);
    const ano = agora.getFullYear();
    const hora = doisDigitos(agora.getHours());
    const minutos = doisDigitos(agora.getMinutes());

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
}

// cria o <li> de um usuário com o botão de excluir
function criarItem(usuario) {
    const item = document.createElement("li");

    const info = document.createElement("div");
    info.className = "usuario-info";

    const data = document.createElement("span");
    data.className = "usuario-data";
    data.textContent = usuario.data;

    const nome = document.createElement("span");
    nome.className = "usuario-nome";
    nome.textContent = usuario.nome;

    const email = document.createElement("span");
    email.className = "usuario-email";
    email.textContent = usuario.email;

    info.appendChild(data);
    info.appendChild(nome);
    info.appendChild(email);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.className = "botao-excluir";
    botaoExcluir.title = "Excluir usuário";
    botaoExcluir.setAttribute("aria-label", "Excluir " + usuario.nome);

    const icone = document.createElement("span");
    icone.className = "material-symbols-outlined";
    icone.setAttribute("aria-hidden", "true");
    icone.textContent = "delete";
    botaoExcluir.appendChild(icone);

    botaoExcluir.addEventListener("click", function () {
        excluirUsuario(usuario);
    });

    item.appendChild(info);
    item.appendChild(botaoExcluir);

    return item;
}

// mostra na tela os usuários que batem com a pesquisa
function mostrarLista() {
    const usuarios = lerUsuarios();
    const termo = campoPesquisa.value.toLowerCase();
    let encontrados = 0;

    lista.innerHTML = "";

    usuarios.forEach(function (usuario) {
        const nome = usuario.nome.toLowerCase();
        const email = usuario.email.toLowerCase();

        if (nome.includes(termo) || email.includes(termo)) {
            lista.appendChild(criarItem(usuario));
            encontrados++;
        }
    });

    if (encontrados === 0) {
        const aviso = document.createElement("li");
        aviso.className = "lista-vazia";
        aviso.textContent = termo === "" ? "Nenhum usuário cadastrado." : "Nenhum usuário encontrado.";
        lista.appendChild(aviso);
    }
}

// verifica se o e-mail já foi cadastrado
function emailJaExiste(usuarios, email) {
    let existe = false;

    usuarios.forEach(function (usuario) {
        if (usuario.email.toLowerCase() === email.toLowerCase()) {
            existe = true;
        }
    });

    return existe;
}

// inclui um novo usuário na lista e no local storage
function cadastrar(evento) {
    // impede a página de recarregar ao enviar o formulário
    evento.preventDefault();

    const usuarios = lerUsuarios();
    const nome = campoNome.value;
    const email = campoEmail.value;

    if (emailJaExiste(usuarios, email)) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    // o id é o último id + 1, para excluir o item certo depois
    const id = usuarios.length === 0 ? 1 : usuarios[usuarios.length - 1].id + 1;

    usuarios.push({
        id: id,
        data: dataAtual(),
        nome: nome,
        email: email
    });

    salvarUsuarios(usuarios);
    limparCampos();
    campoPesquisa.value = "";
    mostrarLista();
}

// limpa os campos do formulário
function limparCampos() {
    campoNome.value = "";
    campoEmail.value = "";
}

// exclui um usuário da lista e do local storage
function excluirUsuario(usuario) {
    if (!confirm(`Deseja excluir o usuário ${usuario.nome}?`)) {
        return;
    }

    const usuarios = lerUsuarios();
    const restantes = [];

    usuarios.forEach(function (item) {
        if (item.id !== usuario.id) {
            restantes.push(item);
        }
    });

    salvarUsuarios(restantes);
    mostrarLista();
}

// exclui todos os usuários da lista e do local storage
function excluirTodos() {
    if (lerUsuarios().length === 0) {
        alert("Não há usuários para excluir.");
        return;
    }

    if (!confirm("Deseja excluir todos os usuários?")) {
        return;
    }

    localStorage.removeItem(CHAVE_USUARIOS);
    mostrarLista();
}

// eventos
formulario.addEventListener("submit", cadastrar);
botaoLimpar.addEventListener("click", limparCampos);
botaoExcluirTodos.addEventListener("click", excluirTodos);
campoPesquisa.addEventListener("input", mostrarLista);

// mostra a lista salva ao abrir a página
mostrarLista();
