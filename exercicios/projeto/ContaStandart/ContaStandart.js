// Standard
// são pessoas com até R$4999,99 de renda mensal.
// tem limite de transação de 1000 reais por dia.

const Conta = require("../Conta/Conta");

class ContaStandart extends Conta {
  #limite;

  constructor(agencia, conta, saldo) {
    super(agencia, conta, saldo);
    this.#limite = 1000;
  }

  sacar(valor) {
    if (valor > this.#limite) {
      throw new Error("Limite diário para saque é de $ 1000,00");
    }
    super.sacar(valor);
  }
}

module.exports = ContaStandart;
