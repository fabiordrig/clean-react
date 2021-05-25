import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly name: string) {}
  validate (value: string): Error {
    return new RequiredFieldError()
  }
}
