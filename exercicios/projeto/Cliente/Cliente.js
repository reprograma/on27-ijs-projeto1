const Conta = require('../Conta/Conta');

class Cliente {
  nome;
  #cpf;
  #renda;
  #conta;

  // não precisa de construtor assim pq o registro só acontecerá se houver uma conta instanciada
  //   constructor(nome, cpf, renda, conta){
  //         this.nome = nome;
  //         this.#cpf = cpf;
  //         this.#renda = renda;
  //         this.#conta = conta;
  //     }

  //     `Resgistro: ${{
  //         Nome: this.nome,
  //         CPF: this.cpf,
  //         Renda: this.renda,
  //     }}`

  registrar(nome, cpf, renda, conta) { // aqui é um construtor, construtor() não é uma palavra reservada, é apenas uma convenção
    if (conta instanceof Conta) {
      this.nome = nome;
      this.#cpf = cpf;
      this.#renda = renda;
      this.#conta = conta;

      return `Cliente cadastrado com sucesso!`;
    } else {
      throw new Error(`Houve um erro! Cliente não cadastrado...`);
    }
  }
}

module.exports = Cliente
