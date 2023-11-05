const ContaGold = require("./ContaGold");

describe("Testes da Classe Conta Gold", () => {
  test("verificar se instância foi criada corretamente", () => {
    const contaGold = new ContaGold();
    expect(contaGold).toBeInstanceOf(ContaGold);

    contaGold.destruir();
  });

  test("instanciar conta com dados válidos e renda compatível", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 8000);

    expect(contaGold.getAgencia()).toBe("1234");
    expect(contaGold.getConta()).toBe("12345");
    expect(contaGold.getSaldo()).toBe(1000);

    contaGold.destruir();
  });

  test("retorna mensagem de sucesso ao criar conta", () => {
    const contaGold = new ContaGold();

    expect(contaGold.criarConta("1234", "12345", 1000, 8000)).toBe(
      "Conta criada com sucesso"
    );
    expect(contaGold.getAgencia()).toBe("1234");
    expect(contaGold.getConta()).toBe("12345");
    expect(contaGold.getSaldo()).toBe(1000);

    contaGold.destruir();
  });

  test("retorna mensagem de erro ao criar conta com dados inválidos", () => {
    const contaGold = new ContaGold();

    expect(() => contaGold.criarConta("1234", "123", 1000, 8000)).toThrow(
      "Dados inválidos para cadastro"
    );

    contaGold.destruir();
  });

  test("retorna mensagem de erro ao criar conta com renda incompatível", () => {
    const contaGold = new ContaGold();

    expect(() => contaGold.criarConta("1234", "12345", 1000, 18000)).toThrow(
      "Renda incompatível com a conta do tipo gold"
    );

    contaGold.destruir();
  });

  test("retorna mensagem de sucesso ao realizar saque", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 8000);

    contaGold.sacar(100);
    expect(contaGold.getSaldo()).toBe(900);
  });

  test("retorna mensagem de erro ao realizar saque com valor negativo", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 8000);

    expect(() => contaGold.sacar(-100)).toThrow("Valor inválido para saque");
    expect(contaGold.getSaldo()).toBe(1000);

    contaGold.destruir();
  });

  test("retorna mensagem de erro ao realizar saque com valor maior que o saldo", () => {
    const contaGold = new ContaGold("1234", "12345", 300, 8000);

    expect(() => contaGold.sacar(500)).toThrow("Saldo insuficiente");
    expect(contaGold.getSaldo()).toBe(300);

    contaGold.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numérico", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 8000);

    expect(() => contaGold.depositar("string")).toThrow(
      "Valor inválido para depósito"
    );
    expect(contaGold.getSaldo()).toBe(1000);

    contaGold.destruir();
  });

  test("retornar sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new ContaGold("1234", "12345", 100, 8000);
    const contaReceptor = new ContaGold("1234", "61478", 600, 8000);

    expect(contaEmissor.transferir(10, "1234", "61478")).toBe(
      "Transferência realizada com sucesso"
    );
    expect(contaEmissor.getSaldo()).toBe(90);
    expect(contaReceptor.getSaldo()).toBe(610);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar mensagem de erro ao fazer uma transferência com saldo insuficiente", () => {
    const contaEmissor = new ContaGold("1234", "12345", 10, 8000);
    const contaReceptor = new ContaGold("1234", "61478", 600, 8000);

    expect(() => contaEmissor.transferir(75, "1234", "61478")).toThrow(
      "Saldo insuficiente para transferência."
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar mensagem de erro ao fazer uma transferência para uma conta inválida", () => {
    const contaEmissor = new ContaGold("1234", "12345", 10, 8000);

    expect(() => contaEmissor.transferir(500, "2222", "12514")).toThrow(
      "Conta bancária não encontrada"
    );

    contaEmissor.destruir();
  });

  test("retornar mensagem de erro ao fazer uma transferência com valor inválido", () => {
    const contaEmissor = new ContaGold("1234", "12345", 10, 9000);
    const contaReceptor = new ContaGold("1234", "61478", 600, 8000);

    expect(() => contaEmissor.transferir(-30, "1234", "61478")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
