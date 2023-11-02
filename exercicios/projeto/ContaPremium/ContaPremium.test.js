// Premium
// renda mensal a partir de R$18.000,00. 
// Eles não tem limite de transação por dia

const ContaPremium = require("./ContaPremium");

describe("Teste da classe ContaPremium", () => {
    test("Verificar se a instância ContaPremium está sendo criada", () => {
      const conta = new ContaPremium();
      expect(conta instanceof ContaPremium).toBe(true);
      conta.destruir()
    });

    test("Instanciar conta premium com valores válidos", () => {
        const conta = new ContaPremium("1234", "12345", 1000, 20000);
        expect(conta.getAgencia()).toBe("1234");
        expect(conta.getConta()).toBe("12345");
        expect(conta.getSaldo()).toBe(1000);
        conta.destruir()
      });

      test("retorna mensagem de sucesso ao criar conta premium", () => {
        const conta = new ContaPremium();
        expect(conta.criarConta("1234", "12345", 1000, 20000)).toBe(
          "Conta criada com sucesso"
        );
        expect(conta.getAgencia()).toBe("1234");
        expect(conta.getConta()).toBe("12345");
        expect(conta.getSaldo()).toBe(1000);
        conta.destruir()
      });

      test("retorna mensagem de ERRO ao criar conta Premium", () => {
        const conta = new ContaPremium();
        const operacao = () => conta.criarConta("1234", "345", 1000, 19000)

        expect(operacao).toThrow("Erro no cadastro, dados inválidos");
        conta.destruir()
      });

      test("retorna mensagem de ERRO ao tentar criar conta Premium com renda incompatível", () => {
        const conta = new ContaPremium();
        const operacao = () => conta.criarConta("1111", "12345", 1000, 3000)

        expect(operacao).toThrow("Renda não compatível com Conta Premium")
        conta.destruir()
      })

      test("retorna sucesso ao sacar 100 da conta Premium", () => {
        const conta = new ContaPremium();
        conta.criarConta("1234", "12345", 1000, 20000);
    
        conta.sacar(100);
        expect(conta.getSaldo()).toBe(900);
        conta.destruir()
      });

      test("retorna mensagem de erro ao sacar -100 da conta Premium", () => {
        const conta = new ContaPremium();
        conta.criarConta("1234", "12345", 1000, 20000);


        expect(() => conta.sacar(-100)).toThrow("valor inválido para saque");
        expect(conta.getSaldo()).toBe(1000);
        conta.destruir()
      });

})