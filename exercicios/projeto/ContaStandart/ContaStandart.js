// Standard
// são pessoas com até R$4999,99 de renda mensal.
// tem limite de transação de 1000 reais por dia.

const Conta = require("../Conta/Conta");

class ContaStandart extends Conta {
  #limite;
  renda;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
    this.#limite = 1000;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda <= 4999.99) {
      super.criarConta(agencia, conta, saldo);
      return "Conta criada com sucesso";
    } else {
      throw new Error("Renda não compatível com Conta Standart");
    }
  }

  transferir(valor, agencia, conta) {
    if (valor > 0 && valor <= this.#limite) {
      super.transferir(valor, agencia, conta);
      return "Transferência realizada";
      
    } else {
      throw new Error("Valor de transferência acima do limite diário");
    }
  }
}

module.exports = ContaStandart;

