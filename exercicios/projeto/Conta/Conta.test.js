const Conta = require("./Conta");

describe("classe Conta", () => {
  describe("testa a criação de uma conta", () => {
    test("deveria retorna uma conta", () => {
      const conta = new Conta();
      expect(conta instanceof Conta).toBeTruthy();
    });

    test("verifica se os dados da conta são válidos", () => {
      const conta = new Conta("1234", "12345", 5000);

      expect(conta.getAgencia).toBe("1234");
      expect(conta.getConta).toBe("12345");
      expect(conta.getSaldo).toBe(5000);
    });

    test("verifica se a conta foi criada corretamente e retorna uma mensagem de sucesso", () => {
      const conta = new Conta();

      expect(conta.criarConta("1234", "12345", 5000)).toBe("Conta cadastrada com sucesso!");
      expect(conta.getAgencia).toBe("1234");
      expect(conta.getConta).toBe("12345");
      expect(conta.getSaldo).toBe(5000);

    });
    
    test("verifica se ocorre erro quando algum dado é inválido", () => {
      const conta = new Conta();

        expect(()=>{
            conta.criarConta("12346789", "24680", -2000).toThrow('Dados inválidos!')
        })
      });
  });

  describe("método depositar", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 5000);

    test("deveria retornar erro ao receber um valor negativo", () => {
        expect(()=>{
            conta.depositar(-30).toThrow('Erro ao depositar. Valor inválido.')
        })
    });

    test("deve efetuar deposito numa conta", () => {
        expect(conta.depositar(500)).toBe('Depósito recebido com sucesso!')
        expect(conta.getSaldo).toBe(5500)
    });

  });

  describe("método sacar", () => {
    test("erro ao tentar sacar -300", () => {
        const conta = new Conta();
        conta.criarConta("1234", "12345", 5000)

        expect(()=>{
            conta.sacar(-300).toThrow('Valor inválido para saque.')
        })
        expect(conta.getSaldo).toBe(5000)
    });

    test("saque realizado com sucesso", () => {
        const conta = new Conta();
        conta.criarConta("1234", "12345", 5000)

        expect(conta.sacar(300)).toBe('Saque realizado com sucesso!')
        expect(conta.getSaldo).toBe(4700)
    });

    test("saldo insuficiente para realizar o saque", () => {
        const conta = new Conta();
        conta.criarConta("1234", "12345", 200);

        expect(()=>{
            conta.sacar(3000).toThrow(`Saldo insuficiente para realizar o saque. Seu saldo é R$ 200!`)
        })
        expect(conta.getSaldo).toBe(200)
    });

  });

  describe("método transferir", () => {
    test("", () => {});

    test("", () => {});
  });
});
