const ContaStandard = require('./ContaStandard.js');

describe('ContaStandard', () => {
  let contaA;
  let contaB;

  beforeEach(() => {
    contaA = new ContaStandard('1234', '56789', 1000, 3000);
    contaB = new ContaStandard('9876', '54321', 0, 0);
  });

  test('criar uma conta válida', () => {
    expect(contaA).toBeInstanceOf(ContaStandard);
    expect(contaA.getSaldo()).toBe(1000);
    expect(contaA.getLimiteTransacionalRestante()).toBe(1000);
  });

  test('criar uma conta com dados inválidos', () => {
    expect(() => new ContaStandard('123', '5678', -100, 6000)).toThrow('Dados inválidos para cadastro');
  });

  test('sacar valor dentro do limite', () => {
    expect(() => contaA.sacar(200)).not.toThrow();
    expect(contaA.getSaldo()).toBe(800);
    expect(contaA.getLimiteTransacionalRestante()).toBe(800);
  });

  test('sacar valor excedendo o limite', () => {
    expect(() => contaA.sacar(1200)).toThrow('Limite transacional diário excedido');
    expect(contaA.getSaldo()).toBe(1000);
    expect(contaA.getLimiteTransacionalRestante()).toBe(1000);
  });

  test('transferir valor dentro do limite', () => {
    expect(() => contaA.transferir(200, '9876', '54321')).not.toThrow();
    expect(contaA.getSaldo()).toBe(800);
    expect(contaA.getLimiteTransacionalRestante()).toBe(800);
  });

  test('transferir para conta inexistente', () => {
    expect(() => contaA.transferir(200, '9999', '11111')).toThrow('Conta não encontrada');
    expect(contaA.getSaldo()).toBe(1000);
    expect(contaA.getLimiteTransacionalRestante()).toBe(1000);
  });

  test('transferir valor excedendo o limite', () => {
    expect(() => contaA.transferir(1200, '9876', '54321')).toThrow('Limite transacional diário excedido');
    expect(contaA.getSaldo()).toBe(1000);
    expect(contaA.getLimiteTransacionalRestante()).toBe(1000);
  });

  test('transferirPix valor dentro do limite', () => {
    expect(() => contaA.transferirPix(200, '81995723197', 'TELEFONE')).not.toThrow();
    expect(contaA.getSaldo()).toBe(800);
    expect(contaA.getLimiteTransacionalRestante()).toBe(800);
  });

  test('transferirPix para chave PIX inexistente', () => {
    expect(() => contaA.transferirPix(200, 'chaveInexistente', 'TIPO_INEXISTENTE')).toThrow('Chave PIX não encontrada');
    expect(contaA.getSaldo()).toBe(1000);
    expect(contaA.getLimiteTransacionalRestante()).toBe(1000);
  });

  test('depositar valor válido', () => {
    expect(() => contaA.depositar(200)).not.toThrow();
    expect(contaA.getSaldo()).toBe(1200);
    expect(contaA.getLimiteTransacionalRestante()).toBe(1200);
  });

  test('depositar valor inválido', () => {
    expect(() => contaA.depositar(-200)).toThrow('Valor inválido para depósito');
    expect(contaA.getSaldo()).toBe(1000);
    expect(contaA.getLimiteTransacionalRestante()).toBe(1000);
  });
});