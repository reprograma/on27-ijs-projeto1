const Conta = require("./Conta");

describe("Testes da Classe Conta", () => {
  test("Verificar se instancia foi criada corretamente", () => {
    const conta = new Conta();
    expect(conta instanceof Conta).toBe(true);

    conta.destruir()
  });

  test("Instanciar conta com valores validos", () => {
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir()
  });

  test("Retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta();
    expect(conta.criarConta("1234", "12345", 1000)).toBe(
      "Conta criada com sucesso"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir()
  });

  test("Retorna mensagem de erro ao tentar criar conta com dados invalido", () => {
    const conta = new Conta();
    expect(() => conta.criarConta("123454", "123", 1000)).toThrow(
      "Dados inválidos para cadastro"
    );

    conta.destruir()
  });

  test("Retorna sucesso ao sacar 100 da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);
    
    conta.destruir()
  });

  test("Retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);
    
    conta.destruir()
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 100);

    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);
    
    conta.destruir()
  });

  test("retorna sucesso ao depositar 100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);
    
    conta.destruir()
  });

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
    
    conta.destruir()
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir()

  });

  describe("Testes referente ao PIX", () => {
    test("Cria uma chave pix por Cpf", () => {
      const conta = new Conta();
      const operacao = conta.criarChavePix("13700215002", "CPF");
  
      expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
      expect(conta.chavesPix.cpf).toBe("13700215002");
  
      conta.destruir();
    });
  
    test("Retorna erro ao tentar criar uma chave pix por Cpf inválido ", () => {
      const conta = new Conta();
  
      expect(() => conta.criarChavePix("13700", "CPF")).toThrow(
        "Erro: CPF inválido"
      );
  
      conta.destruir();
    });
  
    test("Cria uma chave pix por Email", () => {
      const conta = new Conta();
      const operacao = conta.criarChavePix("teste@teste.com", "EMAIL");
  
      expect(operacao).toBe("Chave Pix por email criada com sucesso");
      expect(conta.chavesPix.email).toBe("teste@teste.com");
  
      conta.destruir();
    });
  
    test("Retorna erro ao tentar criar uma chave pix por email inválido ", () => {
      const conta = new Conta();
  
      expect(() => conta.criarChavePix("13700", "EMAIL")).toThrow(
        "Erro: Email inválido"
      );
  
      conta.destruir();
    });
  
    test("Cria uma chave pix por telefone", () => {
      const conta = new Conta();
      const operacao = conta.criarChavePix("(81)980908888", "TELEFONE");
  
      expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
      expect(conta.chavesPix.telefone).toBe("(81)980908888");
  
      conta.destruir();
    });
  
    test("Retorna erro ao tentar criar uma chave pix por telefone inválido ", () => {
      const conta = new Conta();
  
      expect(() => conta.criarChavePix("(81)9809", "TELEFONE")).toThrow(
        "Erro: Telefone inválido"
      );
  
      conta.destruir();
    });
  
    test("Retornar mensagem de erro ao tentar cadastrar chave pix Inexistente", () => {
      const conta = new Conta();
  
      expect(conta.criarChavePix("inexistente", "INEXISTENTE")).toBe(
        "Chave inexistente"
      );
  
      conta.destruir();
    });
  
    test("retorna sucesso ao fazer uma transferência via pix com valor válido, saldo suficiente, dados válidos", () => {
      const contaEmissor = new Conta();
      const contaReceptor = new Conta();
  
      contaEmissor.criarConta("0001", "12345", 1000 )
      contaReceptor.criarConta("0001", "78945", 500 )
  
      contaReceptor.criarChavePix("(81)980908888", "TELEFONE") 
      
      const operacao = contaEmissor.transferenciaPorPix(100, "(81)980908888", "telefone")
  
      expect(operacao).toBe("Tranferencia realizada via Pix")
      expect(contaEmissor.getSaldo()).toBe(900)
      expect(contaReceptor.getSaldo()).toBe(600)
    });
  
    test("retorna ERRO ao tentar realizar uma transferência via Pix com uma chave não encontrada", () => {
      const contaEmissor = new Conta();
      const contaReceptor = new Conta();
  
      contaEmissor.criarConta("0001", "12345", 700);
      contaReceptor.criarConta("0001", "67890", 300);
  
      expect(() => contaEmissor.transferenciaPorPix(100, "teste", "teste")).toThrow("Chave PIX não encontrada");
  
      contaEmissor.destruir()
      contaReceptor.destruir()
    });
  
    test("retorna ERRO ao tentar realizar uma transferência via Pix com valor inválido", () => {
      const contaEmissor = new Conta();
      const contaReceptor = new Conta();
  
      contaEmissor.criarConta("0001", "12345", 1000);
      contaReceptor.criarConta("0001", "78945", 500);
  
      contaReceptor.criarChavePix("12345678990", "CPF")
  
      expect(() => contaEmissor.transferenciaPorPix(-500, "12345678990", "cpf")).toThrow("Valor inválido para transferência")
  
      expect(contaEmissor.getSaldo()).toBe(1000);
      expect(contaReceptor.getSaldo()).toBe(500);
  
      contaEmissor.destruir()
      contaReceptor.destruir()
    });
  
    test("retorna ERRO ao tentar realizar uma transferência via Pix com valor maior que o saldo disponível", () => {
      const contaEmissor = new Conta();
      const contaReceptor = new Conta();
  
      contaEmissor.criarConta("0001", "12345", 1000);
      contaReceptor.criarConta("0001", "78945", 500);
  
      contaReceptor.criarChavePix("12345678990", "CPF")
  
      expect(() => contaEmissor.transferenciaPorPix(1100, "12345678990", "cpf")).toThrow("Saldo insuficiente")
      
      expect(contaEmissor.getSaldo()).toBe(1000);
      expect(contaReceptor.getSaldo()).toBe(500);
  
      contaEmissor.destruir()
      contaReceptor.destruir()
    });
  })
});
