// const regex criada mas ainda sem uso
const REGEX = {
    cpf : /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    telefone: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
 }

 const LIMITE_TRANSACIONAL = {
    standard: 1000.00,
    gold: 5000.00,
 }

 const RENDA = {
    standard: 4999.99,
    gold_minimo: 5000.00,
    gold_maximo: 17999.99,
    premium: 18000.00
 }