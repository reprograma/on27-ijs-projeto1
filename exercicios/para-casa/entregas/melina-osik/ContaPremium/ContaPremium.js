const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
  #renda;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.#renda = renda;
  }

  get renda() {
    return this.#renda;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda >= 18000) {
      super.criarConta(agencia, conta, saldo);
      return "Conta Premium criada com sucesso"
    } else {
      throw new Error("Renda incompatível com a categoria Premium");
    }
  }
}

module.exports = ContaPremium;