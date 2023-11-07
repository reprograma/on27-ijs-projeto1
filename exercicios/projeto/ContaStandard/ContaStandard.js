const Conta = require("../Conta/Conta");

class ContaStandart extends Conta {
    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo, renda); 
    }
    
    criarConta(agencia, conta, saldo, renda) {
        if (renda <= 4999.99) {
          this.setLimiteDisponivel(1000);
          this.setLimiteTransacao(1000);
          return super.criarConta(agencia, conta, saldo,renda);
        } else {
          throw new Error('Renda não se encaixa na conta Standart');
        }
    }

    transferir(valor, agencia, conta){
        if(this.validaLimite(valor)){
            super.transferir(valor, agencia,conta)
            const novoLimite = this.getLimiteDisponivel() - valor
            this.setLimiteDisponivel(novoLimite)
        }
    } 


      
}

module.exports = ContaStandart