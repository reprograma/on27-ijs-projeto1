const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {


  constructor() {
    super();

  }

  criarConta(agencia, conta, saldo, renda) {
    if (renda >= 8000) {
      if (agencia.length === 4 && conta.length === 5 && saldo > 0) {
        super.setAgencia(agencia);
        super.setConta(conta);
        super.setSaldo(saldo);

        return "Conta Premium criada com sucesso";
      } else {
        throw new Error("Dados inválidos para cadastro");
      }
    } else {
      throw new Error("Renda não compatível.");
    }
  }

  sacar(valor) {

      if (valor > 0 && typeof valor === "number") {
        if (super.getSaldo() - valor > 0) {
          const saldoAtualizado = super.getSaldo() - valor;
          super.setSaldo(saldoAtualizado);
        } else {
          throw new Error("Saldo insuficiente");
        }
      } else {
        throw new Error("Valor inválido para saque");
      }
    
  }

  transferir(valor, agencia, conta) {
    
      let contaValida = Conta.listaContas.find((contaReceptora) => {
        let numeroContaReceptora = contaReceptora.getConta();
        let numeroAgenciaReceptora = contaReceptora.getAgencia();
        return (
          numeroContaReceptora === conta && numeroAgenciaReceptora === agencia
        );
      });

      if (!contaValida) {
        throw new Error("Conta não encontrada");
      }

      if (valor < 0) {
        throw new Error("Valor inválido para transferencia");
      }

      //a conta não pode ficar negativa ao fazer a transferencia,
      if (super.getSaldo - valor > 0) {
        const saldoAtualizado = super.getSaldo - valor;
        super.setSaldo(saldoAtualizado);
        const saldoContaReceptora = contaValida.getSaldo() + valor;
        contaValida.setSaldo(saldoContaReceptora);
        return "Tranferencia realizada";
      }

      if (valor > super.getSaldo) {
        return "Saldo insuficiente.";
      }
    
  }
}

module.exports = ContaPremium;
