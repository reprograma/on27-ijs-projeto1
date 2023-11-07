const Conta = require("../Conta/Conta");
const ContaGold = require("../ContaGold/ContaGold");


test("Deve ser instancia de Conta", () => {
    contaGold = new ContaGold()
    expect(contaGold).toBeInstanceOf(Conta);
});

test("Deve criar conta Gold com sucesso", () => {
    const contaGold = new ContaGold();
    expect(contaGold.criarConta("1234", "12345", 1000, 5000)).toBe(
      "Conta criada com sucesso"
    );
    expect(contaGold.getAgencia()).toBe("1234");
    expect(contaGold.getConta()).toBe("12345");
    expect(contaGold.getSaldo()).toBe(1000);
    expect(contaGold.getRenda()).toBe(5000)
    expect(contaGold.getLimiteDisponivel()).toBe(5000)
    expect(contaGold.getLimiteDisponivel()).toBe(5000)
});

test("Nao deve criar conta Gold com sucesso, renda nao se encaixa", () => {
    const contaGold = new ContaGold();
    expect(()=> contaGold.criarConta("1234", "12345", 1000, 4000)).toThrow(
      "Renda não se encaixa na conta Gold"
    );
});

test('Deve realizar transfererencias com sucesso', () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new Conta();
    contaEmissor.criarConta("0001", "12345", 6000, 5000)
    contaReceptor.criarConta("0001", "78945", 500 )
    contaEmissor.transferir(2000, "0001", "78945")
    contaEmissor.transferir(3000, "0001", "78945")
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(5500)

    contaEmissor.destruir();
    contaReceptor.destruir();
})

test('Nao deve realizar transfererencias com sucesso, pois execede limite diario', () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new Conta();
    contaEmissor.criarConta("0001", "12345", 6000, 5000)
    contaReceptor.criarConta("0001", "78945", 500 )
    contaEmissor.transferir(2000, "0001", "78945")
    contaEmissor.transferir(3000, "0001", "78945")
    console.log(contaEmissor.getLimiteDisponivel())
    expect(()=> contaEmissor.transferir(1000, "0001", '78945')).toThrow(
        "Valor execede o limite diario"
      );
    expect(contaEmissor.getSaldo()).toBe(1000)
    expect(contaReceptor.getSaldo()).toBe(5500)

    contaEmissor.destruir();
    contaReceptor.destruir();
})