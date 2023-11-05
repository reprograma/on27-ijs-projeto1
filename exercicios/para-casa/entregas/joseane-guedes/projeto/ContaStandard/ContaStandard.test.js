const ContaStandard = require("./ContaStandard");


describe('Testes da classe Conta Standard', () => {
    test('Deve criar uma instância de Conta Standard com sucesso', () => {
        const contaStandard = new ContaStandard('4321', '54321', 5000);
        expect(contaStandard).toBeInstanceOf(ContaStandard);
    });

    test('Deve criar Conta Standard com dados válidos e renda compatível', () => {
        const contaStandard = new ContaStandard('4321', '54321', 1000);
        expect(contaStandard.getAgencia()).toBe('4321');
        expect(contaStandard.getConta()).toBe('54321');
        expect(contaStandard.getSaldo()).toBe(1000);
    });

    test('Deve lançar um erro ao criar Conta Standard com dados inválidos', () => {
        expect(() => new ContaStandard('12', '123456', -100)).toThrow('Dados inválidos para cadastro');
    });

    test('Deve depositar na Conta Standard corretamente', () => {
        const contaStandard = new ContaStandard('1234', '12345', 1000);
        contaStandard.depositar(500);
        expect(contaStandard.getSaldo()).toBe(1500);
    });

    test('Deve lançar erro ao tentar sacar valor maior que o saldo', () => {
        const contaStandard = new ContaStandard('1212', '12648', 1000);
        expect(() => contaStandard.sacar(1200)).toThrow('Saldo insuficiente');
    });

    test('Deve sacar da Conta Standard corretamente', () => {
        const contaStandard = new ContaStandard('1111', '18945', 1000);
        contaStandard.sacar(200);
        expect(contaStandard.getSaldo()).toBe(800);
    });

    test('Deve lançar erro ao tentar sacar valor maior que o saldo', () => {
        const contaStandard = new ContaStandard('1456', '32145', 1000);
        expect(() => contaStandard.sacar(1200)).toThrow('Saldo insuficiente');
    });

    test('Deve lançar erro ao transferir para conta inexistente', () => {
        let contaStandard = new ContaStandard('4444', '66645', 10000);
        expect(() => contaStandard.transferir(12346, '1000', '-20')).toThrow('Conta não encontrada');
    });

    test('Deve lançar erro ao transferir Pix valor inválido', () => {
        const contaStandard = new ContaStandard('1234', '12345', 10000);
        contaStandard.criarChavePix('21951639875', 'TELEFONE');
        expect(() => contaStandard.transferirPix(-100, '21951639875', 'telefone')).toThrow('Valor inválido para transferência');
    });

    test('Deve lançar erro ao transferir Pix valor acima do saldo', () => {
        const contaStandard = new ContaStandard('1266', '12995', 10000);
        contaStandard.criarChavePix('21951639875', 'TELEFONE');
        expect(() => contaStandard.transferirPix(15000, '21951639875', 'telefone')).toThrow('Saldo insuficiente');
    });

    test('Deve depositar valor válido', () => {
        const contaStandard = new ContaStandard('1278', '12389', 10000);
        contaStandard.depositar(500);
        expect(contaStandard.getSaldo()).toBe(10500);
    });

    test('Deve lançar erro ao depositar valor inválido', () => {
        const contaStandard = new ContaStandard('1290', '12398', 10000);
        expect(() => contaStandard.depositar(-100)).toThrow('Valor inválido para depósito');
    });

    test('Deve lançar erro ao transferir Pix para chave pix inexistente', () => {
        const contaStandard = new ContaStandard('1209', '12332', 10000);
        contaStandard.criarChavePix('41951639875', 'TELEFONE');

        const transferenciaInvalida = () => {
            contaStandard.transferirPix(1000, '41951639874', 'telefone');
        };

        expect(transferenciaInvalida).toThrowError('Chave PIX não encontrada');
    });
});
