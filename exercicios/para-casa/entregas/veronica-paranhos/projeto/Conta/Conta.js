class Conta {
  #agencia;
  #conta;
  #saldo;
  chavesPix;
  static listaConta = [];

  constructor(agencia, conta, saldo) {
    this.#agencia = agencia;
    this.#conta = conta;
    this.#saldo = saldo;
    this.chavesPix = {
      cpf: undefined,
      email: undefined,
      telefone: undefined,
    };

    Conta.listaConta.push(this);
  }

  getAgencia() {
    return this.#agencia;
  }

  getConta() {
    return this.#conta;
  }

  getSaldo() {
    return this.#saldo;
  }

  setSaldo(novoSaldo) {
    this.#saldo = novoSaldo;
  }

  criarConta(agencia, conta, saldo) {
    if (agencia.length === 4 && conta.length === 5 && saldo > 0) {
      this.#agencia = agencia;
      this.#conta = conta;
      this.#saldo = saldo;

      return "Conta criada com sucesso!";
    } else {
      throw new Error("Dados inválidos!");
    }
  }

  sacar(valor) {
    if (valor > 0 && typeof valor === "number") {
      if (this.#saldo - valor > 0) {
        this.setSaldo(this.getSaldo() - valor);
      } else {
        throw new Error("Saldo insuficiente");
      }
    } else {
      throw new Error("Valor inválido para saque");
    }
  }

  depositar(valor) {
    if (valor > 0 && typeof valor === "number") {
      this.setSaldo(this.getSaldo() + valor);
    } else {
      throw new Error("Valor inválido para depósito");
    }
  }

  transferir(valor, agencia, conta) {
    let contaValida = Conta.listaConta.find((contaSelecionada) => {
      return (
        contaSelecionada.getConta() === conta &&
        contaSelecionada.getAgencia() === agencia
      );
    });

    if (!contaValida) {
      throw new Error("Contão não encontrado");
    }

    if (valor > 0) {
      throw new Error("Contão não encontrado");
    }

    if (this.#saldo - valor > 0) {
      const saldoAtualizado = this.#saldo - valor;
      this.setSaldo(saldoAtualizado);
      const saltoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saltoContaReceptora);
      return "Transferência realizada com sucesso";
    }
  }

  criarChavePix(chavePix, tipoDaChave) {
    switch (tipoDaChave) {
      case "CPF":
        let regexCpf =
          /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
        if (regexCpf.test(chavePix)) {
          this.chavesPix.cpf = chavePix;
          return "Chave pix por CPF criada com sucesso";
        } else {
          throw new Error("Error: CPF inválido");
        }

      case "EMAIL":
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regexEmail.test(chavePix)) {
          this.chavesPix.email = chavePix;
          return "Chave pix por email criada com sucesso";
        } else {
          throw new Error("Error: Email inválido");
        }

      case "TELEFONE":
        let regexTel =
          /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
        if (regexTel.test(chavePix)) {
          this.chavesPix.telefone = chavePix;
          return "Chave pix por telefone criada com sucesso";
        } else {
          throw new Error("Error: Telefone inválido");
        }
      default:
        return "Chave inexistente";
    }
  }
}

module.exports = Conta;
