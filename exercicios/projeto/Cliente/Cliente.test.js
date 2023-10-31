const Cliente = require("./Cliente");
const Conta = require("../Conta/Conta");

describe("testa a classe Cliente", () => {
  
  test("verifica se a classe cliente está sendo instanciada corretamente", () => {
    const cliente = new Cliente();

    expect(cliente instanceof Cliente).toBe(true);
    // expect(cliente instanceof Cliente).toBeTruthy()
  });

  test("verifica se os parâmetros da classe cliente são válidos", () => {
    const conta = new Conta();
    const cliente = new Cliente("Geice", 12346789, 5000, conta);

    expect(cliente.registrar("Geice", "23569814", 5000, conta)).toBe(
      "Cliente cadastrado com sucesso!"
    );
  });

  test("verifica se ao cadastrar um cliente com dados errados/inválidos apresenta um erro", () => {
    const cliente = new Cliente();

    expect(() => {
      cliente
        .registrar("Geice", "23569814", 5000, 'conta')
        .toThrow("Houve um erro! Cliente não cadastrado...");
    });
  });
});
