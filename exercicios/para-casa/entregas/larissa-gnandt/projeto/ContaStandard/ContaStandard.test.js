const ContaStandard = require("./ContaStandard");

describe("Testes da conta ContaStandard", () => {
  test("Verificar se a instância ContaStantard está sendo feita corretamente", () => {
    const conta = new ContaStandard();
    expect(conta instanceof ContaStandard).toBe(true);
    conta.destruir();
  });

  test("Criar conta Standard com valores válidos", () => {
    const conta = new ContaStandard("1234", "12345", 1000, 2000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("Retorna erro ao criar conta Standard com dados válidos e renda incompatível", () => {
    const conta = new ContaStandard();
    const operacao = () => conta.criarConta("1234", "12345", 1000, 19000);

    expect(operacao).toThrow("Sua renda não se enquadra na categoria Standard");
    conta.destruir();
  });

  test("Retorna erro ao criar conta com dados inválidos", () => {
    const conta = new ContaStandard();
    const operacao = () => conta.criarConta("1234", "345", 1000, 3000);

    expect(operacao).toThrow("Dados inválidos para cadastro");
    conta.destruir();
  });

  test("retorna sucesso ao sacar 50 da conta Standard", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 3000);

    conta.sacar(50);
    expect(conta.getSaldo()).toBe(950);
    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar -10 da conta Standard", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 3000);

    expect(() => conta.sacar(-10)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna mensagem de sucesso ao depositar 100 na conta Standard", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 3000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);
    conta.destruir();
  });

  test("retona mensagem de erro ao depositar -50 da conta Standard", () => {
    const conta = new ContaStandard();
    conta.criarConta("1234", "12345", 1000, 3000);

    expect(() => conta.depositar(-50)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });
});
