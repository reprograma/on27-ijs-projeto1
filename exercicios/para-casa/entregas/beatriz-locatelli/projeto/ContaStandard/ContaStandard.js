const Conta = require("../Conta/Conta");

class ContaStandard extends Conta {
    renda;
    #limiteTransacional;

    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo);
        this.renda = renda;
        this.#limiteTransacional = 1000
    }

    criarConta(agencia, conta, saldo, renda) {
        if (renda > 4999.99) {
            throw new Error("Dados inválidos para cadastro");
        }
        super.criarConta(agencia, conta, saldo)
        return "Conta criada com sucesso!"
    }

    sacar(valor) {
        if (valor > this.#limiteTransacional) {
            throw new Error("Não foi possível realizar saque. Limite de transação diário é de R$1.000,00 reais");
        }
        super.sacar(valor)
    }

    depositar(valor) {
        if (valor > this.#limiteTransacional) {
            throw new Error("Não foi possível realizar depósito. Limite de transação diário é de R$1.000,00 reais");
        }
        super.depositar(valor)
    }

    transferir(valor, agencia, conta) {
        if (valor > this.limiteTransacional) {
            throw new Error("Não foi possível realizar transfeência. Limite de transação diário é de R$1.000,00 reais");
        }
        super.transferir(valor, agencia, conta)
        return "Tranferencia realizada"
    }

    transferirPorPix(valor, chavePix, tipo){
        if (valor > this.#limiteTransacional){
            throw new Error("Não foi possível realizar transfeência. Limite de transação diário é de R$1.000,00 reais");
        }
        super.transferirPorPix(valor, chavePix, tipo)
        return "Tranferencia por pix realizada"
    }
}

module.exports = ContaStandard