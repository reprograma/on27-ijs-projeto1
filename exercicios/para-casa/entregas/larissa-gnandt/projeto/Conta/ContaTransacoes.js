function validaValor(valor, mensagemDeErro) {
  if (valor > 0 && typeof valor === "number") {
    return;
  } else {
    throw new Error(mensagemDeErro);
  }
}

module.exports = validaValor;
