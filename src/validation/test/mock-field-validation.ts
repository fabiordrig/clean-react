import { FieldValidation } from '../protocols'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null
  constructor (readonly name: string) {}
  validate (value: object): Error {
    return this.error
  }
}
