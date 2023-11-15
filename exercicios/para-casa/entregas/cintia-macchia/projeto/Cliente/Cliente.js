 const { Conta }  = require("../Conta/Conta")
 
 class Cliente{
    nome;
    #cpf;
    #renda;
    #conta;


// nosso sistema não vai criar objetos sem antes verificar a conta
// por isso o construtor fica dentro de registrar, após validar se a conta foi instanciada
  
// regra de negócio para criação de cliente
  /**  
   * eu só vou cliente SE ele tiver uma conta existente
  */   
registrar(nome, cpf, renda, conta){
    if(conta instanceof Conta){
        this.nome =  nome,
        this.#cpf = cpf,
        this.#renda = renda,
        this.#conta = conta 

        return "Cliente Cadastrado";
    } else {
        throw new Error("Erro no cadastro, dados inválidos")
    }
    

}

}

module.exports = { Cliente }