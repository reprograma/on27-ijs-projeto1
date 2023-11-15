class Conta {
    #agencia;
    #conta;
    #saldo;
    renda
    chavesPix;
    static listaContas = [];

    constructor(agencia, conta, saldo){
        this.#agencia = agencia,
        this.#conta = conta,
        this.#saldo = saldo,
        this.renda = this.renda,
        this.chavesPix = {
            cpf: undefined,
            email: undefined,
            telefone: undefined
        };

        Conta.listaContas.push(this);
     
    }

    destruir(){
        let i = Conta.listaContas.indexOf(this);
        Conta.listaContas.splice
        (i, 1)
    }

    criarConta(agencia, conta, saldo){
        if(agencia.length === 4 && conta.length === 5 && saldo > 0){
            this.#agencia = agencia;
            this.#conta = conta;
            this.#saldo = saldo;

            return "Conta criada com sucesso";
        }else {
            throw new Error("Dados inválidos para cadastro")
        }
    }

    sacar(valor){
        if(valor > 0 && typeof valor === "number" ){
            if(this.#saldo- valor > 0){
            const saldoAtualizado = this.#saldo - valor;
            this.setSaldo(saldoAtualizado)
            return this.#saldo

            }else{
                throw new Error("Saldo insuficiente")
            }
            
        } else {
            throw new Error("Valor inválido para saque")
        }
  }


    getAgencia(){
        return this.#agencia;
    }

    getConta(){
        return this.#conta;
    }

    getSaldo(){
        return this.#saldo;
    }

    setSaldo(novoSaldo){
        this.#saldo = novoSaldo
    }

    setConta(novaConta){
        this.#conta = novaConta
    }

    setAgencia(novaAgencia){
        this.#agencia = novaAgencia
    }

    depositar(valor){
        if(valor > 0 && typeof valor === "number"){
            const saldoAtualizado = this.#saldo + valor;
            this.setSaldo(saldoAtualizado)
            //this.setSaldo(this.getSaldo + valor)
        } else{
            throw new Error("Valor inválido para depósito");
        }
    }

    transferir(valor, agencia, conta){
        let contaValida = Conta.listaContas.find( contaReceptora => {
            let numeroContaReceptora = contaReceptora.getConta();
            let numeroAgenciaReceptora = contaReceptora.getAgencia();
            return numeroContaReceptora === conta && numeroAgenciaReceptora === agencia;
        })

        if(!contaValida){
            throw new Error("Conta não encontrada")
        }


        if(valor < 0){
            throw new Error("Valor inválido para transferencia")
        }

        if(this.#saldo - valor > 0){
            const saldoAtualizado = this.#saldo - valor;
            this.setSaldo(saldoAtualizado);
            const saldoContaReceptora = contaValida.getSaldo() + valor
            contaValida.setSaldo(saldoContaReceptora);
            return "Transferencia realizada"
        } else {
            throw new Error("Saldo insuficiente")
        }
    }


    criarChavePix(chavePix, tipo){
        switch (tipo) {
            case "CPF":
                let regexCPF = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
                if (regexCPF.test(chavePix)) {
                    this.chavesPix.cpf = chavePix
                    return "Chave Pix por CPF criada com sucesso"
                } else {
                    throw new Error("Erro: CPF inválido")
                }

            case "EMAIL":
                let regrexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
               if (regrexEmail.test(chavePix)) {
                    this.chavesPix.email = chavePix
                    return "Chave Pix por email criada com sucesso"
               } else {
                    throw new Error("Erro: email inválido")
               }

            case "TELEFONE":
                let regexTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
                if (regexTelefone.test(chavePix)) {
                    this.chavesPix.telefone = chavePix
                    return "Chave Pix por telefone criada com sucesso"
                } else {
                    throw new Error("Erro: telefone inválido")
                }        
        
            default:
                return "Chave Inexistente"
               
        }
    }
  
    fazerPix(valor, chavePix, tipo){
        let contaValida = Conta.listaContas.find( conta => conta.chavesPix[tipo] === chavePix) 
           
        if(!contaValida){
            throw new Error("Chave pix não encontrada")
        }

        if(valor < 0){
            throw new Error("Valor inválido para pix")
        }

        if(this.#saldo - valor > 0){
            const saldoAtualizado = this.#saldo - valor;
            this.setSaldo(saldoAtualizado);
            const saldoContaReceptora = contaValida.getSaldo() + valor
            contaValida.setSaldo(saldoContaReceptora);
            return "Pix realizado"
            } else {
            throw new Error("Saldo insuficiente")
            }
        
    }
    
}
   


module.exports = { Conta }