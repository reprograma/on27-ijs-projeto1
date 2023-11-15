    // test("DESCRIÇÃO", ()=>{
   // setup (o que a minha funcao que vai ser testada precisa para funcionar?) 
   // acao (execusao da funcao testada) 
   // verificacao (o que eu espero que seja retornado comparado com o que de fato é retornado)
    // })
const { Conta } = require("../Conta/Conta")

describe("Teste da classe Conta", () => {
    test("Verificar se a instancia conta está sendo criada corretamente", () =>{
        const conta = new Conta()
        expect(conta instanceof Conta).toBe(true)
        conta.destruir()
    });

    test("Instanciar conta com dados válidos", () =>{
        //agencia (4 digitos - string), conta (5 digitos - string), saldo (numero positivo) -> (ptivados), 
        const conta = new Conta("1234", "12345", 1000)
        expect(conta.getAgencia()).toBe("1234")
        expect(conta.getConta()).toBe("12345")
        expect(conta.getSaldo()).toBe(1000)
        conta.destruir()
    });

    test("retorna mensagem de sucesso ao criar conta", () =>{
        const conta = new Conta()
        expect(conta.criarConta("1234", "12345", 1000)).toBe("Conta criada com sucesso")
        expect(conta.getAgencia()).toBe("1234")
        expect(conta.getConta()).toBe("12345")
        expect(conta.getSaldo()).toBe(1000)
        conta.destruir()
    });
    
    test("Retorna mensagem de erro ao tentar criar conta com dados inválidos", () => {
        const conta = new Conta("1234", "12345", 1000)
        expect(() => conta.criarConta("123454", "123", 1000)).toThrow("Dados inválidos para cadastro")
        conta.destruir()
    });

    test("Retorna sucesso ao sacar 100 da conta", () =>{
        const conta = new Conta();
        conta.criarConta("1234", "12345", 1000)

        conta.sacar(100)
        expect(conta.getSaldo()).toBe(900)
        
        conta.destruir()
    })

    test("retornar erro caso ao sacar -100 da conta", () =>{
        const conta = new Conta();
        conta.criarConta("1234", "12345", 1000)

        expect( () => conta.sacar(-100)).toThrow("Valor inválido para saque")
        expect(conta.getSaldo()).toBe(1000)
       
        conta.destruir()
    });

    test("retornar erro caso ao sacar valor maior que o saldo da  conta", () =>{
        const conta = new Conta();
        conta.criarConta("1234", "12345", 100)

        expect( () => conta.sacar(110)).toThrow("Saldo insuficiente")
        expect(conta.getSaldo()).toBe(100)
        conta.destruir() 
    });

    //deposito
    test(" sucesso para deposito positivo", () =>{
        const conta = new Conta();
        conta.criarConta("1234", "12345", 1000)

        conta.depositar(100)
        expect(conta.getSaldo()).toBe(1100)
        conta.destruir()
    });

    test(" retorna erro no caso de depósito negativo", () =>{
        const conta = new Conta();
        conta.criarConta("1234", "12345", 1000)

       expect( () => conta.depositar(-100)).toThrow("Valor inválido para depósito")
       expect(conta.getSaldo()).toBe(1000)
       conta.destruir()
    });

    test(" retorna erro no caso de depósito de valor não numerico", () =>{
        const conta = new Conta();
        conta.criarConta("1234", "12345", 1000)

        expect( () => conta.depositar(" ")).toThrow("Valor inválido para depósito")
        expect(conta.getSaldo()).toBe(1000)
        conta.destruir()
    });

//pix - CPF
    test("Criar uma chave pix por CPF com sucesso ", () =>{
        //setup
        const conta = new Conta();
        //ação
       const operacao =  conta.criarChavePix("40814360879", "CPF")
        //verificação
        expect(operacao).toBe("Chave Pix por CPF criada com sucesso")
        expect(conta.chavesPix.cpf).toBe("40814360879");

        conta.destruir()
    })

    test("retornar mensagem de erro ao tentar cadastrar o pix com CPF inválido", ()=>{
        //setup
        const conta = new Conta();
        //ação
        // const operacao = conta.criarChavePix("5198819", "CPF")
        //verificação
        expect(() => conta.criarChavePix("5198819", 'CPF')).toThrow('Erro: CPF inválido')
        conta.destruir()
    } )
    
    test("Criar uma chave pix por email com sucesso ", () =>{
        //setup
        const conta = new Conta();
        //ação
        const operacao = conta.criarChavePix("tempix@gmail.com", "EMAIL")
        //verificação
        expect(operacao).toBe("Chave Pix por email criada com sucesso")
        expect(conta.chavesPix.email).toBe("tempix@gmail.com")
        conta.destruir()
    })

    test("retornar mensagem de erro ao tentar cadastrar o pix com email inválido", ()=>{
        const conta = new Conta();
        expect(() => conta.criarChavePix("pix.com", "EMAIL")).toThrow("Erro: email inválido")
        conta.destruir()
    } )

  
    test("Criar uma chave pix por telefone com sucesso ", () =>{
        const conta = new Conta();
        const operacao = conta.criarChavePix("11951639874", "TELEFONE")
        expect(operacao).toBe("Chave Pix por telefone criada com sucesso")
        expect(conta.chavesPix.telefone).toBe("11951639874")
        conta.destruir()
    })

    test("retornar mensagem de erro ao tentar cadastrar o pix com telefone inválido", ()=>{
        //setup
        const conta = new Conta();
        //ação e verificação
        expect(() => conta.criarChavePix("123456", "TELEFONE")).toThrow("Erro: telefone inválido")
        conta.destruir()
    } )

    test("retornar mensagem de erro ao tentar cadastrar o pix com chave inexistente", ()=>{
       
        const conta = new Conta();
        const operacao = conta.criarChavePix("11951639874", "Tele")
        expect(operacao).toBe("Chave Inexistente")
        conta.destruir()
    } )

    //TRANSFERENCIA
    /*
     * emissor = enviando
     * receptor = recebendo
     * agencia e conta do receptor 
     * métoso vai precisar, valor, agenciaRecptor, contaReceptor
     * valor válido
     * saldo sufuciente
     * dados validos do receptor
     */
 
    test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
        //setup
        const contaEmissor = new Conta();
        const contaReceptor = new Conta();
    
        contaEmissor.criarConta("0001", "12345", 1000 )
        contaReceptor.criarConta("0001", "78945", 500 )
    
        //acao
        const operacao = contaEmissor.transferir(100, "0001", "78945")
    
        //verificacao
        expect(operacao).toBe("Tranferencia realizada")
        expect(contaEmissor.getSaldo()).toBe(900)
        expect(contaReceptor.getSaldo()).toBe(600)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    
    })

    test("retornar erro caso não tenha saldo -  transferir", () =>{
        const contaEmissor = new Conta();
        const contaReceptor = new Conta();
    
        contaEmissor.criarConta("0001", "12345", 1000 )
        contaReceptor.criarConta("0001", "78945", 500 )

       expect( () => contaEmissor.transferir(2000, "0001", "78945")).toThrow("Saldo insuficiente")
       expect(contaEmissor.getSaldo()).toBe(1000)
       expect(contaReceptor.getSaldo()).toBe(500)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    test("retornar erro caso conta de recebimento seja inválida - transferir", () =>{
        const contaEmissor = new Conta();
        const contaReceptor = new Conta();
    
        contaEmissor.criarConta("0001", "12345", 1000 )
        contaReceptor.criarConta("0001", "78945", 500 )

       expect( () => contaEmissor.transferir(100, "0001", "789")).toThrow("Conta não encontrada")
       expect(contaEmissor.getSaldo()).toBe(1000)
       expect(contaReceptor.getSaldo()).toBe(500)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    test("retornar erro caso o valor não seja válido-  transferir", () =>{
        const contaEmissor = new Conta();
        const contaReceptor = new Conta();
    
        contaEmissor.criarConta("0001", "12345", 1000 )
        contaReceptor.criarConta("0001", "78945", 500 )

       expect( () => contaEmissor.transferir(-10, "0001", "78945")).toThrow("Valor inválido para transferencia")
       expect(contaEmissor.getSaldo()).toBe(1000)
       expect(contaReceptor.getSaldo()).toBe(500)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    });

    //FAZER PIX
    test("Retornar Suceeso ao fazer tranferencia por pix", () => {
        const contaEmissor = new Conta()
        const contaReceptor = new Conta() 

        contaEmissor.criarConta("0001", "12345", 1000 )
        contaReceptor.criarConta("0001", "78945", 500 )

        contaReceptor.criarChavePix("11951639873", "TELEFONE")
        
        const operacao = contaEmissor.fazerPix(100, "11951639873", "telefone")

        expect(operacao).toBe("Pix realizado")
        expect(contaEmissor.getSaldo()).toBe(900)
        expect(contaReceptor.getSaldo()).toBe(600)

        contaEmissor.destruir();
        contaReceptor.destruir();
    })

    test("Retornar erro ao tentar fazer pix com valor inválido, dados válidos e saldo suficiente ", () => {
            const contaEmissor = new Conta()
            const contaReceptor = new Conta() 
    
            contaEmissor.criarConta("0001", "12345", 1000 )
            contaReceptor.criarConta("0001", "78945", 500 )
    
            contaReceptor.criarChavePix("email1@email.com", "EMAIL")
            
            expect(() => contaEmissor.fazerPix(-100, "email1@email.com", "email")).toThrow("Valor inválido para pix")
    
            expect(contaEmissor.getSaldo()).toBe(1000)
            expect(contaReceptor.getSaldo()).toBe(500)
    
            contaEmissor.destruir();
            contaReceptor.destruir();
    })
 
    test("Retornar erro ao tentar fazer pix com valor válido, dados válidos e saldo insuficiente ", () => {
            const contaEmissor = new Conta()
            const contaReceptor = new Conta() 
        
            contaEmissor.criarConta("0001", "12345", 1000 )
             contaReceptor.criarConta("0001", "78945", 500 )
        
            contaReceptor.criarChavePix("email1@email.com", "EMAIL")
                
            expect(() => contaEmissor.fazerPix(1100, "email1@email.com", "email")).toThrow("Saldo insuficiente")
        
            expect(contaEmissor.getSaldo()).toBe(1000)
            expect(contaReceptor.getSaldo()).toBe(500)
        
            contaEmissor.destruir();
            contaReceptor.destruir();
    })
     
    test("Retornar erro ao tentar fazer pix com valor válido, dados válidos e saldo insuficiente ", () => {
        const contaEmissor = new Conta()
        const contaReceptor = new Conta() 
    
        contaEmissor.criarConta("0001", "12345", 1000 )
         contaReceptor.criarConta("0001", "78945", 500 )
    
        contaReceptor.criarChavePix("40814360879", "CPF")
            
        expect(() => contaEmissor.fazerPix(1100, "email1@email.com", "email")).toThrow("Chave pix não encontrada")
    
        expect(contaEmissor.getSaldo()).toBe(1000)
        expect(contaReceptor.getSaldo()).toBe(500)
    
        contaEmissor.destruir();
        contaReceptor.destruir();
    })
    
  
})
