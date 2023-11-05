const ContaPremium = require("./ContaPremium");

describe("Testes da Classe ContaPremium", () => {
    test("verificar se instancia foi criada corretamente", () => {
      const contaPremium = new ContaPremium();
      expect(contaPremium instanceof ContaPremium).toBe(true);
      
      contaPremium.destruir()
  });


  test("instanciar conta premium com dados válidos e renda compatível", () => {
    const contaPremium = new ContaPremium();
    contaPremium.criarConta("1234", "12345", 1000, 18000)
    expect(contaPremium.getAgencia()).toBe("1234");
    expect(contaPremium.getConta()).toBe("12345");
    expect(contaPremium.getSaldo()).toBe(1000);
    expect(contaPremium.criarConta("1234", "12345", 1000, 18000)).toBe(
        "Conta Premium criada com sucesso"
      );    
    contaPremium.destruir()
});


test("retornar erro ao criar conta Premium de com dados válidos e renda incompatível", () => {
    const contaPremium = new ContaPremium();
    expect(() => contaPremium.criarConta("1234", "12345", 1000, 10000)).toThrow("Renda incompatível com a Conta Premium");
    
    contaPremium.destruir()
});


test("retorna sucesso ao sacar 100 da conta premium", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 18000);

    contaPremium.sacar(100);
    expect(contaPremium.getSaldo()).toBe(900);
    
    contaPremium.destruir()
});


test("retorna sucesso ao sacar -100 da conta premium", () => {
    const contaPremium = new ContaPremium();

    expect(() => contaPremium.sacar(-100)).toThrow("Valor inválido para saque");
    
    contaPremium.destruir()
});


test("retorna mensagem de erro ao sacar valor maior que o saldo da conta premium", () => {
    const contaPremium = new ContaPremium("1234", "12345", 100, 18000);

    expect(() => contaPremium.sacar(150)).toThrow("Saldo insuficiente");
    
    contaPremium.destruir()
});


test("retorna sucesso ao depositar 100 reais da conta premium", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 18000);

    contaPremium.depositar(100);
    expect(contaPremium.getSaldo()).toBe(1100);
    
    contaPremium.destruir()
});


test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 18000);

    expect(() => contaPremium.depositar(-100)).toThrow("Valor inválido para depósito");
    
    contaPremium.destruir()
});


test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const contaPremium = new ContaPremium("1234", "12345", 1000, 18000);

    expect(() => contaPremium.depositar(" ")).toThrow("Valor inválido para depósito");

    contaPremium.destruir()
});


test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
    const contaEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();
    contaEmissor.criarConta("1234", "12345", 15000, 18000);
    contaReceptor.criarConta("4321", "54321", 10000, 20000);

    const operacao = contaEmissor.transferir(10000, "4321", "54321")

    expect(operacao).toBe("Transferência realizada com sucesso")
    expect(contaEmissor.getSaldo()).toBe(5000)
    expect(contaReceptor.getSaldo()).toBe(20000)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })


  test("retorna erro ao fazer uma transferencia com limite excedido", ()=>{
    const contaEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();
    contaEmissor.criarConta("1234", "12345", 7000, 18000);
    contaReceptor.criarConta("4321", "54321", 5000, 20000);

    expect(() => contaEmissor.transferir(-1000, "4321", "54321")).toThrow("Limite diário de transferência atingido")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })  


  test("retorna sucesso ao fazer uma transferencia pix com valor válido, saldo suficiente, dados validos", ()=>{
    const contaEmissor = new ContaPremium();
    const contaReceptor = new ContaPremium();

    contaEmissor.criarConta("1234", "12345", 15000, 18000);
    contaReceptor.criarConta("4321", "54321", 10000, 20000);
    contaReceptor.criarChavePix("04212793384", "CPF")

    const operacao = contaEmissor.pix(10000, "04212793384", "cpf")

    expect(operacao).toBe("Transferência Pix realizada com sucesso")
    expect(contaEmissor.getSaldo()).toBe(5000)
    expect(contaReceptor.getSaldo()).toBe(20000)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })

});