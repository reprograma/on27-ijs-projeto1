const ContaStandard = require('./ContaStandard');

describe('Testes da classe ContaStandard', () => {
  test('Verificar se instância foi criada corretamente', () => {
    const conta = new ContaStandard();
    expect(conta instanceof ContaStandard).toBe(true);
  });

  test('instanciar conta com valores válidos', () => {
    const conta = new ContaStandard('1234', '12345', 1000, 3000);
    expect(conta.getAgencia()).toBe('1234');
    expect(conta.getConta()).toBe('12345');
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test('retorna mensagem de sucesso ao criar conta', () => {
    const conta = new ContaStandard();
    expect(conta.criarConta('1234', '12345', 1000, 3000)).toBe(
      'Conta criada com sucesso',
    );
    expect(conta.getAgencia()).toBe('1234');
    expect(conta.getConta()).toBe('12345');
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test('retorna mensagem de erro ao tentar criar conta com dados inválidos', () => {
    const conta = new ContaStandard();
    expect(() => conta.criarConta('123454', '123', 1000, 3000)).toThrow(
      'Dados inválidos para cadastro',
    );
    conta.destruir();
  });

  test('retorna sucesso ao sacar 100 da conta', () => {
    const conta = new ContaStandard();
    conta.criarConta('1234', '12345', 1000, 3000);
    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);
    conta.destruir();
  });

  test('retorna mensagem de erro ao sacar -100 reais da conta', () => {
    const conta = new ContaStandard();
    conta.criarConta('1234', '12345', 1000, 3000);
    expect(() => conta.sacar(-100)).toThrow('Valor inválido para saque');
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test('retorna mensagem de erro ao sacar valor maior que o saldo da conta', () => {
    const conta = new ContaStandard();
    conta.criarConta('1234', '12345', 100, 3000);
    expect(() => conta.sacar(110)).toThrow('Saldo insuficiente');
    expect(conta.getSaldo()).toBe(100);
    conta.destruir();
  });

  test('retorna sucesso ao depositar 100 reais da conta', () => {
    const conta = new ContaStandard();
    conta.criarConta('1234', '12345', 1000, 3000);
    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);
    conta.destruir();
  });

  test('retorna mensagem de erro ao depositar -100 reais da conta', () => {
    const conta = new ContaStandard();
    conta.criarConta('1234', '12345', 1000, 3000);
    expect(() => conta.depositar(-100)).toThrow('Valor inválido para depósito');
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test('retorna mensagem de erro ao depositar valor não numérico', () => {
    const conta = new ContaStandard();
    conta.criarConta('1234', '12345', 1000, 3000);
    expect(() => conta.depositar(' ')).toThrow('Valor inválido para depósito');
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test('criar uma chave pix por cpf com sucesso', () => {
    const conta = new ContaStandard();
    const operacao = conta.criarChavePix('40814360879', 'CPF');
    expect(operacao).toBe('Chave pix por cpf criada com sucesso');
    expect(conta.chavesPix.cpf).toBe('40814360879');
    conta.destruir();
  });

  test('retornar mensagem de erro ao tentar cadastrar chave pix com cpf inválido', () => {
    const conta = new ContaStandard();
    expect(() => conta.criarChavePix('124861', 'CPF')).toThrow(
      'Erro: CPF inválido',
    );
    conta.destruir();
  });

  test('criar uma chave pix por email com sucesso', () => {
    const conta = new ContaStandard();
    const operacao = conta.criarChavePix('analu@email.com', 'EMAIL');
    expect(operacao).toBe('Chave pix por email criada com sucesso');
    expect(conta.chavesPix.email).toBe('analu@email.com');
    conta.destruir();
  });

  test('criar uma chave pix por telefone com sucesso', () => {
    const conta = new ContaStandard();
    const operacao = conta.criarChavePix('11951639874', 'TELEFONE');
    expect(operacao).toBe('Chave pix por telefone criada com sucesso');
    expect(conta.chavesPix.telefone).toBe('11951639874');
    conta.destruir();
  });

  test('retorna sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados válidos', () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();
    contaEmissor.criarConta('0001', '12345', 1000, 3000);
    contaReceptor.criarConta('0001', '78945', 500, 3000);
    const operacao = contaEmissor.transferir(100, '0001', '78945');
    expect(operacao).toBe('Tranferência realizada');
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);
    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test('Retorna sucesso ao fazer uma transferência pix com valor válido, saldo suficiente e chave válida', () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();
    contaEmissor.criarConta('0001', '12345', 1000, 3000);
    contaReceptor.criarConta('0001', '78945', 500, 3000);
    contaReceptor.criarChavePix('email@email.com', 'EMAIL');
    const operacao = contaEmissor.pix(100, 'email@email.com', 'email');
    expect(operacao).toBe('Transferência realizada');
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);
  });

  test('Retorna erro ao fazer uma transferência com valor que excede limite transacional', () => {
    const contaEmissor = new ContaStandard();
    const contaReceptor = new ContaStandard();
    contaEmissor.criarConta('0001', '12345', 1100, 3000);
    contaReceptor.criarConta('0001', '78945', 500, 3000);
    expect(() => contaEmissor.transferir(1100, '0001', '78945')).toThrow(
      'Valor excede limite transacional de R$ 1000',
    );
  });
});
