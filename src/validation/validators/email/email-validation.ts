import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export class EmailValidation implements FieldValidation {
  constructor (readonly name: string) {}

  validate (value: string): Error {
    return validateEmail(value) ? null : new InvalidFieldError()
  }
}
