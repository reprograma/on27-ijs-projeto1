const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo, renda); 
    }
    
    criarConta(agencia, conta, saldo, renda) {
        if (renda >= 18000) {
          this.setLimiteDisponivel(Infinity);
          this.setLimiteTransacao(Infinity);
          return super.criarConta(agencia, conta, saldo,renda);
        } else {
          throw new Error('Renda não se encaixa na conta Premium');
        }
      }      
}

module.exports = ContaPremium