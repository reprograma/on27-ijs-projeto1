//TODO Clientes com conta Gold são so clientes intermediários do banco com renda mensal de R$5000,00 até R$17.999,99. Limite de transação de 5000 reais por dia.

const Conta = require("../Conta/Conta");

const RENDA_MINIMA_CONTA_GOLD = 5000.00;
const LIMITE_TRANSACAO_DIARIA_GOLD = 5000;

class ContaGold extends Conta {
    #limiteTransacionalDiario = LIMITE_TRANSACAO_DIARIA_GOLD;
    #limiteTransacionalRestante = this.#limiteTransacionalDiario;

    constructor(agencia, conta, saldo, rendaMensal) {
        if (agencia.length !== 4 || conta.length !== 5 || saldo <= 0) {
            throw new Error("Dados inválidos para cadastro");
        }

        super(agencia, conta, saldo);
        this.validarRenda(rendaMensal);
    }

    validarRenda(rendaMensal) {
        if (rendaMensal < RENDA_MINIMA_CONTA_GOLD || rendaMensal >= 18000) {
            throw new Error("Renda mensal incompatível para conta Gold");
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

module.exports = ContaGold;
