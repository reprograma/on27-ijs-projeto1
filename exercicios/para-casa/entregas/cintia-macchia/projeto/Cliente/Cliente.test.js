//import Cliente from "./Cliente";
const { Cliente } = require('./Cliente')
const { Conta } = require("../Conta/Conta")


describe('Teste da calsse Cliente', () => {
    test("Verificar se a instância Cliente está sendo criada", () =>{
        const cliente = new Cliente();
        //alternativa: expect(cliente).toBeInstanceOf(Cliente)
        expect(cliente instanceof Cliente).toBe(true)
    })

    test("Cadastrar Cliente com dados válidos", ()=>{
        const cliente = new Cliente();    
        const conta = new Conta();
        expect(cliente.registrar("Analu", "11111111111", 5000, conta)).toBe("Cliente Cadastrado")
    })

    test("Deve dar erro ao cadastrar Cliente sem conta", () =>{
        const cliente = new Cliente();    
        //para retornar o erro certo precisa da arrow fuction antes de cliente
        expect(() => cliente.registrar("Analu", "11111111111", 5000, "nao conta")).toThrow("Erro no cadastro, dados inválidos")
    })
})