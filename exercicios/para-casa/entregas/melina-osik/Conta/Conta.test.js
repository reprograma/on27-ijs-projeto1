const Conta = require("./Conta");

describe("Testes da Classe Conta", () => {
  test("verificar se instancia foi criada corretamente", () => {
    const conta = new Conta();
    expect(conta instanceof Conta).toBe(true);

    conta.destruir()
});

  test("instanciar conta com valores validos", () => {
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    
    conta.destruir()
});

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta();
    expect(conta.criarConta("1234", "12345", 1000)).toBe("Conta criada com sucesso");
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir()
});

  test("retorna mensagem de erro ao tentar criar conta com dados invalidos", () => {
    const conta = new Conta();
    expect(() => conta.criarConta("123454", "123", 1000)).toThrow("Dados inválidos para cadastro");

    conta.destruir()
});

  test("retorna sucesso ao sacar 100 da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);
    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);

    conta.destruir()
});

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);
    expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir()
});

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 100);
    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);

    conta.destruir()
});

  test("retorna sucesso ao depositar 100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);
    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);

    conta.destruir()
});

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);
    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir()
});

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);
    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir()

});

  test("criar uma chave pix por cpf com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("40814360879", "CPF");
    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40814360879");

    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    const conta = new Conta();
    expect(() => conta.criarChavePix("124861", "CPF")).toThrow("Erro: CPF inválido");

    conta.destruir()
});

  test("criar uma chave pix por email com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("analu@email.com", "EMAIL");
    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("analu@email.com");

    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com email invalido", () => {
    const conta = new Conta();
    expect(() => conta.criarChavePix("analu@email", "EMAIL")).toThrow("Erro: Email inválido");

    conta.destruir()
});

  test("criar uma chave pix por telefone com sucesso", () => {
    const conta = new Conta();
    const operacao = conta.criarChavePix("11951639874", "TELEFONE");
    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("11951639874");

    conta.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com telefone invalido", () => {
    const conta = new Conta();
    expect(() => conta.criarChavePix("1639874", "TELEFONE")).toThrow("Erro: Telefone inválido");

    conta.destruir()
});

test("retornar mensagem de erro ao tentar cadastrar chave pix inexistente", () => {
  const conta = new Conta();
  expect(conta.criarChavePix("inexistente", "INEXISTENTE")).toBe("Chave inexistente");
  
  conta.destruir()
});

  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    const operacao = contaEmissor.transferir(100, "0001", "78945")

    expect(operacao).toBe("Tranferência realizada")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferencia com valor inválido", ()=>{
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    expect(() => contaEmissor.transferir(-100, "0001", "78945").toThrow("Valor inválido para transferência"))
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferencia com saldo insuficiente", ()=>{
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    expect(() => contaEmissor.transferir(2000, "0001", "78945").toThrow("Saldo insuficiente para transferência"))
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferencia com dados inválidos", ()=>{
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    expect(() => contaEmissor.transferir(100, "001", "789").toThrow("Conta não encontrada"))
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna sucesso ao fazer um pix com valor válido, saldo suficiente, dados validos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
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
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)
    contaReceptor.criarChavePix("email@email.com", "EMAIL")

    expect(() => contaEmissor.pix(-10, "email@email.com", "email")).toThrow("Valor inválido para realizar pix")
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer um pix com saldo insuficiente", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)
    contaReceptor.criarChavePix("email@email.com", "EMAIL")

    expect(() => contaEmissor.pix(2000, "email@email.com", "email")).toThrow("Saldo insuficiente para realizar pix")
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer um pix com dados inválidos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)
    contaReceptor.criarChavePix("email@email.com", "EMAIL")

    expect(() => contaEmissor.pix(2000, "email@email", "email")).toThrow("Conta não encontrada")
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(500)

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
