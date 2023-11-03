const ContaPremium = require("./ContaPremium");

describe("Testes da conta ContaPremium", () => {
  test("Verificar se a instância ContaPremium está sendo feita corretamente", () => {
    const conta = new ContaPremium();
    expect(conta instanceof ContaPremium).toBe(true);
    conta.destruir();
  });

  test("Criar conta Premium com valores válidos", () => {
    const conta = new ContaPremium("1234", "12345", 2000, 30000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(2000);
    conta.destruir();
  });

  test("Retorna erro ao criar conta Premium com dados válidos e renda incompatível", () => {
    const conta = new ContaPremium();
    const operacao = () => conta.criarConta("1234", "12345", 1000, 5000);

    expect(operacao).toThrow("Sua renda não se enquadra na categoria Premium");
    conta.destruir();
  });

  test("Retorna erro ao criar conta com dados inválidos", () => {
    const conta = new ContaPremium();
    const operacao = () => conta.criarConta("1234", "345", 1000, 20000);

    expect(operacao).toThrow("Dados inválidos para cadastro");
    conta.destruir();
  });

  test("retorna sucesso ao sacar 50 da conta Premium", () => {
    const conta = new ContaPremium();
    conta.criarConta("1234", "12345", 1000, 20000);

    conta.sacar(50);
    expect(conta.getSaldo()).toBe(950);
    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar -10 da conta Premium", () => {
    const conta = new ContaPremium();
    conta.criarConta("1234", "12345", 1000, 20000);

    expect(() => conta.sacar(-10)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("Retorna mensagem de sucesso ao depositar 100 na conta Premium", () => {
    const conta = new ContaPremium();
    conta.criarConta("1234", "12345", 1000, 20000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);
    conta.destruir();
  });

  test("Retona mensagem de erro ao depositar -50 da conta Premium", () => {
    const conta = new ContaPremium();
    conta.criarConta("1234", "12345", 1000, 20000);

    expect(() => conta.depositar(-50)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });
});
