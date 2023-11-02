const Conta = require('../Conta/Conta')
const Cliente = require('../Cliente/Cliente')

class ContaStandard extends Conta{
    limiteTransacional
    
    definirTipoConta(cliente, conta){
        
        if(cliente instanceof Cliente && conta instanceof Conta){
            if(cliente.getRenda() < 5000){
                this.limiteTransacional = 1000
                return "Conta Standard"
            }
            else{
                throw new Error('Renda incompatível')
            }
        }
        
    }
    
}



module.exports = ContaStandard

