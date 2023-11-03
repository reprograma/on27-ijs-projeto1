const ContaGold = require("./ContaGold");

describe("Testes da Classe Conta Gold", () => {
  test("verificar se instancia foi criada corretamente", () => {
      const conta = new ContaGold();
      expect(conta instanceof ContaGold).toBe(true);

      conta.destruir()
  });

  test("retorna sucesso ao sacar 100 da conta", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);

    // remover conta da lista de contas
    conta.destruir()
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);

    // remover conta da lista de contas
    conta.destruir()
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 100);

    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);

    // remover conta da lista de contas
    conta.destruir()
  });

  test("retorna sucesso ao depositar 100 reais da conta", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);

    // remover conta da lista de contas
    conta.destruir()
  });

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    // remover conta da lista de contas
    conta.destruir()
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    // remover conta da lista de contas
    conta.destruir()

  });

  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
    //setup
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000 )
    contaReceptor.criarConta("0001", "78945", 500 )

    //acao
    const operacao = contaEmissor.transferir(100, "0001", "78945")

    //verificacao
    expect(operacao).toBe("Transferencia realizada")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })

  test("retorna mensagem de erro ao transferir valor acima de 5000 reais da conta", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000 )
    contaReceptor.criarConta("0001", "78945", 500 )

    expect(() => contaEmissor.transferir(5234, "0001", "78945")).toThrow("Erro: Valor de Transferência acima do limite diário de R$5.000,00");
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("criar uma chave pix por cpf com sucesso", () => {
    //setup
    const conta = new ContaGold();

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
    const conta = new ContaGold();

    //verificacao
    expect(() => conta.criarChavePix("124861", "CPF")).toThrow("Erro: CPF inválido");

    // remover conta da lista de contas
    conta.destruir()
  });

  test("criar uma chave pix por email com sucesso", () => {
    //setup
    const conta = new ContaGold();

    //acao
    const operacao = conta.criarChavePix("analu@email.com", "EMAIL");

    //verificacao
    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("analu@email.com");

    // remover conta da lista de contas
    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com email invalido", () => {
    const conta = new ContaGold();

    expect(() => conta.criarChavePix("analu", "EMAIL")).toThrow("Erro: Email inválido");

    conta.destruir()
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    //setup
    const conta = new ContaGold();

    //acao
    const operacao = conta.criarChavePix("11951639874", "TELEFONE");

    //verificacao
    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("11951639874");

    // remover conta da lista de contas
    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com telefone invalido", () => {
    const conta = new ContaGold();

    expect(() => conta.criarChavePix("11951", "TELEFONE")).toThrow("Erro: Telefone inválido");

    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix do tipo inexistente", () => {
    const conta = new ContaGold();

    expect(conta.criarChavePix()).toBe("Chave inexistente");

    conta.destruir();
  });

  test('retorna sucesso ao fazer uma transferência por pix', () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000 )
    contaReceptor.criarConta("0001", "78945", 500 )

    contaEmissor.criarChavePix("40814360879", "CPF")
    contaReceptor.criarChavePix("86687438050", "CPF")


    const operacao = contaEmissor.transferirPix(110, "86687438050", "cpf")

    //verificacao
    expect(operacao).toBe("Transferência Pix realizada com Sucesso")
    expect(contaEmissor.getSaldo()).toBe(890)
    expect(contaReceptor.getSaldo()).toBe(610)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })

  test('retorna erro ao fazer uma transferência por pix com chave inválida', () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000 )
    contaReceptor.criarConta("0001", "78945", 500 )

    expect(() => contaEmissor.transferirPix(110, "8668743807850", "cpf")).toThrow("Erro: Chave PIX não encontrada");
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })

  test('retorna erro ao fazer uma transferência por pix com valor inválido', () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000 )
    contaReceptor.criarConta("0001", "78945", 500 )

    contaEmissor.criarChavePix("40814360879", "CPF")
    contaReceptor.criarChavePix("86687438050", "CPF")

    expect(() => contaEmissor.transferirPix(-50, "86687438050", "cpf")).toThrow("Erro: Valor inválido para transferência");
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })

  test('retorna erro ao fazer uma transferência por pix com saldo insuficiente', () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000 )
    contaReceptor.criarConta("0001", "78945", 500 )

    contaEmissor.criarChavePix("40814360879", "CPF")
    contaReceptor.criarChavePix("86687438050", "CPF")

    expect(() => contaEmissor.transferirPix(1200, "86687438050", "cpf")).toThrow("Erro: Saldo insuficiente");
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })

  test("retorna mensagem de erro ao transferir via Pix valor acima de 5000 reais", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000 )
    contaReceptor.criarConta("0001", "78945", 500)

    contaEmissor.criarChavePix("40814360879", "CPF")
    contaReceptor.criarChavePix("86687438050", "CPF")

    expect(() => contaEmissor.transferirPix(6788, "86687438050", "cpf")).toThrow("Erro: Valor de Transferência Pix acima do limite diário de R$5.000,00");
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

});