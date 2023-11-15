const Conta = require("../Conta/Conta");
const valorRendaMinima = 18;

class ContaPremium extends Conta {
  renda;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda >= valorRendaMinima) {
      super.criarConta(agencia, conta, saldo);
      return "Conta criada com sucesso";
    } else {
      throw new Error("Sua renda não se enquadra na categoria Premium");
    }
  }
}

module.exports = ContaPremium;
