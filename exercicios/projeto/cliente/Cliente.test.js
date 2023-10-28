const Cliente = require('./Cliente')
const Conta = require('../Conta/Conta')


describe("Teste da classe Cliente", () => {
    test("Verificar se a instância Client está sendo criada", () => {
        const cliente = new Cliente();
        // expect(cliente).toBeInstanceof(Cliente);
        expect(cliente instanceof Cliente).toBe(true);
    })

    test("Cadastrar cliente com dados válidos", () => {
        const cliente = new Cliente();
        const conta = new Conta();
        expect(cliente.registrar("Analu", "2323123232323242", 5000, conta)).toBe("Cliente Cadastrado")
    })

    test("Cadastrar cliente com dados invalidos", () => {
        const cliente = new Cliente()
        expect(() => cliente.registrar("Analu", "123232323", 5000, "não conta")).toThrow("Erro no cadastro, dados invalidos")
    })
})