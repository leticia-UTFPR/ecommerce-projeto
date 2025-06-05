const { connect } = require("../db");
const Logger = require("../logger");
const { ObjectId } = require("mongodb");

class ItemPedido {
  constructor(idPedido, idProduto, quantidade, precoUnitario) {
    this.idPedido = new ObjectId(idPedido);
    this.idProduto = new ObjectId(idProduto);
    this.quantidade = quantidade;
    this.precoUnitario = precoUnitario;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      const result = await db.collection("itensPedido").insertOne({
        idPedido: this.idPedido,
        idProduto: this.idProduto,
        quantidade: this.quantidade,
        precoUnitario: this.precoUnitario,
      });
      console.log("Item do pedido inserido:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir item do pedido: " + error);
    }
  }

  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const itens = await db.collection("itensPedido").find(filtro).toArray();
      console.log("Itens encontrados:", itens);
      client.close();
    } catch (error) {
      Logger.log("Erro ao buscar itens: " + error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("itensPedido").updateMany(filtro, { $set: novosDados });
      console.log("Itens atualizados:", result.modifiedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao atualizar itens: " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("itensPedido").deleteMany(filtro);
      console.log("Itens deletados:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar itens: " + error);
    }
  }
}

module.exports = ItemPedido;
