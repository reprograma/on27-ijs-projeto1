const Conta = require("../Conta/Conta");

class ContaPremium extends Conta{
    constructor(agencia, conta, saldo, renda){
        super(agencia, conta, saldo, renda); 
    }

    criarConta(agencia, conta, saldo, renda ){
        if (renda <=  18000){
            return "Conta Premium nao pode ser criada!"
        }

        if(agencia.length === 4 && conta.length === 5 && saldo > 0){
            super.setAgencia(agencia)
            super.setConta(conta)
            super.setSaldo(saldo)      
            return "Conta Premium criada com sucesso";
        } else {
            throw new Error("Dados inválidos para cadastro");
        }
    }

    transferirPremium (valor, agencia, conta){
        super.transferir(valor, agencia, conta)
        return "Transferencia realizada"
    }

}

module.exports = ContaPremium