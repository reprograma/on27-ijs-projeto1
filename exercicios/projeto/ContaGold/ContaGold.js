// Gold
// renda mensal de R$5000,00 até R$17.999,99.
// tem limite de transação de 5000 reais por dia.

const Conta = require("../Conta/Conta");

class ContaGold extends Conta {
  #limite;
  renda;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
    this.#limite = 5000;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda >= 5000 && renda <= 17999.99) {
      super.criarConta(agencia, conta, saldo);
      return "Conta criada com sucesso";
    } else {
      throw new Error("Renda não compatível com Conta Gold");
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

module.exports = ContaGold;
