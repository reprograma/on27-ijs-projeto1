const ContaGold = require("./ContaGold");

const LIMITE_TRANSACAO_DIARIA_GOLD = 5000;

describe('Testes da classe Conta Gold', () => {
    test('Deve criar uma instância de Conta Gold com sucesso', () => {
        const contaGold = new ContaGold('4321', '54321', 5000);
        expect(contaGold).toBeInstanceOf(ContaGold);
        expect(contaGold.limiteTransacionalDiario).toBe(LIMITE_TRANSACAO_DIARIA_GOLD);
    });

    test('Deve criar Conta Gold com dados válidos e renda compatível', () => {
        const contaGold = new ContaGold('4321', '54321', 5000);
        expect(contaGold.getAgencia()).toBe('4321');
        expect(contaGold.getConta()).toBe('54321');
        expect(contaGold.getSaldo()).toBe(5000);
    });

    test('Deve lançar erro ao criar Conta Gold com dados inválidos', () => {
        expect(() => new ContaGold('12', '123456', -100)).toThrow('Dados inválidos para cadastro');
    });

    test('Deve depositar na Conta Gold corretamente', () => {
        const contaGold = new ContaGold('1994', '98045', 1000);
        contaGold.depositar(500);
        expect(contaGold.getSaldo()).toBe(1500);
    });

    test('Deve lançar erro ao tentar sacar valor maior que o saldo', () => {
        const contaGold = new ContaGold('1212', '12648', 1000);
        expect(() => contaGold.sacar(1200)).toThrow('Saldo insuficiente');
    });

    test('Deve sacar da Conta Gold corretamente', () => {
        const contaGold = new ContaGold('1111', '18945', 1000);
        contaGold.sacar(200);
        expect(contaGold.getSaldo()).toBe(800);
    });

    test('Deve lançar erro ao tentar sacar valor maior que o saldo', () => {
        const contaGold = new ContaGold('1456', '32145', 1000);
        expect(() => contaGold.sacar(1200)).toThrow('Saldo insuficiente');
    });

    test('Deve lançar erro ao transferir para conta inexistente', () => {
        let contaGold = new ContaGold('4444', '66645', 10000);
        expect(() => contaGold.transferir(12346, '1000', '-20')).toThrow('Conta não encontrada');
    });

    test('Deve lançar erro ao transferir Pix valor inválido', () => {
        const contaGold = new ContaGold('1234', '12345', 10000);
        contaGold.criarChavePix('21951639875', 'TELEFONE');
        expect(() => contaGold.transferirPix(-100, '21951639875', 'telefone')).toThrow('Valor inválido para transferência');
    });

    test('Deve lançar erro ao transferir Pix valor acima do saldo', () => {
        const contaGold = new ContaGold('1266', '12995', 10000);
        contaGold.criarChavePix('21951639875', 'TELEFONE');
        expect(() => contaGold.transferirPix(15000, '21951639875', 'telefone')).toThrow('Saldo insuficiente');
    });

    test('Deve depositar valor válido', () => {
        const contaGold = new ContaGold('1278', '12389', 10000);
        contaGold.depositar(500);
        expect(contaGold.getSaldo()).toBe(10500);
    });

    test('Deve lançar erro ao depositar valor inválido', () => {
        const contaGold = new ContaGold('1290', '12398', 10000);
        expect(() => contaGold.depositar(-100)).toThrow('Valor inválido para depósito');
    });

    test('Deve lançar erro ao transferir Pix para chave pix inexistente', () => {
        const contaGold = new ContaGold('1209', '12332', 10000);
        contaGold.criarChavePix('41951639875', 'TELEFONE');

        const transferenciaInvalida = () => {
            contaGold.transferirPix(1000, '41951639874', 'telefone');
        };

        expect(transferenciaInvalida).toThrowError('Chave PIX não encontrada');
    });

    test('Deve lançar erro ao tentar validar limite transacional diário excedido', () => {
        const contaGold = new ContaGold('1234', '56789', 7000);

        const operacaoInvalida = () => {
            contaGold.validarLimiteTransacional(8000);
        };

        expect(operacaoInvalida).toThrow('Limite transacional diário excedido');
    });

    test('Deve permitir operação dentro do limite transacional diário', () => {
        const contaGold = new ContaGold('1234', '56789', 5000);

        const operacaoValida = () => {
            contaGold.validarLimiteTransacional(5000);
        };

        expect(operacaoValida).not.toThrow();
    });

});
