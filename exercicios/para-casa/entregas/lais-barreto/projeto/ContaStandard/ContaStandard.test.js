const ContaStandard = require("./ContaStandard");

describe("Testes da Classe Conta Standard", () => {
  test("verificar se instância foi criada corretamente", () => {
    const contaStandard = new ContaStandard();

    expect(contaStandard instanceof ContaStandard).toBe(true);

    contaStandard.destruir();
  });

  test("instanciar conta com dados válidos e renda compatível", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 4000);

    expect(contaStandard.getAgencia()).toBe("1234");
    expect(contaStandard.getConta()).toBe("12345");
    expect(contaStandard.getSaldo()).toBe(1000);

    contaStandard.destruir();
  });

  test("retorna mensagem de sucesso ao criar conta", () => {
    const contaStandard = new ContaStandard();

    expect(contaStandard.criarConta("1234", "12345", 1000, 4000)).toBe(
      "Conta criada com sucesso"
    );
    expect(contaStandard.getAgencia()).toBe("1234");
    expect(contaStandard.getConta()).toBe("12345");
    expect(contaStandard.getSaldo()).toBe(1000);

    contaStandard.destruir();
  });

  test("retorna mensagem de erro ao criar conta com dados inválidos", () => {
    const contaStandard = new ContaStandard();

    expect(() => contaStandard.criarConta("1234", "123", 1000, 4000)).toThrow(
      "Dados inválidos para cadastro"
    );

    contaStandard.destruir();
  });

  test("retorna mensagem de sucesso ao realizar saque", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 4000);

    contaStandard.sacar(100);
    expect(contaStandard.getSaldo()).toBe(900);
  });

  test("retorna mensagem de erro ao realizar saque com valor negativo", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 4000);

    expect(() => contaStandard.sacar(-100)).toThrow(
      "Valor inválido para saque"
    );
    expect(contaStandard.getSaldo()).toBe(1000);

    contaStandard.destruir();
  });

  test("retorna mensagem de erro ao realizar saque com valor maior que o saldo", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 3000);

    expect(() => contaStandard.sacar(3000)).toThrow("Saldo insuficiente");
    expect(contaStandard.getSaldo()).toBe(1000);

    contaStandard.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numérico", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 3000);

    expect(() => contaStandard.depositar("string")).toThrow(
      "Valor inválido para depósito"
    );
    expect(contaStandard.getSaldo()).toBe(1000);

    contaStandard.destruir();
  });

  test("retornar sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new ContaStandard("1234", "12345", 100, 1000);
    const contaReceptor = new ContaStandard("1234", "61478", 600, 3000);

    expect(contaEmissor.transferir(10, "1234", "61478")).toBe(
      "Transferência realizada com sucesso"
    );
    expect(contaEmissor.getSaldo()).toBe(90);
    expect(contaReceptor.getSaldo()).toBe(610);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar mensagem de erro ao fazer uma transferência com saldo insuficiente", () => {
    const contaEmissor = new ContaStandard("1234", "12345", 10, 1000);
    const contaReceptor = new ContaStandard("1234", "61478", 600, 3000);

    expect(() => contaEmissor.transferir(75, "1234", "61478")).toThrow(
      "Saldo insuficiente para transferência."
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar mensagem de erro ao fazer uma transferência para uma conta inválida", () => {
    const contaEmissor = new ContaStandard("1234", "12345", 10, 1000);

    expect(() => contaEmissor.transferir(500, "2222", "12514")).toThrow(
      "Conta bancária não encontrada"
    );

    contaEmissor.destruir();
  });

  test("retornar mensagem de erro ao fazer uma transferência com valor inválido", () => {
    const contaEmissor = new ContaStandard("1234", "12345", 10, 1000);
    const contaReceptor = new ContaStandard("1234", "61478", 600, 3000);

    expect(() => contaEmissor.transferir(-30, "1234", "61478")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
