// Standard
// são pessoas com até R$4999,99 de renda mensal.
// tem limite de transação de 1000 reais por dia.

const ContaStandart = require("./ContaStandart");

describe("Teste da classe ContaStandart", () => {
  test("Verificar se a instância ContaStandart está sendo criada", () => {
    const conta = new ContaStandart();
    expect(conta instanceof ContaStandart).toBe(true);
    conta.destruir();
  });

  test("Instanciar conta standart com valores válidos", () => {
    const conta = new ContaStandart("1234", "12345", 1000, 3000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna mensagem de sucesso ao criar conta standart", () => {
    const conta = new ContaStandart();

    expect(conta.criarConta("1234", "12345", 1000, 3000)).toBe("Conta criada com sucesso");
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna mensagem de ERRO ao criar conta Standat", () => {
    const conta = new ContaStandart();
    const operacao = () => conta.criarConta("1234", "345", 1000, 3000)

    expect(operacao).toThrow("Erro no cadastro, dados inválidos");
    conta.destruir()
  });

  test("retorna mensagem de ERRO ao tentar criar conta Standart com renda incompatível", () => {
    const conta = new ContaStandart();
    const operacao = () => conta.criarConta("1111", "12345", 1000, 6000)

    expect(operacao).toThrow("Renda não compatível com Conta Standart")
    conta.destruir()
  })

  test("retorna sucesso ao sacar 100 da conta standart", () => {
    const conta = new ContaStandart();
    conta.criarConta("1234", "12345", 1000, 3000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);
    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar -100 da conta standart", () => {
    const conta = new ContaStandart();
    conta.criarConta("1234", "12345", 1000, 3000);

    expect(() => conta.sacar(-100)).toThrow("valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });
});
