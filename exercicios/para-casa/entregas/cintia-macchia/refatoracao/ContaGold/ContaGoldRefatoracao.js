const { Conta } = require("../Conta/ContaRefatoracao")

class ContaGold extends Conta{
   

    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo);
        super.renda = renda
        this.limiteTransacional = 5000
      
    }

   getRenda(){
      return this.renda;
   }


   criarConta(agencia, conta, saldo, renda) {
    if (renda >= 5000 && renda <= 17999) {
        this.renda = renda
        return super.criarConta(agencia, conta, saldo)
       
    }
    throw new Error("Renda não compativel com a conta Gold");
    
  }

   transferir(valor, agencia, conta){
    if(valor > this.limiteTransacional){
        throw new Error("Limite de transação excedido")
       }
       return super.transferir(valor, agencia, conta)
    }   

    fazerPix(valor, chavePix, tipo){ 
    if(valor > this.limiteTransacional){
        throw new Error("Limite de transação diária excedido")
    }
    return super.fazerPix(valor, chavePix, tipo)
    }
}
module.exports = { ContaGold }