const ContaStandard = require("./ContaStandard")
const Conta = require("../Conta/Conta")

describe("Testes da classe conta Standard", () => {

  //criar objeto
  test("verfiicar se instância foi criada corretamente", () => {
    const contaStandard = new ContaStandard();
    expect(contaStandard instanceof ContaStandard).toBe(true)
  })

  test("instancia conta standard com valores válidos", () => {
    const contaStandard = new ContaStandard("2222", "55555", 2000, 4000);
    expect(contaStandard.getAgencia()).toBe("2222");
    expect(contaStandard.getConta()).toBe("55555");
    expect(contaStandard.getSaldo()).toBe(2000)
    expect(contaStandard.renda).toBe(4000)
  })

  test("retorna mensagem de erro ao tentar criar contaStandard com dados invalidos", () => {
    const contaStandard = new ContaStandard();
    expect(() => contaStandard.criarConta("265444", "51", 4000, 6000)).toThrow(
      "Dados inválidos para cadastro"
    );
  })

  test("retorna sucesso ao sacar 100 da conta Standard", () => {
    const contaStandard = new ContaStandard();
    contaStandard.criarConta("2222", "55555", 2000);

    contaStandard.sacar(100);
    expect(contaStandard.getSaldo()).toBe(1900);

    contaStandard.destruir()
  });

  //teste saque
  test("retorna mensagem de erro ao sacar -100 reais da contaStandard", () => {
    const contaStandard = new ContaStandard();
    contaStandard.criarConta("2222", "55555", 2000);

    expect(() => contaStandard.sacar(-100)).toThrow("Valor inválido para saque");
    expect(contaStandard.getSaldo()).toBe(2000);

    contaStandard.destruir()
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta Standard", () => {
    const contaStandard = new ContaStandard();
    contaStandard.criarConta("2222", "5555", 100);

    expect(() => contaStandard.sacar(110)).toThrow("Saldo insuficiente");
    expect(contaStandard.getSaldo()).toBe(100);

    contaStandard.destruir()
  });

  test("retorna sucesso ao depositar 100 reais da conta Standard", () => {
    const contaStandard = new ContaStandard();
    contaStandard.criarConta("2222", "55555", 2000);

    contaStandard.depositar(100);
    expect(contaStandard.getSaldo()).toBe(2100);

    contaStandard.destruir()
  });


  //teste deposito
  test("retorna mensagem de erro ao depositar -100 reais da contaStandard", () => {
    const contaStandard = new ContaStandard();
    contaStandard.criarConta("2222", "55555", 2000);

    expect(() => contaStandard.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(contaStandard.getSaldo()).toBe(2000);

    contaStandard.destruir()
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const contaStandard = new ContaStandard();
    contaStandard.criarConta("2222", "55555", 2000);

    expect(() => contaStandard.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(contaStandard.getSaldo()).toBe(2000);

    contaStandard.destruir()

  });


  //teste criar chave pix
  test("criar uma chave pix por cpf com sucesso", () => {
    //setup
    const contaStandard = new ContaStandard();

    //acao
    const operacao = contaStandard.criarChavePix("40814360879", "CPF");

    //verificacao
    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(contaStandard.chavesPix.cpf).toBe("40814360879");

    contaStandard.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    //setup
    const contaStandard = new ContaStandard();

    //verificacao
    expect(() => contaStandard.criarChavePix("124861", "CPF")).toThrow("Erro: CPF inválido");

    contaStandard.destruir()
  });

  test("criar uma chave pix por email com sucesso", () => {
    //setup
    const contaStandard = new ContaStandard();

    //acao
    const operacao = contaStandard.criarChavePix("bia@email.com", "EMAIL");

    //verificacao
    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(contaStandard.chavesPix.email).toBe("bia@email.com");

    contaStandard.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com email invalido", () => {
    //setup
    const contaStandard = new ContaStandard();

    //verificacao
    expect(() => contaStandard.criarChavePix("biaaa@", "EMAIL")).toThrow("Erro: EMAIL inválido");

    contaStandard.destruir()
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    //setup
    const conta = new ContaStandard();

    //acao
    const operacao = contaStandard.criarChavePix("11951639874", "TELEFONE");

    //verificacao
    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(contaStandard.chavesPix.telefone).toBe("11951639874");

    contaStandard.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com telefone invalido", () => {
    //setup
    const contaStandard = new ContaStandard();

    //verificacao
    expect(() => contaStandard.criarChavePix("44555887", "TELEFONE")).toThrow("Erro: TELEFONE inválido");

    contaStandard.destruir()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix inexistente", () => {
    //setup
    const contaStandard = new ContaStandard();

    //verificacao
    expect(() => contaStandard.criarChavePix("Rua Joao", "ENDERECO")).toThrow("Erro: chave pix inexistente");

    contaStandard.destruir()
  });


  //teste transferencia
  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", () => {
    //setup
    const contaStandardEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaStandardEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaStandardEmissor.transferir(100, "0001", "78945")

    //verificacao
    expect(operacao).toBe("Tranferencia realizada")
    expect(contaStandardEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaStandardEmissor.destruir();
    contaReceptor.destruir();

  })

  test("retorna erro se dados da conta forem inválidos", () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(100, "0001", "785")
    expect(() => operacao).toThrow("Conta inválida. Transferência não conluida.")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })

  test("retorna erro se saldo da conta emissora for insuficiente", () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(1500, "0001", "785")

    expect(() => operacao).toThrow("Saldo insuficiente.")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })
  test("retorna erro se valor da transferência for negativo", () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(-200, "0001", "785")

    expect(() => operacao).toThrow("Saldo insuficiente.")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })

  // teste transferencia por pix
  test("retorna sucesso ao fazer uma transferencia por pix com valor válido, saldo suficiente, dados validos", () => {
    //setup
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaReceptor.criarChavePix("novachave@email.com", "EMAIL")

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferirPorPix(100, "novachave@email.com", "EMAIL")

    //verificacao
    expect(operacao).toBe("Tranferencia realizada")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaEmissor.destruir();
    contaReceptor.destruir();

  })

  test("retorna erro ao fazer uma transferência por pix com chave inválida", () => {
    //setup
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaReceptor.criarChavePix("novachave@email.com", "EMAIL")

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferirPorPix(100, "nova@email.com", "EMAIL")

    //verificacao
    expect(() => operacao).toThrow("Chave pix não econtrada. Transferência não conluida.")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })

  test("retorna erro se saldo da conta recepctora for insuficiente", () => {
    //setup
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaReceptor.criarChavePix("novachave@email.com", "EMAIL")

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferirPorPix(150, "nova@email.com", "EMAIL")

    //verificacao
    expect(() => operacao).toThrow("Saldo insuficiente. Transferência não conluida.")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })

  test("retorna erro se valor da transferência for negativo", () => {
    //setup
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaReceptor.criarChavePix("novachave@email.com", "EMAIL")

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferirPorPix(-200, "nova@email.com", "EMAIL")

    //verificacao
    expect(() => operacao).toThrow("Valor inválido. Transferência não conluida.")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })


  //teste limite diario de transação 
  test("retorna mensagem de erro ao atingir valor máximo de transação", () => {
    const contaStandard = new ContaStandard();
    contaStandard.criarConta("2222", "5555", 2000);

    expect(() => contaStandard.sacar(1010)).toThrow("Não foi possível realizar saque. Limite de transação diário é de R$1.000,00 reais");
    expect(contaStandard.getSaldo()).toBe(2000);

    expect(() => contaStandard.depositar(1010)).toThrow("Não foi possível realizar depósito. Limite de transação diário é de R$1.000,00 reais");
    expect(contaStandard.getSaldo()).toBe(2000);

    expect(() => contaStandard.transferir(1010)).toThrow("Não foi possível realizar transferência. Limite de transação diário é de R$1.000,00 reais");
    expect(contaStandard.getSaldo()).toBe(2000);

    expect(() => contaStandard.transferirPorPix(1010)).toThrow("Não foi possível realizar transferência por pix. Limite de transação diário é de R$1.000,00 reais");
    expect(contaStandard.getSaldo()).toBe(2000);

    contaStandard.destruir()
  });


})