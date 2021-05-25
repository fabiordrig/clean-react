
export class RequiredFieldError extends Error {
  constructor () {
    super('Campo obrigatório')
    this.name = 'RequiredFieldError'
  }
}

export class InvalidFieldError extends Error {
  constructor () {
    super('Valor invalido')
    this.name = 'InvalidFieldError'
  }
}
