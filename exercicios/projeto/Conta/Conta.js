class Conta {
  #agencia;
  #conta;
  #saldo;
  chavesPix;

  constructor(agencia, conta, saldo) {
    this.#agencia = agencia;
    this.#conta = conta;
    this.#saldo = saldo;
    this.chavesPix = {
      cpf: undefined,
      email: undefined,
      telefone: undefined,
    };
  }

  get getAgencia() {
    return this.#agencia;
  }

  get getConta() {
    return this.#conta;
  }

  get getSaldo() {
    return this.#saldo;
  }

  setSaldo(newSaldo) {
    this.#saldo = newSaldo;
  }

  criarConta(agencia, conta, saldo) {
    if (agencia.length === 4 && conta.length === 5 && saldo > 0) {
      this.#agencia = agencia;
      this.#conta = conta;
      this.#saldo = saldo;

      return "Conta criada com sucesso";
    } else {
      throw new Error("Erro no cadastro, dados inválidos");
    }
  }

  sacar(valor) {
    if (valor > 0 && typeof valor === "number") {
      if (this.#saldo - valor > 0) {
        const saldo = (this.#saldo - valor);
        this.setSaldo(saldo);
      } else {
        throw new Error("valor inválido para saque");
      }
    } else {
      throw new Error("valor inválido para saque");
    }
  }

  depositar(valor) {
    if (valor > 0 && typeof valor === "number") {
      if (this.#saldo + valor > 0) {
        const saldo = (this.#saldo + valor);
        this.setSaldo(saldo);
      } else {
        throw new Error("valor inválido para depósito");
      }
    } else {
      throw new Error("valor inválido para depósito");
    }
  }
}
module.exports = Conta;
