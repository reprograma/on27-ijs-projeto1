const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
  renda;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda >= 18000) {
      super.criarConta(agencia, conta, saldo);
      return "Conta criada com sucesso";
    } else {
      throw new Error("Não é Conta Premium");
    }
  }
}

module.exports = ContaPremium;