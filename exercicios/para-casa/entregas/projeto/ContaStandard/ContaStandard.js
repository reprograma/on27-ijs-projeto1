const Conta = require("../Conta/Conta");

class ContaStandard extends Conta {
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
      throw new Error("Conta não é Standart");
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

  pix(valor, chavePix, tipo) {
    if (valor > this.#limite) {
      throw new Error("ERRO: Valor acima do limite diário disponível");
    }
    super.pix(valor, chavePix, tipo);
    return "Transferência realizada";
  }
}

module.exports = ContaStandard;