const Conta = require("../Conta/Conta");

class ContaStandard extends Conta {
  rendaMensal;
  limiteTransacao = 1000;

  constructor(agencia, conta, saldo, chavesPix, rendaMensal) {
    super(agencia, conta, saldo, chavesPix);
    this.rendaMensal = rendaMensal
  }

  criarConta(agencia, conta, saldo) {
    if (this.rendaMensal < 0 || this.rendaMensal >= 4999.99) {
      throw new Error("Renda não compatível com Conta Premium");
    } else {
      super.criarConta(agencia, conta, saldo)
    }
  }

  transferir(valor, agencia, conta) {
    if (valor > 1000) {
      throw new Error("Erro: Valor de Transferência acima do limite diário de R$1.000,00")
    }
    if (valor > 0 && valor <= this.limiteTransacao) {
      super.transferir(valor, agencia, conta)
      return "Transferencia realizada";
    } else {
      throw new Error("Erro: Valor inválido para transferência")
    }
  }

  transferirPix(valor, chavePix, tipo) {
    if (valor > 1000) {
      throw new Error("Erro: Valor de Transferência Pix acima do limite diário de R$1.000,00")
    }
    if (valor > 0 && valor <= this.limiteTransacao) {
      super.transferirPix(valor, chavePix, tipo)
      return "Transferência Pix realizada com Sucesso";
    } else {
      throw new Error("Erro: Valor inválido para transferência")
    }
  }
}

module.exports = ContaStandard