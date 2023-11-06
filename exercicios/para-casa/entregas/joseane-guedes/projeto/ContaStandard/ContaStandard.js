//TODO: CLiente com renda mensal até R$4999,99. Limite de transação de 1000 reais por dia.

const Conta = require("../Conta/Conta");

const LIMITE_TRANSACAO_DIARIA = 1000;

class ContaStandard extends Conta {
    #limiteTransacionalDiario = LIMITE_TRANSACAO_DIARIA;
    #limiteTransacionalRestante = this.#limiteTransacionalDiario;

    constructor(agencia, conta, saldo, rendaMensal) {
        if (agencia.length !== 4 || conta.length !== 5 || saldo <= 0) {
            throw new Error("Dados inválidos para cadastro");
        }

        super(agencia, conta, saldo);
        this.validarRenda(rendaMensal);
    }

    validarRenda(rendaMensal) {
        if (rendaMensal < 0 || rendaMensal >= 5000) {
            throw new Error("Renda mensal incompatível para conta Standard");
        }
    }

    get limiteTransacionalDiario() {
        return this.#limiteTransacionalDiario;
    }

    sacar(valor) {
        super.sacar(valor);
        this.validarLimiteTransacional(valor);
        this.#limiteTransacionalRestante -= valor;
    }

    transferir(valor, agencia, conta) {
        const contaDestino = Conta.listaContas.find(contaReceptora => {
            return contaReceptora.getConta() === conta && contaReceptora.getAgencia() === agencia;
        });

        if (!contaDestino) {
            throw new Error("Conta não encontrada");
        }

        this.validarLimiteTransacional(valor);

        super.transferir(valor, agencia, conta);
        this.#limiteTransacionalRestante -= valor;
    }

    transferirPix(valor, chavePix, tipo) {
        if (valor > super.getSaldo()) {
            throw new Error("Saldo insuficiente");
        }

        this.validarLimiteTransacional(valor);
        super.transferirPix(valor, chavePix, tipo);
        this.#limiteTransacionalRestante -= valor;
    }

    validarLimiteTransacional(valor) {
        if (valor > this.#limiteTransacionalRestante) {
            throw new Error("Limite transacional diário excedido");
        }
    }
}

module.exports = ContaStandard;
