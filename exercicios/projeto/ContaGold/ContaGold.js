const Conta = require("../Conta/Conta");

class ContaGold extends Conta {
    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo, renda); 
    }
    
    criarConta(agencia, conta, saldo, renda) {
        if (renda >= 5000 && renda <= 17999.99) {
          this.setLimiteDisponivel(5000);
          this.setLimiteTransacao(5000);
          return super.criarConta(agencia, conta, saldo,renda);
        } else {
          throw new Error('Renda não se encaixa na conta Gold');
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

module.exports = ContaGold