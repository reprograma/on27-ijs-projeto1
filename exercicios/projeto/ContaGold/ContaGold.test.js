// Gold
// renda mensal de R$5000,00 até R$17.999,99. 
// tem limite de transação de 5000 reais por dia.

const ContaGold = require("./ContaGold");

describe("Teste da classe ContaGold", () => {
    test("Verificar se a instância ContaGold está sendo criada", () => {
      const conta = new ContaGold();
      expect(conta instanceof ContaGold).toBe(true);
      conta.destruir()
    });

    test("Instanciar conta gold com valores válidos", () => {
        const conta = new ContaGold("1234", "12345", 1000, 7000);
        expect(conta.getAgencia()).toBe("1234");
        expect(conta.getConta()).toBe("12345");
        expect(conta.getSaldo()).toBe(1000);
        conta.destruir()
      });

      test("retorna mensagem de sucesso ao criar conta gold", () => {
        const conta = new ContaGold();
                
        expect(conta.criarConta("1234", "12345", 1000, 7000)).toBe("Conta criada com sucesso");
        expect(conta.getAgencia()).toBe("1234");
        expect(conta.getConta()).toBe("12345");
        expect(conta.getSaldo()).toBe(1000);
        conta.destruir()
      });

      test("retorna mensagem de ERRO ao criar conta Gold", () => {
        const conta = new ContaGold();
        const operacao = () => conta.criarConta("1234", "345", 1000, 7000)

        expect(operacao).toThrow("Erro no cadastro, dados inválidos");
        conta.destruir()
      });

      test("retorna mensagem de ERRO ao tentar criar conta Gold com renda incompatível", () => {
        const conta = new ContaGold();
        const operacao = () => conta.criarConta("1111", "12345", 1000, 3000)

        expect(operacao).toThrow("Renda não compatível com Conta Gold")
        conta.destruir()
      })

      test("retorna sucesso ao sacar 100 da conta gold", () => {
        const conta = new ContaGold();
        conta.criarConta("1234", "12345", 1000, 7000);
    
        conta.sacar(100);
        expect(conta.getSaldo()).toBe(900);
        conta.destruir()
      });

      test("retorna mensagem de erro ao sacar -100 da conta gold", () => {
        const conta = new ContaGold();
        conta.criarConta("1234", "12345", 1000, 7000);


        expect(() => conta.sacar(-100)).toThrow("valor inválido para saque");
        expect(conta.getSaldo()).toBe(1000);
        conta.destruir()
      });

})