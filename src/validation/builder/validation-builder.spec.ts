
import { CompareFieldsValidation } from '../validators/compare-fields/compare-fields-validation'
import { EmailValidation } from '../validators/email/email-validation'
import { MinLengthValidation } from '../validators/min-length/min-length-validation'
import { RequiredFieldValidation } from '../validators/required-field/required-field-validation'
import { ValidationBuilder } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('field')])
  })
  test('Should return MinFieldValidation', () => {
    const validations = ValidationBuilder.field('field').min(3).build()

    expect(validations).toEqual([new MinLengthValidation('field', 3)])
  })
  test('Should return CompareFields', () => {
    const validations = ValidationBuilder.field('field').sameAs('fields').build()

    expect(validations).toEqual([new CompareFieldsValidation('field', 'fields')])
  })
  test('Should return EmailValidation', () => {
    const validations = ValidationBuilder.field('field').email().build()

    expect(validations).toEqual([new EmailValidation('field')])
  })
  test('Should return EmailValidation and MinFieldValidation', () => {
    const validations = ValidationBuilder.field('field').email().min(3).build()

    expect(validations).toEqual([new EmailValidation('field'), new MinLengthValidation('field', 3)])
  })
})
