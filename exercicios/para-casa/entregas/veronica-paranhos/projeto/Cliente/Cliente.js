const Conta = require("../Conta/Conta.js");

class Cliente {
  nome;
  #cpf;
  #conta;
  #renda;

  registrarCliente(nome, cpf, renda, conta) {
    if (conta instanceof Conta) {
      this.nome = nome;
      this.#cpf = cpf;
      this.#renda = renda;
      this.#conta = conta;

      return "Cliente cadastrado com sucesso!";
    } else {
      throw new Error("Error no cadastro. Dados inválidos!");
    }
  }
}

module.exports = Cliente;
