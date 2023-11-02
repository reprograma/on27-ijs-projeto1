const ContaGold = require('./ContaGold')
const Cliente = require("../Cliente/Cliente");
const Conta = require("../Conta/Conta");

describe('Testes da Classe ContaGold', () =>{
    test('verificar se instancia conta é feita corretamente', () =>{
        //setup
        const conta = new ContaGold()

        //acao

        //verificação
        expect(conta instanceof ContaGold).toBe(true)

        // remover conta da lista de contas
        conta.destruir()

    })

    test("criar conta de com dados válidos e renda compatível", () =>{
        //setup
        const conta = new Conta()
        const cliente = new Cliente()
        const contaGold = new ContaGold()
        //ação
        
        conta.criarConta("1234", "12345", 500)
        cliente.registrar('Ana','12345678900', 6000, conta)
        
        //verificação
        expect(contaGold.definirTipoConta(cliente,conta)).toBe("Conta Gold")

        // remover conta da lista de contas
        conta.destruir()
        contaGold.destruir()
    })

    test("retorna erro ao criar conta de com dados válidos e renda incompatível", () =>{
        //setup
        const conta = new Conta()
        const cliente = new Cliente()
        const contaGold = new ContaGold()
        //ação
        
        conta.criarConta("1234", "12345", 500)
        cliente.registrar('Ana','12345678900', 18000, conta)
        
        //verificação
        expect(() => contaGold.definirTipoConta(cliente,conta)).toThrow("Renda incompatível")

        // remover conta da lista de contas
        conta.destruir()
        contaGold.destruir()
    })

    test("retorna erro ao criar ContaGold com dados inválidos", () =>{
        //setup
        const conta = new Conta()
        //const cliente = new Cliente()
        //const contaGold = new ContaGold()
        //ação
        
        //conta.criarConta("12345", "12345", 500)
        //cliente.registrar('Ana','12345678900', 5000, conta)
        
        //verificação
        expect(() => conta.criarConta("12345", "12345", 500)).toThrow("Dados inválidos para cadastro")

        // remover conta da lista de contas
        conta.destruir()
        
    })

    test("retorna sucesso ao sacar 100 da conta", () => {
        const conta = new ContaGold();
        conta.criarConta("1234", "12345", 1000);
    
        conta.sacar(100);
        expect(conta.getSaldo()).toBe(900);
        
        // remover conta da lista de contas
        conta.destruir()
    });
    
      test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
        const conta = new ContaGold();
        conta.criarConta("1234", "12345", 1000);
    
        expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
        expect(conta.getSaldo()).toBe(1000);
        
        // remover conta da lista de contas
        conta.destruir()
    });
    
      test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
        const conta = new ContaGold();
        conta.criarConta("1234", "12345", 100);
    
        expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
        expect(conta.getSaldo()).toBe(100);
        
        // remover conta da lista de contas
        conta.destruir()
    });
    
      test("retorna sucesso ao depositar 100 reais da conta", () => {
        const conta = new ContaGold();
        conta.criarConta("1234", "12345", 1000);
    
        conta.depositar(100);
        expect(conta.getSaldo()).toBe(1100);
        
        // remover conta da lista de contas
        conta.destruir()
    });
    
      test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
        const conta = new ContaGold();
        conta.criarConta("1234", "12345", 1000);
    
        expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
        expect(conta.getSaldo()).toBe(1000);
        
        // remover conta da lista de contas
        conta.destruir()
    });
    
      test("retorna mensagem de erro ao depositar valor não numerico", () => {
        const conta = new ContaGold();
        conta.criarConta("1234", "12345", 1000);
    
        expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
        expect(conta.getSaldo()).toBe(1000);
    
        // remover conta da lista de contas
        conta.destruir()
    
    });
    
    
})