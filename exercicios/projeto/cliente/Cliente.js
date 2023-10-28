const Conta = require('../Conta/Conta')
class Cliente {
    name;
    #cpf;
    #renda;
    #conta;

    registrar(name, cpf, renda, conta) {
        if (conta instanceof Conta) {
            this.name = name;
            this.#cpf = cpf;
            this.#renda = renda;
            this.#conta = conta;
            return "Cliente Cadastrado";
        } else {
            throw new Error("Erro no cadastro, dados invalidos")
        }
    }
}

module.exports = Cliente 