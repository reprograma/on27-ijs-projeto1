// TODO
// Conta Premium

const Conta = require("../Conta/Conta");

const RENDA_MINIMA_CONTA_PREMIUM = 18000;

class ContaPremium extends Conta {
    constructor(agencia, conta, saldo, renda) {
        if (agencia.length !== 4 || conta.length !== 5 || saldo <= 0) {
            throw new Error("Dados inválidos para cadastro");
        }

        super(agencia, conta, saldo);
        this.validarRenda(renda);
        this.renda = renda;
    }

    validarRenda(renda) {
        if (renda < RENDA_MINIMA_CONTA_PREMIUM) {
            throw new Error("Renda minima é incompatível para conta Premium.");
        }
    }
}

module.exports = ContaPremium;




