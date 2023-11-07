const Conta = require("../Conta/Conta");
const ContaPremium = require("./ContaPremium");


test("Deve ser instancia de Conta", () => {
    contaPremium = new ContaPremium()
    expect(contaPremium).toBeInstanceOf(Conta);
});

test("Deve criar conta Premium com sucesso", () => {
    const contaPremium = new ContaPremium();
    expect(contaPremium.criarConta("1234", "12345", 1000, 19000)).toBe(
      "Conta criada com sucesso"
    );
    expect(contaPremium.getAgencia()).toBe("1234");
    expect(contaPremium.getConta()).toBe("12345");
    expect(contaPremium.getSaldo()).toBe(1000);
    expect(contaPremium.getRenda()).toBe(19000)
    expect(contaPremium.getLimiteDisponivel()).toBe(Infinity)
    expect(contaPremium.getLimiteDisponivel()).toBe(Infinity)
});

test("Nao deve criar conta Premium com sucesso, renda nao se encaixa", () => {
    const contaPremium = new ContaPremium();
    expect(()=> contaPremium.criarConta("1234", "12345", 1000, 4000)).toThrow(
      "Renda não se encaixa na conta Premium"
    );
});