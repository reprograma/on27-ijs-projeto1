const Conta = require("./Conta");

describe("Testes da Classe Conta", () => {
  test("verificar se instancia foi criada corretamente", () => {
    const conta = new Conta();
    expect(conta instanceof Conta).toBe(true);

    conta.destruirConta();
  });

  test("instanciar conta com valores validos", () => {
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruirConta();
  });

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta();
    expect(conta.criarConta("1234", "12345", 1000)).toBe(
      "Conta criada com sucesso"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruirConta();
  });

  test("retorna mensagem de erro ao tentar criar conta com dados invalido", () => {
    const conta = new Conta();
    expect(() => conta.criarConta("123454", "123", 1000)).toThrow(
      "Dados inválidos para cadastro"
    );

    conta.destruirConta();
  });

  test("retorna sucesso ao sacar 100 da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);

    conta.destruirConta();
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruirConta();
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 100);

    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);

    conta.destruirConta();
  });

  test("retorna sucesso ao depositar 100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);

    conta.destruirConta();
  });

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruirConta();
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruirConta();
  });

  test("criar uma chave pix por cpf com sucesso", () => {
    const conta = new Conta();

    const operacao = conta.criarChavePix("40814360879", "CPF");

    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40814360879");

    conta.destruirConta();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    const conta = new Conta();

    expect(() => conta.criarChavePix("124861", "CPF")).toThrow(
      "Erro: CPF inválido"
    );

    conta.destruirConta();
  });

  test("criar uma chave pix por email com sucesso", () => {
    const conta = new Conta();

    const operacao = conta.criarChavePix("analu@email.com", "EMAIL");

    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("analu@email.com");

    conta.destruirConta();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com email invalido", () => {
    const conta = new Conta();

    expect(() => conta.criarChavePix("larissa@email", "EMAIL")).toThrow(
      "Erro: Email inválido"
    );

    conta.destruirConta();
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    const conta = new Conta();

    const operacao = conta.criarChavePix("11951639874", "TELEFONE");

    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("11951639874");

    conta.destruirConta();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com telefone invalido", () => {
    const conta = new Conta();

    expect(() => conta.criarChavePix("123", "TELEFONE")).toThrow(
      "Erro: Telefone inválido"
    );

    conta.destruirConta();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix inexistente", () => {
    const conta = new Conta();

    expect(conta.criarChavePix("123", "CNPJ")).toBe("Chave inexistente");

    conta.destruirConta();
  });

  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    const operacao = contaEmissor.transferir(100, "0001", "78945");

    expect(operacao).toBe("Tranferencia realizada");
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  });

  describe("transferencia por pix", () => {
    let contaOrigem, contaDestino;
    beforeEach(() => {
      contaOrigem = new Conta();
      contaOrigem.criarConta("0001", "10001", 1000);

      contaDestino = new Conta();
      contaDestino.criarConta("0001", "10002", 1000);
      contaDestino.criarChavePix("email@email.com", "EMAIL");
    });

    test("retorna sucesso para valor válido, saldo suficiente e dados válidos", () => {
      const operacao = contaOrigem.transferirPorPix(
        500,
        "email@email.com",
        "EMAIL"
      );

      expect(operacao).toBe("Tranferencia pix realizada com sucesso");
      expect(contaOrigem.getSaldo()).toBe(500);
      expect(contaDestino.getSaldo()).toBe(1500);

      contaOrigem.destruir();
      contaDestino.destruir();
    });

    test("retorna erro para valor válido, saldo suficiente e dados inválidos", () => {
      expect(() =>
        contaOrigem.transferirPorPix(500, "email@invalido.com", "EMAIL")
      ).toThrow("Chave pix não encontrada");
    });

    test("retorna erro para valor válido, saldo insuficiente e dados válidos", () => {
      expect(() =>
        contaOrigem.transferirPorPix(5000, "email@email.com", "EMAIL")
      ).toThrow("Saldo insuficiente");
    });

    test("valor inválido, saldo suficiente e dados válidos", () => {
      expect(() =>
        contaOrigem.transferirPorPix(-10, "email@email.com", "EMAIL")
      ).toThrow("Valor inválido de pix");
    });
  });
});
