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
        telefone: undefined
      };
  
      Conta.listaContas.push(this)
    }
  
    destruir() {
      let i = Conta.listaContas.indexOf(this);
      Conta.listaContas.splice(i, 1)
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
    sacar(valor) {
      if (valor > 0 && typeof valor === "number") {
        if (this.#saldo - valor > 0) {
          const saldoAtualizado = this.#saldo - valor;
          this.setSaldo(saldoAtualizado)
        } else {
          throw new Error("Saldo insuficiente")
        }
      } else {
        throw new Error("Valor inválido para saque")
      }
    }
  
    depositar(valor) {
      if (valor > 0 && typeof valor === "number") {
        const saldoAtualizado = this.#saldo + valor;
        this.setSaldo(saldoAtualizado)
      } else {
        throw new Error("Valor inválido para depósito")
      }
    }
  
    transferir(valor, agencia, conta) {
  
  
      let contaValida = Conta.listaContas.find(contaReceptora => {
  
        let numeroContaReceptora = contaReceptora.getConta();
        let numeroAgenciaReceptora = contaReceptora.getAgencia();
        return numeroContaReceptora === conta && numeroAgenciaReceptora === agencia;
      })
  
      if (!contaValida) {
        throw new Error("Conta não encontrada")
      }
  
      if (valor < 0) {
        throw new Error("Valor inválido para transferencia")
      }
      if (this.#saldo - valor > 0) {
        const saldoAtualizado = this.#saldo - valor;
        this.setSaldo(saldoAtualizado);
        const saldoContaReceptora = contaValida.getSaldo() + valor
        contaValida.setSaldo(saldoContaReceptora);
        return "Transferência realizada"
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
          let regexCPF = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
          if (regexCPF.test(chavePix)) {
            this.chavesPix.cpf = chavePix;
            return "Chave Pix por CPF criada com sucesso";
          } else {
            throw new Error("Erro: CPF Inválido");
          }
  
        case "EMAIL":
          let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regexEmail.test(chavePix)) {
            this.chavesPix.email = chavePix;
            return "Chave Pix EMAIL criada com sucesso";
          } else {
            throw new Error("Erro: email Inválido");
          }
  
        case "TELEFONE":
  
          let regexTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
          if (regexTelefone.test(chavePix)) {
            this.chavesPix.telefone = chavePix;
            return "Chave Pix TELEFONE criada com sucesso";
          } else {
            throw new Error("Erro: telefone Inválido");
          }
  
  
        default:
          return "Chave inexistente"
  
      }
  
    }
  
  
  }
  
  module.exports = Conta
  
  