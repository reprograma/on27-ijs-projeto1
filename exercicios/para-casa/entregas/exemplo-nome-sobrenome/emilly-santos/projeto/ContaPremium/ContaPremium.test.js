const ContaPremium = require("./ContaPremium");
const Conta = require("../Conta/Conta");

describe("Testes da Classe Conta Premium", () => {
    test("retorna sucesso ao sacar 100 da conta", () => {
        const conta = new ContaPremium();

        conta.criarConta("1234", "12345", 1000, 18001);
        conta.sacar(100);

        expect(conta.getSaldo()).toBe(900);
        conta.destruir()
    });

    test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
        const conta = new ContaPremium();
        conta.criarConta("1234", "12345", 1000, 18001);

        expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
        expect(conta.getSaldo()).toBe(1000);
        conta.destruir()
    });

    test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
        const conta = new ContaPremium();
        conta.criarConta("1234", "12345", 100, 18001);

        expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
        expect(conta.getSaldo()).toBe(100);
        conta.destruir()
    });

    test("retorna sucesso ao depositar 100 reais da conta", () => {
        const conta = new ContaPremium();

        conta.criarConta("1234", "12345", 1000, 18001);
        conta.depositar(100);

        expect(conta.getSaldo()).toBe(1100);
        conta.destruir()
    });

    test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
        const conta = new ContaPremium();

        conta.criarConta("1234", "12345", 1000, 18001);

        expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
        expect(conta.getSaldo()).toBe(1000);
        conta.destruir()
    });

    test("retorna mensagem de erro ao depositar valor não numerico", () => {
      const conta = new ContaPremium();

      conta.criarConta("1234", "12345", 1000, 18001);

      expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
      expect(conta.getSaldo()).toBe(1000);
      conta.destruir()
    });

    test("retorna sucesso ao fazer uma transferencia com valor válido, saldo suficiente, dados validos", ()=>{
        const contaEmissor = new ContaPremium();
        const contaReceptor = new Conta();
        contaEmissor.criarConta("0001", "12345", 1000, 18001)
        contaReceptor.criarConta("0001", "78945", 500, 3500)
        
        const operacao = contaEmissor.transferirPremium(10000, "0001", "78945")
        
        expect(operacao).toBe("Transferencia realizada")
        expect(contaEmissor.getSaldo()).toBe(1000)
        expect(contaReceptor.getSaldo()).toBe(500)
        contaEmissor.destruir();
        contaReceptor.destruir();
    })

    test("verificar se instancia foi criada corretamente", () => {
        const conta = new ContaPremium();

        expect(conta instanceof ContaPremium).toBe(true);
        conta.destruir();
    });


    test("criar conta com dados validos e renda compativel", () => {
        const conta = new ContaPremium();

        expect(conta.criarConta("1234", "12345", 1000, 18001)).toBe("Conta Premium criada com sucesso");
        conta.destruir();
    });

    test("criar conta com dados validos e renda incompativel", () => {
        const conta = new ContaPremium();

        expect(conta.criarConta("1234", "12345", 1000, 17001)).toBe("Conta Premium nao pode ser criada!");
        conta.destruir();
    });

    test("retorna mensagem de erro ao tentar criar conta com dados invalido", () => {
        const conta = new ContaPremium();
        expect(() => conta.criarConta("123454", "123", 1000, 18001)).toThrow("Dados inválidos para cadastro");
        conta.destruir();
    });
});
    