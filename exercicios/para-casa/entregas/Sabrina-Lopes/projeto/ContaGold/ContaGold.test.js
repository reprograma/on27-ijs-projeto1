const ContaGold = require('./ContaGold');

describe('ContaGold', () => {
  let conta;
  let contaReceptora; 

  beforeEach(() => {
    conta = new ContaGold('1234', '12345', 10000, 6000); 
    contaReceptora = new ContaGold('5678', '67890', 5000, 6000); 
  });

  test('criar conta com renda mensal compatível', () => {
    expect(() => new ContaGold('1234', '12345', 10000, 6000)).not.toThrow();
  });

  test('criar conta com renda mensal menor que 5000', () => {
    expect(() => new ContaGold('1234', '12345', 10000, 4000)).toThrow('Renda mensal incompatível para conta Gold');
  });

  test('definir limite transacional diário válido', () => {
    expect(() => conta.setLimiteTransacionalDiario(7000)).not.toThrow();
    expect(conta.getLimiteTransacionalDiario()).toBe(7000);
  });

  test('definir limite transacional diário inválido', () => {
    expect(() => conta.setLimiteTransacionalDiario(-1000)).toThrow('Valor não atende ao limite diário');
  });

  test('sacar dentro do limite diário', () => {
    expect(() => conta.sacar(3000)).not.toThrow();
    expect(conta.getLimiteTransacionalRestante()).toBe(2000);
  });

  test('sacar excedendo o limite diário', () => {
    expect(() => conta.sacar(7000)).toThrow('Limite diário excedido');
  });

  test('transferir dentro do limite diário', () => {
    expect(() => conta.transferir(2000, contaReceptora.getAgencia(), contaReceptora.getConta())).not.toThrow();
    expect(conta.getLimiteTransacionalRestante()).toBe(3000);
  });

  test('transferir excedendo o limite diário', () => {
    expect(() => conta.transferir(6000, contaReceptora.getAgencia(), contaReceptora.getConta())).toThrow('Limite diário excedido');
  });

test('transferirPix excedendo o limite diário', () => {
    expect(() => conta.transferirPix(6000, '81995723197', 'tipo')).toThrow('Limite diário excedido'); 
  });
});