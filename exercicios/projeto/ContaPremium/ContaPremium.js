// Premium
// renda mensal a partir de R$18.000,00. 
// Eles não tem limite de transação por dia

const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
    #limite;
  
    constructor(agencia, conta, saldo, limite) {
      super(agencia, conta, saldo);
      this.#limite = limite;
    }
  }
  
  module.exports = ContaPremium;
  