const Cliente = require("./Cliente.js");
const Conta = require("../Conta/Conta.js");

describe("Teste da classe Cliente", () => {
  test("Verificar se instância Cliente está sendo criada", () => {
    const cliente = new Cliente();
    //expect(cliente).toBeInstanceOf(Cliente)
    expect(cliente instanceof Cliente).toBeTruthy();
  });

  test("Cadastrar cliente com dados válidos", () => {
    const cliente = new Cliente();
    const conta = new Conta();

    expect(
      cliente.registrarCliente("Verônica", "56814725688", 5000, conta)
    ).toBe("Cliente cadastrado com sucesso!");
  });

  test("Retorne mensagem de erro quando tenta cadastrar cliente sem uma conta", () => {
    const cliente = new Cliente();
    expect(() =>
      cliente.registrarCliente("Verônica", "56814725688", 5000, "não conta")
    ).toThrow("Error no cadastro. Dados inválidos!");
  });
});
