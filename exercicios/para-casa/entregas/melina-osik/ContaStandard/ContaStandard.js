const Conta = require("../Conta/Conta");

class ContaStandart extends Conta {
  #renda;
  limiteTransacionalDiario = 1000;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.#renda = renda;
  }

  get renda() {
    return this.#renda;
  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda < 5000) {
      super.criarConta(agencia, conta, saldo);
      return "Conta Standard criada com sucesso";
    } else {
      throw new Error("Renda incompatível com a categoria Standard");
    }
  }

  transferir(valor, agencia, conta) {
    if (valor > this.limiteTransacionalDiario) {
      throw new Error("Valor de transferência acima do limite diário");
    } else {
      super.transferir(valor, agencia, conta);
      return "Transferência realizada";
    }
  }

  pix(valor, chavePix, tipo) {
    if (valor > this.limiteTransacionalDiario) {
      throw new Error("Valor de transferência acima do limite diário");
    } else {
      super.pix(valor, chavePix, tipo);
      return "Pix realizado";
    }
  }
}

module.exports = ContaStandart;
