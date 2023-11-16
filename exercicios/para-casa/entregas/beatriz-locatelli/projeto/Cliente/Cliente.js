const Conta = require("../Conta/Conta");

class Cliente {
  nome;
  #cpf;
  #conta;

  cadastrarCliente(nome, cpf, conta) {
    if (conta instanceof Conta) {
      this.nome = nome;
      this.#cpf = cpf;
      this.#conta = conta;

      return "Cliente Cadastrado";
    } else if (!nome || !cpf || !conta) {
      throw new Error("Erro no cadastro, dados incompletos");
    }
  }

  get cpf() {
    return this.#cpf
  }

  get conta() {
    return this.#conta
  }
}

module.exports = Cliente;
