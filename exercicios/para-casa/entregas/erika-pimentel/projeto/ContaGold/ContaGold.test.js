const ContaGold = require("./ContaGold");

describe("Testes da Classe ContaGold", () => {
    test("verificar se instancia foi criada corretamente", () => {
      const contaGold = new ContaGold();
      expect(contaGold instanceof ContaGold).toBe(true);
      
      contaGold.destruir()
  });


  test("instanciar conta gold com dados válidos e renda compatível", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 7000);
    expect(contaGold.getAgencia()).toBe("1234");
    expect(contaGold.getConta()).toBe("12345");
    expect(contaGold.getSaldo()).toBe(1000);
    expect(contaGold.criarConta("1234", "12345", 1000, 7000)).toBe(
        "Conta Gold criada com sucesso"
      );    
    contaGold.destruir()
});


test("retornar erro ao criar conta de com dados válidos e renda incompatível", () => {
    const contaGold = new ContaGold();
    expect(() => contaGold.criarConta("1234", "12345", 1000, 3000)).toThrow("Renda incompatível com a Conta Gold");
    
    contaGold.destruir()
});


test("retorna sucesso ao sacar 100 da conta gold", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 7000);

    contaGold.sacar(100);
    expect(contaGold.getSaldo()).toBe(900);
    
    contaGold.destruir()
});


test("retorna sucesso ao sacar -100 da conta gold", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 7000);

    expect(() => contaGold.sacar(-100)).toThrow("Valor inválido para saque");
    
    contaGold.destruir()
});


test("retorna mensagem de erro ao sacar valor maior que o saldo da conta gold", () => {
    const contaGold = new ContaGold("1234", "12345", 100, 7000);

    expect(() => contaGold.sacar(150)).toThrow("Saldo insuficiente");
    
    contaGold.destruir()
});


test("retorna sucesso ao depositar 100 reais da conta gold", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 7000);

    contaGold.depositar(100);
    expect(contaGold.getSaldo()).toBe(1100);
    
    contaGold.destruir()
});


test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 7000);

    expect(() => contaGold.depositar(-100)).toThrow("Valor inválido para depósito");
    
    contaGold.destruir()
});


test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const contaGold = new ContaGold("1234", "12345", 1000, 7000);

    expect(() => contaGold.depositar(" ")).toThrow("Valor inválido para depósito");

    contaGold.destruir()
});


test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
    const contaEmissor = new ContaGold("1234", "12345", 1000, 7000);
    const contaReceptor = new ContaGold("4321", "54321", 500, 5000);

    const operacao = contaEmissor.transferir(100, "4321", "54321")

    expect(operacao).toBe("Transferência realizada com sucesso")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })


  test("retorna erro ao fazer uma transferencia com limite excedido", ()=>{
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();
    contaEmissor.criarConta("1234", "12345", 7000, 7000);
    contaReceptor.criarConta("4321", "54321", 5000, 6000);

    expect(() => contaEmissor.transferir(6000, "4321", "54321")).toThrow("Limite diário de transferência atingido")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })  


  test("retorna sucesso ao fazer uma transferencia pix com valor válido, saldo suficiente, dados validos", ()=>{
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("1234", "12345", 1000, 7000);
    contaReceptor.criarConta("4321", "54321", 500, 6000);
    contaReceptor.criarChavePix("04212793384", "CPF")

    const operacao = contaEmissor.pix(100, "04212793384", "cpf")

    expect(operacao).toBe("Transferência Pix realizada com sucesso")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })


  test("retorna erro ao fazer uma transferencia pix com limite excedido", ()=>{
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("1234", "12345", 1000, 7000);
    contaReceptor.criarConta("4321", "54321", 500, 6000);
    contaReceptor.criarChavePix("04212793384", "CPF")

    expect(() => contaEmissor.pix(6000, "4321", "54321")).toThrow("Limite diário de transferência Pix atingido")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })  

});