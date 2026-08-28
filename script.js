let todosProdutos = [];

function renderizarProdutos(produtos) {
    const container = document.getElementById('produtos');
    container.innerHTML = '';

    if(produtos.length === 0){
        container.innerHTML = 'Produto não encontrado'
        return
    }

    produtos.forEach(item => {
        const elemento = document.createElement('div');
        elemento.classList.add('produto');
        elemento.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <h2>${item.nome}</h2>
            <p>R$ ${item.preco.toFixed(2)}</p>`;
        container.appendChild(elemento);
    });
}

// JSON
fetch('products.json')
    .then(response => response.json())
    .then(dado => {
        todosProdutos = dado;
        renderizarProdutos(todosProdutos);
    })
    .catch(erro => console.error('Erro ao carregar JSON', erro));


// Menu
function abrirMenu(){
    const menu = document.getElementById('menu');
    menu.classList.toggle('aberto');
}

// Menu filtra os produtos
//1- Busca todos os links na tag 'a' do 'menu' que tem 'data-categoria'
document.querySelectorAll('#menu a[data-categoria]').forEach(link => {
    //2-Espera o click
    link.addEventListener('click', evento => {
        evento.preventDefault();

        //3-Ler o valor em data-categoria
        const categoria = link.dataset.categoria;
        //4-Mantém apenas os produtos da categoria clicada
        const produtos = categoria === 'todos'? todosProdutos : todosProdutos.filter(item => item.categoria === categoria);

        //5-Exibe os produtos filtrados
        renderizarProdutos(produtos);
        //6-Rolagem suave até os produtos
        document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
        //7-Fecha o menu
        document.getElementById('menu').classList.remove('aberto');
    });
});

// Busca
function buscarProduto() {
    const termo = document.getElementById('inputBusca').value.trim();
    const termoBusca = termo.toLowerCase();

    const produtosEncontrados = todosProdutos.filter(item =>
        item.nome.toLowerCase().includes(termoBusca) ||
        item.categoria.toLowerCase().includes(termoBusca)
    );

    renderizarProdutos(produtosEncontrados);
}

// Limpar 
function limparBusca() {
    document.getElementById('inputBusca').value = '';
    renderizarProdutos(todosProdutos);
}