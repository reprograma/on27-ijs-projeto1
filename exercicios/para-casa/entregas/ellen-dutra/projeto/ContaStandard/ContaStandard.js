const Conta = require('../Conta/Conta');

class ContaStandard extends Conta {
  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
    this.limiteTransacional = 1000;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (
      agencia.length === 4 &&
      conta.length === 5 &&
      saldo > 0 &&
      renda < 5000
    ) {
      return super.criarConta(agencia, conta, saldo, renda);
    } else {
      throw new Error('Dados inválidos para cadastro');
    }
  }

  transferir(valor, agencia, conta) {
    if (valor > this.limiteTransacional) {
      throw new Error('Valor excede limite transacional de R$ 1000');
    } else {
      return super.transferir(valor, agencia, conta);
    }
  }

  pix(valor, chave, tipo) {
    if (valor > this.limiteTransacional) {
      throw new Error('Valor excede limite transacional de R$ 1000');
    } else {
      return super.pix(valor, chave, tipo);
    }
  }
}

module.exports = ContaStandard;
