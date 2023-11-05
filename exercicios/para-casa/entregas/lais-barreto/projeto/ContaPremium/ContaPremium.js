const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
  renda;
  #limiteTransacional;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
    this.#limiteTransacional = 5000;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (
      agencia.length === 4 &&
      conta.length === 5 &&
      saldo > 0 &&
      renda >= 18000
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
      throw new Error("Limite de transações diária excedido.");

    super.transferir(valor, agencia, conta);
    return "Transferência realizada com sucesso";
  }

  transferirViaPix(valor, chavePix, tipo) {
    if (valor > this.#limiteTransacional)
      throw new Error("Limite de transação diária excedido.");
    super.transferirPix(valor, chavePix, tipo);
    return "Transferência via pix realizada com sucesso";
  }
}
const contaPremium = new ContaPremium("1234", "45678", 100, 12800);

module.exports = ContaPremium;
