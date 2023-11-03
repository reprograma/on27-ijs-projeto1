const { Conta } = require("../Conta/Conta")

class ContaPremium extends Conta{
  renda
   

    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo);
        super.chavesPix;
        this.renda = renda
    }

    getRenda(){
        return this.renda;
    }

    criarConta(agencia, conta, saldo, renda){
        if(agencia.length === 4 && conta.length === 5 && saldo > 0){
            if(renda > 18000.00){
                this.setAgencia(agencia),
                this.setConta(conta),
                this.setSaldo(saldo),
                this.renda = renda
                
                return "Conta criada com sucesso"
            }else {
                throw new Error("Renda não compativel com a conta Premium ")
            }
        } else{
            throw new Error("Dados inválidos para cadastro")
        }
    }
   
}

module.exports = { ContaPremium }