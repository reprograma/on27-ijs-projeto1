const Conta = require('../Conta/Conta.js');

class ContaPremium extends Conta {
  constructor(agencia, conta, saldo, rendaMensal) {
    if(rendaMensal < 18000) throw new Error("Renda mensal incompatível para conta Premium");
    if(agencia.length !== 4 || conta.length !== 5 || saldo <= 0) throw new Error("Dados inválidos para cadastro");
    super(agencia, conta, saldo);
  }
}

module.exports = ContaPremium;