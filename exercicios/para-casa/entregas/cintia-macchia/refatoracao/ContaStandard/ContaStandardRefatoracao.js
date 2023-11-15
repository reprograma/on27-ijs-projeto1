const { Conta } = require('../Conta/ContaRefatoracao')

class ContaStandard extends Conta{
   
    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo);
        super.chavesPix;
        this.limiteTransacional = 1000 ;
        super.renda = renda      
    }

    getRenda(){
        return this.renda;
    }


    criarConta(agencia, conta, saldo, renda) {
        if (renda <= 4999) {
            this.renda = renda
            return super.criarConta(agencia, conta, saldo)
           }
        throw new Error("Renda não compativel com a conta Standard");
       }
    

    transferir(valor, agencia, conta){
        if (valor > this.limiteTransacional){
            throw new Error("Limite de transação excedido")
           }
        return super.transferir(valor, agencia, conta)     
        }



    fazerPix(valor, chavePix, tipo){ 
        if(valor > this.limiteTransacional){
            throw new Error("Limite de transação diária excedido")
        }
        return super.fazerPix(valor, chavePix, tipo)

        // let contaValida = Conta.listaContas.find( conta => conta.chavesPix[tipo] === chavePix) 
       
        // if(!contaValida){
        //     throw new Error("Chave pix não encontrada")
        // }

        // if(valor < 0){
        //     throw new Error("Valor inválido para pix")
        // }

        // if(valor > this.limiteTransacional){
        //     throw new Error("Limite de transação diária excedido")
        // }

        // if(this.getSaldo() - valor > 0){
        //     const saldoAtualizado = this.getSaldo() - valor;
        //     this.setSaldo(saldoAtualizado);
        //     const saldoContaReceptora = contaValida.getSaldo() + valor
        //     contaValida.setSaldo(saldoContaReceptora);
        //     return "Pix realizado"
        //     } else {
        //     throw new Error("Saldo insuficiente")
        //     }
        
    }
    }
   


module.exports = { ContaStandard }