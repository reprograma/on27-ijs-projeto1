## Objetivo geral 
Criar um sistema bancário

## Classes do projeto 
Cliente, Conta, ContaGold, ContaPremium, ContaStandard

### Classe Cliente
A classe Cliente representa um cliente no sistema, associando informações como nome, CPF, renda e uma conta bancária. A criação de um cliente só é permitida se uma conta válida for associada a ele.

**Atributos:**

- nome: Nome do cliente.

- #cpf: CPF do cliente (privado para proteção).

- #renda: Renda do cliente (privado para proteção).

- #conta: Conta bancária associada ao cliente.

**Métodos:**

- registrar(nome, cpf, renda, conta)

Registra um novo cliente no sistema, associando as informações fornecidas.
A criação do cliente é condicional à existência de uma conta válida.
Retorna uma mensagem indicando o sucesso do cadastro ou lança um erro se os dados forem inválidos.

### Classe Conta
A classe Conta representa uma conta bancária, permitindo operações como saque, depósito, transferência e criação de chaves Pix. Mantém controle dos atributos como número da agência, número da conta, saldo e chaves Pix associadas. Além disso, é responsável por gerenciar uma lista de contas existentes.

**Atributos:**

- #agencia: Número da agência da conta.

- #conta: Número da conta bancária.

- #saldo: Saldo atual da conta.

- chavesPix: Objeto contendo chaves Pix associadas à conta (CPF, e-mail e telefone).

- static listaContas: Lista estática contendo todas as instâncias da classe Conta.

**Métodos:**

- constructor(agencia, conta, saldo)

Responsável por inicializar os atributos da conta com os valores fornecidos.
Adiciona a conta à lista de contas existentes.

- destruir()

Método para remover a conta da lista de contas, liberando sua memória.

- criarConta(agencia, conta, saldo)

Cria uma nova conta com os parâmetros fornecidos.

Retorna uma mensagem indicando o sucesso da criação ou lança um erro se os dados forem inválidos.

- sacar(valor)

Realiza um saque na conta, subtraindo o valor do saldo.

Lança um erro se o valor for inválido ou se o saldo for insuficiente.

- depositar(valor)

Realiza um depósito na conta, adicionando o valor ao saldo.

Lança um erro se o valor for inválido.

- transferir(valor, agencia, conta)

Transfere um valor para outra conta.

Lança um erro se a conta receptora não for encontrada, se o valor for inválido ou se o saldo for insuficiente.

Retorna uma mensagem indicando o sucesso da transferência.

- getAgencia()

Retorna o número da agência da conta.

- getConta()

Retorna o número da conta.

- getSaldo()

Retorna o saldo atual da conta.

- setSaldo(novoSaldo)

Atualiza o saldo da conta com o novo valor fornecido.

- criarChavePix(chavePix, tipo)

Cria uma chave Pix associada ao tipo especificado (CPF, e-mail ou telefone).

Retorna uma mensagem indicando o sucesso da criação ou lança um erro se a chave for inválida.

### Classe ContaGold
A ContaGold é uma extensão da classe Conta, representando uma conta bancária de categoria "Gold". Herda as propriedades e métodos da classe base, Conta, e introduz funcionalidades específicas, como um limite de transação diário.

**Atributos:**

- limiteDeTransacao: Limite diário de transação para contas Gold.

**Métodos:**

- constructor(agencia, conta, saldo, renda)

Construtor da classe ContaGold que recebe parâmetros como agência, conta, saldo e renda.

Inicializa o limite de transação diário para contas Gold.

- criarConta(agencia, conta, saldo, renda)

Cria uma nova conta Gold com base nos parâmetros fornecidos.

A conta Gold só pode ser criada se a renda estiver dentro de uma faixa específica e os dados fornecidos forem válidos.

Retorna uma mensagem indicando o sucesso da criação ou lança um erro se os dados forem inválidos ou a renda não estiver dentro da faixa permitida.

- transferirGold(valor, agencia, conta)

Realiza uma transferência para outra conta, considerando o limite de transação diário para contas Gold.

Retorna uma mensagem indicando o sucesso da transferência ou um aviso se o valor exceder o limite de transação diário.


### Classe ContaPremium

A classe ContaPremium é uma extensão da classe Conta, representando uma conta bancária premium. Essa classe herda as propriedades e métodos da classe base, Conta, e introduz funcionalidades específicas para contas premium.

Atributos:

- Não adiciona novos atributos à classe

Métodos:

- constructor(agencia, conta, saldo, renda)
Construtor da classe ContaPremium que recebe parâmetros como agência, conta, saldo e renda.
Invoca o construtor da classe base usando super para inicializar os atributos herdados.

- criarConta(agencia, conta, saldo, renda)

Cria uma nova conta premium com base nos parâmetros fornecidos.

A conta premium só pode ser criada se a renda do titular for superior a R$ 18.000,00 e os dados fornecidos forem válidos.

Retorna uma mensagem indicando o sucesso da criação ou lança um erro se os dados forem inválidos.

- transferirPremium(valor, agencia, conta)

Realiza uma transferência para outra conta, utilizando o método de transferência da classe base.Retorna uma mensagem indicando o sucesso da transferência.

### Classe ContaStandard

A classe ContaStandard é uma extensão da classe Conta, representando uma conta bancária do tipo "Standard". Esta classe herda as propriedades e métodos da classe base, Conta, e adiciona funcionalidades específicas para contas Standard.

**Atributos:**

- limiteDeTransacao: Limite diário de transação para contas Standard.

**Métodos:**

- constructor(agencia, conta, saldo, renda)
  
Construtor da classe ContaStandard que recebe parâmetros como agência, conta, saldo e renda.

Inicializa o limite de transação diário para contas Standard.

- criarConta(agencia, conta, saldo, renda)
  
Cria uma nova conta Standard com base nos parâmetros fornecidos.

A conta Standard só pode ser criada se a renda do titular for inferior a R$ 5.000,00 e os dados fornecidos forem válidos.

Retorna uma mensagem indicando o sucesso da criação ou lança um erro se os dados forem inválidos.

- transferirStandard(valor, agencia, conta)

Realiza uma transferência para outra conta, considerando o limite de transação diário para contas Standard.

Retorna uma mensagem indicando o sucesso da transferência ou um aviso se o valor exceder o limite de transação diário.


## Como as classes se conversam entre si?

A relação entre a classe Cliente e a classe Conta é caracterizada por uma associação, onde um Cliente está vinculado a uma conta específica. Essa conta pode pertencer a uma das subclasses: ContaGold, ContaPremium ou ContaStandard, todas derivadas da classe base Conta. Essa herança permite que as subclasses herdem todos os métodos da classe Conta, enquanto incorporam o polimorfismo para adaptar limites diários de transações em seus métodos específicos. Assim, a modelagem utiliza o conceito de herança e polimorfismo para fornecer flexibilidade na criação de diferentes tipos de contas associadas a clientes.

## Como o objetivo final do projeto é atingido? 
Criando as classes e métodos conforme foram apontadas na documentação, o projeto do sistema bancário cumpre seu papel ao criar uma plataforma flexível e robusta para lidar com clientes, vários tipos de contas e suas operações. A programação orientada a objetos, usando herança e polimorfismo, ajuda a construir uma solução adaptável às necessidades do mundo bancário.
