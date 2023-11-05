const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
    renda;
    #limiteTransacao;

    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo);
        this.renda = renda;
        this.#limiteTransacao > 0;
      }

    getlimiteTransacao(){
        return this.#limiteTransacao;
    }


    setlimiteTransacao(){
        return this.#limiteTransacao;
    }

    
    criarConta(agencia, conta, saldo, renda){
        this.renda = renda;
        super.criarConta(agencia, conta, saldo);
        if (this.renda >= 18000){
            return "Conta Premium criada com sucesso";
          }else {
            throw new Error("Renda incompatível com a Conta Premium");
          }
    }


    sacar(valor){
        if(valor > 0 && typeof valor === "number"){
            if(super.getSaldo() - valor > 0){
                const saldoAtualizado = super.getSaldo() - valor;
                super.setSaldo(saldoAtualizado)
            } else {
                throw new Error("Saldo insuficiente")
            }
        } else{
            throw new Error("Valor inválido para saque")
        }
    }


    depositar(valor){
        if(valor > 0 && typeof valor === "number"){
            const saldoAtualizado = super.getSaldo() + valor;
            super.setSaldo(saldoAtualizado)
        }else{
            throw new Error("Valor inválido para depósito")
        }
    }


    transferir(valor, agencia, conta) {
        if (valor > 0) {
          super.transferir(valor, agencia, conta);
          return "Transferência realizada com sucesso";
        } else {
            throw new Error("Limite diário de transferência atingido");
        }
      }
    

      pix(valor, chavePix, tipo) {   
        super.pix(valor, chavePix, tipo);
        return "Transferência Pix realizada com sucesso";
      }


      destruir(){
        super.destruir()
    }
}

module.exports = ContaPremium;