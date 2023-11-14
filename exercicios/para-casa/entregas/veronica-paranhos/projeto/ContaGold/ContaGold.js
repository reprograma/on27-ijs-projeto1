const Conta = require("../Conta/Conta");

class ContaGold extends Conta {
  renda;
  #limiteTransacional = 5000;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
  }

  criarConta(agencia, conta, saldo, renda) {
    const VALOR_MINIMO_RENDA_GOLD = 5000;
    const VALOR_MAXIMO_RENDA_GOLD = 17999.99;

    if (renda < VALOR_MINIMO_RENDA_GOLD || renda > VALOR_MAXIMO_RENDA_GOLD)
      throw new Error("Renda incompatível com a criação da conta Gold.");

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

module.exports = ContaGold;
