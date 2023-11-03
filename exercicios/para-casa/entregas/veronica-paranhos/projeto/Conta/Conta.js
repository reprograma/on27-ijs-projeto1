class Conta {
  #agencia;
  #conta;
  #saldo;
  chavesPix;
  static listaContas = [];

  constructor(agencia, conta, saldo) {
    this.#agencia = agencia;
    this.#conta = conta;
    this.#saldo = saldo;
    this.chavesPix = {
      cpf: undefined,
      email: undefined,
      telefone: undefined,
    };

    Conta.listaContas.push(this);
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

  destruir() {
    let i = Conta.listaContas.indexOf(this);
    Conta.listaContas.splice(i, 1);
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
        const saldoAtualizado = this.#saldo - valor;
        this.setSaldo(saldoAtualizado);
      } else {
        throw new Error("Saldo insuficiente");
      }
    } else {
      throw new Error("Valor inválido para saque");
    }
  }

  depositar(valor) {
    if (valor > 0 && typeof valor === "number") {
      const saldoAtualizado = this.#saldo + valor;
      this.setSaldo(saldoAtualizado);
    } else {
      throw new Error("Valor inválido para depósito");
    }
  }

  transferir(valor, agencia, conta) {
    let contaValida = Conta.listaContas.find((contaReceptora) => {
      let numeroContaReceptora = contaReceptora.getConta();
      let numeroAgenciaReceptora = contaReceptora.getAgencia();
      return (
        numeroContaReceptora === conta && numeroAgenciaReceptora === agencia
      );
    });

    if (!contaValida) {
      throw new Error("Conta não encontrada");
    }

    if (valor < 0) {
      throw new Error("Valor inválido para transferência");
    }

    //a conta não pode ficar negativa ao fazer a transferencia,
    if (this.getSaldo() - valor > 0) {
      const saldoAtualizado = this.getSaldo() - valor;
      this.setSaldo(saldoAtualizado);
      const saldoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saldoContaReceptora);
      return "Transferência realizada com sucesso";
    } else {
      throw new Error("Saldo insuficiente.");
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

  transferirPix(valor, chavePix, tipo) {
    const tipoPix = tipo.toLowerCase();
    let contaValida = Conta.listaContas.find((conta) => {
      return conta.chavesPix[tipoPix] === chavePix;
    });

    if (!contaValida) {
      throw new Error("Chave pix não encontrada");
    }

    if (valor < 0) {
      throw new Error("Valor inválido para transferência");
    }

    //a conta não pode ficar negativa ao fazer a transferencia,
    if (this.#saldo - valor > 0) {
      const saldoAtualizado = this.#saldo - valor;
      this.setSaldo(saldoAtualizado);
      const saldoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saldoContaReceptora);
      return "Transferência por pix realizada com sucesso";
    } else {
      throw new Error("Saldo insuficiente.");
    }
  }
}

module.exports = Conta;
