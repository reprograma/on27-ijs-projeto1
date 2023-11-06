const ContaPremium = require('./ContaPremium.js');

describe('ContaPremium', () => {
  // Teste para verificar se uma conta premium é criada corretamente
  test('Criação de ContaPremium válida', () => {
    const contaPremium = new ContaPremium('1234', '56789', 10000, 20000);
    expect(contaPremium.getAgencia()).toBe('1234');
    expect(contaPremium.getConta()).toBe('56789');
    expect(contaPremium.getSaldo()).toBe(10000);
  });

  // Teste para verificar se um erro é lançado quando a renda mensal é incompatível
  test('Erro ao criar ContaPremium com renda mensal incompatível', () => {
    expect(() => new ContaPremium('1234', '56789', 10000, 15000)).toThrow('Renda mensal incompatível para conta Premium');
  });

  // Teste para verificar se um erro é lançado quando os dados de cadastro são inválidos
  test('Erro ao criar ContaPremium com dados inválidos', () => {
    expect(() => new ContaPremium('12345', '6789', -5000, 20000)).toThrow('Dados inválidos para cadastro');
  });

  // Teste para verificar a funcionalidade de saque
  test('Saque dentro do limite permitido', () => {
    const contaPremium = new ContaPremium('1234', '56789', 10000, 20000);
    contaPremium.sacar(5000);
    expect(contaPremium.getSaldo()).toBe(5000);
  });

  
});