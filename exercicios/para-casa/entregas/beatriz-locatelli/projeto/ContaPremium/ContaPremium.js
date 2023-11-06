const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
    renda;

    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo);
        this.renda = renda;
    }

    criarConta(agencia, conta, saldo, renda) {
        if (renda < 18000) {
            throw new Error("Dados inválidos para cadastro");
        }
        super.criarConta(agencia, conta, saldo)
        console.log("Conta criada com sucesso!")
    }
}

module.exports = ContaPremium