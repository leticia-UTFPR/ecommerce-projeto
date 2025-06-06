const Cliente = require("./models/Cliente");
const Produto = require("./models/Produto");
const Pedido = require("./models/Pedido");
const ItemPedido = require("./models/ItemPedido");
const Pagamento = require("./models/Pagamento");
const { clientes, produtos, pedidos, itensPedido, pagamentos, clienteAtualizado, produtoAtualizado, pedidoAtualizado, itensPedidoAtualizado, pagamentoAtualizado } = require("./dados");

const construtores = {
  Cliente: (dados) => new Cliente(dados.nome, dados.email, dados.senha, dados.telefone, dados.endereco),
  Produto: (dados) => new Produto(dados.nome, dados.descricao, dados.categoria, dados.preco, dados.estoque),
  Pedido: (dados) => new Pedido(dados.idCliente, dados.data, dados.status),
  ItemPedido: (dados) => new ItemPedido(dados.idPedido, dados.idProduto, dados.quantidade, dados.precoUnitario),
  Pagamento: (dados) => new Pagamento(dados.idPedido, dados.tipo, dados.status, dados.dataPagamento),
};

async function testarCRUD(model, dadosCriacao, dadosAtualizacao) {
  console.log(`\n=== Testando ${model.name} ===`);

  const instancia = construtores[model.name](dadosCriacao);
  
  await model.inserir(dadosCriacao);

  await model.buscar();

  await model.atualizar(dadosCriacao, dadosAtualizacao);

  //await model.deletar(dadosAtualizacao);

  await model.buscar();
}

async function executar() {
  await testarCRUD(Cliente, clientes[0], clienteAtualizado);

  await testarCRUD(Produto, produtos[0], produtoAtualizado);

  await testarCRUD(Pedido, pedidos[0], pedidoAtualizado);

  await testarCRUD(ItemPedido, itensPedido[0], itensPedidoAtualizado);

  await testarCRUD(Pagamento, pagamentos[0], pagamentoAtualizado);
}

executar().then(() => {
  console.log("\n=== Fim da execução ===");
  process.exit(0);
}).catch(error => {
  console.error("Erro:", error);
  process.exit(1);
});
