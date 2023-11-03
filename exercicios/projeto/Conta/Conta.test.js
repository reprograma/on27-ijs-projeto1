const Conta = require("./Conta");

describe("Teste da classe Conta", () => {
  test("Verificar se a instância Conta está sendo criada", () => {
    const conta = new Conta();
    expect(conta instanceof Conta).toBe(true);
    conta.destruir()
  });

  test("Instanciar conta com valores válidos", () => {
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir()
  });

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta();
    expect(conta.criarConta("1234", "12345", 1000)).toBe(
      "Conta criada com sucesso"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir()
  });

  test("retorna mensagem de ERRO ao criar conta", () => {
    const conta = new Conta();
    expect(() => conta.criarConta("12345", "123", 1000)).toThrow(
      "Erro no cadastro, dados inválidos"
    );
    conta.destruir()
  });

  test("retorna sucesso ao sacar 100 da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);
    conta.destruir()
  });

  test("retorna mensagem de erro ao sacar -100 da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.sacar(-100)).toThrow("valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir()
  });

  test("retorna sucesso ao depositar 100 na conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);
    conta.destruir()
  });

  test("retorna mensagem de erro ao depositar -100 da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(-100)).toThrow("valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir()
  });

  test("retorna mensagem de erro ao depositar valor não numérico da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(" ")).toThrow("valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir()
  });

  test("criar uma chave pix por cpf com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("40812545878", "CPF");

    expect(operacao).toBe("Chave Pix CPF criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40812545878");
    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    const conta = new Conta();

    expect(() => conta.criarChavePix("4081878", "CPF")).toThrow("Erro: CPF Inválido");
    conta.destruir()
  });

  test("criar uma chave pix por e-mail com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("roxanie@email.com.br", "EMAIL");

    expect(operacao).toBe("Chave Pix EMAIL criada com sucesso");
    expect(conta.chavesPix.email).toBe("roxanie@email.com.br");
    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com email invalido", () => {
    const conta = new Conta();

    expect(() => conta.criarChavePix("roxanie.com", "EMAIL")).toThrow("Erro: email Inválido");
    conta.destruir()
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("(11)917383003", "TELEFONE");

    expect(operacao).toBe("Chave Pix TELEFONE criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("(11)917383003");
    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com telefone invalido", () => {
    const conta = new Conta();
    const operacao = () => conta.criarChavePix("9383003", "TELEFONE")
    expect(operacao).toThrow("Erro: telefone Inválido");
    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix Inexistente", () => {
    const conta = new Conta();

    expect(conta.criarChavePix("inexistente", "INEXISTENTE")).toBe("Chave inexistente");
    conta.destruir()
  });


  test("retorna sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    const operacao = contaEmissor.transferir(100, "0001", "78945");

    expect(operacao).toBe("Transferência realizada");
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruir()
    contaReceptor.destruir()
  });

  test ("retorna sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados válidos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    contaReceptor.criarChavePix("roxanie@email.com.br", "EMAIL")

    const operacao = contaEmissor.transferirPix(100, "roxanie@email.com.br", "email")

    expect(operacao).toBe("Transferência realizada");
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);
  })
});
