
import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import faker from 'faker'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  const field = faker.datatype.string()
  const value = faker.datatype.string()
  const mockError = faker.datatype.string()

  test('Should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy(field)
    const fieldValidationSpy2 = new FieldValidationSpy(field)

    fieldValidationSpy2.error = new Error(mockError)
    const sut = new ValidationComposite([fieldValidationSpy, fieldValidationSpy2])

    const error = sut.validate(field, value)

    expect(error).toBe(mockError)
  })

  test('Should return first error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy(field)
    const fieldValidationSpy2 = new FieldValidationSpy(field)
    const internalError = faker.datatype.string()
    fieldValidationSpy.error = new Error(internalError)
    fieldValidationSpy2.error = new Error(mockError)

    const sut = new ValidationComposite([fieldValidationSpy, fieldValidationSpy2])

    const error = sut.validate(field, value)

    expect(error).toBe(internalError)
  })
})
