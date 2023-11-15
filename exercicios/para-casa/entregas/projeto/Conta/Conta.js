
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

  destruir() {
    let indiceContaAtual  = Conta.listaContas.indexOf(this);
    Conta.listaContas.splice(indiceContaAtual, 1);
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

  setSaldo(newSaldo) {
    this.#saldo = newSaldo;
  }

  getChavesPix() {
    return this.chavesPix
  }

 
  criarConta(agencia, conta, saldo) {
    if (agencia.length === 4 && conta.length === 5 && saldo > 0) {
      this.#agencia = agencia;
      this.#conta = conta;
      this.#saldo = saldo;

      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  autenticarCriacaoDeConta(){
    
  }

  sacar(valor) {
    if (valor > 0 && typeof valor === "number") {
      if (this.#saldo - valor > 0) {
        const saldo = this.#saldo - valor;
        this.setSaldo(saldo);
      } else {
        throw new Error("Saldo insuficiente");
      }
    } else {
      throw new Error("Valor inválido para saque");
    }
  }

  depositar(valor) {
    if (valor > 0 && typeof valor === "number") {
      if (this.#saldo + valor > 0) {
        const saldo = this.#saldo + valor;
        this.setSaldo(saldo);
      } else {
        throw new Error("Valor inválido para depósito");
      }
    } else {
      throw new Error("Valor inválido para depósito");
    }
  }

  transferirViaPix(valor, agencia, conta) {
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
      throw new Error("Valor inválido para trnasferência");
    }

    if (this.#saldo - valor >= 0) {
      const saldoAtualizado = this.#saldo - valor;
      this.setSaldo(saldoAtualizado);
      const saldoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saldoContaReceptora);
      return "Transferência realizada";
    }
  }

  transferirPix(valor, chavePix, tipo) {
    let contaValida = Conta.listaContas.find(conta => conta && conta.chavesPix && conta.chavesPix[tipo] === chavePix) 
    if (!contaValida) {
      throw new Error("Conta e chave Pix não encontrada");
    }
    if (valor < 0) {
      throw new Error("Valor inválido para transferência");
    }
    if (this.#saldo - valor > 0) {
      const saldoAtualizado = this.#saldo - valor;
      this.setSaldo(saldoAtualizado);
      const saldoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saldoContaReceptora);
      return "Transferência realizada";
    } else {
      throw new Error ("Saldo insuficiente para essa transação")
    }
  }
}
module.exports = Conta;