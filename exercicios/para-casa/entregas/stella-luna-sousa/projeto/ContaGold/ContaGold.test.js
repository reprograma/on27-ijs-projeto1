const ContaGold = require('./ContaGold.js'); // Substitua pelo caminho correto para o arquivo ContaGold.js

describe('ContaGold', () => {
  let conta1;
  let conta2;

  beforeEach(() => {
    conta1 = new ContaGold('1234', '12345', 10000, 5000);
    conta2 = new ContaGold('1234', '12346', 10000, 5000);

    conta2.criarChavePix("11951639874", "TELEFONE");
  });

  test('criar conta com dados válidos', () => {
    expect(() => new ContaGold('1234', '12345', 10000, 5000)).not.toThrow();
  });

  test('criar conta com dados inválidos', () => {
    expect(() => new ContaGold('morango', 'cupcake', 10000, 5000)).toThrow('Dados inválidos para cadastro');
  });

  test('criar conta com renda mensal menor que 5000', () => {
    expect(() => new ContaGold('1234', '12345', 1000, 4000)).toThrow('Renda mensal incompatível para conta Gold');
  });

  test('sacar valor dentro do limite', () => {
    expect(() => conta1.sacar(100)).not.toThrow();
    expect(conta1.getLimiteTransacionalRestante()).toBe(4900);
  });

  test('sacar valor excedendo o limite', () => {
    expect(() => conta1.sacar(6000)).toThrow('Limite transacional diário excedido');
  });

  test('transferir valor dentro do limite', () => {
    expect(() => conta1.transferir(100, '1234', '12346')).not.toThrow();
    expect(conta1.getLimiteTransacionalRestante()).toBe(4900);
  });

  test('transferir valor excedendo o limite', () => {
    expect(() => conta1.transferir(6000, '1234', '12346')).toThrow('Limite transacional diário excedido');
  });

  test('transferirPix valor dentro do limite', () => {
    
    expect(() => conta1.transferirPix(1000, '11951639874', 'telefone')).not.toThrow();
    expect(conta1.getLimiteTransacionalRestante()).toBe(4000);
  });

  test('transferirPix valor inválido', () => {
    expect(() => conta1.transferirPix(-100, '11951639874', 'telefone')).toThrow('Valor inválido para transferencia');
  });

  test('transferirPix valor excedendo o limite', () => {
    expect(() => conta1.transferirPix(6000, '11951639874', 'telefone')).toThrow('Limite transacional diário excedido');
  });

  test('transferirPix para chave pix inexistente', () => {
    expect(() => conta1.transferirPix(1000, '11951639874', 'email')).toThrow('Chave PIX não encontrada');
  });

  test('depositar valor válido', () => {
    expect(() => conta1.depositar(100)).not.toThrow();
  });

  test('depositar valor inválido', () => {
    expect(() => conta1.depositar(-100)).toThrow('Valor inválido para depósito');
  });

});