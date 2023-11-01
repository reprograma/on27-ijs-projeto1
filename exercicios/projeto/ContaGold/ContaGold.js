// Gold
// renda mensal de R$5000,00 até R$17.999,99. 
// tem limite de transação de 5000 reais por dia.

const Conta = require("../Conta/Conta");

class ContaGold extends Conta {
    #limite;
  
    constructor(agencia, conta, saldo) {
      super(agencia, conta, saldo);
      this.#limite = 5000;
    }

    sacar(valor) {
      if (valor > this.#limite) {
        throw new Error("Limite diário para saque é de $ 5000,00");
      }
      super.sacar(valor);
    }
  }
  
  module.exports = ContaGold;
  