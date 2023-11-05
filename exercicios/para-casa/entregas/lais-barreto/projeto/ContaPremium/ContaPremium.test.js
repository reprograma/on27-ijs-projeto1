const ContaPremium = require("./ContaPremium");

describe("Testes da Classe Conta Premium", () => {
  test("verificar se instância foi criada corretamente", () => {
    const contaPremium = new ContaPremium();

    expect(contaPremium instanceof ContaPremium).toBe(true);

    contaPremium.destruir();
  });

  test("instanciar conta com dados válidos e renda compatível", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 4000);

    expect(contaPremium.getAgencia()).toBe("1234");
    expect(contaPremium.getConta()).toBe("12345");
    expect(contaPremium.getSaldo()).toBe(1000);

    contaPremium.destruir();
  });

  test("retorna mensagem de sucesso ao criar conta", () => {
    const contaPremium = new ContaPremium();

    expect(contaPremium.criarConta("1234", "12345", 1000, 40000)).toBe(
      "Conta criada com sucesso"
    );
    expect(contaPremium.getAgencia()).toBe("1234");
    expect(contaPremium.getConta()).toBe("12345");
    expect(contaPremium.getSaldo()).toBe(1000);

    contaPremium.destruir();
  });

  test("retorna mensagem de erro ao criar conta com dados inválidos", () => {
    const contaPremium = new ContaPremium();

    expect(() => contaPremium.criarConta("1234", "123", 1000, 4000)).toThrow(
      "Dados inválidos para cadastro"
    );

    contaPremium.destruir();
  });

  test("retorna mensagem de erro ao criar conta com renda incompatível", () => {
    const contaPremium = new ContaPremium();

    expect(() => contaPremium.criarConta("1234", "12345", 1000, 6000)).toThrow(
      "Dados inválidos para cadastro"
    );

    contaPremium.destruir();
  });

  test("retorna mensagem de sucesso ao realizar saque", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 4000);

    contaPremium.sacar(100);
    expect(contaPremium.getSaldo()).toBe(900);
  });

  test("retorna mensagem de erro ao realizar saque com valor negativo", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 4000);

    expect(() => contaPremium.sacar(-100)).toThrow("Valor inválido para saque");
    expect(contaPremium.getSaldo()).toBe(1000);

    contaPremium.destruir();
  });

  test("retorna mensagem de erro ao realizar saque com valor maior que o saldo", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 3000);

    expect(() => contaPremium.sacar(3000)).toThrow("Saldo insuficiente");
    expect(contaPremium.getSaldo()).toBe(1000);

    contaPremium.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numérico", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 3000);

    expect(() => contaPremium.depositar("string")).toThrow(
      "Valor inválido para depósito"
    );
    expect(contaPremium.getSaldo()).toBe(1000);

    contaPremium.destruir();
  });

  test("retornar sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new ContaPremium("1234", "12345", 100, 1000);
    const contaReceptor = new ContaPremium("1234", "61478", 600, 3000);

    expect(contaEmissor.transferir(10, "1234", "61478")).toBe(
      "Transferência realizada com sucesso"
    );
    expect(contaEmissor.getSaldo()).toBe(90);
    expect(contaReceptor.getSaldo()).toBe(610);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar mensagem de erro ao fazer uma transferência com saldo insuficiente", () => {
    const contaEmissor = new ContaPremium("1234", "12345", 10, 1000);
    const contaReceptor = new ContaPremium("1234", "61478", 600, 3000);

    expect(() => contaEmissor.transferir(75, "1234", "61478")).toThrow(
      "Saldo insuficiente para transferência."
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar mensagem de erro ao fazer uma transferência para uma conta inválida", () => {
    const contaEmissor = new ContaPremium("1234", "12345", 10, 1000);

    expect(() => contaEmissor.transferir(500, "2222", "12514")).toThrow(
      "Conta bancária não encontrada"
    );

    contaEmissor.destruir();
  });

  test("retornar mensagem de erro ao fazer uma transferência com valor inválido", () => {
    const contaEmissor = new ContaPremium("1234", "12345", 10, 1000);
    const contaReceptor = new ContaPremium("1234", "61478", 600, 3000);

    expect(() => contaEmissor.transferir(-30, "1234", "61478")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
