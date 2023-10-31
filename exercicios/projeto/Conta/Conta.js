class Conta{
    #saldo;
    #agencia;
    #conta;
    chavesPix

    constructor(agencia, conta, saldo){
        this.#agencia = agencia;
        this.#conta = conta;
        this.#saldo = saldo;
        this.chavesPix = {
            cpf: undefined,
            telefone: undefined,
            email: undefined
        };
    }


    criarConta(agencia, conta, saldo){
        if(agencia.legth !== 4 && conta.legth !== 5 && saldo <= 0){
            throw new Error('Dados inválidos!')
        } 

        this.#agencia = agencia;
        this.#conta = conta;
        this.#saldo = saldo;
        
        return 'Conta cadastrada com sucesso!'

    }

    sacar(valor){

        if(valor <= 0){
            throw new Error('Valor inválido para saque.')
        }

        if(valor > this.#saldo){
            return `Saldo insuficiente para realizar o saque. Seu saldo é R$ ${this.#saldo}!`
        }

        this.#saldo -= valor // this.setSaldo(this.#saldo-valor)
        return 'Saque realizado com sucesso!'

    }

    depositar(valor){
        if(valor <= 0){
            throw new Error('Erro ao depositar. Valor inválido.')
        }
        this.#saldo += valor
        return 'Depósito recebido com sucesso!'
    }



    get getAgencia(){
        return this.#agencia
    }

    get getConta(){
        return this.#conta;
    }

    get getSaldo(){
        return this.#saldo;
    }

    set setSaldo(novoSaldo){
        return this.#saldo = novoSaldo;
    }


}

module.exports = Conta