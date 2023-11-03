const ContaGold = require("./ContaGold");

describe("Testes da conta ContaGold", () => {
  test("Verificar se a instância ContaGold está sendo feita corretamente", () => {
    const conta = new ContaGold();
    expect(conta instanceof ContaGold).toBe(true);
    conta.destruir();
  });

  test("Criar conta Gold com valores válidos", () => {
    const conta = new ContaGold("1234", "12345", 2000, 9000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(2000);
    conta.destruir();
  });

  test("Retorna erro ao criar conta Gold com dados válidos e renda incompatível", () => {
    const conta = new ContaGold();
    const operacao = () => conta.criarConta("1234", "12345", 1000, 19000);

    expect(operacao).toThrow("Sua renda não se enquadra na categoria Gold");
    conta.destruir();
  });

  test("Retorna erro ao criar conta com dados inválidos", () => {
    const conta = new ContaGold();
    const operacao = () => conta.criarConta("1234", "345", 1000, 9000);

    expect(operacao).toThrow("Dados inválidos para cadastro");
    conta.destruir();
  });

  test("retorna sucesso ao sacar 50 da conta Gold", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000, 9000);

    conta.sacar(50);
    expect(conta.getSaldo()).toBe(950);
    conta.destruir();
  });

  test("Retorna mensagem de erro ao sacar -10 da conta Gold", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000, 9000);

    expect(() => conta.sacar(-10)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("Retorna mensagem de sucesso ao depositar 100 na conta Gold", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000, 9000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);
    conta.destruir();
  });

  test("Retona mensagem de erro ao depositar -50 da conta Gold", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000, 9000);

    expect(() => conta.depositar(-50)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });
});
