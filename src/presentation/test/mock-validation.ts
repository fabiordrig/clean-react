import { Validation } from '../protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage: string
  name: string
  value: string
  validate (name: string, value: string): string {
    this.name = name
    this.value = value
    return this.errorMessage
  }
}
