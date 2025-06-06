const { connect } = require("../db");
const Logger = require("../logger");
const { ObjectId } = require("mongodb");

class Pagamento {
  constructor(idPedido, tipo, status, dataPagamento) {
    this.idPedido = new ObjectId(idPedido);
    this.tipo = tipo;
    this.status = status;
    this.dataPagamento = new Date(dataPagamento);
  }

  static async inserir(dados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("pagamentos").insertOne(dados);
      console.log("Pagamento inserido:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir pagamento: " + error);
    }
  }

  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const pagamentos = await db.collection("pagamentos").find(filtro).toArray();
      console.log("Pagamentos encontrados:", pagamentos);
      client.close();
    } catch (error) {
      Logger.log("Erro ao buscar pagamentos: " + error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("pagamentos").updateMany(filtro, { $set: novosDados });
      console.log("Pagamentos atualizados:", result.modifiedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao atualizar pagamentos: " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("pagamentos").deleteMany(filtro);
      console.log("Pagamentos deletados:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar pagamentos: " + error);
    }
  }
}

module.exports = Pagamento;
