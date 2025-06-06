const { ObjectId } = require("mongodb");

const clientes = [
  {
    _id: new ObjectId("665000000000000000000001"),
    nome: "João Silva",
    email: "joao@email.com",
    senha: "hash_senha",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123 - São Paulo, SP"
  }
];

const produtos = [
  {
    _id: new ObjectId("665000000000000000000002"),
    nome: "Notebook Dell XPS",
    descricao: "Notebook com 16GB RAM, SSD 512GB",
    categoria: "Informática",
    preco: 5999.99,
    estoque: 20
  }
];

const pedidos = [
  {
    _id: new ObjectId("665000000000000000000003"),
    idCliente: clientes[0]._id,
    data: new Date("2025-05-25T14:00:00Z"),
    status: "Em processamento"
  }
];

const itensPedido = [
  {
    idPedido: pedidos[0]._id,
    idProduto: produtos[0]._id,
    quantidade: 2,
    precoUnitario: 5999.99
  }
];

const pagamentos = [
  {
    idPedido: pedidos[0]._id,
    tipo: "cartao",
    status: "pago",
    dataPagamento: new Date("2025-05-25T15:00:00Z")
  }
];

const clienteAtualizado = {
  nome: "João Silva Atualizado",
  email: "joao_atualizado@email.com",
  senha: "nova_hash_senha",
  telefone: "(11) 98888-8888",
  endereco: "Av. Paulista, 1000 - São Paulo, SP"
};

const produtoAtualizado = {
  nome: "Notebook Dell XPS Plus",
  descricao: "Notebook com 32GB RAM, SSD 1TB",
  categoria: "Informática",
  preco: 6999.99,
  estoque: 10
};

const pedidoAtualizado = {
  status: "Enviado",
  data: new Date("2025-05-26T10:00:00Z")
};

const itemPedidoAtualizado = {
  quantidade: 1,
  precoUnitario: 5499.99
};

const pagamentoAtualizado = {
  tipo: "pix",
  status: "confirmado",
  dataPagamento: new Date("2025-05-26T11:00:00Z")
};

module.exports = {
  clientes,
  produtos,
  pedidos,
  itensPedido,
  pagamentos,
  clienteAtualizado,
  produtoAtualizado,
  pedidoAtualizado,
  itemPedidoAtualizado,
  pagamentoAtualizado
};
