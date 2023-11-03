const ContaGold = require("./ContaGold");

describe("Testes da classe Conta Gold", () => {
  //TESTE INTANCIAR A CONTA
  test("verificar se instância foi criada corretamente", () => {
    const contaGold = new ContaGold();
    expect(contaGold).toBeInstanceOf(ContaGold);

    contaGold.destruir();
  });

  test("instanciar conta Gold com valores válidos", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 6000);
    expect(contaGold.getAgencia()).toBe("1234");
    expect(contaGold.getConta()).toBe("12345");
    expect(contaGold.getSaldo()).toBe(1000);
    expect(contaGold.renda).toBe(6000);

    contaGold.destruir();
  });

  //TESTE MÉTODO CRIAR CONTA

  test("retorna mensagem de sucesso ao criar conta Gold com dados válidos e renda compatível", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 5000);

    expect(contaGold.criarConta("1234", "12345", 1000, 5000)).toBe(
      "Conta criada com sucesso!"
    );
    expect(contaGold.getAgencia()).toBe("1234");
    expect(contaGold.getConta()).toBe("12345");
    expect(contaGold.getSaldo()).toBe(1000);
    expect(contaGold.renda).toBe(5000);

    contaGold.destruir();
  });

  test("retorna mensagem de erro ao criar conta Gold com dados inválidos", () => {
    const contaGold = new ContaGold();
    expect(() => contaGold.criarConta("123456", "123", 1000, 5000)).toThrow(
      "Dados inválidos!"
    );

    contaGold.destruir();
  });

  test("retorna mensagem de erro ao criar conta Gold com dados válidos e renda incompatível", () => {
    const contaGold = new ContaGold();

    expect(() => contaGold.criarConta("1234", "12345", 1000, 3000)).toThrow(
      "Renda incompatível com a criação da conta Gold"
    );

    expect(() => contaGold.criarConta("1234", "12345", 1000, 18000)).toThrow(
      "Renda incompatível com a criação da conta Gold"
    );

    contaGold.destruir();
  });

  //TESTE MÉTODO SACAR
  test("retorna sucesso ao sacar 100 reais da conta Gold", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 5000);

    contaGold.sacar(100);
    expect(contaGold.getSaldo()).toBe(900);

    contaGold.destruir();
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta Gold", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 5000);

    expect(() => contaGold.sacar(-100)).toThrow("Valor inválido para saque");
    expect(contaGold.getSaldo()).toBe(1000);

    contaGold.destruir();
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo", () => {
    const contaGold = new ContaGold("1234", "12345", 100, 5000);

    expect(() => contaGold.sacar(101)).toThrow("Saldo insuficiente");
    expect(contaGold.getSaldo()).toBe(100);

    contaGold.destruir();
  });

  //TESTE MÉTODO DEPOSITAR

  test("retorna sucesso ao depositar 100 reais na conta Gold", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 5000);

    contaGold.depositar(100);
    expect(contaGold.getSaldo()).toBe(1100);

    contaGold.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numérico na conta Gold", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 5000);

    expect(() => contaGold.depositar(" ")).toThrow(
      "Valor inválido para depósito"
    );
    expect(contaGold.getSaldo()).toBe(1000);

    contaGold.destruir();
  });

  //TESTE MÉTODO TRANSFERIR
  test("retornar sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new ContaGold("0001", "12345", 1000, 6000);
    const contaReceptor = new ContaGold("0001", "78945", 500, 8000);

    expect(contaEmissor.transferir(100, "0001", "78945")).toBe(
      "Transferência realizada com sucesso"
    );
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência com saldo insuficiente", () => {
    const contaEmissor = new ContaGold("0001", "12345", 800, 6000);
    const contaReceptor = new ContaGold("0001", "78945", 500, 8000);

    expect(() => contaEmissor.transferir(850, "0001", "78945")).toThrow(
      "Saldo insuficiente."
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência para uma conta inválida", () => {
    const contaEmissor = new ContaGold("0001", "12345", 1000, 6000);
    const contaReceptor = new ContaGold("0001", "78945", 500, 8000);

    expect(() => contaEmissor.transferir(100, "0002", "78945")).toThrow(
      "Conta não encontrada"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência com valor inválido", () => {
    const contaEmissor = new ContaGold("0001", "12345", 1000, 6000);
    const contaReceptor = new ContaGold("0001", "78945", 500, 8000);

    expect(() => contaEmissor.transferir(-100, "0001", "78945")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  //TESTE MÉTODO TRANSFERIR POR PIX
  test("retornar sucesso ao fazer uma transferência por pix com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new ContaGold("0001", "12345", 1000, 6000);
    const contaReceptor = new ContaGold("0001", "78945", 500, 8000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(contaEmissor.transferirPix(100, "21995460671", "TELEFONE")).toBe(
      "Transferência por pix realizada com sucesso"
    );
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro se a chave pix for inválida", () => {
    const contaEmissor = new ContaGold("0001", "12345", 1000, 6000);
    const contaReceptor = new ContaGold("0001", "78945", 500, 8000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(100, "0995460671", "TELEFONE")
    ).toThrow("Chave pix não encontrada");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro se o saldo for insuficiente", () => {
    const contaEmissor = new ContaGold("0001", "12345", 800, 6000);
    const contaReceptor = new ContaGold("0001", "78945", 500, 8000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(850, "21995460671", "TELEFONE")
    ).toThrow("Saldo insuficiente.");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro se o valor for inválido", () => {
    const contaEmissor = new ContaGold("0001", "12345", 1000, 6000);
    const contaReceptor = new ContaGold("0001", "78945", 500, 8000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(-100, "21995460671", "TELEFONE")
    ).toThrow("Valor inválido para transferência");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
