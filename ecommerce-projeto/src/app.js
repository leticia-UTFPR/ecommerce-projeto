const Cliente = require("./models/Cliente");
const Produto = require("./models/Produto");
const Pedido = require("./models/Pedido");
const ItemPedido = require("./models/ItemPedido");
const Pagamento = require("./models/Pagamento");

async function executar() {
  await Cliente.buscar();
  await Produto.buscar();
  await Pedido.buscar();
  await ItemPedido.buscar();
  await Pagamento.buscar();
}

executar();
