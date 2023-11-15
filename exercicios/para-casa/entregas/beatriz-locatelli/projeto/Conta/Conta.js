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
            return "Conta criada com sucesso";
        } else {
            throw new Error("Dados inválidos para cadastro");
        }
    }

    //metodo para destruir objeto da lista de contas pra salvar sua memoria
    destruirConta() {
        let i = Conta.listaContas.indexOf(this);
        Conta.listaContas.splice(i, 1)
    }


    atualizaSaldoDiminuindo(valor) {
        const saldoAtualizado = this.getSaldo() - valor;
        this.setSaldo(saldoAtualizado)
    }

    atualizaSaldoAumentando(valor) {
        const saldoAtualizado = this.getSaldo() + valor;
        this.setSaldo(saldoAtualizado)
    }

    atualizaSaldoContaReceptora(valor) {
        const saldoContaReceptora = contaValida.getSaldo() + valor
        contaValida.setSaldo(saldoContaReceptora);
    }

    verificaEntrada(valor) {
        if (valor > 0 && typeof valor === "number") {
            return valor
        } else {
            throw new Error("Valor inválido. O valor precisa ser maior que zero e precisa ser um número.")
        }
    }

    verificaSaldo(valor) {
        if (this.#saldo - valor >= 0) {
            return valor
        } else {
            throw new Error("Saldo insuficiente para realizar operação.");
        }
    }

    sacar(valor) {
        try {
            this.verificaEntrada(valor);
            this.verificaSaldo(valor);
            this.atualizaSaldoDiminuindo(valor);
        } catch (error) {
            throw error;
        }
    }

    depositar(valor) {
        try {
            this.verificaEntrada(valor);
            this.atualizaSaldoAumentando(valor);
        } catch (error) {
            throw error;
        }
    }

    verificaContaEmListaContas(agencia, conta) {
        const contaValida = Conta.listaContas.find(contaReceptora => {
            let numeroContaReceptora = contaReceptora.getConta();
            let numeroAgenciaReceptora = contaReceptora.getAgencia();
            return numeroContaReceptora === conta && numeroAgenciaReceptora === agencia;
        })
        if (!contaValida) {
            throw new Error("Conta não encontrada")
        }
    }

    transferir(valor, agencia, conta) {
        try {
            this.verificaContaEmListaContas(agencia, conta);
            this.verificaEntrada(valor);
            this.verificaSaldo(valor);
            this.atualizaSaldoDiminuindo(valor);
            this.atualizaSaldoContaReceptora(valor);
        } catch {
            throw error;
        }
    }

    criarChavePix(chavePix, tipo) {
        switch (tipo) {
            case "CPF":
                let regexCPF = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
                if (regexCPF.test(chavePix)) {
                    this.chavesPix.cpf = chavePix
                    return "Chave Pix por cpf criada com sucesso"
                } else {
                    throw new Error("Erro: CPF inválido");
                }

            case "EMAIL":
                let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (regexEmail.test(chavePix)) {
                    this.chavesPix.email = chavePix
                    return "Chave Pix por email criada com sucesso"
                } else {
                    throw new Error("Erro: EMAIL inválido");
                }

            case "TELEFONE":
                let regexTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
                if (regexTelefone.test(chavePix)) {
                    this.chavesPix.telefone = chavePix
                    return "Chave Pix por telefone criada com sucesso"
                } else {
                    throw new Error("Erro: TELEFONE inválido");
                }

            default:
                return "Chave inexistente"
        }
    }


    transferirPorPix(valor, chavePix, tipo) {
        const contaValida = Conta.listaContas.find((conta) => conta.chavesPix[tipo] === chavePix);

        if (!contaValida) {
            throw new Error("Chave pix não econtrada")
        }
        try {
            this.verificaEntrada(valor);
            this.verificaSaldo(valor);
            this.atualizaSaldoDiminuindo(valor);
            this.atualizaSaldoContaReceptora(valor);
        } catch {
            throw error;
        }
    }
}

module.exports = Conta