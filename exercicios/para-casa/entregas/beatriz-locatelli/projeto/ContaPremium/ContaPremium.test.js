const ContaPremium = require("./ContaPremium")
const Conta = require("../Conta/Conta")

describe("Testes da classe conta Premium", () => {

  //teste criação de objeto
  test("verfiicar se instância foi criada corretamente", () => {
    const contaPremium = new ContaPremium();
    expect(contaPremium instanceof ContaPremium).toBe(true)
  })

  test("instancia conta Premium com valores válidos", () => {
    const contaPremium = new ContaPremium("2222", "55555", 2000, 20000);
    expect(contaPremium.getAgencia()).toBe("2222");
    expect(contaPremium.getConta()).toBe("55555");
    expect(contaPremium.getSaldo()).toBe(2000)
    expect(contaPremium.renda).toBe(20000)
  })

  test("retorna mensagem de erro ao tentar criar contaPremium com dados invalidos", () => {
    const contaPremium = new ContaPremium();
    expect(() => contaPremium.criarConta("265444", "51", 4000, 6000)).toThrow(
      "Dados inválidos para cadastro"
    );
  })


  //teste saque
  test("retorna sucesso ao sacar 100 da conta Premium", () => {
    const contaPremium = new ContaPremium();
    contaPremium.criarConta("2222", "55555", 2000);

    contaPremium.sacar(100);
    expect(contaPremium.getSaldo()).toBe(1900);

    contaPremium.destruirConta()
  });

  test("retorna mensagem de erro ao sacar -100 reais da contaPremium", () => {
    const contaPremium = new ContaPremium();
    contaPremium.criarConta("2222", "55555", 2000);

    expect(() => contaPremium.sacar(-100)).toThrow("Valor inválido para saque");
    expect(contaPremium.getSaldo()).toBe(2000);

    contaPremium.destruirConta()
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta Premium", () => {
    const contaPremium = new ContaPremium();
    contaPremium.criarConta("2222", "5555", 100);

    expect(() => contaPremium.sacar(110)).toThrow("Saldo insuficiente");
    expect(contaPremium.getSaldo()).toBe(100);

    contaPremium.destruirConta()
  });


  //teste deposito
  test("retorna sucesso ao depositar 100 reais da conta Premium", () => {
    const contaPremium = new ContaPremium();
    contaPremium.criarConta("2222", "55555", 2000);

    contaPremium.depositar(100);
    expect(contaPremium.getSaldo()).toBe(2100);

    contaPremium.destruirConta()
  });

  test("retorna mensagem de erro ao depositar -100 reais da contaPremium", () => {
    const contaPremium = new ContaPremium();
    contaPremium.criarConta("2222", "55555", 2000);

    expect(() => contaPremium.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(contaPremium.getSaldo()).toBe(2000);

    contaPremium.destruirConta()
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const contaPremium = new ContaPremium();
    contaPremium.criarConta("2222", "55555", 2000);

    expect(() => contaPremium.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(contaPremium.getSaldo()).toBe(2000);

    contaPremium.destruirConta()

  });

  //teste criar chave pix
  test("criar uma chave pix por cpf com sucesso", () => {
    //setup
    const contaPremium = new ContaPremium();

    //acao
    const operacao = contaPremium.criarChavePix("40814360879", "CPF");

    //verificacao
    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(contaPremium.chavesPix.cpf).toBe("40814360879");

    // remover contaPremium da lista de contaPremiums
    contaPremium.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    //setup
    const contaPremium = new ContaPremium();

    //verificacao
    expect(() => contaPremium.criarChavePix("124861", "CPF")).toThrow("Erro: CPF inválido");

    // remover contaPremium da lista de contaPremiums
    contaPremium.destruirConta()
  });

  test("criar uma chave pix por email com sucesso", () => {
    //setup
    const contaPremium = new ContaPremium();

    //acao
    const operacao = contaPremium.criarChavePix("bia@email.com", "EMAIL");

    //verificacao
    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(contaPremium.chavesPix.email).toBe("bia@email.com");

    // remover contaPremium da lista de contaPremiums
    contaPremium.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com email invalido", () => {
    //setup
    const contaPremium = new ContaPremium();

    //verificacao
    expect(() => contaPremium.criarChavePix("biaaa@", "EMAIL")).toThrow("Erro: EMAIL inválido");

    // remover contaPremium da lista de contaPremiums
    contaPremium.destruirConta()
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    //setup
    const contaPremium = new ContaPremium();

    //acao
    const operacao = contaPremium.criarChavePix("11951639874", "TELEFONE");

    //verificacao
    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(contaPremium.chavesPix.telefone).toBe("11951639874");

    // remover contaPremium da lista de contaPremiums
    contaPremium.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com telefone invalido", () => {
    //setup
    const contaPremium = new ContaPremium();

    //verificacao
    expect(() => contaPremium.criarChavePix("44555887", "TELEFONE")).toThrow("Erro: TELEFONE inválido");

    // remover contaPremium da lista de contaPremiums
    contaPremium.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix inexistente", () => {
    //setup
    const contaPremium = new ContaPremium();

    //verificacao
    expect(() => contaPremium.criarChavePix("Rua Joao", "ENDERECO")).toThrow("Erro: chave pix inexistente");

    // remover contaPremium da lista de contaPremiums
    contaPremium.destruirConta()
  });


  //teste transferencia
  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", () => {
    //setup
    const contaPremiumEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();

    contaPremiumEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaPremiumEmissor.transferir(100, "0001", "78945")

    //verificacao
    expect(operacao).toBe("Tranferencia realizada")
    expect(contaPremiumEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaPremiumEmissor.destruirConta();
    contaReceptor.destruirConta();

  })

  test("retorna erro se dados da conta forem inválidos", () => {
    const contaEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(100, "0001", "785")
    expect(() => operacao).toThrow("Conta inválida. Transferência não conluida.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })

  test("retorna erro se saldo da conta emissora for insuficiente", () => {
    const contaEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(1500, "0001", "785")

    expect(() => operacao).toThrow("Saldo insuficiente.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })
  test("retorna erro se valor da transferência for negativo", () => {
    const contaEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(-200, "0001", "785")

    expect(() => operacao).toThrow("Saldo insuficiente.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })

  // teste transferencia por pix
  test("retorna sucesso ao fazer uma transferencia por pix com valor válido, saldo suficiente, dados validos", () => {
    //setup
    const contaEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();

    contaReceptor.criarChavePix("novachave@email.com", "EMAIL")

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferirPorPix(100, "novachave@email.com", "EMAIL")

    //verificacao
    expect(operacao).toBe("Tranferencia realizada")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();

  })

  test("retorna erro ao fazer uma transferência por pix com chave inválida", () => {
    //setup
    const contaEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();

    contaReceptor.criarChavePix("novachave@email.com", "EMAIL")

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferirPorPix(100, "nova@email.com", "EMAIL")

    //verificacao
    expect(() => operacao).toThrow("Chave pix não econtrada. Transferência não conluida.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })

  test("retorna erro se saldo da conta recepctora for insuficiente", () => {
    //setup
    const contaEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();

    contaReceptor.criarChavePix("novachave@email.com", "EMAIL")

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferirPorPix(150, "nova@email.com", "EMAIL")

    //verificacao
    expect(() => operacao).toThrow("Saldo insuficiente. Transferência não conluida.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })

  test("retorna erro se valor da transferência for negativo", () => {
    //setup
    const contaEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();

    contaReceptor.criarChavePix("novachave@email.com", "EMAIL")

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferirPorPix(-200, "nova@email.com", "EMAIL")

    //verificacao
    expect(() => operacao).toThrow("Valor inválido. Transferência não conluida.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })

})