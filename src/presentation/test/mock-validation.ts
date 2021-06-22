import { Validation } from '../protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage: string
  validate (name: string, value: object): string {
    return this.errorMessage
  }
}
