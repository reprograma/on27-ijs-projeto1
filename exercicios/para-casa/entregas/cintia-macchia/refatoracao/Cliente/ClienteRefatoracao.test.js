//import Cliente from "./Cliente";
const { Cliente } = require('./Cliente')
const { Conta } = require("../Conta/Conta")


describe('Teste da classe Cliente', () => {
    let cliente;
    let conta;

    beforeEach(() => {
        cliente = new Cliente();
        conta = new Conta();
    });

    test("Verificar se a instância Cliente está sendo criada", () => {
        expect(cliente instanceof Cliente).toBe(true);
    });

    test("Cadastrar Cliente com dados válidos", () => {
        expect(cliente.registrar("Analu", "11111111111", 5000, conta)).toBe("Cliente Cadastrado");
    });

    test("Deve dar erro ao cadastrar Cliente sem conta", () => {
        expect(() => cliente.registrar("Analu", "11111111111", 5000, "nao conta")).toThrow("Erro no cadastro, dados inválidos");
    });
});






