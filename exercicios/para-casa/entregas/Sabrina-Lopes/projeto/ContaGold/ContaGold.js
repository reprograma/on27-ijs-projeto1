const Conta = require("../Conta/Conta"); 

class ContaGold extends Conta {
#limiteTransacionalDiario = 5000;
#limiteTransacionalRestante

  constructor(agencia, conta, saldo, rendaMensal) {
    if(rendaMensal < 5000 || rendaMensal >= 18000) throw new Error("Renda mensal incompatível para conta Gold");
    if(agencia.length !== 4 || conta.length !== 5 || saldo <= 0) throw new Error("Dados inválidos para cadastro");
    super(agencia, conta, saldo);
    this.setLimiteTransacionalDiario(5000);
  }

  getLimiteTransacionalDiario() {
    return this.#limiteTransacionalDiario;
  }

  setLimiteTransacionalDiario(valor) {
    if(valor < 0) throw new Error("Valor não atende ao limite diário");
    this.#limiteTransacionalDiario = valor;
    this.#limiteTransacionalRestante = valor;
  }

  getLimiteTransacionalRestante() { return this.#limiteTransacionalRestante; }

    sacar(valor) {
        if(valor > this.#limiteTransacionalRestante) throw new Error("Limite diário excedido");
        super.sacar(valor);
        this.#limiteTransacionalRestante -= valor;
    }

    transferir(valor, agencia, conta) {
        if(valor > this.#limiteTransacionalRestante) throw new Error("Limite diário excedido");
        super.transferir(valor, agencia, conta);
        this.#limiteTransacionalRestante -= valor;
    }

    transferirPix(valor, chavePix, tipo) {
      if(valor > this.#limiteTransacionalRestante) throw new Error("Limite diário excedido");
      super.transferirPix(valor, chavePix, tipo);
      this.#limiteTransacionalRestante -= valor;
    }
}

module.exports = ContaGold;