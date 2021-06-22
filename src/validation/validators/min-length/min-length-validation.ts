import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly name: string, private readonly minLength: number) {}
  validate (value: object): Error {
    return value[this.name]?.length < this.minLength ? new InvalidFieldError() : null
  }
}
