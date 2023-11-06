const ContaPremium = require("./ContaPremium");

const RENDA_MINIMA_CONTA_PREMIUM = 18000;

describe("Testes da classe ContaPremium", () => {
    let contaPremium;

    beforeEach(() => {
        contaPremium = new ContaPremium("4321", "54321", 2000, RENDA_MINIMA_CONTA_PREMIUM);
    });

    test("Deve criar uma instância de ContaPremium com sucesso", () => {
        expect(contaPremium).toBeInstanceOf(ContaPremium);
    });

    test("Deve criar ContaPremium com dados válidos e renda compatível", () => {
        expect(contaPremium.getAgencia()).toBe("4321");
        expect(contaPremium.getConta()).toBe("54321");
        expect(contaPremium.getSaldo()).toBe(2000);
        expect(contaPremium.renda).toBe(RENDA_MINIMA_CONTA_PREMIUM);
    });

    test("Deve lançar um erro ao criar ContaPremium com dados inválidos", () => {
        expect(() => new ContaPremium("12", "123456", -100, RENDA_MINIMA_CONTA_PREMIUM)).toThrow(
            "Dados inválidos para cadastro"
        );
    });

    test("Deve depositar na ContaPremium corretamente", () => {
        contaPremium.depositar(500);
        expect(contaPremium.getSaldo()).toBe(2500);
    });

    test("Deve lançar erro ao tentar sacar valor maior que o saldo", () => {
        expect(() => contaPremium.sacar(2500)).toThrow("Saldo insuficiente");
    });

    test("Deve sacar da ContaPremium corretamente", () => {
        contaPremium.sacar(500);
        expect(contaPremium.getSaldo()).toBe(1500);
    });

    test('Deve lançar erro ao transferir para conta inexistente', () => {
        expect(() => contaPremium.transferir(1000, '12346', '-20')).toThrow("Conta não encontrada");
    });

    test('Deve lançar erro ao transferirPix com valor inválido', () => {
        contaPremium.criarChavePix("21951639875", "TELEFONE");
        expect(() => contaPremium.transferirPix(-100, '21951639875', 'telefone')).toThrow(
            'Valor inválido para transferência'
        );
    });

    test('Deve lançar erro ao transferirPix com valor acima do saldo', () => {
        contaPremium.criarChavePix("21951639875", "TELEFONE");
        expect(() => contaPremium.transferirPix(2500, '21951639875', 'telefone')).toThrow("Saldo insuficiente");
    });

    test('Deve depositar valor válido', () => {
        contaPremium.depositar(500);
        expect(contaPremium.getSaldo()).toBe(2500);
    });

    test('Deve lançar erro ao depositar valor inválido', () => {
        expect(() => contaPremium.depositar(-100)).toThrow('Valor inválido para depósito');
    });

    test('Deve lançar erro ao transferirPix para chave pix inexistente', () => {
        contaPremium.criarChavePix("41951639875", "TELEFONE");

        expect(() => {
            contaPremium.transferirPix(1000, '41951639874', 'telefone');
        }).toThrowError('Chave PIX não encontrada');
    });
});


