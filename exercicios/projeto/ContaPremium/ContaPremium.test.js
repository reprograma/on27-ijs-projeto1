const ContaPremium = require('./ContaPremium');

describe("Testes da class ContaPremium", ()=>{
    test("verificar se instancia foi criada corretamente", () => {
        const conta = new ContaPremium();
        expect(conta instanceof ContaPremium).toBe(true);
        
        conta.destruir()
    });

    test("instanciar conta com valores validos", () => {
        const conta = new ContaPremium("1234", "12345", 1000, 20000);
        expect(conta.getAgencia()).toBe("1234");
        expect(conta.getConta()).toBe("12345");
        expect(conta.getSaldo()).toBe(1000);
        
        conta.destruir()
    });

    test("deve retornar mensagem de sucesso ao criar conta", () => {
        const conta = new ContaPremium();
        expect(conta.criarConta("1234", "12345", 1000, 19000)).toBe("Conta criada com sucesso");
        expect(conta.getAgencia()).toBe("1234");
        expect(conta.getConta()).toBe("12345");
        expect(conta.getSaldo()).toBe(1000);
            
        conta.destruir()
    });

    test("deve retornar erro de ao tentar criar uma conta com renda incompatível ao tipo da conta", () => {
        const conta = new ContaPremium();
        expect(()=>conta.criarConta("1234", "12345", 10, 1000)).toThrow("Renda não compatível com Conta Premium");
                
    });

    test("deve retornar sucesso ao depositar 500 da conta", ()=>{
        const conta = new ContaPremium();
        conta.criarConta("1234", "12345", 1000, 18500);
        conta.depositar(500);
        expect(conta.getSaldo()).toBe(1500);

        conta.destruir(conta);
    });

    test("retorna mensagem de erro ao tentar criar conta com dados inválido", () => {
        const conta = new ContaPremium();
        expect(() => conta.criarConta("123454", "123", 5000, 18509)).toThrow("Dados inválidos para cadastro");
            
        conta.destruir()
    });

    test("deve retornar um erro ao deposita -100", ()=>{
        const conta = new ContaPremium();
        conta.criarConta("1234", "12345", 1000, 60000);
        expect(()=>conta.depositar(-100)).toThrow("Valor inválido para depósito");

        conta.destruir(conta);
    });
    
    test("deve retornar sucesso ao sacar 500 da conta", ()=>{
        const conta = new ContaPremium();
        conta.criarConta("1234", "12345", 1000, 60000);
        conta.sacar(500);
        expect(conta.getSaldo()).toBe(500);

        conta.destruir();
    });

    test("deve retornar um erro ao sacar -500", ()=>{
        const conta = new ContaPremium();
        conta.criarConta("1234", "12345", 1000, 61000);
        expect(()=>conta.sacar(-500)).toThrow("Valor inválido para saque");

        conta.destruir();
    });

    test("deve retornar mensagem de sucesso ao criar conta", () => {
        const conta = new ContaPremium();
        expect(conta.criarConta("1234", "12345", 100, 60200)).toBe("Conta criada com sucesso");
        expect(conta.getAgencia()).toBe("1234");
        expect(conta.getConta()).toBe("12345");
        expect(conta.getSaldo()).toBe(100);

        conta.destruir();
    });   

    test("deve retornar uma mensagem de erro ao tentar criar conta com dados inválidos", () => {
        const conta = new ContaPremium();
        expect(()=>conta.criarConta("123", "1235", 100, 60200)).toThrow("Dados inválidos para cadastro");
    });

    test("criar uma chave pix por cpf com sucesso", () => {
        const conta = new ContaPremium();
        const operacao = conta.criarChavePix("40814360879", "CPF");
        expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
        expect(conta.chavesPix.cpf).toBe("40814360879");

        conta.destruir()
      });
    
      test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
        const conta = new ContaPremium();
        expect(() => conta.criarChavePix("124861", "CPF")).toThrow("Erro: CPF inválido");

        conta.destruir()
    });
    
      test("criar uma chave pix por email com sucesso", () => {
        const conta = new ContaPremium();    
        const operacao = conta.criarChavePix("analu@email.com", "EMAIL");
        expect(operacao).toBe("Chave Pix por email criada com sucesso");
        expect(conta.chavesPix.email).toBe("analu@email.com");
        
        conta.destruir()
      });
    
      test("retornar mensagem de erro ao tentar cadastrar chave pix com email invalido", () => {
        const conta = new ContaPremium();    
        expect(() => conta.criarChavePix("analu.com", "EMAIL")).toThrow("Erro: Email inválido");
        
        conta.destruir()
    });
    
      test("criar uma chave pix por telefone com sucesso", () => {
        const conta = new ContaPremium();
        const operacao = conta.criarChavePix("11951639874", "TELEFONE");
        expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
        expect(conta.chavesPix.telefone).toBe("11951639874");

        conta.destruir()
      });
    
      test("retornar mensagem de erro ao tentar cadastrar chave pix com telefone invalido", () => {
        const conta = new ContaPremium();    
        expect(() => conta.criarChavePix("1345", "TELEFONE")).toThrow("Erro: Telefone inválido");

        conta.destruir()
    });
    
    test("retornar mensagem de erro ao tentar cadastrar chave pix com tipo invalido", () => {
      const conta = new ContaPremium();
      expect(conta.criarChavePix("1345", "CEP")).toBe("Chave inexistente");

      conta.destruir()
    });

    test("deve retornar sucesso para valor válido, saldo suficiente e dados válidos ao fazer uma transferência", () => {
        const contaEmissor = new ContaPremium();
        const contaReceptor = new ContaPremium();
      
        contaEmissor.criarConta("1234", "12345", 2000, 80000); 
        contaReceptor.criarConta("5678", "54321", 1000, 26000);
            
        expect(contaEmissor.transferir(1000, "5678", "54321")).toBe("Tranferencia realizada");
        expect(contaEmissor.getSaldo()).toBe(1000);
        expect(contaReceptor.getSaldo()).toBe(2000);
      
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    test("deve retornar erro para valor válido, saldo suficiente e dados inválidos ao fazer uma transferência", () => {
        const contaEmissor = new ContaPremium();
        const contaReceptor = new ContaPremium();
      
        contaEmissor.criarConta("1234", "12345", 2000, 70800); 
        contaReceptor.criarConta("5678", "54321", 1000, 19999);
      
        expect(() => contaEmissor.transferir(1000, "1234", "54321")).toThrow("Conta não encontrada");
      
        expect(contaEmissor.getSaldo()).toBe(2000);
        expect(contaReceptor.getSaldo()).toBe(1000);
      
        contaEmissor.destruir();
        contaReceptor.destruir();
     });

    test("deve retornar erro para valor válido, saldo insuficiente e dados válidos ao fazer uma transferência", () => {
        const contaEmissor = new ContaPremium();
        const contaReceptor = new ContaPremium();
      
        contaEmissor.criarConta("1234", "12345", 500, 19500); 
        contaReceptor.criarConta("5678", "54321", 1000, 25000);
      
        expect(() => contaEmissor.transferir(1000, "5678", "54321")).toThrow("Saldo insuficiente");
      
        expect(contaEmissor.getSaldo()).toBe(500);
        expect(contaReceptor.getSaldo()).toBe(1000);
      
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    test("deve retornar erro para valor inválido, saldo suficiente e dados válidos ao fazer uma transferência", () => {
        const contaEmissor = new ContaPremium();
        const contaReceptor = new ContaPremium();
      
        contaEmissor.criarConta("1234", "12345", 2000, 19000); 
        contaReceptor.criarConta("5678", "54321", 1000, 22030);
      
        expect(() => contaEmissor.transferir(-100, "5678", "54321")).toThrow("Valor inválido para transferencia");
      
        expect(contaEmissor.getSaldo()).toBe(2000);
        expect(contaReceptor.getSaldo()).toBe(1000);
      
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    test("deve retornar sucesso para valor válido, saldo suficiente e dados válidos ao fazer um Pix", () => {
        const contaEmissor = new ContaPremium();
        const contaReceptor = new ContaPremium();
      
        contaEmissor.criarConta("1234", "12345", 2000, 43300); 
        contaReceptor.criarConta("5678", "54321", 1000, 25500);
      
        contaEmissor.criarChavePix("40814360879", "CPF");
        contaReceptor.criarChavePix("86687438050", "CPF");
      
        const operacao = contaEmissor.transferirPix(1000, "86687438050", "cpf");
      
        expect(operacao).toBe("Tranferencia realizada");
        expect(contaEmissor.getSaldo()).toBe(1000);
        expect(contaReceptor.getSaldo()).toBe(2000);
      
        contaEmissor.destruir();
        contaReceptor.destruir();
      });
      
      test("deve retornar erro para valor válido, saldo suficiente e dados inválidos ao fazer um Pix", () => {
        const contaEmissor = new ContaPremium();
        const contaReceptor = new ContaPremium();
      
        contaEmissor.criarConta("1234", "12345", 2000, 20000); 
        contaReceptor.criarConta("5678", "54321", 1000, 18500);
      
        contaEmissor.criarChavePix("40814360879", "CPF");
        contaReceptor.criarChavePix("86687438050", "CPF");
      
        expect(() => contaEmissor.transferirPix(1000, "86687438050", "email")).toThrow("Chave pix não encontrada");
      
        expect(contaEmissor.getSaldo()).toBe(2000);
        expect(contaReceptor.getSaldo()).toBe(1000);
      
        contaEmissor.destruir();
        contaReceptor.destruir();
      });
      
      test("deve retornar erro para valor válido, saldo insuficiente e dados válidos ao fazer um Pix", () => {
        const contaEmissor = new ContaPremium();
        const contaReceptor = new ContaPremium();
      
        contaEmissor.criarConta("1234", "12345", 500, 25000); 
        contaReceptor.criarConta("5678", "54321", 1000, 25000);
      
        contaEmissor.criarChavePix("40814360879", "CPF");
        contaReceptor.criarChavePix("86687438050", "CPF");
      
        expect(() => contaEmissor.transferirPix(1000, "86687438050", "cpf")).toThrow("Saldo insuficiente");
      
        expect(contaEmissor.getSaldo()).toBe(500);
        expect(contaReceptor.getSaldo()).toBe(1000);
      
        contaEmissor.destruir();
        contaReceptor.destruir();
      });
      
      test("deve retornar erro para valor inválido, saldo suficiente e dados válidos ao fazer um Pix", () => {
        const contaEmissor = new ContaPremium();
        const contaReceptor = new ContaPremium();
      
        contaEmissor.criarConta("1234", "12345", 2000, 18500); 
        contaReceptor.criarConta("5678", "54321", 1000, 23500);
      
        contaEmissor.criarChavePix("40814360879", "CPF");
        contaReceptor.criarChavePix("86687438050", "CPF");
      
        expect(() => contaEmissor.transferirPix(-100, "86687438050", "cpf")).toThrow("Valor inválido de pix");
      
        expect(contaEmissor.getSaldo()).toBe(2000);
        expect(contaReceptor.getSaldo()).toBe(1000);
      });
});