const Conta = require("../Conta/Conta");
const ContaStandart = require("./ContaStandard");



test("Deve ser instancia de Conta", () => {
    contaStandart = new ContaStandart()
    expect(contaStandart).toBeInstanceOf(Conta);
});

test("Deve criar conta Standart com sucesso", () => {
    const contaStandart = new ContaStandart();
    expect(contaStandart.criarConta("1234", "12345", 1000, 4999)).toBe(
      "Conta criada com sucesso"
    );
    expect(contaStandart.getAgencia()).toBe("1234");
    expect(contaStandart.getConta()).toBe("12345");
    expect(contaStandart.getSaldo()).toBe(1000);
    expect(contaStandart.getRenda()).toBe(4999)
    expect(contaStandart.getLimiteDisponivel()).toBe(1000)
    expect(contaStandart.getLimiteDisponivel()).toBe(1000)
});

test("Nao deve criar conta Standart com sucesso, renda nao se encaixa", () => {
    const contaStandart = new ContaStandart();
    expect(()=> contaStandart.criarConta("1234", "12345", 1000, 6000)).toThrow(
      "Renda não se encaixa na conta Standart"
    );
});


test('Deve realizar transfererencias com sucesso', () => {
    const contaEmissor = new ContaStandart();
    const contaReceptor = new Conta();
    contaEmissor.criarConta("1234", "12345", 1000, 4999)
    contaReceptor.criarConta("0001", "78945", 500 )
    contaEmissor.transferir(500, "0001", "78945")
    contaEmissor.transferir(400, "0001", "78945")
    expect(contaEmissor.getSaldo()).toBe(100)
    expect(contaReceptor.getSaldo()).toBe(1400)

    contaEmissor.destruir();
    contaReceptor.destruir();
})

test('Nao deve realizar transfererencias com sucesso, pois execede limite diario', () => {
    const contaEmissor = new ContaStandart();
    const contaReceptor = new Conta();
    contaEmissor.criarConta("0001", "12345", 1000, 4999)
    contaReceptor.criarConta("0001", "78945", 500 )
    contaEmissor.transferir(500, "0001", "78945")
    expect(()=> contaEmissor.transferir(600, "0001", '78945')).toThrow(
        "Valor execede o limite diario"
      );
    expect(contaEmissor.getSaldo()).toBe(500)
    expect(contaReceptor.getSaldo()).toBe(1000)

    contaEmissor.destruir();
    contaReceptor.destruir();
})