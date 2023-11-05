const Conta = require("../Conta/Conta");

class ContaGold extends Conta {
    renda;
    #limiteTransacao;

    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo);
        this.renda = renda;
        this.#limiteTransacao = 5000;
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
        if (this.renda >= 5000 && this.renda <= 17999.99){
            return "Conta Gold criada com sucesso";
          }else {
            throw new Error("Renda incompatível com a Conta Gold");
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
        if (valor > 0 && valor <= this.#limiteTransacao) {
          super.transferir(valor, agencia, conta);
          return "Transferência realizada com sucesso";
        } else {
            throw new Error("Limite diário de transferência atingido");
        }
      }
    

      pix(valor, chavePix, tipo) {
        if (valor > this.#limiteTransacao) {
          throw new Error("Limite diário de transferência Pix atingido");
        }
        super.pix(valor, chavePix, tipo);
        return "Transferência Pix realizada com sucesso";
      }


      destruir(){
        super.destruir()
    }
}

module.exports = ContaGold;