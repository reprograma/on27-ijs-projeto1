const Cliente = require("./Cliente");
const Conta = require("../Conta/Conta");

describe("Teste da classe Cliente", ()=>{
    test("verificar se instancia Cliente está sendo criada", ()=>{
        const cliente = new Cliente();
        //alternativa: expect(cliente).toBeInstanceOf(Cliente)
        expect(cliente instanceof Cliente).toBe(true);
    });

    test("cadastrar cliente com dados válidos", ()=>{
        const cliente = new Cliente();
        const conta = new Conta();

        expect(cliente.cadastrarCliente("Bia", "121564943121", conta)).toBe("Cliente Cadastrado")
    })

    test("retorne mensagem de erro quando tenta cadastrar cliente sem uma conta", ()=>{
        const cliente = new Cliente();

        expect(() => cliente.cadastrarCliente("Bia", "121564943121", "nao conta")).toThrow("Erro no cadastro, dados inválidos")
    
    })

    test("retorne mensagem de erro quando tentar cadastrar cliente sem passar o nome", ()=> {
        const cliente = new Cliente();
        const conta = new Conta();

        expect(() => cliente.cadastrarCliente("", "121564943121", conta)).toThrow("Erro no cadastro, dados inválidos. Nome do cliente não informado.")
    })

    test("retorne mensagem de erro quando tentar cadastrar cliente sem passar o cpf", ()=> {
        const cliente = new Cliente();
        const conta = new Conta();

        expect(() => cliente.cadastrarCliente("Bia", "", conta)).toThrow("Erro no cadastro, dados inválidos. CPF do cliente não informado.")
    })
})