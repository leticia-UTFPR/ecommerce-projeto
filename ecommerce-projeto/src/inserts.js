const { MongoClient } = require("mongodb");
const { clientes, produtos, pedidos, itensPedido, pagamentos } = require("./dados");

const url = "mongodb://localhost:27017";
const dbName = "ecommerce";

async function inserirDados() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);

  try {
    await db.collection("clientes").insertMany(clientes);
    await db.collection("produtos").insertMany(produtos);
    await db.collection("pedidos").insertMany(pedidos);
    await db.collection("itensPedido").insertMany(itensPedido);
    await db.collection("pagamentos").insertMany(pagamentos);
    console.log("Dados inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
  } finally {
    await client.close();
  }
}

inserirDados();
