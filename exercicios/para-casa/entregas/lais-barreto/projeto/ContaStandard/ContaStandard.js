const Conta = require("../Conta/Conta");

class ContaStandard extends Conta {
  renda;
  #limiteTransacional;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
    this.#limiteTransacional = 1000;
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
      throw new Error("Dados inválidos para cadastro");
    }
  }

  sacar(valor) {
    if (valor > this.#limiteTransacional) {
      throw new Error("Limite de transação diária excedido");
    }

    super.sacar(valor);
  }

  transferir(valor, agencia, conta) {
    if (valor > this.#limiteTransacional)
      throw new Error("Limite de transação diária excedido.");

    super.transferir(valor, agencia, conta);
    return "Transferência realizada com sucesso";
  }

  transferirViaPix(valor, chavePix, tipo) {
    if (valor < 0) {
      throw new Error("Valor inválido para transferência");
    }
    if (valor > this.#limiteTransacional) {
      throw new Error("Limite de transação diária excedido.");
    }

    const contaValida = this.verificarContaEChavePix(chavePix, tipo);

    if (!contaValida) {
      throw new Error("Conta e chave pix não encontradas");
    }

    super.transferirViaPix(valor, chavePix, tipo);
    return "Transferência via pix realizada com sucesso";
  }
}

module.exports = Conta;
