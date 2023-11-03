const { Conta } = require("../Conta/Conta")

class ContaGold extends Conta{
   renda

    constructor(agencia, conta, saldo, renda) {
        super(agencia, conta, saldo);
        super.chavesPix;
        this.limiteTransacional = 5000
        this.renda = renda
    }

   getRenda(){
      return this.renda;
   }

   criarConta(agencia, conta, saldo, renda){
    if(agencia.length === 4 && conta.length === 5 && saldo > 0){
        if(renda >= 5000 && renda <= 17999.99){
            this.setAgencia(agencia),
            this.setConta(conta),
            this.setSaldo(saldo),
            this.renda = renda

            return "Conta criada com sucesso"
        }else{
            throw new Error("Renda não compativel com a conta Gold")
        }   
    }else{
        throw new Error("Dados inválidos para cadastro")
    }
   }

   transferir(valor, agencia, conta){
    let contaValida = Conta.listaContas.find(contaReceptora => {
        let numeroContaReceptora = contaReceptora.getConta();
        let numeroAgenciaReceptora = contaReceptora.getAgencia();
        return numeroContaReceptora === conta && numeroAgenciaReceptora === agencia;
   })

   if(!contaValida){
       throw new Error("Conta não encontrada") 
   }

   if(valor < 0){
    throw new Error("Valor inválido para transferencia")
   }

   if(valor > this.limiteTransacional){
    throw new Error("Limite de transação excedido")
   }

   if(this.getSaldo() > valor){
    const saldoAtualizado = this.getSaldo() - valor;
    this.setSaldo(saldoAtualizado);
    const saldoContaReceptora = contaValida.getSaldo() + valor;
    contaValida.setSaldo(saldoContaReceptora)

    return "Transferencia realizada"
   }
   else{
    throw new Error("Saldo Insuficiente")
   }
}   

fazerPix(valor, chavePix, tipo){ 
    let contaValida = Conta.listaContas.find(conta  => conta && conta.chavesPix && conta.chavesPix[tipo] === chavePix)

     if(!contaValida){
         throw new Error("Chave pix não encontrada")
     }

     if(valor < 0){
         throw new Error("Valor inválido para pix")
     }

     if(valor > this.limiteTransacional){
         throw new Error("Limite de transação diária excedido")
     }

     if(this.getSaldo() - valor > 0){
         const saldoAtualizado = this.getSaldo() - valor;
         this.setSaldo(saldoAtualizado);
         const saldoContaReceptora = contaValida.getSaldo() + valor
         contaValida.setSaldo(saldoContaReceptora);
         return "Pix realizado"
         } else {
         throw new Error("Saldo insuficiente")
         }
     
 }

    

}
module.exports = { ContaGold }