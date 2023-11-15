const ContaGold = require("./ContaGold");

describe("Testes da Classe Conta", () => {
    test("verificar se instancia foi criada corretamente", () => {
      const conta = new ContaGold();
      expect(conta instanceof ContaGold).toBe(true);
  
      conta.destruir()
    });
  
    test("instanciar conta com valores validos", () => {
  
      const conta = new ContaGold("1234", "12345", 1000);
      expect(conta.getAgencia()).toBe("1234");
      expect(conta.getConta()).toBe("12345");
      expect(conta.getSaldo()).toBe(1000);
  
      conta.destruir()
    });
  
    test("retorna mensagem de sucesso ao criar conta", () => {
      const conta = new ContaGold();
      expect(conta.criarConta("1234", "12345", 1000, 5000)).toBe(
        "Conta criada com sucesso"
      );
      expect(conta.getAgencia()).toBe("1234");
      expect(conta.getConta()).toBe("12345");
      expect(conta.getSaldo()).toBe(1000);
  
      conta.destruir()
    });
  
    test("retorna mensagem de erro ao tentar criar conta com dados invalido", () => {
      const conta = new ContaGold();
      expect(() => conta.criarConta("123454", "123", 2000)).toThrow(
        "Não é  Conta Gold"
      );
  
      conta.destruir()
    });
  
    test("retorna sucesso ao sacar 100 da conta", () => {
      const conta = new ContaGold();
      conta.criarConta("1234", "12345", 1000, 5000);
  
      conta.sacar(100);
      expect(conta.getSaldo()).toBe(900);
  
      conta.destruir()
    });
  
    test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
      const conta = new ContaGold();
      conta.criarConta("1234", "12345", 1000, 5000);
  
      expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
      expect(conta.getSaldo()).toBe(1000);
  
      conta.destruir()
    });
  
    test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
      const conta = new ContaGold();
      conta.criarConta("1234", "12345", 100, 5000);
  
      expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
      expect(conta.getSaldo()).toBe(100);
  
      conta.destruir()
    });
  
    test("retorna sucesso ao depositar 100 reais da conta", () => {
      const conta = new ContaGold();
      conta.criarConta("1234", "12345", 1000, 5000);
  
      conta.depositar(100);
      expect(conta.getSaldo()).toBe(1100);
  
      conta.destruir()
    });
  
    test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
      const conta = new ContaGold();
      conta.criarConta("1234", "12345", 1000, 5000);
  
      expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
      expect(conta.getSaldo()).toBe(1000);
  
      conta.destruir()
    });
  
    test("retorna mensagem de erro ao depositar valor não numerico", () => {
      const conta = new ContaGold();
      conta.criarConta("1234", "12345", 1000, 5000);
  
      expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
      expect(conta.getSaldo()).toBe(1000);
  
      conta.destruir()
  
    });
  
    test("criar uma chave pix por cpf com sucesso", () => {
      const conta = new ContaGold();
      const operacao = conta.criarChavePix("40814360879", "CPF");
      expect(operacao).toBe("Chave Pix por CPF criada com sucesso");
      expect(conta.chavesPix.cpf).toBe("40814360879");
  
      conta.destruir()
    });
  
    test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
      const conta = new ContaGold();
  
      expect(() => conta.criarChavePix("124861", "CPF")).toThrow("Erro: CPF Inválido");
  
      conta.destruir()
    });
  
    test("criar uma chave pix por email com sucesso", () => {
      const conta = new ContaGold();
  
      const operacao = conta.criarChavePix("helo@gmail.com", "EMAIL");
  
      expect(operacao).toBe("Chave Pix EMAIL criada com sucesso");
      expect(conta.chavesPix.email).toBe("helo@gmail.com");
  
      conta.destruir()
    });
  
    test("criar uma chave pix por telefone com sucesso", () => {
      const conta = new ContaGold();
  
      const operacao = conta.criarChavePix("11951639874", "TELEFONE");
  
      expect(operacao).toBe("Chave Pix TELEFONE criada com sucesso");
      expect(conta.chavesPix.telefone).toBe("11951639874");
  
      conta.destruir()
    });
  
  
  
    test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", () => {
      const contaEmissor = new ContaGold();
      const contaReceptor = new ContaGold();
  
      contaEmissor.criarConta("0001", "12345", 1000, 5000)
      contaReceptor.criarConta("0001", "78945", 500, 6000)
  
      const operacao = contaEmissor.transferir(100, "0001", "78945")
  
      expect(operacao).toBe("Transferência realizada")
      expect(contaEmissor.getSaldo()).toBe(900)
      expect(contaReceptor.getSaldo()).toBe(600)
  
      contaEmissor.destruir();
      contaReceptor.destruir();
  
    })
  
  
   
    test("retorna ERRO ao tentar realizar uma transferência via Pix", () => {
      const contaEmissor = new ContaGold();
      const contaReceptor = new ContaGold();
  
      contaEmissor.criarConta("0001", "12345", 1000, 5000);
      contaReceptor.criarConta("0001", "78945", 500, 6000);
  
      expect(() => contaEmissor.pix(100, "email@email.com", "EMAIL")).toThrow("Chave PIX não encontrada");
      expect(contaEmissor.getSaldo()).toBe(1000);
      expect(contaReceptor.getSaldo()).toBe(500);
  
      contaEmissor.destruir()
      contaReceptor.destruir()
    })
  
    test("retorna erro ao fazer uma transferencia PIX com valor inválido", ()=>{
      const contaEmissor = new ContaGold();
      const contaReceptor = new ContaGold();
    
      contaEmissor.criarConta("0001", "12345", 1000, 5000);
      contaReceptor.criarConta("0001", "78945", 500, 6000);
    
      contaEmissor.criarChavePix("40814360879", "CPF");
    
      expect(() => contaEmissor.transferirPix(-100, "40814360879", "CPF")).toThrow();
    
      contaEmissor.destruir();
        contaReceptor.destruir();
      });
  
      test("retorna erro ao fazer uma transferencia PIX com saldo insuficiente", ()=>{
        const contaEmissor = new ContaGold();
        const contaReceptor = new ContaGold();
      
        contaEmissor.criarConta("0001", "12345", 1000, 5000);
        contaReceptor.criarConta("0001", "78945", 500, 6000);
      
        contaEmissor.criarChavePix("40814360879", "CPF");
      
        expect(() => contaEmissor.transferirPix(1100, "40814360879", "CPF")).toThrow();
      
        contaEmissor.destruir();
          contaReceptor.destruir();
        });
  
        test("retorna erro ao fazer uma transferencia PIX com chave PIX inválida", ()=>{
          const contaEmissor = new ContaGold();
          const contaReceptor = new ContaGold();
        
          contaEmissor.criarConta("0001", "12345", 1000, 5000);
          contaReceptor.criarConta("0001", "78945", 500, 6000);
        
          expect(() => contaEmissor.transferirPix(100, "2345", "xxx")).toThrow();
        
          contaEmissor.destruir();
            contaReceptor.destruir();
          });
      
  
  });
