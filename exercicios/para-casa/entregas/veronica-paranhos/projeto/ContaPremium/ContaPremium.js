const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
  renda;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
  }

  criarConta(agencia, conta, saldo, renda) {
    const VALOR_MINIMO_RENDA_PREMIUM = 18000;
    if (renda < VALOR_MINIMO_RENDA_PREMIUM)
      throw new Error("Renda incompatível com a criação da conta Premium.");

    return super.criarConta(agencia, conta, saldo);
  }
}

module.exports = ContaPremium;
