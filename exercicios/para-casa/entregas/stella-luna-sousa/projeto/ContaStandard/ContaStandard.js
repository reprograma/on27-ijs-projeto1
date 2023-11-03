const Conta = require('../Conta/Conta.js');

class ContaStandard extends Conta {
#limiteTransacionalDiario = 1000;
#limiteTransacionalRestante

  constructor(agencia, conta, saldo, rendaMensal) {
    if(rendaMensal < 0 || rendaMensal >= 5000) throw new Error("Renda mensal incompatível para conta Standard");
    if(agencia.length !== 4 || conta.length !== 5 || saldo <= 0) throw new Error("Dados inválidos para cadastro");
    super(agencia, conta, saldo);
    this.setLimiteTransacionalDiario(1000);
  }

  getLimiteTransacionalDiario() {
    return this.#limiteTransacionalDiario;
  }

  setLimiteTransacionalDiario(valor) {
    if(valor < 0) throw new Error("Valor inválido para limite transacional diário");
    this.#limiteTransacionalDiario = valor;
    this.#limiteTransacionalRestante = valor;
  }

  getLimiteTransacionalRestante() { return this.#limiteTransacionalRestante; }

    sacar(valor) {
        if(valor > this.#limiteTransacionalRestante) throw new Error("Limite transacional diário excedido");
        super.sacar(valor);
        this.#limiteTransacionalRestante -= valor;
    }

    transferir(valor, agencia, conta) {
        if(valor > this.#limiteTransacionalRestante) throw new Error("Limite transacional diário excedido");
        super.transferir(valor, agencia, conta);
        this.#limiteTransacionalRestante -= valor;
    }

    transferirPix(valor, chavePix, tipo) {
      if(valor > this.#limiteTransacionalRestante) throw new Error("Limite transacional diário excedido");
      super.transferirPix(valor, chavePix, tipo);
      this.#limiteTransacionalRestante -= valor;
    }
}

module.exports = ContaStandard;