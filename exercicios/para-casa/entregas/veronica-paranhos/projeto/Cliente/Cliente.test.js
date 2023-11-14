const Cliente = require("./Cliente.js");
const Conta = require("../Conta/Conta.js");

describe("Teste da classe Cliente", () => {
  const cliente = new Cliente();
  test("Verificar se instância Cliente está sendo criada", () => {
    expect(cliente instanceof Cliente).toBeTruthy();
  });

  test("Cadastrar cliente com dados válidos", () => {
    const conta = new Conta();

    expect(
      cliente.registrarCliente("Verônica", "56814725688", 5000, conta)
    ).toBe("Cliente cadastrado com sucesso!");
  });

  test("Retorne mensagem de erro quando tenta cadastrar cliente sem uma conta", () => {
    expect(() =>
      cliente.registrarCliente("Verônica", "56814725688", 5000, "não conta")
    ).toThrow("Error no cadastro. Dados inválidos!");
  });
});
