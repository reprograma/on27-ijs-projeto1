const Conta = require("../Conta/Conta");

class ContaGold extends Conta{
    constructor(agencia, conta, saldo, renda){
        super(agencia, conta, saldo, renda);
        this.limiteDeTransacao = 5000;  
    }
    criarConta(agencia, conta, saldo, renda ){
        if(renda < 5000){
            return "Conta Gold nao pode ser criada!"
        }
        if (renda >= 17999.99){
            return "Conta Gold nao pode ser criada!"
        }
        if(agencia.length === 4 && conta.length === 5 && saldo > 0){
            super.setAgencia(agencia)
            super.setConta(conta)
            super.setSaldo(saldo)      
            return "Conta criada com sucesso";
        } else {
             throw new Error("Dados inválidos para cadastro");
        }
    }

    transferirGold(valor, agencia, conta){
        if(valor >= this.limiteDeTransacao){
            return "O valor excede o limite de transacao diario"
        }else{
            super.transferir(valor, agencia, conta)
            return "Transferencia realizada"
        }
    }
}
module.exports = ContaGold