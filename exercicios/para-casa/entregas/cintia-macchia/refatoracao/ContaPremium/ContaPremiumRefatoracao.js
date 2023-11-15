const { Conta } = require("../Conta/ContaRefatoracao")

class ContaPremium extends Conta{

    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo);
        super.renda = renda
    }

    getRenda(){
        return this.renda;
    }

    criarConta(agencia, conta, saldo, renda) {
        if (renda > 18000) {
            this.renda = renda
            return super.criarConta(agencia, conta, saldo)
            }
        throw new Error("Renda não compativel com a conta Premium ");
        }
}

module.exports = { ContaPremium }