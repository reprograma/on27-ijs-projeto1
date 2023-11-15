const Conta = require("../../entregas/projeto/Conta/Conta.js");
const  Cliente = require("../../entregas/projeto/Cliente/Cliente.js");
const { ChavePixTipoCPF, ChavePixTipoEmail, ChavePixTipoTelefone} = require("./Conta/ChavePix.js");



const cliente = new Cliente();
const conta = new Conta();
cliente.registrarCliente('Heloiza', '123456789', 5000, conta);
conta.criarConta('1234', '12345', 2000);
console.log(`Nome: '${cliente.nome}', CPF: '${cliente.cpf}', Renda: ${cliente.renda}`);
console.log(`Conta: Agência: '${conta.getAgencia()}', Conta: '${conta.getConta()}', Saldo: ${conta.getSaldo()}`);


//Criar chave pix
const chavePixTipoCPF = new ChavePixTipoCPF('40814360879');
console.log("Chave Pix CPF criada com sucesso: ", chavePixTipoCPF.getTipoChavePix());

const chavePixTipoEmail = new ChavePixTipoEmail('teste@teste.com');
console.log("Chave Pix EMAIL criada com sucesso: ", chavePixTipoEmail.getTipoChavePix());

const chavePixTipoTelefone = new ChavePixTipoTelefone('11999999999');
console.log("Chave Pix TELEFONE criada com sucesso: ", chavePixTipoTelefone.getTipoChavePix());


