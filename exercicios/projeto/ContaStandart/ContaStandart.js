const Conta = require('../Conta/Conta')

class ContaStandart extends Conta{
   
    constructor(agencia, conta, saldo, renda){
        if(renda > 2000 && renda <= 4999.99 ){
            return 'Não é possível criar conta, renda insuficiente.'
        }

        super(agencia, conta, saldo);
        this.renda = renda;
        this.limiteTransacional = 1000;
    }  
    
    // para reescrever
    transferir(valor, conta, agencia){
        const contaValida = Conta.listaDeContas.find( contaEncontrada => {
            const numeroConta = contaEncontrada.getConta;
            const numeroAgencia = contaEncontrada.getAgencia;
            
            return conta === numeroConta && agencia === numeroAgencia;
        })

        if (!contaValida){ return 'Conta não encontrada! Verifique os dados novamente.'}

        if (valor < 0){ return 'O valor de minímo de transferência é R$ 0,01.'}

        if (valor > 1000){
            return 'Não é possível realizar transferências maiores que R$1.000,00.'
        }

        if(this.getSaldo - valor > 0){
            this.getSaldo -= valor;
            contaValida.setSaldo = contaValida.getSaldo + valor ;
            return 'Transferência realizada com sucesso.'
        }
    }

    pix(valor, chavePix, tipoChave){

        const pixValido = Conta.listaDeContas.find( conta => conta.chavePix[tipoChave] === chavePix);

        if(!pixValido) return 'ChavePix não encontrada.'

        if(valor < 0) return 'Valor inválido.'

        if (valor > 1000){
            return 'Não é possível realizar pix maior que R$1.000,00.'
        }

        if(this.getSaldo - valor > 0){
            this.getSaldo - valor;
            this.setSaldo = pixValido.getSaldo + valor;

            return 'Pix realizado com sucesso'
        }
    }
}

module.exports = ContaStandart;
