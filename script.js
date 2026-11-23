
const URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";

const botao = document.querySelector("#btn-carregar");
const filtro = document.querySelector("#filtro");
const mensagem = document.querySelector("#mensagem");
const painel = document.querySelector("#lista-posts");

let publicacoes = [];

function carregarPublicacoes() {

    mensagem.textContent = "Carregando...";
    botao.disabled = true;

    fetch(URL)
        .then(resposta => resposta.json())
        .then(dados => {

            const titulos = [
                "Meu dia",
                "Meus estudos",
                "Tecnologia",
                "Novidades",
                "Amizades",
                "Programação"
            ];

            const textos = [
                "Hoje foi um dia muito bom.",
                "Estudar é importante para o futuro.",
                "A tecnologia faz parte da nossa vida.",
                "Sempre temos coisas novas para aprender.",
                "Ter amigos é muito importante.",
                "Estou aprendendo a criar sites."
            ];

            publicacoes = dados.map((item, i) => ({
                id: item.id,
                title: titulos[i],
                body: textos[i]
            }));

            mostrarPublicacoes(publicacoes);

            mensagem.textContent = "Publicações carregadas!";
        })
        .catch(erro => {
            mensagem.textContent = "Erro ao carregar publicações.";
            console.log(erro);
        })
        .finally(() => {
            botao.disabled = false;
        });
}

function mostrarPublicacoes(lista) {

    painel.innerHTML = "";

    lista.forEach(item => {

        const cartao = document.createElement("div");

        cartao.classList.add("cartao");

        cartao.innerHTML = `
            <span>PUBLICAÇÃO #${item.id}</span>
            <h2>${item.title}</h2>
            <p>${item.body}</p>
        `;

        painel.appendChild(cartao);

    });

}

botao.addEventListener("click", carregarPublicacoes);

filtro.addEventListener("input", () => {

    const pesquisa = filtro.value.toLowerCase();

    const resultado = publicacoes.filter(item =>
        item.title.toLowerCase().includes(pesquisa)
    );

    mostrarPublicacoes(resultado);

    if (resultado.length === 0) {
        mensagem.textContent = "Nenhuma publicação encontrada.";
    } else {
        mensagem.textContent = "Publicações encontradas: " + resultado.length;
    }

});
