const Conta = require("../Conta/Conta");
const valorRendaMaxima = 4999.99;

class ContaStandart extends Conta {
  limiteTransacional;
  renda;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
    this.limiteTransacional = 1000;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda <= valorRendaMaxima) {
      super.criarConta(agencia, conta, saldo);
      return "Conta criada com sucesso";
    } else {
      throw new Error("Sua renda não se enquadra na categoria Standard");
    }
  }

  transferir(valor, agencia, conta) {
    if (valor > 0 && valor <= this.limiteTransacional) {
      super.transferir(valor, agencia, conta);
      return "Transferência realizada";
    } else {
      throw new Error("Valor a ser transferido é maior que o permitido");
    }
  }

  transferirPix(valor, chavePix, tipo) {
    if (valor > this.limiteTransacional) {
      throw new Error("Valor a ser transferido é maior que o permitido");
    }
    super.transferirPix(valor, chavePix, tipo);
    return "Transferência realizada";
  }
}

module.exports = ContaStandart;
