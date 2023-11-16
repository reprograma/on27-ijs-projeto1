const Conta = require("../Conta/Conta");
const RENDA = require("../Utils")
const LIMITE_TRANSACIONAL = require("../Utils")

class ContaStandard extends Conta {
    renda;

    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo);
        this.renda = renda;
    }

    criarConta(agencia, conta, saldo, renda) {
        if (renda > RENDA.standard) {
            throw new Error("Dados inválidos para cadastro");
        }
        super.criarConta(agencia, conta, saldo)
        return "Conta criada com sucesso!"
    }

    verificaLimiteTransacional(valor) {
        if (valor < LIMITE_TRANSACIONAL.standard) {
            return valor
        } else {
            throw new Error("Não foi possível realizar essa transação. Limite de transação diário é de R$1.000,00 reais");
        }
    }

    sacar(valor) {
        try {
            this.this.verificaLimiteTransacional(valor)
            super.sacar(valor)
        } catch (error) {
            throw error
        }
    }

    depositar(valor) {
        try {
            this.verificaLimiteTransacional(valor)
            super.depositar(valor)
        } catch (error) {
            throw error
        }
    }

    transferir(valor, agencia, conta) {
        try {
            this.verificaLimiteTransacional(valor)
            super.transferir(valor, agencia, conta)
        } catch (error) {
            throw error
        }
    }

    transferirPorPix(valor, chavePix, tipo) {
        try {
            this.verificaLimiteTransacional(valor)
            super.transferirPorPix(valor, chavePix, tipo)
        } catch (error) {
            throw error
        }
    }
}

module.exports = ContaStandard