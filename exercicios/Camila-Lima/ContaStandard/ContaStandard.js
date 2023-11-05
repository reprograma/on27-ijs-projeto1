const Conta = require("../Conta/Conta");

class ContaStandard extends Conta{
    constructor(agencia, conta, saldo, renda){
        super(agencia, conta, saldo, renda);
        this.renda = renda;
        this.limiteTransacao = 1000;  
    }

    criarConta(agencia, conta, saldo, renda ){
        if(renda <= 4999.99){
            super.criarConta(agencia,conta, saldo)
            return "Conta Standard criada com sucesso!"
        }
        else {
             throw new Error("Dados inválidos para cadastro");
        }
    }

    transferirStandard(valor, agencia, conta){
        if(valor >= this.limiteTransacao){
            return "O valor excede o limite de transação diário"
        }else{
            super.transferir(valor, agencia, conta)
            return "Transferência realizada"
        }
    }
}

module.exports = ContaStandard