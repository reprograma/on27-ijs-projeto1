const ContaStandard = require("./ContaStandard");
const Cliente = require("../Cliente/Cliente");

describe("Testes da Classe ContaStandard", () => {
    test("verificar se instancia foi criada corretamente", () => {
    const conta = new ContaStandard();
    expect(conta instanceof ContaStandard).toBe(true);
    
    // remover conta da lista de contas
    conta.destruir()
    });

    test("criar conta de com dados válidos e renda compatível", () =>{
        //setup
        const cliente = new Cliente()
        const contaStandard = new ContaStandard()
        //ação
        
        cliente.registrar('Ana','12345678900', 2000, contaStandard)
        
        //verificação
        expect(contaStandard.criarConta("1234", "12345", 500, 2000)).toBe("Conta Standard criada com sucesso")

        // remover conta da lista de contas

        contaStandard.destruir()
    })

    test("retorna erro ao criar conta de com dados válidos e renda incompatível", () =>{
      //setup
      const cliente = new Cliente()
      const contaStandard = new ContaStandard()
      //ação
      
      
      cliente.registrar('Ana','12345678900', 5000, contaStandard)
      
      //verificação
      expect(() => contaStandard.criarConta("1234", "12345", 500, 5000)).toThrow("Renda não compatível.")

      // remover conta da lista de contas
      contaStandard.destruir()
  })

  test("retorna erro ao criar ContaStandard com dados inválidos", () =>{
      //setup
      const cliente = new Cliente()
      const contaStandard = new ContaStandard()
      //ação
      
      cliente.registrar('Ana','12345678900', 5000, contaStandard)
      
      //verificação
      expect(() => contaStandard.criarConta("12345", "12345", 500, 4000)).toThrow("Dados inválidos para cadastro")

      // remover conta da lista de contas
      contaStandard.destruir()
      
  })
  
  test("retorna sucesso ao sacar 100 da conta", () => {
      const conta = new ContaStandard();
      conta.criarConta("1234", "12345", 1000, 4000);
  
      conta.sacar(100);
      expect(conta.getSaldo()).toBe(900);
      
      // remover conta da lista de contas
      conta.destruir()
  });
  
    test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
      const conta = new ContaStandard();
      conta.criarConta("1234", "12345", 1000, 4000);
  
      expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
      expect(conta.getSaldo()).toBe(1000);
      
      // remover conta da lista de contas
      conta.destruir()
  });
  
    test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
      const conta = new ContaStandard();
      conta.criarConta("1234", "12345", 100, 1000);
  
      expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
      expect(conta.getSaldo()).toBe(100);
      
      // remover conta da lista de contas
      conta.destruir()
  });
  
    test("retorna sucesso ao depositar 100 reais da conta", () => {
      const conta = new ContaStandard();
      conta.criarConta("1234", "12345", 1000, 1000);
  
      conta.depositar(100);
      expect(conta.getSaldo()).toBe(1100);
      
      // remover conta da lista de contas
      conta.destruir()
  });
  
    test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
      const conta = new ContaStandard();
      conta.criarConta("1234", "12345", 1000, 3000);
  
      expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
      expect(conta.getSaldo()).toBe(1000);
      
      // remover conta da lista de contas
      conta.destruir()
  });
  
    test("retorna mensagem de erro ao depositar valor não numerico", () => {
      const conta = new ContaStandard();
      conta.criarConta("1234", "12345", 1000, 4000);
  
      expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
      expect(conta.getSaldo()).toBe(1000);
  
      // remover conta da lista de contas
      conta.destruir()
  
  });
});