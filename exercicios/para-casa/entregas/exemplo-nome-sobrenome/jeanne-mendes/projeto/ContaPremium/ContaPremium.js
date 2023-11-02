const Conta = require('../Conta/Conta')
const Cliente = require('../Cliente/Cliente')

class ContaPremium extends Conta{
    definirTipoConta(cliente, conta){
        if(cliente instanceof Cliente && conta instanceof Conta){
            if(cliente.getRenda() >= 18000){
                
                return "Conta Premium"
            }
            else{
                throw new Error('Renda incompatível')
            }
        }
        
    }
}

module.exports = ContaPremium