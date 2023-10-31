const Conta = require("../Conta/Conta.js");
const Cliente = require( "./Cliente.js")

describe("Teste da classe Cliente", () => {
    test("Verificar se a instância Cliente está sendo criada", () => {
        const cliente = new Cliente();
        expect(cliente instanceof Cliente).toBe(true);
    })

    test("Cadastrar cliente com dados válidos", () => {
        const cliente = new Cliente();
        const conta = new Conta();

        expect(cliente.registrar("Roxanie", "123456789", 5000, conta)).toBe("Cliente cadastrado")
    })

    test("cadastrar cliente com dados inválidos", () => {
        
        const cliente = new Cliente()
        expect(() => cliente.registrar("Roxanie", "123456789", 5000, "nao conta")).toThrow("Erro no cadastro, dados inválidos")
    })
})