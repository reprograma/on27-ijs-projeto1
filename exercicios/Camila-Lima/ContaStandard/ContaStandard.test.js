const ContaStandard = require("./ContaStandard");
const Conta = require("../Conta/Conta")

//Testes de Saque
 test("retorna sucesso ao sacar 100 da conta", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 4000);
    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);
    
    // remover conta da lista de contas
    conta.destruir()
});

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 4000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);
    
    // remover conta da lista de contas
    conta.destruir()
});

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 4000);

    expect(() => conta.sacar(10000)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(1000);
    
    // remover conta da lista de contas
    conta.destruir()
});

  test("retorna sucesso ao depositar 200 reais da conta", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 4000);

    conta.depositar(200);
    expect(conta.getSaldo()).toBe(1200);
    
    // remover conta da lista de contas
    conta.destruir()
});

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 4000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
    
    // remover conta da lista de contas
    conta.destruir()
});

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 4000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    // remover conta da lista de contas
    conta.destruir()

});

  test("criar uma chave pix por cpf com sucesso", () => {
    //setup
    const conta = new ContaStandard();

    //acao
    const operacao = conta.criarChavePix("40814360879", "CPF");

    //verificacao
    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40814360879");

    // remover conta da lista de contas
    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    //setup
    const conta = new ContaStandard();

    //verificacao
    expect(() => conta.criarChavePix("124861", "CPF")).toThrow("Erro: CPF inválido");
    
    // remover conta da lista de contas
    conta.destruir()
});

  test("criar uma chave pix por email com sucesso", () => {
    //setup
    const conta = new ContaStandard();

    //acao
    const operacao = conta.criarChavePix("analu@email.com", "EMAIL");

    //verificacao
    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("analu@email.com");
    
    // remover conta da lista de contas
    conta.destruir()
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    //setup
    const conta = new ContaStandard();

    //acao
    const operacao = conta.criarChavePix("11951639874", "TELEFONE");

    //verificacao
    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("11951639874");

    // remover conta da lista de contas
    conta.destruir()
  });

  /**
   * TRANFERENCIA
   * emissor = conta q esta enviando o dinheiro
   * recepto = conta q está recebendo esse dinheiro
   * agencia e conta do receptor
   * metodo vai precisar de valor, agencia do Receptor e conta do Receptor
   * valor valido
   * saldo suficiente
   * dados validos do receptor
   */

  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
    //setup
    const contaEmissor = new ContaStandard();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000, 4000 )
    contaReceptor.criarConta("0001", "78945", 500 )

    //acao
    const operacao = contaEmissor.transferir(100, "0001", "78945")

    //verificacao
    expect(operacao).toBe("Transferência realizada")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaEmissor.destruir();
    contaReceptor.destruir();

  })
