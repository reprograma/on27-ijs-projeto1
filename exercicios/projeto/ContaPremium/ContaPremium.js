const Conta = require('../Conta/Conta');

class ContaPremium extends Conta{
    renda;

    constructor(agencia, conta, saldo, renda){
        super(agencia, conta, saldo);
        this.renda = renda;
    }

    criarConta(agencia, conta, saldo, renda) {
        if (renda < 18000) {
            throw new Error("Renda não compatível com Conta Premium");
        } else {
            super.criarConta(agencia, conta, saldo);
            return "Conta criada com sucesso";
        }
    }
    
    transferir(valor, agencia, conta) {
        super.transferir(valor, agencia, conta);
        return "Tranferencia realizada";
    }
    
    transferirPix(valor, chavePix, tipo) {
        super.transferirPix(valor, chavePix, tipo);
        return "Tranferencia realizada";
    }
}

module.exports = ContaPremium;