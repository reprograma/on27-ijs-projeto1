const ContaPremium = require('./ContaPremium.js'); // Substitua pelo caminho correto para o arquivo ContaGold.js

describe('ContaGold', () => {
  let conta1;
  let conta2;

  beforeEach(() => {
    conta1 = new ContaPremium('1234', '12345', 10000, 20000);
    conta2 = new ContaPremium('1234', '12346', 10000, 20000);

    conta2.criarChavePix("11951639874", "TELEFONE");
  });

  test('criar conta com dados válidos', () => {
    expect(() => new ContaPremium('1234', '12345', 10000, 20000)).not.toThrow();
  });

  test('criar conta com dados inválidos', () => {
    expect(() => new ContaPremium('morango', 'cupcake', 10000, 20000)).toThrow('Dados inválidos para cadastro');
  });

  test('criar conta com renda mensal menor que 18000', () => {
    expect(() => new ContaPremium('1234', '12345', 1000, 17000)).toThrow('Renda mensal incompatível para conta Premium');
  });

  test('sacar valor válido', () => {
    expect(() => conta1.sacar(100)).not.toThrow();
    expect(conta1.getSaldo()).toBe(9900);
  });

  test('sacar valor inválido', () => {
    expect(() => conta1.sacar(-100)).toThrow('Valor inválido para saque');
  });

  test('transferir valor', () => {
    expect(() => conta1.transferir(100, '1234', '12346')).not.toThrow();
    expect(conta1.getSaldo()).toBe(9900);
  });

  test('transferir valor inválido', () => {
    expect(() => conta1.transferir(-100, '1234', '12346')).toThrow('Valor inválido para transferencia');
  });

  test('transferirPix valor válido', () => {
    expect(() => conta1.transferirPix(1000, '11951639874', 'telefone')).not.toThrow();
  });

  test('transferirPix valor inválido', () => {
    expect(() => conta1.transferirPix(-100, '11951639874', 'telefone')).toThrow('Valor inválido para transferencia');
  });

  test('transferirPix valor acima do saldo', () => {
    expect(() => conta1.transferirPix(60000, '11951639874', 'telefone')).toThrow('Saldo insuficiente');
  });

  test('transferirPix para chave pix inexistente', () => {
    expect(() => conta1.transferirPix(1000, '11951639874', 'email')).toThrow('Chave PIX não encontrada');
  });

  test('depositar valor válido', () => {
    expect(() => conta1.depositar(100)).not.toThrow();
    expect(conta1.getSaldo()).toBe(10100);
  });

  test('depositar valor inválido', () => {
    expect(() => conta1.depositar(-100)).toThrow('Valor inválido para depósito');
  });

});