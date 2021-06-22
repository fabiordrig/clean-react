
import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly name: string, private readonly valueToCompare: string) {}
  validate (value: object): Error {
    return value[this.name] !== value[this.valueToCompare] ? new InvalidFieldError() : null
  }
}
