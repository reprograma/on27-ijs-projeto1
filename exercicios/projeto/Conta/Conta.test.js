const Conta = require("./Conta")

describe("Teste da classe Conta", () => {
    test("Verificar se a instância Conta está sendo criada", () => {
        const conta = new Conta();
        expect(conta instanceof Conta).toBe(true);
    })

    test("Instanciar conta com valores válidos", () => {
        const conta = new Conta("1234", "12345", 1000);
        expect(conta.getAgencia).toBe("1234");
        expect(conta.getConta).toBe("12345");
        expect(conta.getSaldo).toBe(1000);
    })

    test("retorna mensagem de sucesso ao criar conta", () => {
        const conta = new Conta();
        expect(conta.criarConta("1234", "12345", 1000)).toBe("Conta criada com sucesso")
        expect(conta.getAgencia).toBe("1234");
        expect(conta.getConta).toBe("12345");
        expect(conta.getSaldo).toBe(1000);
    })

    test("retorna mensagem de ERRO ao criar conta", () => {
        const conta = new Conta();
        expect(() => conta.criarConta("12345", "123", 1000)).toThrow("Erro no cadastro, dados inválidos")
    })

    test("retorna sucesso ao sacar 100 da conta", () => {
        const conta = new Conta();
        conta.criarConta("1234", "12345", 1000)
        
        conta.sacar(100)
        expect(conta.getSaldo).toBe(900)
    })

    test("retorna mensagem de erro ao sacar -100 da conta", () => {
        const conta = new Conta();
        conta.criarConta("1234", "12345", 1000)
        
        expect(() => conta.sacar(-100)).toThrow("valor inválido para saque")
        expect(conta.getSaldo).toBe(1000)
   
    })

    
    test("retorna sucesso ao depositar 100 na conta", () => {
        const conta = new Conta();
        conta.criarConta("1234", "12345", 1000)
        
        conta.depositar (100)   
        expect(conta.getSaldo).toBe(1100)
    })

    test("retorna mensagem de erro ao depositar -100 da conta", () => {
        const conta = new Conta();
        conta.criarConta("1234", "12345", 1000)
        
        expect(() => conta.depositar(-100)).toThrow("valor inválido para depósito")
        expect(conta.getSaldo).toBe(1000)
   
    })

    test("retorna mensagem de erro ao depositar valor não numérico da conta", () => {
        const conta = new Conta();
        conta.criarConta("1234", "12345", 1000)
        
        expect(() => conta.depositar(" ")).toThrow("valor inválido para depósito")
        expect(conta.getSaldo).toBe(1000)
   
    })



})