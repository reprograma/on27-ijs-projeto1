const Conta = require('../Conta/Conta')

class ContaStandard extends Conta{
    limiteTransacional

    constructor(){
        super();
        this.limiteTransacional = 1000
    }
    
    criarConta(agencia, conta, saldo, renda){
        if(renda < 5000){
            if(agencia.length === 4 && conta.length === 5 && saldo > 0){
                super.setAgencia(agencia);
                super.setConta(conta);
                super.setSaldo(saldo);
            
                return "Conta Standard criada com sucesso";
            } else {
                 throw new Error("Dados inválidos para cadastro");
            }
        } else{
            throw new Error("Renda não compatível.")
        }

    }
    
}



module.exports = ContaStandard

