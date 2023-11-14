const ContaStandard = require("./ContaStandard");

describe("Testes da classe Conta Standard", () => {
  //TESTE INTANCIAR A CONTA
  test("verificar se instância foi criada corretamente", () => {
    const contaStandard = new ContaStandard();
    expect(contaStandard).toBeInstanceOf(ContaStandard);

    contaStandard.destruir();
  });

  test("instanciar conta Standard com valores válidos", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 3000);
    expect(contaStandard.getAgencia()).toBe("1234");
    expect(contaStandard.getConta()).toBe("12345");
    expect(contaStandard.getSaldo()).toBe(1000);
    expect(contaStandard.renda).toBe(3000);

    contaStandard.destruir();
  });

  //TESTE MÉTODO CRIAR CONTA

  test("retorna mensagem de sucesso ao criar conta Standard com dados válidos e renda compatível", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 3000);

    expect(contaStandard.criarConta("1234", "12345", 1000, 3000)).toBe(
      "Conta criada com sucesso!"
    );
    expect(contaStandard.getAgencia()).toBe("1234");
    expect(contaStandard.getConta()).toBe("12345");
    expect(contaStandard.getSaldo()).toBe(1000);
    expect(contaStandard.renda).toBe(3000);

    contaStandard.destruir();
  });

  test("retorna mensagem de erro ao criar conta Standard com dados inválidos", () => {
    const contaStandard = new ContaStandard();
    expect(() => contaStandard.criarConta("123456", "123", 1000, 3000)).toThrow(
      "Dados inválidos!"
    );

    contaStandard.destruir();
  });

  test("retorna mensagem de erro ao criar conta Standard com dados válidos e renda incompatível", () => {
    const contaStandard = new ContaStandard();

    expect(() => contaStandard.criarConta("1234", "12345", 1000, 5000)).toThrow(
      "Renda incompatível com a criação da conta Standard."
    );

    contaStandard.destruir();
  });

  //TESTE MÉTODO SACAR
  test("retorna sucesso ao sacar 100 reais da conta Standard", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 3000);

    contaStandard.sacar(100);
    expect(contaStandard.getSaldo()).toBe(900);

    contaStandard.destruir();
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 3000);

    expect(() => contaStandard.sacar(-100)).toThrow(
      "Valor inválido para saque"
    );
    expect(contaStandard.getSaldo()).toBe(1000);

    contaStandard.destruir();
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo", () => {
    const contaStandard = new ContaStandard("1234", "12345", 100, 3000);

    expect(() => contaStandard.sacar(101)).toThrow("Saldo insuficiente");
    expect(contaStandard.getSaldo()).toBe(100);

    contaStandard.destruir();
  });

  //TESTE MÉTODO DEPOSITAR

  test("retorna sucesso ao depositar 100 reais na conta Standard", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 3000);

    contaStandard.depositar(100);
    expect(contaStandard.getSaldo()).toBe(1100);

    contaStandard.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numérico na conta Standard", () => {
    const contaStandard = new ContaStandard("1234", "12345", 1000, 3000);

    expect(() => contaStandard.depositar(" ")).toThrow(
      "Valor inválido para depósito"
    );
    expect(contaStandard.getSaldo()).toBe(1000);

    contaStandard.destruir();
  });

  //TESTE MÉTODO TRANSFERIR
  test("retornar sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new ContaStandard("0001", "12345", 1000, 3000);
    const contaReceptor = new ContaStandard("0001", "78945", 500, 4000);

    expect(contaEmissor.transferir(100, "0001", "78945")).toBe(
      "Transferência realizada com sucesso"
    );
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência com saldo insuficiente", () => {
    const contaEmissor = new ContaStandard("0001", "12345", 800, 3000);
    const contaReceptor = new ContaStandard("0001", "78945", 500, 4000);

    expect(() => contaEmissor.transferir(850, "0001", "78945")).toThrow(
      "Saldo insuficiente."
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência para uma conta inválida", () => {
    const contaEmissor = new ContaStandard("0001", "12345", 1000, 3000);
    const contaReceptor = new ContaStandard("0001", "78945", 500, 4000);

    expect(() => contaEmissor.transferir(100, "0002", "78945")).toThrow(
      "Conta não encontrada"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência com valor inválido", () => {
    const contaEmissor = new ContaStandard("0001", "12345", 1000, 3000);
    const contaReceptor = new ContaStandard("0001", "78945", 500, 4000);

    expect(() => contaEmissor.transferir(-100, "0001", "78945")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência acima do limite diário de transações", () => {
    const contaEmissor = new ContaStandard("0001", "12345", 1000, 3000);
    const contaReceptor = new ContaStandard("0001", "78945", 500, 4000);

    expect(() => contaEmissor.transferir(1010, "0001", "78945")).toThrow(
      "Limite de transações diárias atingido."
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  //TESTE MÉTODO TRANSFERIR POR PIX
  test("retornar sucesso ao fazer uma transferência por pix com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new ContaStandard("0001", "12345", 1000, 3000);
    const contaReceptor = new ContaStandard("0001", "78945", 500, 4000);

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
    const contaEmissor = new ContaStandard("0001", "12345", 1000, 3000);
    const contaReceptor = new ContaStandard("0001", "78945", 500, 4000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(100, "0995460671", "TELEFONE")
    ).toThrow("Chave pix não encontrada");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro se o saldo for insuficiente", () => {
    const contaEmissor = new ContaStandard("0001", "12345", 800, 3000);
    const contaReceptor = new ContaStandard("0001", "78945", 500, 4000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(850, "21995460671", "TELEFONE")
    ).toThrow("Saldo insuficiente.");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro se o valor for inválido", () => {
    const contaEmissor = new ContaStandard("0001", "12345", 1000, 3000);
    const contaReceptor = new ContaStandard("0001", "78945", 500, 4000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(-100, "21995460671", "TELEFONE")
    ).toThrow("Valor inválido para transferência");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro se o valor for acima do limite diário de transações", () => {
    const contaEmissor = new ContaStandard("0001", "12345", 1000, 3000);
    const contaReceptor = new ContaStandard("0001", "78945", 500, 4000);

    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(1010, "21995460671", "TELEFONE")
    ).toThrow("Limite de transações diárias atingido.");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
