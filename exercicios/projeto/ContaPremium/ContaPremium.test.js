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

      test("retorna mensagem de sucesso ao depositar 100 na conta", () => {
        const conta = new ContaPremium()
        conta.criarConta("1234", "12345", 1000, 20000)
        
        conta.depositar(100)
        expect(conta.getSaldo()).toBe(1100)
        conta.destruir()
      })
    
      test("retona mensagem de erro ao depositar -100 da conta", () => {
        const conta = new ContaPremium()
        conta.criarConta("1234", "12345", 1000, 20000)
    
        expect(() => conta.depositar(-100)).toThrow("valor inválido para depósito")
        expect(conta.getSaldo()).toBe(1000)
        conta.destruir()
      })
    
      test("retorna mensagem de erro ao depositar valor não numérico da conta", () => {
        const conta = new ContaPremium();
        conta.criarConta("1234", "12345", 1000, 20000);
    
        expect(() => conta.depositar(" ")).toThrow("valor inválido para depósito");
        expect(conta.getSaldo()).toBe(1000);
        conta.destruir()
      });

      test("retorna sucesso ao fazer uma transferência com valor válido, saldo sufuciente, dados válidos", () => {
        const contaEmissor = new ContaPremium()
        const contaReceptor = new ContaPremium()
    
        contaEmissor.criarConta("1234", "12245", 2000, 20000)
        contaReceptor.criarConta("7894", "45678", 1000, 19000)
    
        const operacao = contaEmissor.transferir(200,"7894", "45678")
    
        expect(operacao).toBe("Transferência realizada")
        expect(contaEmissor.getSaldo()).toBe(1800)
        expect(contaReceptor.getSaldo()).toBe(1200)
    
        contaEmissor.destruir()
        contaReceptor.destruir()
      })
})