const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
  renda;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda < 17999.99)
      throw new Error("Renda incompatível com a criação da conta Premium.");

    super.criarConta(agencia, conta, saldo);
    return "Conta criada com sucesso!";
  }
}

module.exports = ContaPremium;
