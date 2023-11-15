const { validaCpf, validaEmail, validaTelefone } = require("./ContaPix");
const validaValor = require("./ContaTransacoes");
const digitosAgencia = 4;
const digitosConta = 5;

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

  destruirConta() {
    const contaIndex = Conta.listaContas.indexOf(this);
    Conta.listaContas.splice(contaIndex, 1);
  }

  criarConta(agencia, conta, saldo) {
    if (
      agencia.length === digitosAgencia &&
      conta.length === digitosConta &&
      saldo > 0
    ) {
      this.#agencia = agencia;
      this.#conta = conta;
      this.#saldo = saldo;

      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  sacar(valor) {
    validaValor(valor, "Valor inválido para saque");
    if (this.#saldo - valor > 0) {
      const saldoAtualizado = this.#saldo - valor;
      this.setSaldo(saldoAtualizado);
    } else {
      throw new Error("Saldo insuficiente");
    }
  }

  depositar(valor) {
    validaValor(valor, "Valor inválido para depósito");
    const saldoAtualizado = this.#saldo + valor;
    this.setSaldo(saldoAtualizado);
  }

  transferir(valor, agencia, conta) {
    const contaValida = Conta.listaContas.find((contaReceptora) => {
      const numeroContaReceptora = contaReceptora.getConta();
      const numeroAgenciaReceptora = contaReceptora.getAgencia();
      return (
        numeroContaReceptora === conta && numeroAgenciaReceptora === agencia
      );
    });

    if (!contaValida) {
      throw new Error("Conta não encontrada");
    }

    if (valor < 0) {
      throw new Error("Valor inválido para transferencia");
    }

    if (this.#saldo - valor > 0) {
      const saldoAtualizado = this.#saldo - valor;
      this.setSaldo(saldoAtualizado);
      const saldoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saldoContaReceptora);
      return "Tranferencia realizada";
    }
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

  criarChavePix(chavePix, tipo) {
    switch (tipo) {
      case "CPF":
        if (validaCpf(chavePix, "Erro: CPF inválido")) {
          this.chavesPix.cpf = chavePix;
          return "Chave Pix por cpf criada com sucesso";
        }
        break;
      case "EMAIL":
        if (validaEmail(chavePix, "Erro: Email inválido")) {
          this.chavesPix.email = chavePix;
          return "Chave Pix por email criada com sucesso";
        }
        break;
      case "TELEFONE":
        if (validaTelefone(chavePix, "Erro: Telefone inválido")) {
          this.chavesPix.telefone = chavePix;
          return "Chave Pix por telefone criada com sucesso";
        }
        break;
    }
    return "Chave inexistente";
  }

  transferirPorPix(valor, chavePix, tipo) {
    const contaValida = Conta.listaContas.find((contaReceptora) => {
      switch (tipo) {
        case "TELEFONE":
          return contaReceptora.chavesPix.telefone == chavePix;

        case "EMAIL":
          return contaReceptora.chavesPix.email == chavePix;

        case "CPF":
          return contaReceptora.chavesPix.cpf == chavePix;

        default:
          return false;
      }
    });

    if (!contaValida) {
      throw new Error("Chave pix não encontrada");
    }

    if (valor < 0) {
      throw new Error("Valor inválido de pix");
    }

    if (this.#saldo - valor > 0) {
      const saldoAtualizado = this.#saldo - valor;
      this.setSaldo(saldoAtualizado);
      const saldoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saldoContaReceptora);
      return "Tranferencia pix realizada com sucesso";
    } else {
      throw new Error("Saldo insuficiente");
    }
  }
}

module.exports = Conta;
