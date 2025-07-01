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

  static validarCamposObrigatorios(dados) {
    const camposObrigatorios = ["nome", "email", "senha", "telefone", "endereco"];
    const camposFaltando = camposObrigatorios.filter(
      campo => !dados[campo] || dados[campo].toString().trim() === ""
    );

    if (camposFaltando.length > 0) {
      throw new Error("Campos obrigatórios faltando: " + camposFaltando.join(", "));
    }
  }

  static validarCamposAtualizacao(dados) {
    const camposObrigatorios = ["nome", "email", "senha", "telefone", "endereco"];
    const camposInvalidos = [];

    for (const campo of camposObrigatorios) {
      if (campo in dados && (dados[campo] === undefined || dados[campo].toString().trim() === "")) {
        camposInvalidos.push(campo);
      }
    }

    if (camposInvalidos.length > 0) {
      throw new Error("Campos com valores inválidos na atualização: " + camposInvalidos.join(", "));
    }
  }

  static async inserir(dados) {
    try {
      this.validarCamposObrigatorios(dados);
      
      const { db, client } = await connect();
      const result = await db.collection("clientes").insertOne(dados);
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
      this.validarCamposAtualizacao(novosDados);
      
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
