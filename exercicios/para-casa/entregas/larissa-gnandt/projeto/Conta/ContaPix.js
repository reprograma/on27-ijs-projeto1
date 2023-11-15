function validaCpf(chavePix, mensagemDeErro) {
  const regexCPF =
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
  if (regexCPF.test(chavePix)) {
    return true;
  } else {
    throw new Error(mensagemDeErro);
  }
}

function validaEmail(chavePix, mensagemDeErro) {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regexEmail.test(chavePix)) {
    return true;
  } else {
    throw new Error(mensagemDeErro);
  }
}

function validaTelefone(chavePix, mensagemDeErro) {
  const regexTelefone =
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
  if (regexTelefone.test(chavePix)) {
    return true;
  } else {
    throw new Error(mensagemDeErro);
  }
}

module.exports = { validaCpf, validaEmail, validaTelefone };
