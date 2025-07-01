const { connect } = require("../db");
const Logger = require("../logger");

class Produto {
  constructor(nome, descricao, categoria, preco, estoque) {
    this.nome = nome;
    this.descricao = descricao;
    this.categoria = categoria;
    this.preco = preco;
    this.estoque = estoque;
  }

  static validarCamposObrigatorios(dados) {
    const camposObrigatorios = ["nome", "descricao", "categoria", "preco", "estoque"];
    const camposFaltando = camposObrigatorios.filter(
      campo => !dados[campo] || dados[campo].toString().trim() === ""
    );

    if (camposFaltando.length > 0) {
      throw new Error("Campos obrigatórios faltando: " + camposFaltando.join(", "));
    }
  }

  static validarCamposAtualizacao(dados) {
    const camposObrigatorios = ["nome", "descricao", "categoria", "preco", "estoque"];
    const camposInvalidos = [];

    for (const campo of camposObrigatorios) {
      if (campo in dados && (dados[campo] === undefined || dados[campo].toString().trim() === "")) {
        camposInvalidos.push(campo);
      }
    }
  }

  static async inserir(dados) {
    try {

      this.validarCamposObrigatorios(dados);

      const { db, client } = await connect();
      const result = await db.collection("produtos").insertOne(dados);
      console.log("Produto inserido:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir produto: " + error);
    }
  }

  static async buscar(filtro = {}) {
    try {

      this.validarCamposAtualizacao(novosDados);
      
      const { db, client } = await connect();
      const produtos = await db.collection("produtos").find(filtro).toArray();
      console.log("Produtos encontrados:", produtos);
      client.close();
    } catch (error) {
      Logger.log("Erro ao buscar produtos: " + error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("produtos").updateMany(filtro, { $set: novosDados });
      console.log("Produtos atualizados:", result.modifiedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao atualizar produtos: " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("produtos").deleteMany(filtro);
      console.log("Produtos deletados:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar produtos: " + error);
    }
  }
}

module.exports = Produto;
