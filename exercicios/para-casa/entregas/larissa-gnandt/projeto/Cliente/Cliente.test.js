const Cliente = require("./Cliente");
const Conta = require("../Conta/Conta");

describe("Teste da classe Cliente", () => {
  test("Verificar se instância Cliente está sendo criada", () => {
    const cliente = new Cliente();

    expect(cliente instanceof Cliente).toBe(true);
  });

  test("Cadastrar cliente com dados válidos", () => {
    const cliente = new Cliente();
    const conta = new Conta();

    expect(cliente.registrar("Analu", "121564943121", 5000, conta)).toBe(
      "Cliente cadastrado com sucesso!"
    );
  });

  test("Retorne mensagem de erro quando tenta cadastrar cliente sem uma conta", () => {
    const cliente = new Cliente();

    expect(() =>
      cliente.registrar("Analu", "121564943121", 5000, "nao conta")
    ).toThrow("Erro no cadastro, dados inválidos!");
  });
});
