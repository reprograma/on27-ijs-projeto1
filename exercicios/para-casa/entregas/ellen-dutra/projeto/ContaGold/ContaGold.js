const Conta = require('../Conta/Conta');

class ContaGold extends Conta {
  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (
      agencia.length === 4 &&
      conta.length === 5 &&
      saldo > 0 &&
      renda >= 18000
    ) {
      return super.criarConta(agencia, conta, saldo, renda);
    } else {
      throw new Error('Dados inválidos para cadastro');
    }
  }
}

module.exports = ContaGold;
