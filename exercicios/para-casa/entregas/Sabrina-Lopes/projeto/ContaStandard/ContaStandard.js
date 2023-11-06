const Conta = require('../Conta/Conta.js');

class ContaStandard extends Conta {
  #limiteTransacionalDiario = 1000;
  #limiteTransacionalRestante = this.#limiteTransacionalDiario;

  constructor(agencia, conta, saldo, rendaMensal) {
    super(agencia, conta, saldo);
    
    if (rendaMensal < 0 || rendaMensal >= 5000) {
      throw new Error("Renda mensal incompatível para conta Standard");
    }

    if (agencia.length !== 4 || conta.length !== 5 || saldo <= 0) {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  sacar(valor) {
    if (valor > this.#limiteTransacionalRestante) {
      throw new Error("Limite transacional diário excedido");
    }
    super.sacar(valor);
    this.#limiteTransacionalRestante -= valor;
  }

  transferir(valor, agenciaDestino, contaDestino) {
  const contaDestino = Conta.listaContas.find((conta) => conta.agencia === agenciaDestino && conta.conta === contaDestino);
  if (!contaDestino) {
    throw new Error("Conta não encontrada");
  }

  if (valor > this.#limiteTransacionalRestante) {
    throw new Error("Limite transacional diário excedido");
  }
}

  transferirPix(valor, chavePix, tipo) {
    if (valor > this.#limiteTransacionalRestante) {
      throw new Error("Valor inválido para transferência");
    }
    super.transferirPix(valor, chavePix, tipo);
    this.#limiteTransacionalRestante -= valor;
  }

  depositar(valor) {
    super.depositar(valor);
  }

  getLimiteTransacionalRestante() {
    return this.#limiteTransacionalRestante;
  }
}

module.exports = ContaStandard;