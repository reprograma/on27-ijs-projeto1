const ContaPremium = require("./ContaPremium");
const Conta = require("../Conta/Conta");

describe("Testes da Classe ContaPremium", () => {
  test("verificar se instancia ContaPremium é feita corretamente", () => {
    const conta = new ContaPremium();
    expect(conta instanceof ContaPremium).toBe(true);

    conta.destruir();
  });

  test("instanciar conta Premium com valores validos", () => {
    const conta = new ContaPremium("1234", "12345", 1000, 19000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna mensagem de sucesso ao criar conta Premium com dados válidos e renda compatível", () => {
    const conta = new ContaPremium();
    expect(conta.criarConta("1234", "12345", 1000, 19000)).toBe("Conta Premium criada com sucesso");
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna erro ao criar conta com dados válidos e renda incompatível com a categoria Premium", () => {
    const conta = new ContaPremium();
    expect(() => conta.criarConta("1234", "12345", 1000, 4000)).toThrow("Renda incompatível com a categoria Premium");

    conta.destruir();
  });

  test("retorna erro ao criar conta com dados inválidos", () => {
    const conta = new ContaPremium();
    expect(() => conta.criarConta("123454", "123", 1000, 19000)).toThrow("Dados inválidos para cadastro");

    conta.destruir();
  });

  test("retorna sucesso ao depositar 100 reais na conta Premium", () => {
    const conta = new ContaPremium();
    conta.criarConta("1234", "12345", 1000, 19000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);

    conta.destruir();
  });

  test("retorna mensagem de erro ao depositar -100 reais na conta Premium", () => {
    const conta = new ContaPremium();
    conta.criarConta("1234", "12345", 1000, 19000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new ContaPremium();
    conta.criarConta("1234", "12345", 1000, 19000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna sucesso ao sacar 100 da conta Premium", () => {
    const conta = new ContaPremium();
    conta.criarConta("1234", "12345", 1000, 19000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);

    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta Premium", () => {
    const conta = new ContaPremium();
    conta.criarConta("1234", "12345", 1000, 19000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta Premium", () => {
    const conta = new ContaPremium();
    conta.criarConta("1234", "12345", 1000, 19000);

    expect(() => conta.sacar(1100)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", () => {
    const contaEmissor = new ContaPremium();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000, 19000);
    contaReceptor.criarConta("0001", "78945", 500);

    const operacao = contaEmissor.transferir(100, "0001", "78945");

    expect(operacao).toBe("Tranferência realizada");
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferencia com valor inválido", ()=>{
    const contaEmissor = new ContaPremium();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000, 19000)
    contaReceptor.criarConta("0001", "78945", 500)

    expect(() => contaEmissor.transferir(-100, "0001", "78945").toThrow("Valor inválido para transferência"))
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferencia com saldo insuficiente", ()=>{
    const contaEmissor = new ContaPremium();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000, 19000)
    contaReceptor.criarConta("0001", "78945", 500)

    expect(() => contaEmissor.transferir(2000, "0001", "78945").toThrow("Saldo insuficiente para transferência"))
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferencia com dados inválidos", ()=>{
    const contaEmissor = new ContaPremium();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000, 19000)
    contaReceptor.criarConta("0001", "78945", 500)

    expect(() => contaEmissor.transferir(100, "01", "945").toThrow("Dados da conta inválidos para transferência"))
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna sucesso ao fazer um pix com valor válido, saldo suficiente, dados validos", () => {
    const contaEmissor = new ContaPremium();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000, 19000)
    contaReceptor.criarConta("0001", "78945", 500)

    contaReceptor.criarChavePix("email@email.com", "EMAIL")

    const operacao = contaEmissor.pix(10, "email@email.com", "email")

    expect(operacao).toBe("Pix realizado")
    expect(contaEmissor.getSaldo()).toBe(990)
    expect(contaReceptor.getSaldo()).toBe(510)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer um pix com valor inválido", () => {
    const contaEmissor = new ContaPremium();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000, 19000)
    contaReceptor.criarConta("0001", "78945", 500)

    contaReceptor.criarChavePix("email@email.com", "EMAIL")

    expect(() => contaEmissor.pix(-10, "email@email.com", "email")).toThrow("Valor inválido para realizar pix")
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer um pix com saldo insuficiente", () => {
    const contaEmissor = new ContaPremium();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 100, 19000)
    contaReceptor.criarConta("0001", "78945", 500)

    contaReceptor.criarChavePix("email@email.com", "EMAIL")

    expect(() => contaEmissor.pix(1000, "email@email.com", "email")).toThrow("Saldo insuficiente para realizar pix")
    expect(contaEmissor.getSaldo()).toBe(100, 19000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer um pix com dados inválidos", () => {
    const contaEmissor = new ContaPremium();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000, 19000)
    contaReceptor.criarConta("0001", "78945", 500)

    contaReceptor.criarChavePix("email@email.com", "EMAIL")

    expect(() => contaEmissor.pix(10, "email@email", "email")).toThrow("Conta não encontrada")
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});

/**
 * - criar testes para os 3 tipos de conta: 
  - [x] verificar se instancia conta é feita corretamente
  - [x] criar conta com dados válidos e renda compatível
  - [x] retorna erro ao criar conta com dados válidos e renda incompatível
  - [x] retorna erro ao criar conta com dados inválidos
  - [x] replicar todos os testes de depositar
  - [x] replicar todos os testes de sacar
  - [x] replicar todos os testes de transferir
 */