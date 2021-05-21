import { Validation } from '../protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage: string
  validate (name: string, value: string): string {
    return this.errorMessage
  }
}
