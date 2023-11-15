const { ContaStandard } = require("./ContaStandard")

describe("Teste da classe Conta Standard", () => {
    test("Verificar se a instancia conta está sendo criada corretamente", () =>{
        const conta = new ContaStandard()
        expect(conta instanceof ContaStandard).toBe(true)
        conta.destruir()
    });

    test("Instanciar conta com dados válidos", () =>{
        //agencia (4 digitos - string), conta (5 digitos - string), saldo (numero positivo) -> (ptivados), 
        const conta = new ContaStandard("1234", "12345", 1000, 4500)
        expect(conta.getAgencia()).toBe("1234")
        expect(conta.getConta()).toBe("12345")
        expect(conta.getSaldo()).toBe(1000)
        expect(conta.getRenda()).toBe(4500)
        conta.destruir()
    });

  
    test("retorna mensagem de sucesso ao criar conta", () =>{
        const conta = new ContaStandard()
        expect(conta.criarConta("1234", "12345", 1000, 4500)).toBe("Conta criada com sucesso")
        expect(conta.getAgencia()).toBe("1234")
        expect(conta.getConta()).toBe("12345")
        expect(conta.getSaldo()).toBe(1000)
        expect(conta.getRenda()).toBe(4500)
        conta.destruir()
    });
    
    test("Retorna mensagem de erro ao tentar criar conta com dados inválidos", () => {
        const conta = new ContaStandard("1234", "12345", 1000, 4500)
        expect(() => conta.criarConta("123454", "123", 1000, 4500)).toThrow("Dados inválidos para cadastro")
        conta.destruir()
    });

    test("retorna mensagem de erro ao criar conta com valor maior que 4999,99", () =>{
        const conta = new ContaStandard()
        expect(() => conta.criarConta("1234", "12345", 1000, 5500)).toThrow("Renda não compativel com a conta Standard")

        conta.destruir()
    })
    test("Retorna sucesso ao sacar 100 da conta", () =>{
        const conta = new ContaStandard();
        conta.criarConta("1234", "12345", 1000, 4500)

        conta.sacar(100)
        expect(conta.getSaldo()).toBe(900)
        
        conta.destruir()
    })

    test("retornar erro caso ao sacar -100 da conta", () =>{
        const conta = new ContaStandard();
        conta.criarConta("1234", "12345", 1000, 4500)

        expect( () => conta.sacar(-100)).toThrow("Valor inválido para saque")
        expect(conta.getSaldo()).toBe(1000)
       
        conta.destruir()
    });

    test("retornar erro caso ao sacar valor maior que o saldo da  conta", () =>{
        const conta = new ContaStandard();
        conta.criarConta("1234", "12345", 100, 4500)

        expect( () => conta.sacar(110)).toThrow("Saldo insuficiente")
        expect(conta.getSaldo()).toBe(100)
        conta.destruir() 
    });

    test(" sucesso para deposito positivo", () =>{
        const conta = new ContaStandard();
        conta.criarConta("1234", "12345", 1000, 4500)

        conta.depositar(100)
        expect(conta.getSaldo()).toBe(1100)
        conta.destruir()
    });

    test(" retorna erro no caso de depósito negativo", () =>{
        const conta = new ContaStandard();
        conta.criarConta("1234", "12345", 1000, 4500)

       expect( () => conta.depositar(-100)).toThrow("Valor inválido para depósito")
       expect(conta.getSaldo()).toBe(1000)
       conta.destruir()
    });

    test(" retorna erro no caso de depósito de valor não numerico", () =>{
        const conta = new ContaStandard();
        conta.criarConta("1234", "12345", 1000, 4500)

        expect( () => conta.depositar(" ")).toThrow("Valor inválido para depósito")
        expect(conta.getSaldo()).toBe(1000)
        conta.destruir()
    });

    test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
        //setup
        const contaEmissor = new ContaStandard();
        const contaReceptor = new ContaStandard();
    
        contaEmissor.criarConta("0001", "12345", 1000, 4500)
        contaReceptor.criarConta("0001", "78945", 500, 4900)
    
        //acao
        const operacao = contaEmissor.transferir(100, "0001", "78945")
    
        //verificacao
        expect(operacao).toBe("Transferencia realizada")
        expect(contaEmissor.getSaldo()).toBe(900)
        expect(contaReceptor.getSaldo()).toBe(600)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    
    })

    test("retornar erro caso ultrapasse limite de transação diaria de 1000  -  transferir", () =>{
        const contaEmissor = new ContaStandard();
        const contaReceptor = new ContaStandard();
    
        contaEmissor.criarConta("0001", "12345", 1000, 4500)
        contaReceptor.criarConta("0001", "78945", 500, 4900)

        const operacao = () => contaEmissor.transferir(2000, "0001", "78945")
        expect(operacao).toThrow( "Limite de transação excedido")
        expect(contaEmissor.getSaldo()).toBe(1000)
        expect(contaReceptor.getSaldo()).toBe(500)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    test("retornar erro caso não tenha saldo suficiente  -  transferir", () =>{
        const contaEmissor = new ContaStandard();
        const contaReceptor = new ContaStandard();
    
        contaEmissor.criarConta("0001", "12345", 500, 4500)
        contaReceptor.criarConta("0001", "78945", 500, 4900)

       expect( () => contaEmissor.transferir(600, "0001", "78945")).toThrow("Saldo Insuficiente")
       expect(contaEmissor.getSaldo()).toBe(500)
       expect(contaReceptor.getSaldo()).toBe(500)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    test("retornar erro caso conta de recebimento seja inválida - transferir", () =>{
        const contaEmissor = new ContaStandard();
        const contaReceptor = new ContaStandard();
    
        contaEmissor.criarConta("0001", "12345", 1000, 4500 )
        contaReceptor.criarConta("0001", "78945", 500, 4900 )

       expect( () => contaEmissor.transferir(100, "0001", "789")).toThrow("Conta não encontrada")
       expect(contaEmissor.getSaldo()).toBe(1000)
       expect(contaReceptor.getSaldo()).toBe(500)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    test("retornar erro caso o valor não seja válido-  transferir", () =>{
        const contaEmissor = new ContaStandard();
        const contaReceptor = new ContaStandard();
    
        contaEmissor.criarConta("0001", "12345", 1000, 4500 )
        contaReceptor.criarConta("0001", "78945", 500, 4900 )

       expect( () => contaEmissor.transferir(-10, "0001", "78945")).toThrow("Valor inválido para transferencia")
       expect(contaEmissor.getSaldo()).toBe(1000)
       expect(contaReceptor.getSaldo()).toBe(500)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    test("Retornar Suceeso ao fazer tranferencia por pix", () => {
        const contaEmissor = new ContaStandard()
        const contaReceptor = new ContaStandard() 

        contaEmissor.criarConta("0001", "12345", 1000, 4500)
        contaReceptor.criarConta("0001", "78945", 500, 4900 )

        contaReceptor.criarChavePix("11951639873", "TELEFONE")
        
        const operacao = contaEmissor.fazerPix(100, "11951639873", "telefone")

        expect(operacao).toBe("Pix realizado")
        expect(contaEmissor.getSaldo()).toBe(900)
        expect(contaReceptor.getSaldo()).toBe(600)

        contaEmissor.destruir();
        contaReceptor.destruir();
    })

    test("Retornar erro ao tentar fazer pix com valor inválido, dados válidos e saldo suficiente ", () => {
            const contaEmissor = new ContaStandard()
            const contaReceptor = new ContaStandard() 
    
            contaEmissor.criarConta("0001", "12345", 1000, 4580 )
            contaReceptor.criarConta("0001", "78945", 500, 4000)
    
            contaReceptor.criarChavePix("email1@email.com", "EMAIL")
            
            expect(() => contaEmissor.fazerPix(-100, "email1@email.com", "email")).toThrow("Valor inválido para pix")
    
            expect(contaEmissor.getSaldo()).toBe(1000)
            expect(contaReceptor.getSaldo()).toBe(500)
    
            contaEmissor.destruir();
            contaReceptor.destruir();
    })
 
    test("Retornar erro ao tentar fazer pix com valor válido, dados válidos e saldo insuficiente ", () => {
            const contaEmissor = new ContaStandard()
            const contaReceptor = new ContaStandard() 
        
            contaEmissor.criarConta("0001", "12345", 600, 4500 )
             contaReceptor.criarConta("0001", "78945", 500, 4900 )
        
            contaReceptor.criarChavePix("email1@email.com", "EMAIL")
                
            expect(() => contaEmissor.fazerPix(700, "email1@email.com", "email")).toThrow("Saldo insuficiente")
        
            expect(contaEmissor.getSaldo()).toBe(600)
            expect(contaReceptor.getSaldo()).toBe(500)
        
            contaEmissor.destruir();
            contaReceptor.destruir();
    })
     
    test("Retornar erro ao tentar fazer pix com valor válido, dados válidos e saldo insuficiente ", () => {
        const contaEmissor = new ContaStandard()
        const contaReceptor = new ContaStandard() 
    
        contaEmissor.criarConta("0001", "12345", 1000, 4500 )
         contaReceptor.criarConta("0001", "78945", 500, 4000 )
    
        contaReceptor.criarChavePix("40814360879", "CPF")
            
        expect(() => contaEmissor.fazerPix(1100, "email1@email.com", "email")).toThrow("Chave pix não encontrada")
    
        expect(contaEmissor.getSaldo()).toBe(1000)
        expect(contaReceptor.getSaldo()).toBe(500)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    test("Retornar erro ao tentar fazer pix com valor válido, dados válidos e saldo suficiente, valor maior que o limite permitido", () => {
        const contaEmissor = new ContaStandard()
        const contaReceptor = new ContaStandard() 
    
        contaEmissor.criarConta("0001", "12345", 2500, 4500 )
         contaReceptor.criarConta("0001", "78945", 500, 4000 )
    
        contaReceptor.criarChavePix("40814360879", "CPF")
            
        expect(() => contaEmissor.fazerPix(1100, "40814360879", "cpf")).toThrow("Limite de transação diária excedido")
    
        expect(contaEmissor.getSaldo()).toBe(2500)
        expect(contaReceptor.getSaldo()).toBe(500)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    })

})

