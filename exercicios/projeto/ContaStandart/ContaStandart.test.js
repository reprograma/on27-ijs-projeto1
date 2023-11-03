// Standard
// são pessoas com até R$4999,99 de renda mensal.
// tem limite de transação de 1000 reais por dia.

const ContaStandart = require("./ContaStandart");

describe("Teste da classe ContaStandart", () => {
  test("Verificar se a instância ContaStandart está sendo criada", () => {
    const conta = new ContaStandart();
    expect(conta instanceof ContaStandart).toBe(true);
    conta.destruir();
  });

  test("Instanciar conta standart com valores válidos", () => {
    const conta = new ContaStandart("1234", "12345", 1000, 3000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna mensagem de sucesso ao criar conta standart", () => {
    const conta = new ContaStandart();

    expect(conta.criarConta("1234", "12345", 1000, 3000)).toBe("Conta criada com sucesso");
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna mensagem de ERRO ao criar conta Standat", () => {
    const conta = new ContaStandart();
    const operacao = () => conta.criarConta("1234", "345", 1000, 3000)

    expect(operacao).toThrow("Erro no cadastro, dados inválidos");
    conta.destruir()
  });

  test("retorna mensagem de ERRO ao tentar criar conta Standart com renda incompatível", () => {
    const conta = new ContaStandart();
    const operacao = () => conta.criarConta("1111", "12345", 1000, 6000)

    expect(operacao).toThrow("Renda não compatível com Conta Standart")
    conta.destruir()
  })

  test("retorna sucesso ao sacar 100 da conta standart", () => {
    const conta = new ContaStandart();
    conta.criarConta("1234", "12345", 1000, 3000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);
    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar -100 da conta standart", () => {
    const conta = new ContaStandart();
    conta.criarConta("1234", "12345", 1000, 3000);

    expect(() => conta.sacar(-100)).toThrow("valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna mensagem de sucesso ao depositar 100 na conta", () => {
    const conta = new ContaStandart()
    conta.criarConta("1234", "12345", 1000, 3000)
    
    conta.depositar(100)
    expect(conta.getSaldo()).toBe(1100)
    conta.destruir()
  })

  test("retona mensagem de erro ao depositar -100 da conta", () => {
    const conta = new ContaStandart()
    conta.criarConta("1234", "12345", 1000, 3000)

    expect(() => conta.depositar(-100)).toThrow("valor inválido para depósito")
    expect(conta.getSaldo()).toBe(1000)
    conta.destruir()
  })

  test("retorna mensagem de erro ao depositar valor não numérico da conta", () => {
    const conta = new ContaStandart();
    conta.criarConta("1234", "12345", 1000, 3000);

    expect(() => conta.depositar(" ")).toThrow("valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir()
  });

  test("retorna sucesso ao fazer uma transferência com valor válido, saldo sufuciente, dados válidos", () => {
    const contaEmissor = new ContaStandart()
    const contaReceptor = new ContaStandart()

    contaEmissor.criarConta("1234", "12245", 3000, 4500)
    contaReceptor.criarConta("7894", "45678", 1000, 2500)

    const operacao = contaEmissor.transferir(200,"7894", "45678")

    expect(operacao).toBe("Transferência realizada")
    expect(contaEmissor.getSaldo()).toBe(2800)
    expect(contaReceptor.getSaldo()).toBe(1200)

    contaEmissor.destruir()
    contaReceptor.destruir()
  })

  test("retorna mensagem de erro ao tentar fazer uma transferência acima do limite diário", () => {
    const contaEmissor = new ContaStandart()
    const contaReceptor = new ContaStandart()

    contaEmissor.criarConta("1234", "12245", 3000, 4500)
    contaReceptor.criarConta("7894", "45678", 1000, 2500)


    expect(() => contaEmissor.transferir(2500,"7894", "45678")).toThrow("Valor de transferência acima do limite diário")
    expect(contaEmissor.getSaldo()).toBe(3000)
    expect(contaReceptor.getSaldo()).toBe(1000)

    contaEmissor.destruir()
    contaReceptor.destruir()
  })


});
