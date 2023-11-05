const ContaStandard = require("./ContaStandard");
const Conta = require("../Conta/Conta");

///TESTES SACAR
    test("retorna sucesso ao sacar 100 da conta", () => {
        const conta = new ContaStandard();
        conta.criarConta("1234", "12345", 1000, 3500);
        conta.sacar(100);
        expect(conta.getSaldo()).toBe(900);
        conta.destruir()
    });
    
      test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
        const conta = new ContaStandard();
        conta.criarConta("1234", "12345", 1000, 3500);
        expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
        expect(conta.getSaldo()).toBe(1000);
        conta.destruir()
    });
    
      test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
        const conta = new ContaStandard();
        conta.criarConta("1234", "12345", 100, 3500)
        expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
        expect(conta.getSaldo()).toBe(100);
        conta.destruir()
    });


    //TESTE DEPOSITAR
    test("retorna sucesso ao depositar 100 reais da conta", () => {
      const conta = new ContaStandard();
      conta.criarConta("1234", "12345", 1000, 2500);
      conta.depositar(100);
      expect(conta.getSaldo()).toBe(1100);
      conta.destruir()
  });
  
    test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
      const conta = new ContaStandard();
      conta.criarConta("1234", "12345", 1000, 2500);
      expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
      expect(conta.getSaldo()).toBe(1000);
      conta.destruir()
  });
  
    test("retorna mensagem de erro ao depositar valor não numerico", () => {
      const conta = new ContaStandard();
      conta.criarConta("1234", "12345", 1000, 2500);
      expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
      expect(conta.getSaldo()).toBe(1000);
      conta.destruir()
  });

  // TESTES TRANSFERENCIA 

  test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos e limite transacional diario correto", ()=>{
    //setup
    const contaEmissor = new ContaStandard();
    const contaReceptor = new Conta();
    contaEmissor.criarConta("0001", "12345", 1000, 2500 )
    contaReceptor.criarConta("0001", "78945", 500, 3500)
    //acao
    const operacao = contaEmissor.transferirStandard(100, "0001", "78945")
    //verificacao
    expect(operacao).toBe("Transferencia realizada")
    expect(contaEmissor.getSaldo()).toBe(900)
    expect(contaReceptor.getSaldo()).toBe(600)
    contaEmissor.destruir();
    contaReceptor.destruir();

 })

 test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos e limite transacional diario invalido", ()=>{
  //setup
  const contaEmissor = new ContaStandard();
  const contaReceptor = new Conta();
  contaEmissor.criarConta("0001", "12345", 2000, 2500 )
  contaReceptor.criarConta("0001", "78945", 500, 3500)
  //acao
  const operacao = contaEmissor.transferirStandard(1100, "0001", "78945")
  //verificacao
  expect(operacao).toBe("O valor excede o limite de transacao diario")
  contaEmissor.destruir();
  contaReceptor.destruir();

})

 // VERIFICAR SE INSTANCIA CONTA E FEITA CORRETAMENTE
 test("verificar se instancia foi criada corretamente", () => {
  const conta = new ContaStandard();
  expect(conta instanceof ContaStandard).toBe(true);
  conta.destruir()
});


//CRIAR CONTA COM DADOS VALIDOS E RENDA COMPATIVEL
test("criar conta com dados validos e renda compativel", () => {
  const conta = new ContaStandard();
  expect(conta.criarConta("1234", "12345", 1000, 3500)).toBe("Conta criada com sucesso");
  conta.destruir()
});


//RETORNA ERRO AO CRIAR CONTA COM DADOS VALIDOS E RENDA INCOMPATIVEL
test("criar conta com dados validos e renda compativel", () => {
  const conta = new ContaStandard();
  expect(conta.criarConta("1234", "12345", 1000, 5500)).toBe("Conta Standard nao pode ser criada!");
  conta.destruir()
});


//RETORNA ERRO AO CRIAR CONTA COM DADOS INVALIDOS
test("retorna mensagem de erro ao tentar criar conta com dados invalido", () => {
  const conta = new ContaStandard();
  expect(() => conta.criarConta("123454", "123", 1000, 2500)).toThrow("Dados inválidos para cadastro");
  conta.destruir()
});
