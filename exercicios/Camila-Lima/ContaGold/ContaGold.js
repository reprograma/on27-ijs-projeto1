const Conta = require("../Conta/Conta");

class ContaGold extends Conta{
    constructor(agencia, conta, saldo, renda){
        super(agencia, conta, saldo, renda);
        this.renda = renda;
        this.limiteTransacao = 5000;  
    }

    criarConta(agencia, conta, saldo, renda ){
        if(renda >= 5000 && renda <= 17999.99){
            super.criarConta(agencia,conta, saldo)
            return "Conta Gold criada com sucesso!"
        }
        if(renda < 5000 && renda > 17999.99){
            return "Não é permitido criar conta"
        }      
        else {
             throw new Error("Dados inválidos para cadastro");
        }
    }

    transferirGold(valor, agencia, conta){
        if(valor >= this.limiteTransacao){
            return "O valor excede o limite de transação diário"
        }else{
            super.transferir(valor, agencia, conta)
            return "Transferência realizada"
        }
    }
}

module.exports = ContaGold