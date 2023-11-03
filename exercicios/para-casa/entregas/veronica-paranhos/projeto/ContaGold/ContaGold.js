const Conta = require("../Conta/Conta");

class ContaGold extends Conta {
  renda;
  #limiteTransacional;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
    this.#limiteTransacional = 1000;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda < 4999.99 || renda > 17999.99)
      throw new Error("Renda incompatível com a criação da conta Gold.");

    super.criarConta(agencia, conta, saldo);
    return "Conta criada com sucesso!";
  }

  sacar(valor) {
    if (valor > this.#limiteTransacional)
      throw new Error("Limite de transações diárias atingido.");

    super.sacar(valor);
  }

  transferir(valor, agencia, conta) {
    if (valor > this.#limiteTransacional)
      throw new Error("Limite de transações diárias atingido.");

    super.transferir(valor, agencia, conta);
    return "Transferência realizada com sucesso";
  }

  transferirPix(valor, chavePix, tipo) {
    if (valor > this.#limiteTransacional)
      throw new Error("Limite de transações diárias atingido.");
    super.transferirPix(valor, chavePix, tipo);
    return "Transferência por pix realizada com sucesso";
  }
}

module.exports = ContaGold;
