const { connect } = require("../db");
const Logger = require("../logger");

class Cliente {
  constructor(nome, email, senha, telefone, endereco) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
    this.endereco = endereco;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      const result = await db.collection("clientes").insertOne({
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        telefone: this.telefone,
        endereco: this.endereco,
      });
      console.log("Cliente inserido:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir cliente: " + error);
    }
  }

  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const clientes = await db.collection("clientes").find(filtro).toArray();
      console.log("Clientes encontrados:", clientes);
      client.close();
    } catch (error) {
      Logger.log("Erro ao buscar clientes: " + error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("clientes").updateMany(filtro, { $set: novosDados });
      console.log("Clientes atualizados:", result.modifiedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao atualizar clientes: " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("clientes").deleteMany(filtro);
      console.log("Clientes deletados:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar clientes: " + error);
    }
  }
}

module.exports = Cliente;
