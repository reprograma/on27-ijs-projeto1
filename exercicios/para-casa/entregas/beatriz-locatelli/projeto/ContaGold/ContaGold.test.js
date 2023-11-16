const ContaGold = require("./ContaGold")
const Conta = require("../Conta/Conta")

describe("Testes da classe conta Gold", () => {

  //teste criar objeto
  test("verfiicar se instância foi criada corretamente", () => {
    const contaGold = new ContaGold();
    expect(contaGold instanceof ContaGold).toBe(true)
  })

  test("instancia conta Gold com valores válidos", () => {
    const contaGold = new ContaGold("2222", "55555", 2000, 10000);
    expect(contaGold.getAgencia()).toBe("2222");
    expect(contaGold.getConta()).toBe("55555");
    expect(contaGold.getSaldo()).toBe(2000)
    expect(contaGold.renda).toBe(10000)
  })

  test("retorna mensagem de erro ao tentar criar contaGold com dados invalidos", () => {
    const contaGold = new ContaGold();
    expect(() => contaGold.criarConta("265444", "51", 4000, 20000)).toThrow(
      "Dados inválidos para cadastro"
    );
  })

  //teste saque
  test("retorna sucesso ao sacar 100 da conta Gold", () => {
    const contaGold = new ContaGold();
    contaGold.criarConta("2222", "55555", 2000);

    contaGold.sacar(100);
    expect(contaGold.getSaldo()).toBe(1900);

    contaGold.destruirConta()
  });

  test("retorna mensagem de erro ao sacar -100 reais da contaGold", () => {
    const contaGold = new ContaGold();
    contaGold.criarConta("2222", "55555", 2000);

    expect(() => contaGold.sacar(-100)).toThrow("Valor inválido para saque");
    expect(contaGold.getSaldo()).toBe(2000);

    contaGold.destruirConta()
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta Gold", () => {
    const contaGold = new ContaGold();
    contaGold.criarConta("2222", "5555", 100);

    expect(() => contaGold.sacar(110)).toThrow("Saldo insuficiente");
    expect(contaGold.getSaldo()).toBe(100);

    contaGold.destruirConta()
  });


  //teste deposito
  test("retorna sucesso ao depositar 100 reais da conta Gold", () => {
    const contaGold = new ContaGold();
    contaGold.criarConta("2222", "55555", 2000);

    contaGold.depositar(100);
    expect(contaGold.getSaldo()).toBe(2100);

    contaGold.destruirConta()
  });

  test("retorna mensagem de erro ao depositar -100 reais da contaGold", () => {
    const contaGold = new ContaGold();
    contaGold.criarConta("2222", "55555", 2000);

    expect(() => contaGold.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(contaGold.getSaldo()).toBe(2000);

    contaGold.destruirConta()
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const contaGold = new ContaGold();
    contaGold.criarConta("2222", "55555", 2000);

    expect(() => contaGold.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(contaGold.getSaldo()).toBe(2000);

    contaGold.destruirConta()

  });


  //teste criar chave pix
  test("criar uma chave pix por cpf com sucesso", () => {
    //setup
    const contaGold = new ContaGold();

    //acao
    const operacao = contaGold.criarChavePix("40814360879", "CPF");

    //verificacao
    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(contaGold.chavesPix.cpf).toBe("40814360879");

    contaGold.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    //setup
    const contaGold = new ContaGold();

    //verificacao
    expect(() => contaGold.criarChavePix("124861", "CPF")).toThrow("Erro: CPF inválido");

    contaGold.destruirConta()
  });

  test("criar uma chave pix por email com sucesso", () => {
    //setup
    const contaGold = new ContaGold();

    //acao
    const operacao = contaGold.criarChavePix("bia@email.com", "EMAIL");

    //verificacao
    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(contaGold.chavesPix.email).toBe("bia@email.com");

    contaGold.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com email invalido", () => {
    //setup
    const contaGold = new ContaGold();

    //verificacao
    expect(() => contaGold.criarChavePix("biaaa@", "EMAIL")).toThrow("Erro: EMAIL inválido");

    contaGold.destruirConta()
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    //setup
    const contaGold = new ContaGold();

    //acao
    const operacao = contaGold.criarChavePix("11951639874", "TELEFONE");

    //verificacao
    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(contaGold.chavesPix.telefone).toBe("11951639874");

    contaGold.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com telefone invalido", () => {
    //setup
    const contaGold = new ContaGold();

    //verificacao
    expect(() => contaGold.criarChavePix("44555887", "TELEFONE")).toThrow("Erro: TELEFONE inválido");

    contaGold.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix inexistente", () => {
    //setup
    const contaGold = new ContaGold();

    //verificacao
    expect(() => contaGold.criarChavePix("Rua Joao", "ENDERECO")).toThrow("Erro: chave pix inexistente");

    contaGold.destruirConta()
  });


//teste transferencia
  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", () => {
    //setup
    const contaGoldEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaGoldEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaGoldEmissor.transferir(100, "0001", "78945")

    //verificacao
    expect(operacao).toBe("Tranferencia realizada")
    expect(contaGoldEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaGoldEmissor.destruirConta();
    contaReceptor.destruirConta();

  })

  test("retorna erro se dados da conta forem inválidos", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(100, "0001", "785")
    expect(() => operacao).toThrow("Conta inválida. Transferência não conluida.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })

  test("retorna erro se saldo da conta emissora for insuficiente", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(1500, "0001", "785")

    expect(() => operacao).toThrow("Saldo insuficiente.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })
  test("retorna erro se valor da transferência for negativo", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

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
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

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
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

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
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

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
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

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

  //teste limite diario para transacao
  test("retorna mensagem de erro ao atingir valor máximo de transação", () => {
    const contaGold = new ContaGold();
    contaGold.criarConta("2222", "5555", 2000, 10000);

    expect(() => contaGold.sacar(5010)).toThrow("Não foi possível realizar saque. Limite de transação diário é de R$5.000,00 reais");
    expect(contaGold.getSaldo()).toBe(10000);

    expect(() => contaGold.depositar(5010)).toThrow("Não foi possível realizar depósito. Limite de transação diário é de R$5.000,00 reais");
    expect(contaGold.getSaldo()).toBe(10000);

    expect(() => contaGold.transferir(5010)).toThrow("Não foi possível realizar transferência. Limite de transação diário é de R$5.000,00 reais");
    expect(contaGold.getSaldo()).toBe(10000);

    expect(() => contaGold.transferirPorPix(5010)).toThrow("Não foi possível realizar transferência por pix. Limite de transação diário é de R$5.000,00 reais");
    expect(contaGold.getSaldo()).toBe(10000);

    contaGold.destruirConta()
  });
})