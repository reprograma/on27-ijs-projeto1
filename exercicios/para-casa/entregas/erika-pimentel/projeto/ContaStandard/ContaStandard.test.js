const ContaStandard = require("./ContaStandard");

describe("Testes da Classe ContaStandard", () => {
    test("verificar se instancia foi criada corretamente", () => {
      const contaStandard = new ContaStandard();
      expect(contaStandard instanceof ContaStandard).toBe(true);
      
      contaStandard.destruir()
  });


  test("instanciar conta standard com dados válidos e renda compatível", () => {
    const contaStandard = new ContaStandard("1234", "12345", 500, 3000);
    expect(contaStandard.getAgencia()).toBe("1234");
    expect(contaStandard.getConta()).toBe("12345");
    expect(contaStandard.getSaldo()).toBe(500);
    expect(contaStandard.criarConta("1234", "12345", 500, 3000)).toBe(
        "Conta Standard criada com sucesso"
      );    
    contaStandard.destruir()
});


test("retornar erro ao criar conta de com dados válidos e renda incompatível", () => {
    const contaStandard = new ContaStandard();
    expect(() => contaStandard.criarConta("1234", "12345", 500, 5000)).toThrow("Renda incompatível com a Conta Standard");
    
    contaStandard.destruir()
});


test("retorna sucesso ao sacar 100 da conta standard", () => {
    const contaStandard = new ContaStandard("1234", "12345", 500, 3000);

    contaStandard.sacar(100);
    expect(contaStandard.getSaldo()).toBe(400);
    
    contaStandard.destruir()
});


test("retorna sucesso ao sacar -100 da conta standard", () => {
    const contaStandard = new ContaStandard("1234", "12345", 500, 3000);

    expect(() => contaStandard.sacar(-100)).toThrow("Valor inválido para saque");
    
    contaStandard.destruir()
});


test("retorna mensagem de erro ao sacar valor maior que o saldo da conta standard", () => {
    const contaStandard = new ContaStandard("1234", "12345", 500, 3000);

    expect(() => contaStandard.sacar(550)).toThrow("Saldo insuficiente");
    
    contaStandard.destruir()
});


test("retorna sucesso ao depositar 100 reais da conta standard", () => {
    const contaStandard = new ContaStandard("1234", "12345", 500, 3000);

    contaStandard.depositar(100);
    expect(contaStandard.getSaldo()).toBe(600);
    
    contaStandard.destruir()
});


test("retorna mensagem de erro ao depositar -100 reais da conta standard" , () => {
    const contaStandard = new ContaStandard("1234", "12345", 500, 3000);

    expect(() => contaStandard.depositar(-100)).toThrow("Valor inválido para depósito");
    
    contaStandard.destruir()
});


test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const contaStandard = new ContaStandard("1234", "12345", 500, 3000);

    expect(() => contaStandard.depositar(" ")).toThrow("Valor inválido para depósito");

    contaStandard.destruir()
});


test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
    const contaEmissor = new ContaStandard("1234", "12345", 500, 3000);
    const contaReceptor = new ContaStandard("4321", "54321", 1000, 2000);

    const operacao = contaEmissor.transferir(100, "4321", "54321")

    expect(operacao).toBe("Transferência realizada com sucesso")
    expect(contaEmissor.getSaldo()).toBe(400)
    expect(contaReceptor.getSaldo()).toBe(1100)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })


  test("retorna erro ao fazer uma transferencia com limite excedido", ()=>{
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();
    contaEmissor.criarConta("1234", "12345", 500, 3000);
    contaReceptor.criarConta("4321", "54321", 1000, 2000);

    expect(() => contaEmissor.transferir(2000, "4321", "54321")).toThrow("Limite diário de transferência atingido")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })  


  test("retorna sucesso ao fazer uma transferencia pix com valor válido, saldo suficiente, dados validos", ()=>{
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("1234", "12345", 500, 3000);
    contaReceptor.criarConta("4321", "54321", 1000, 2000);
    contaReceptor.criarChavePix("04212793384", "CPF")

    const operacao = contaEmissor.pix(100, "04212793384", "cpf")

    expect(operacao).toBe("Transferência Pix realizada com sucesso")
    expect(contaEmissor.getSaldo()).toBe(400)
    expect(contaReceptor.getSaldo()).toBe(1100)

    contaEmissor.destruir();
    contaReceptor.destruir();
  })


  test("retorna erro ao fazer uma transferencia pix com limite excedido", ()=>{
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();

    contaEmissor.criarConta("1234", "12345", 500, 3000);
    contaReceptor.criarConta("4321", "54321", 1000, 2000);
    contaReceptor.criarChavePix("04212793384", "CPF")

    expect(() => contaEmissor.pix(2000, "4321", "54321")).toThrow("Limite diário de transferência Pix atingido")

    contaEmissor.destruir();
    contaReceptor.destruir();
  })  

});