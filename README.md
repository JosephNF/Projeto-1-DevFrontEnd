# CirculaHub

Site dos Projetos 1 e 2 da disciplina de Programação Web Front-End. O Projeto 1 é o layout do site, feito com HTML e CSS. O Projeto 2 acrescenta uma página de administração em JavaScript.

O CirculaHub é a proposta de um espaço comunitário para consertar e reaproveitar itens danificados ou sem uso: eletrodomésticos, eletrônicos, móveis e roupas. O site conecta quem tem um item quebrado a técnicos, artesãos e pessoas da região que sabem consertar, e divulga oficinas e mutirões de reparo. A ideia é que os produtos durem mais, que menos coisa vá para o lixo e que o dinheiro do conserto fique com quem trabalha no bairro.

## Equipe

CirculaHub Team

| Integrante | Currículo |
|---|---|
| Raphael Rossi | [LinkedIn](https://br.linkedin.com/in/rossipoke?trk=people-guest_people_search-card) |
| José Augusto de Barros Ardenghi | [LinkedIn](https://br.linkedin.com/in/joseaba) |
| Juliano Moreto Massoca | [LinkedIn](https://www.linkedin.com/in/juliano-massoca-630a57396/) |

## ODS e público-alvo

O projeto atende ao ODS 9 (Indústria, Inovação e Infraestrutura), na meta 9.4, que trata de uma indústria mais sustentável e do uso eficiente de recursos. Consertar um item em vez de comprar outro reduz o consumo de matéria-prima e o descarte.

O público são moradores que querem gastar menos, jovens preocupados com consumo consciente e quem gosta de consertar as próprias coisas. Técnicos e artesãos da região entram como parceiros, pelo cadastro do site.

## Páginas

A página inicial (`index.html`) apresenta o projeto. Tem as seções Sobre, O que consertamos, Como funciona, Oficinas e mutirões e Parceiros, e o rodapé traz o link do currículo de cada integrante.

A página de cadastro (`cadastro.html`) é para quem quer prestar serviço. O formulário pede nome, profissão, área de atuação, bairro/cidade, telefone, e-mail, senha e confirmação de senha. Ao enviar, o usuário vai para o login.

A página de login (`login.html`) pede e-mail e senha e leva para a página inicial. O login é só uma simulação: nenhum dado é guardado.

## Projeto 2: página Adm

O menu da página inicial ganhou o item Adm, que abre a página `adm.html`. Ela segue o mesmo visual do resto do site e serve para cadastrar usuários com nome e e-mail.

O que dá para fazer na página:

- **Cadastrar:** o usuário entra numa lista logo abaixo do formulário, com a data e a hora do envio, o nome e o e-mail. Não é possível cadastrar o mesmo e-mail duas vezes.
- **Limpar campos:** esvazia o formulário.
- **Excluir um usuário:** o ícone de lixeira de cada item remove o usuário da lista e do Local Storage, depois de pedir confirmação.
- **Excluir todos:** apaga a lista inteira, também com confirmação.
- **Pesquisar:** enquanto se digita, a lista mostra só os usuários cujo nome ou e-mail contém o texto. Maiúsculas e minúsculas não fazem diferença.

Os dados ficam salvos no navegador, no Local Storage, em uma única chave (`usuarios`). O valor é um array de objetos JSON, e cada objeto guarda `id`, `data`, `nome` e `email`. Por isso a lista continua lá quando a página é recarregada.

O código está em `js/adm.js`. Ele usa só as APIs DOM e Web Storage, sem bibliotecas nem frameworks, e foi dividido em funções curtas, uma para cada ação:

| Função | O que faz |
|---|---|
| `lerUsuarios()` / `salvarUsuarios()` | Leem e gravam a chave `usuarios`, com `JSON.parse` e `JSON.stringify` |
| `mostrarLista()` | Monta a lista na tela, já aplicando o texto da pesquisa |
| `cadastrar()` | Valida o e-mail repetido, cria o registro com a data e salva |
| `limparCampos()` | Limpa o nome e o e-mail do formulário |
| `excluirUsuario()` | Confirma e remove um usuário pelo `id` |
| `excluirTodos()` | Confirma e remove a chave `usuarios` |

## Tecnologias

As fontes Inter e Source Code Pro vêm do Google Fonts, e os ícones vêm do Material Symbols, também do Google.

As cores do site são preto (`#1a1a1a`), branco (`#ffffff`), laranja (`#fd6925`, o tom do ODS 9) e azul (`#1f5f8b`).

A página Adm usa JavaScript puro, com as APIs DOM e Web Storage.

## Validação

O HTML das páginas foi validado no [W3C Markup Validator](https://validator.w3.org/) e o CSS no [W3C CSS Validator](https://jigsaw.w3.org/css-validator/). Os prints abaixo são do Projeto 1. No Projeto 2, a `adm.html`, o `index.html` com o novo item de menu e o CSS atualizado também passaram nos validadores.

- [HTML da página inicial](Prints-Validacoes/validacao-html-index.png)
- [HTML do cadastro](Prints-Validacoes/validacao-html-cadastro.png)
- [HTML do login](Prints-Validacoes/validacao-html-login.png)
- [CSS](Prints-Validacoes/validacao-css.png)

## Como acessar

Site publicado no GitHub Pages: (link a adicionar)

Vídeo de apresentação: (link a adicionar)

Para abrir localmente, basta abrir o arquivo `index.html` no navegador.
