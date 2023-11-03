const ContaStandard = require('./ContaStandard.js'); // Substitua pelo caminho correto para o arquivo ContaGold.js

describe('ContaGold', () => {
  let conta1;
  let conta2;

  beforeEach(() => {
    conta1 = new ContaStandard('1234', '12345', 1000, 2000);
    conta2 = new ContaStandard('1234', '12346', 1000, 2000);

    conta2.criarChavePix("11951639874", "TELEFONE");
  });

  test('criar conta com dados válidos', () => {
    expect(() => new ContaStandard('1234', '12345', 1000, 2000)).not.toThrow();
  });

  test('criar conta com dados inválidos', () => {
    expect(() => new ContaStandard('morango', 'cupcake', 1000, 2000)).toThrow('Dados inválidos para cadastro');
  });

  test('criar conta com renda mensal maior que 5000', () => {
    expect(() => new ContaStandard('1234', '12345', 1000, 5500)).toThrow('Renda mensal incompatível para conta Standard');
  });

  test('sacar valor dentro do limite', () => {
    expect(() => conta1.sacar(100)).not.toThrow();
    expect(conta1.getLimiteTransacionalRestante()).toBe(900);
  });

  test('sacar valor excedendo o limite', () => {
    expect(() => conta1.sacar(6000)).toThrow('Limite transacional diário excedido');
  });

  test('transferir valor dentro do limite', () => {
    expect(() => conta1.transferir(100, '1234', '12346')).not.toThrow();
    expect(conta1.getLimiteTransacionalRestante()).toBe(900);
  });

  test('transferir valor excedendo o limite', () => {
    expect(() => conta1.transferir(6000, '1234', '12346')).toThrow('Limite transacional diário excedido');
  });

  test('transferirPix valor dentro do limite', () => {
    
    expect(() => conta1.transferirPix(600, '11951639874', 'telefone')).not.toThrow();
    expect(conta1.getLimiteTransacionalRestante()).toBe(400);
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