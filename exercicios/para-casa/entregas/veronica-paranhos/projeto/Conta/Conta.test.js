const Conta = require("./Conta.js");

describe("Teste da classe Conta", () => {
  test("verificar se instância foi criada corretamente", () => {
    const conta = new Conta();
    expect(conta).toBeInstanceOf(Conta);
  });

  test("instanciar conta com valores válidos", () => {
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
  });

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.criarConta("1234", "12345", 1000)).toBe(
      "Conta criada com sucesso!"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
  });

  test("retorna mensagem de erro ao criar conta com dados inválidos", () => {
    const conta = new Conta();
    expect(() => conta.criarConta("123456", "123", 1000)).toThrow(
      "Dados inválidos!"
    );
  });

  test("retorna sucesso ao sacar 100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 100);

    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);
  });

  test("retorna sucesso ao depositar 100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);
  });

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
  });

  test("retorna mensagem de erro ao depositar valor não numérico", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
  });

  test("criar uma chave pix com cpf com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("08367173767", "CPF");

    expect(operacao).toBe("Chave pix por CPF criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("08367173767");
  });

  test("retorna mensagem de erro ao tentar cadastrar cheve pix com cpf inválido", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("40812365687", "CPF");
    expect(() => operacao).toThrow("Erro: CPF inválido");
  });

  test("criar uma chave pix com email com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("veronica@email.com", "EMAIL");

    expect(operacao).toBe("Chave pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("veronica@email.com");
  });

  test("criar uma chave pix com telefone com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("21995460671", "TELEFONE");

    expect(operacao).toBe("Chave pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("21995460671");
  });

  test("retornar sucesso ap fazer uma transferência com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    const operacao = contaEmissor.transferir(100, "0001", "78945");

    expect(operacao).toBe("Transferência realizada com sucesso");
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);
  });
});

// setup (o que a minha funcao/metodo/classe que vai ser
//testada precisa para funcionar?)
// acao (execucao da funcao testada)
// verificacao (o que eu espero que seja retornado comparado
//com o que de fato é retornado)
