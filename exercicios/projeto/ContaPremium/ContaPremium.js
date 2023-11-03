// Premium
// renda mensal a partir de R$18.000,00.
// Eles não tem limite de transação por dia

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
      throw new Error("Renda não compatível com Conta Premium");
    }
  }
}

module.exports = ContaPremium;
