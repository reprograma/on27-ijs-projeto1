const Conta = require("./Conta.js");

describe("Teste da classe Conta", () => {
  //TESTE INTANCIAR A CONTA
  test("verificar se instância foi criada corretamente", () => {
    const conta = new Conta();
    expect(conta).toBeInstanceOf(Conta);

    conta.destruir();
  });

  test("instanciar conta com valores válidos", () => {
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  //TESTE MÉTODO CRIAR CONTA

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.criarConta("1234", "12345", 1000)).toBe(
      "Conta criada com sucesso!"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna mensagem de erro ao criar conta com dados inválidos", () => {
    const conta = new Conta();
    expect(() => conta.criarConta("123456", "123", 1000)).toThrow(
      "Dados inválidos!"
    );

    conta.destruir();
  });

  //TESTE MÉTODO SACAR

  test("retorna sucesso ao sacar 100 reais da conta", () => {
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

  test("retorna mensagem de erro ao sacar valor maior que o saldo", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 100);

    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);

    conta.destruir();
  });

  //TESTE MÉTODO DEPOSITAR

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

  test("retorna mensagem de erro ao depositar valor não numérico", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  //TESTE MÉTODO TRANSFERIR

  test("retornar sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    expect(contaEmissor.transferir(100, "0001", "78945")).toBe(
      "Transferência realizada com sucesso"
    );
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência com saldo insuficiente", () => {
    const contaEmissor = new Conta("0001", "12345", 800);
    const contaReceptor = new Conta("0001", "78945", 500);

    expect(() => contaEmissor.transferir(850, "0001", "78945")).toThrow(
      "Saldo insuficiente."
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência para uma conta inválida", () => {
    const contaEmissor = new Conta("0001", "12345", 1000);
    const contaReceptor = new Conta("0001", "78945", 500);

    expect(() => contaEmissor.transferir(100, "0002", "78945")).toThrow(
      "Conta não encontrada"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retornar erro ao fazer uma transferência com valor inválido", () => {
    const contaEmissor = new Conta("0001", "12345", 1000);
    const contaReceptor = new Conta("0001", "78945", 500);

    expect(() => contaEmissor.transferir(-10, "0001", "78945")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  //TESTE MÉTODO CRIAR CHAVE PIX

  test("criar uma chave pix com cpf com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("40814360879", "CPF");

    expect(operacao).toBe("Chave pix por CPF criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40814360879");

    conta.destruir();
  });

  test("retorna mensagem de erro ao tentar cadastrar chave pix com cpf inválido", () => {
    const conta = new Conta();

    expect(() => conta.criarChavePix("408123656", "CPF")).toThrow(
      "Error: CPF inválido"
    );

    conta.destruir();
  });

  test("criar uma chave pix com email com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("veronica@email.com", "EMAIL");

    expect(operacao).toBe("Chave pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("veronica@email.com");

    conta.destruir();
  });

  test("retorna mensagem de erro ao tentar cadastrar chave pix com email inválido", () => {
    const conta = new Conta();

    expect(() => conta.criarChavePix("veronica.email.com", "EMAIL")).toThrow(
      "Error: Email inválido"
    );

    conta.destruir();
  });

  test("criar uma chave pix com telefone com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("21995460671", "TELEFONE");

    expect(operacao).toBe("Chave pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("21995460671");

    conta.destruir();
  });

  test("retorna mensagem de erro ao tentar cadastrar chave pix com telefone inválido", () => {
    const conta = new Conta();

    expect(() => conta.criarChavePix("0995460671", "TELEFONE")).toThrow(
      "Error: Telefone inválido"
    );

    conta.destruir();
  });

  test("retorna mensagem de erro ao tentar cadastrar tipo de chave pix inválida", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("21995460671", "TEL");

    expect(operacao).toBe("Chave inexistente");

    conta.destruir();
  });

  //TESTE MÉTODO TRANSFERIR POR PIX

  test("retornar sucesso ao fazer uma transferência por pix com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);
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
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 200);
    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(100, "0995460671", "TELEFONE")
    ).toThrow("Chave pix não encontrada");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro se o saldo for insuficiente", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 800);
    contaReceptor.criarConta("0001", "78945", 200);
    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(850, "21995460671", "TELEFONE")
    ).toThrow("Saldo insuficiente.");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro se o valor for inválido", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 800);
    contaReceptor.criarConta("0001", "78945", 200);
    contaReceptor.criarChavePix("21995460671", "TELEFONE");

    expect(() =>
      contaEmissor.transferirPix(-100, "21995460671", "TELEFONE")
    ).toThrow("Valor inválido para transferência");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});

// setup (o que a minha funcao/metodo/classe que vai ser
//testada precisa para funcionar?)
// acao (execucao da funcao testada)
// verificacao (o que eu espero que seja retornado comparado
//com o que de fato é retornado)
