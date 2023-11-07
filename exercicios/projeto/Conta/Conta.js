class Conta{
    #agencia;
    #conta;
    #saldo;
    #renda;
    #limiteTransacao;
    #limiteDisponivel;
    chavesPix;
    static listaContas = [];

    constructor(agencia, conta, saldo, renda){
        this.#agencia = agencia;
        this.#conta = conta;
        this.#saldo = saldo;
        this.#renda = renda;
        this.chavesPix = {
            cpf: undefined,
            email: undefined,
            telefone: undefined
        };

        Conta.listaContas.push(this)
    }

    getRenda(){
        return this.#renda;
    }

    getLimiteTransacao(){
        return this.#limiteTransacao;

    }

    setLimiteTransacao(valor){
        this.#limiteTransacao = valor;
    }

    getLimiteDisponivel(){
        return this.#limiteDisponivel;
    }

    setLimiteDisponivel(valor){
        this.#limiteDisponivel = valor;
    }

    //metodo para destruir objeto da lista de contas pra salvar sua memoria
    destruir(){
        let i = Conta.listaContas.indexOf(this);
        Conta.listaContas.splice(i, 1)
    }

    criarConta(agencia, conta, saldo, renda){
        if(agencia.length === 4 && conta.length === 5 && saldo > 0){
            this.#agencia = agencia;
            this.#conta = conta;
            this.#saldo = saldo;
            this.#renda = renda
        
            return "Conta criada com sucesso";
        } else {
             throw new Error("Dados inválidos para cadastro");
        }

    }
    sacar(valor){
        if(valor > 0 && typeof valor === "number"){
            if(this.#saldo - valor > 0){
                const saldoAtualizado = this.#saldo - valor;
                this.setSaldo(saldoAtualizado)
            } else {
                throw new Error("Saldo insuficiente")
            }
        } else{
            throw new Error("Valor inválido para saque")
        }
    }

    depositar(valor){
        if(valor > 0 && typeof valor === "number"){
            const saldoAtualizado = this.#saldo + valor;
            this.setSaldo(saldoAtualizado)
        }else{
            throw new Error("Valor inválido para depósito")
        }
    }

    transferir(valor, agencia, conta){
        //LISTA.find(APELIDO PARA ITEM SELECIONADA => COMPARACAO )
        /**
         * antes de fazer a transferencia preciso verificar se a conta receptora existe na lista de contas
         * contaValida vai me retornar a conta se ela existir e undefined se não existir
         */
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

        //a conta não pode ficar negativa ao fazer a transferencia, 
        if(this.#saldo - valor > 0){
            const saldoAtualizado = this.#saldo - valor;
            this.setSaldo(saldoAtualizado);
            const saldoContaReceptora = contaValida.getSaldo() + valor
            contaValida.setSaldo(saldoContaReceptora);
            return "Tranferencia realizada"
        }
    }

    pix(valor, chavePix, tipo){
        let contaValida = Conta.listaContas.find(conta => conta.chavesPix[tipo] === chavePix)
       
        if(!contaValida){
            throw new Error("Chave Pix não encontrado")
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
        this.#saldo = novoSaldo;
    }

    criarChavePix(chavePix, tipo){
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
                    throw new Error("Erro: Email inválido");
                }

            case "TELEFONE":
                let regexTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
                if (regexTelefone.test(chavePix)) {
                    this.chavesPix.telefone = chavePix
                    return "Chave Pix por telefone criada com sucesso"
                } else {
                    throw new Error("Erro: Telefone inválido");
                }

            default:
                return "Chave inexistente"
                
        }
    }

    validaLimite(valor){
        if(valor <= 0 ) throw new Error('Valor deve ser valido')
        if(valor > this.#limiteDisponivel) throw new Error('Valor execede o limite diario');
        return true
    }
  
}

module.exports = Conta