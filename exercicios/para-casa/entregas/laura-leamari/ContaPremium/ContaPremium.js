const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
  rendaMensal

  constructor(agencia, conta, saldo, chavesPix, rendaMensal) {
    super(agencia, conta, saldo, chavesPix);
    this.rendaMensal = rendaMensal;
  }

  criarConta(agencia, conta, saldo) {
    if (this.rendaMensal < 18000) {
      throw new Error("Renda não compatível com Conta Premium");
    } else {
      super.criarConta(agencia, conta, saldo)
    }
  }
}


module.exports = ContaPremium