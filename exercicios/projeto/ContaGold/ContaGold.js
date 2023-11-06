const Conta = require('../Conta/Conta');

class ContaGold extends Conta{
    renda;
    #limiteTransacional;

    constructor(agencia, conta, saldo, renda){
      super(agencia, conta, saldo);
      this.renda = renda;
      this.#limiteTransacional = 5000.0;
    }

    criarConta(agencia, conta, saldo, renda) {
      if (renda >= 5000 && renda <= 17999.99) {
        super.criarConta(agencia, conta, saldo);
        return "Conta criada com sucesso";
      } else {
        throw new Error("Renda não compatível com Conta Gold");
      }
    }    
    
    transferir(valor, agencia, conta) {
      if (valor > this.#limiteTransacional) {
        throw new Error("Limite diário de transferência excedido");
      } else {
        super.transferir(valor, agencia, conta);
        return "Tranferencia realizada";
      }
    }
    
    transferirPix(valor, chavePix, tipo) {
      if (valor > this.#limiteTransacional) {
          throw new Error("Limite diário de transferência excedido");      
      } else{
        super.transferirPix(valor, chavePix, tipo);
        return "Tranferencia realizada";
      }

    }
}

module.exports = ContaGold