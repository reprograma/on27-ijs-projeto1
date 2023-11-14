const ContaPremium = require("./ContaPremium");

describe("Testes da classe Conta Premium", () => {
  //TESTE INTANCIAR A CONTA
  test("verificar se instância foi criada corretamente", () => {
    const contaPremium = new ContaPremium();
    expect(contaPremium).toBeInstanceOf(ContaPremium);

    contaPremium.destruir();
  });

  test("instanciar conta Premium com valores válidos", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 18000);
    expect(contaPremium.getAgencia()).toBe("1234");
    expect(contaPremium.getConta()).toBe("12345");
    expect(contaPremium.getSaldo()).toBe(1000);
    expect(contaPremium.renda).toBe(18000);

    contaPremium.destruir();
  });

  //TESTE MÉTODO CRIAR CONTA

  test("retorna mensagem de sucesso ao criar conta Premium com dados válidos e renda compatível", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 25000);

    expect(contaPremium.criarConta("1234", "12345", 1000, 25000)).toBe(
      "Conta criada com sucesso!"
    );
    expect(contaPremium.getAgencia()).toBe("1234");
    expect(contaPremium.getConta()).toBe("12345");
    expect(contaPremium.getSaldo()).toBe(1000);
    expect(contaPremium.renda).toBe(25000);

    contaPremium.destruir();
  });

  test("retorna mensagem de erro ao criar conta Premium com dados inválidos", () => {
    const contaPremium = new ContaPremium();
    expect(() => contaPremium.criarConta("123456", "123", 1000, 25000)).toThrow(
      "Dados inválidos!"
    );

    contaPremium.destruir();
  });

  test("retorna mensagem de erro ao criar conta Premium com dados válidos e renda incompatível", () => {
    const contaPremium = new ContaPremium();

    expect(() => contaPremium.criarConta("1234", "12345", 1000, 17000)).toThrow(
      "Renda incompatível com a criação da conta Premium"
    );

    contaPremium.destruir();
  });

  //TESTE MÉTODO SACAR
  test("retorna sucesso ao sacar 100 reais da conta Premium", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 25000);

    contaPremium.sacar(100);
    expect(contaPremium.getSaldo()).toBe(900);

    contaPremium.destruir();
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta Premium", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 25000);

    expect(() => contaPremium.sacar(-100)).toThrow("Valor inválido para saque");
    expect(contaPremium.getSaldo()).toBe(1000);

    contaPremium.destruir();
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo", () => {
    const contaPremium = new ContaPremium("1234", "12345", 100, 25000);

    expect(() => contaPremium.sacar(101)).toThrow("Saldo insuficiente");
    expect(contaPremium.getSaldo()).toBe(100);

    contaPremium.destruir();
  });

  //TESTE MÉTODO DEPOSITAR

  test("retorna sucesso ao depositar 100 reais na conta Premium", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 25000);

    contaPremium.depositar(100);
    expect(contaPremium.getSaldo()).toBe(1100);

    contaPremium.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numérico na conta Premium", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 25000);

    expect(() => contaPremium.depositar(" ")).toThrow(
      "Valor inválido para depósito"
    );
    expect(contaPremium.getSaldo()).toBe(1000);

    contaPremium.destruir();
  });

  //TESTE MÉTODO TRANSFERIR
  test("retornar sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new ContaPremium("0001", "12345", 1000, 26000);
    const contaReceptor = new ContaPremium("0001", "78945", 500, 28000);

    expect(contaEmissor.transferir(100, "0001", "78945")).toBe(
      "Transferência realizada com sucesso"
    );
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência com saldo insuficiente", () => {
    const contaEmissor = new ContaPremium("0001", "12345", 800, 26000);
    const contaReceptor = new ContaPremium("0001", "78945", 500, 28000);

    expect(() => contaEmissor.transferir(850, "0001", "78945")).toThrow(
      "Saldo insuficiente."
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência para uma conta inválida", () => {
    const contaEmissor = new ContaPremium("0001", "12345", 1000, 26000);
    const contaReceptor = new ContaPremium("0001", "78945", 500, 28000);

    expect(() => contaEmissor.transferir(100, "0002", "78945")).toThrow(
      "Conta não encontrada"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência com valor inválido", () => {
    const contaEmissor = new ContaPremium("0001", "12345", 1000, 26000);
    const contaReceptor = new ContaPremium("0001", "78945", 500, 28000);

    expect(() => contaEmissor.transferir(-100, "0001", "78945")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  //TESTE MÉTODO TRANSFERIR POR PIX
  test("retornar sucesso ao fazer uma transferência por pix com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new ContaPremium("0001", "12345", 1000, 26000);
    const contaReceptor = new ContaPremium("0001", "78945", 500, 28000);

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
    const contaEmissor = new ContaPremium("0001", "12345", 1000, 26000);
    const contaReceptor = new ContaPremium("0001", "78945", 500, 28000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(100, "0995460671", "TELEFONE")
    ).toThrow("Chave pix não encontrada");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro se o saldo for insuficiente", () => {
    const contaEmissor = new ContaPremium("0001", "12345", 800, 26000);
    const contaReceptor = new ContaPremium("0001", "78945", 500, 28000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(850, "21995460671", "TELEFONE")
    ).toThrow("Saldo insuficiente.");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro se o valor for inválido", () => {
    const contaEmissor = new ContaPremium("0001", "12345", 1000, 26000);
    const contaReceptor = new ContaPremium("0001", "78945", 500, 28000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(-100, "21995460671", "TELEFONE")
    ).toThrow("Valor inválido para transferência");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
