const ContaPremium = require("./ContaPremium");

const RENDA_MINIMA_CONTA_PREMIUM = 18000;

describe("Testes da classe ContaPremium", () => {
    test("Deve criar uma instância de ContaPremium com sucesso", () => {
        const contaPremium = new ContaPremium("4321", "54321", 2000, RENDA_MINIMA_CONTA_PREMIUM);
        expect(contaPremium).toBeInstanceOf(ContaPremium);

    });

    test("Deve criar ContaPremium com dados válidos e renda compatível", () => {
        const contaPremium = new ContaPremium("4321", "54321", 1000, RENDA_MINIMA_CONTA_PREMIUM);
        expect(contaPremium.getAgencia()).toBe("4321");
        expect(contaPremium.getConta()).toBe("54321");
        expect(contaPremium.getSaldo()).toBe(1000);
        expect(contaPremium.renda).toBe(RENDA_MINIMA_CONTA_PREMIUM);
    });

    test("deve lançar um erro ao criar ContaPremium com dados inválidos", () => {
        expect(() => new ContaPremium("12", "123456", -100, RENDA_MINIMA_CONTA_PREMIUM)).toThrow(
            "Dados inválidos para cadastro"
        );
    });

    test("deve depositar na ContaPremium corretamente", () => {
        const contaPremium = new ContaPremium("1234", "12345", 1000, RENDA_MINIMA_CONTA_PREMIUM);
        contaPremium.depositar(500);
        expect(contaPremium.getSaldo()).toBe(1500);
    });

    test("deve lançar erro ao tentar sacar valor maior que o saldo", () => {
        const contaPremium = new ContaPremium("1234", "12345", 1000, RENDA_MINIMA_CONTA_PREMIUM);
        expect(() => contaPremium.sacar(1200)).toThrow("Saldo insuficiente");
    });

    test("deve depositar na conta Premium corretamente", () => {
        const contaPremium = new ContaPremium("1234", "12345", 1000, RENDA_MINIMA_CONTA_PREMIUM);
        contaPremium.depositar(500);
        expect(contaPremium.getSaldo()).toBe(1500);
    });

    test("deve sacar da conta Premium corretamente", () => {
        const contaPremium = new ContaPremium("1234", "12345", 1000, RENDA_MINIMA_CONTA_PREMIUM);
        contaPremium.sacar(200);
        expect(contaPremium.getSaldo()).toBe(800);
    });

    test("deve lançar erro ao tentar sacar valor maior que o saldo", () => {
        const contaPremium = new ContaPremium("1234", "12345", 1000, RENDA_MINIMA_CONTA_PREMIUM);
        expect(() => contaPremium.sacar(1200)).toThrow("Saldo insuficiente");
    });

    test('deve lançar erro ao transferir para conta inexistente', () => {
        let contaPremium = new ContaPremium('1234', '12345', 10000, RENDA_MINIMA_CONTA_PREMIUM);
        contaPremium.criarChavePix("00345934583485893", "CPF");

        expect(() => contaPremium.transferir('12346', 1000, -20)).toThrow("Conta não encontrada");
    });

    test('deve lançar erro ao transferirPix valor inválido', () => {
        const contaPremium = new ContaPremium('1234', '12345', 10000, RENDA_MINIMA_CONTA_PREMIUM);
        contaPremium.criarChavePix("21951639875", "TELEFONE");
        expect(() => contaPremium.transferirPix(-100, '21951639875', 'telefone')).toThrow('Valor inválido para transferência');
    });

    test('deve lançar erro ao transferirPix valor acima do saldo', () => {
        const contaPremium = new ContaPremium('1234', '12345', 10000, RENDA_MINIMA_CONTA_PREMIUM);
        contaPremium.criarChavePix("21951639875", "TELEFONE");
        expect(() => contaPremium.transferirPix(15000, '21951639875', 'telefone')).toThrow('Saldo insuficiente');
    });

    test('deve depositar valor válido', () => {
        const contaPremium = new ContaPremium('1234', '12345', 10000, RENDA_MINIMA_CONTA_PREMIUM);
        contaPremium.depositar(500);
        expect(contaPremium.getSaldo()).toBe(10500);
    });

    test('deve lançar erro ao depositar valor inválido', () => {
        const contaPremium = new ContaPremium('1234', '12345', 10000, RENDA_MINIMA_CONTA_PREMIUM);
        expect(() => contaPremium.depositar(-100)).toThrow('Valor inválido para depósito');
    });

    test('deve lançar erro ao transferirPix para chave pix inexistente', () => {
        const contaPremium = new ContaPremium('1234', '12345', 10000, RENDA_MINIMA_CONTA_PREMIUM);
        contaPremium.criarChavePix("41951639875", "TELEFONE");

        // Usando uma função wrapper para capturar a exceção ao invés de usar expect()
        const transferenciaInvalida = () => {
            contaPremium.transferirPix(1000, '41951639874', 'telefone');
        };

        expect(transferenciaInvalida).toThrowError('Chave PIX não encontrada');
    });

});


