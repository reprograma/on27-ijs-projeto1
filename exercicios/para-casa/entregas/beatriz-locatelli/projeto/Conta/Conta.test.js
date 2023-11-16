/**
 * ESTRUTURA DOS TESTES
 * setup (o que a minha funcao/metodo/classe que vai ser testada precisa para funcionar?)
 * acao (execusao da funcao testada)
 * verificacao (o que eu espero que seja retornado comparado com o que de fato é retornado)
  
 */
const Conta = require("./Conta");

describe("Testes da Classe Conta", () => {

  //teste criar objeto
  test("verificar se instancia foi criada corretamente", () => {
    const conta = new Conta();
    expect(conta instanceof Conta).toBe(true);

    conta.destruirConta()
  });

  test("instanciar conta com valores validos", () => {
    /**
     * Agencia (4 digitos string) -> privado
     * Conta (5 digitos string)-> privado
     * Saldo (numero positivo) -> privado
     */
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);


    conta.destruirConta()
  });

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta();
    expect(conta.criarConta("1234", "12345", 1000)).toBe(
      "Conta criada com sucesso"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruirConta()
  });

  test("retorna mensagem de erro ao tentar criar conta com dados invalido", () => {
    const conta = new Conta();
    expect(() => conta.criarConta("123454", "123", 1000)).toThrow(
      "Dados inválidos para cadastro"
    );


    conta.destruirConta()
  });

  //teste saque
  test("retorna sucesso ao sacar 100 da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);

    conta.destruirConta()
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido. O valor precisa ser maior que zero e precisa ser um número.");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruirConta()
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 100);

    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);


    conta.destruirConta()
  });

  //teste deposito
  test("retorna sucesso ao depositar 100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);


    conta.destruirConta()
  });

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido. O valor precisa ser maior que zero e precisa ser um número.");
    expect(conta.getSaldo()).toBe(1000);


    conta.destruirConta()
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido. O valor precisa ser maior que zero e precisa ser um número.");
    expect(conta.getSaldo()).toBe(1000);


    conta.destruirConta()

  });

  //teste criar pix
  test("criar uma chave pix por cpf com sucesso", () => {
    //setup
    const conta = new Conta();

    //acao
    const operacao = conta.criarChavePix("40814360879", "CPF");

    //verificacao
    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40814360879");


    conta.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    //setup
    const conta = new Conta();

    //verificacao
    expect(() => conta.criarChavePix("124861", "CPF")).toThrow("Erro: CPF inválido");


    conta.destruirConta()
  });

  test("criar uma chave pix por email com sucesso", () => {
    //setup
    const conta = new Conta();

    //acao
    const operacao = conta.criarChavePix("bia@email.com", "EMAIL");

    //verificacao
    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("bia@email.com");


    conta.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com email invalido", () => {
    //setup
    const conta = new Conta();

    //verificacao
    expect(() => conta.criarChavePix("biaaa@", "EMAIL")).toThrow("Erro: EMAIL inválido");


    conta.destruirConta()
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    //setup
    const conta = new Conta();

    //acao
    const operacao = conta.criarChavePix("11951639874", "TELEFONE");

    //verificacao
    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("11951639874");


    conta.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com telefone invalido", () => {
    //setup
    const conta = new Conta();

    //verificacao
    expect(() => conta.criarChavePix("44555887", "TELEFONE")).toThrow("Erro: telefone inválido");


    conta.destruirConta()
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix inexistente", () => {
    //setup
    const conta = new Conta();

    //verificacao
    expect(() => conta.criarChavePix("Rua Joao", "ENDERECO")).toThrow("Erro: chave pix inexistente");


    conta.destruirConta()
  });

  //teste transferencia
  /**
   * TRANFERENCIA
   * emissor = conta q esta enviando o dinheiro
   * recepto = conta q está recebendo esse dinheiro
   * agencia e conta do receptor
   * metodo vai precisar de valor, agencia do Receptor e conta do Receptor
   * valor valido
   * saldo suficiente
   * dados validos do receptor
   */

  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", () => {
    //setup
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(100, "0001", "78945")

    //verificacao
    expect(operacao).toBe("Tranferencia realizada")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();

  })

  test("retorna erro se dados da conta forem inválidos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(100, "0001", "785")
    expect(() => operacao).toThrow("Conta inválida. Transferência não conluida.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })

  test("retorna erro se saldo da conta emissora for insuficiente", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferir(1500, "0001", "785")

    expect(() => operacao).toThrow("Saldo insuficiente.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })

  test("retorna erro se valor da transferência for negativo", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

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
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

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
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

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
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

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
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaReceptor.criarChavePix("novachave@email.com", "EMAIL")

    contaEmissor.criarConta("0001", "12345", 1000)
    contaReceptor.criarConta("0001", "78945", 500)

    //acao
    const operacao = contaEmissor.transferirPorPix(-200, "nova@email.com", "EMAIL")

    //verificacao
    expect(() => operacao).toThrow("Valor inválido. O valor precisa ser maior que zero e precisa ser um número.")

    contaEmissor.destruirConta();
    contaReceptor.destruirConta();
  })

});
