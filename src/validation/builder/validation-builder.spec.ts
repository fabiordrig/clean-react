
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
})
