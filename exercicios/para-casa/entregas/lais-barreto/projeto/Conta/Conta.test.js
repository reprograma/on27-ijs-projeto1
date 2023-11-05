const Conta = require("./Conta");

describe("Testes da Classe Conta", () => {
  test("verificar se instância foi criada corretamente", () => {
    const conta = new Conta();
    expect(conta instanceof Conta).toBe(true);

    conta.destruir();
  });

  test("instanciar conta com valores válidos", () => {
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta();
    expect(conta.criarConta("1234", "12345", 1000)).toBe(
      "Conta criada com sucesso"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna mensagem de erro ao tentar criar conta com dados inválidos", () => {
    const conta = new Conta();
    expect(() => conta.criarConta("123454", "123", 1000)).toThrow(
      "Dados inválidos para cadastro"
    );

    conta.destruir();
  });

  test("retorna sucesso ao sacar 100 da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);

    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 100);

    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);

    conta.destruir();
  });

  test("retorna sucesso ao depositar 100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);

    conta.destruir();
  });

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("criar uma chave pix por cpf com sucesso", () => {
    const conta = new Conta();

    const operacao = conta.criarChavePix("40814360879", "CPF");

    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40814360879");

    conta.destruir();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    const conta = new Conta();

    expect(() => conta.criarChavePix("124861", "CPF")).toThrow(
      "Erro: CPF inválido"
    );

    conta.destruir();
  });

  test("criar uma chave pix por email com sucesso", () => {
    const conta = new Conta();

    const operacao = conta.criarChavePix("analu@email.com", "EMAIL");

    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("analu@email.com");

    conta.destruir();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com e-mail inválido", () => {
    const conta = new Conta();

    expect(() => conta.criarChavePix("email-invalido", "EMAIL")).toThrow(
      "Erro: Email inválido"
    );

    conta.destruir();
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    const conta = new Conta();

    const operacao = conta.criarChavePix("11951639874", "TELEFONE");

    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("11951639874");

    conta.destruir();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com e-mail inválido", () => {
    const conta = new Conta();

    expect(() =>
      conta
        .criarChavePix("14523", "TELEFONE")
        .toThrow("Erro: Telefone inválido")
    );

    conta.destruir();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix do tipo inválido", () => {
    const conta = new Conta();

    expect(() =>
      conta.criarChavePix(147, "CHAVE ALEATÓRIA").toThrow("Chave inexistente")
    );

    conta.destruir();
  });

  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    const operacao = contaEmissor.transferir(100, "0001", "78945");

    expect(operacao).toBe("Tranferencia realizada");
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar mensagem de erro quando a conta recpetora for inválida", () => {
    const contaEmissor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);

    expect(() => contaEmissor.transferir(100, "0001", "78945")).toThrow(
      "Conta não encontrada"
    );

    contaEmissor.destruir();
  });

  test("retornar mensagem de erro quando o valor de transferência for negativo", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    expect(() => contaEmissor.transferir(-100, "0001", "78945")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("realizar transferência via pix com saldo suficiente e valor e dados válidos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    contaReceptor.criarChavePix("analu@email.com", "EMAIL");

    const operacao = contaEmissor.transferirPix(
      100,
      "analu@email.com",
      "email"
    );

    expect(operacao).toBe("Transferência realizada com sucesso");
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);
    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro ao tentar transferência pix com chave inválida", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    contaReceptor.criarChavePix("analu@email.com", "EMAIL");

    expect(() =>
      contaEmissor.transferirViaPix(20, "analu@email", "email")
    ).toThrow("Conta e chave pix não encontradas");
    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro ao tentar transferência via pix com valor inválido", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    contaReceptor.criarChavePix("analu@email.com", "EMAIL");

    expect(() =>
      contaEmissor.transferirViaPix(-20, "analu@email.com", "email")
    ).toThrow("Valor inválido para transferência");
    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro ao tentar transferência via pix com saldo suficiente", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 100);
    contaReceptor.criarConta("0001", "78945", 500);

    contaReceptor.criarChavePix("analu@email.com", "EMAIL");

    expect(() =>
      contaEmissor.transferirViaPix(1000, "analu@email.com", "email")
    ).toThrow("Saldo insuficiente para transferência");
    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
