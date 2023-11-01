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
        const conta = new ContaPremium("1234", "12345", 1000);
        expect(conta.getAgencia).toBe("1234");
        expect(conta.getConta).toBe("12345");
        expect(conta.getSaldo).toBe(1000);
        conta.destruir()
      });

      test("retorna mensagem de sucesso ao criar conta premium", () => {
        const conta = new ContaPremium();
        expect(conta.criarConta("1234", "12345", 1000)).toBe(
          "Conta criada com sucesso"
        );
        expect(conta.getAgencia).toBe("1234");
        expect(conta.getConta).toBe("12345");
        expect(conta.getSaldo).toBe(1000);
        conta.destruir()
      });

      test("retorna mensagem de ERRO ao criar conta premium", () => {
        const conta = new ContaPremium();
        expect(() => conta.criarConta("12345", "123", 1000)).toThrow(
          "Erro no cadastro, dados inválidos"
        );
        conta.destruir()
      });
})