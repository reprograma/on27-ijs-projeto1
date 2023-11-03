const Conta = require("../Conta/Conta");

class ContaStandard extends Conta{
    
    constructor(){
        super();
        this.limiteTransacional = 1000;
        
    }

    criarConta(agencia, conta, saldo, renda){
        if(renda < 5000){
            throw new Error("Renda inválida");
        }
        
        if(agencia.length === 4 && conta.length === 5 && saldo > 0){
            super.setAgencia(agencia);
            super.SetConta = (conta);
            super.setSaldo = (saldo);
        
            return "Conta criada com sucesso";
        } else {
             throw new Error("Dados inválidos para cadastro");
        }

    }

    transferir(){

    }

    pix(){

    }
}