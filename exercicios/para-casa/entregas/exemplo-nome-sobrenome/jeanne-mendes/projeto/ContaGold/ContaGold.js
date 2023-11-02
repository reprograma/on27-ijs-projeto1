const Conta = require('../Conta/Conta')
const Cliente = require('../Cliente/Cliente')

class ContaGold extends Conta{
    definirTipoConta(cliente, conta){
        if(cliente instanceof Cliente && conta instanceof Conta){
            if(cliente.getRenda() >= 5000 && cliente.getRenda() < 18000){
                
                return "Conta Gold"
            }
            else{
                throw new Error('Renda incompatível')
            }
        }
        
    }
}

module.exports = ContaGold