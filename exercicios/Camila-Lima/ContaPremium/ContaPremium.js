const Conta = require("../Conta/Conta");

class ContaPremium extends Conta{
    constructor(agencia, conta, saldo, renda){
        super(agencia, conta, saldo);
        this.renda = renda;
    }

    criarConta(agencia, conta, saldo, renda ){
        if(renda >= 18000){
            super.criarConta(agencia,conta, saldo, renda)
            return "Conta Premium criada com sucesso!"
        }
        if(renda < 18000){
            return "Não é permitido criar Conta Premium"
        }      
        else {
             throw new Error("Dados inválidos para conta");
        }
    }

    // transferirGold(valor, agencia, conta){
    //     if(valor >= this.limiteTransacao){
    //         return "O valor excede o limite de transação diário"
    //     }else{
    //         super.transferir(valor, agencia, conta)
    //         return "Transferência realizada"
    //     }
    // }
}

module.exports = ContaPremium