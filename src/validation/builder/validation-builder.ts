import { FieldValidation } from '../protocols'
import { EmailValidation } from '../validators/email/email-validation'
import { MinLengthValidation } from '../validators/min-length/min-length-validation'
import { RequiredFieldValidation } from '../validators/required-field/required-field-validation'

export class ValidationBuilder {
  private constructor (private readonly name: string, private readonly validations: FieldValidation[]) {}

  static field (name: string): ValidationBuilder {
    return new ValidationBuilder(name, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.name))
    return this
  }

  min (minLength: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.name, minLength))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.name))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
