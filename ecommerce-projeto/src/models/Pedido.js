const { connect } = require("../db");
const Logger = require("../logger");
const { ObjectId } = require("mongodb");

class Pedido {
  constructor(idCliente, data, status) {
    this.idCliente = new ObjectId(idCliente);
    this.data = new Date(data);
    this.status = status;
  }

  static async inserir(dados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("pedidos").insertOne(dados);
      console.log("Pedido inserido:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir pedido: " + error);
    }
  }

  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const pedidos = await db.collection("pedidos").find(filtro).toArray();
      console.log("Pedidos encontrados:", pedidos);
      client.close();
    } catch (error) {
      Logger.log("Erro ao buscar pedidos: " + error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("pedidos").updateMany(filtro, { $set: novosDados });
      console.log("Pedidos atualizados:", result.modifiedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao atualizar pedidos: " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("pedidos").deleteMany(filtro);
      console.log("Pedidos deletados:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar pedidos: " + error);
    }
  }
}

module.exports = Pedido;
