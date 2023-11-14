const Conta = require("../Conta/Conta");

class ContaStandard extends Conta {
  renda;
  #limiteTransacional = 1000;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
  }

  criarConta(agencia, conta, saldo, renda) {
    const VALOR_MAXIMO_RENDA_STANDARD = 4999.99;
    if (renda > VALOR_MAXIMO_RENDA_STANDARD)
      throw new Error("Renda incompatível com a criação da conta Standard.");

    return super.criarConta(agencia, conta, saldo);
  }

  transferir(valor, agencia, conta) {
    if (valor > this.#limiteTransacional)
      throw new Error("Limite de transações diárias atingido.");

    return super.transferir(valor, agencia, conta);
  }

  transferirPix(valor, chavePix, tipo) {
    if (valor > this.#limiteTransacional)
      throw new Error("Limite de transações diárias atingido.");
    return super.transferirPix(valor, chavePix, tipo);
  }
}

module.exports = ContaStandard;
