
import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import faker from 'faker'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const field = faker.datatype.string()
const value = faker.datatype.string()
const mockError = faker.datatype.string()

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [new FieldValidationSpy(field), new FieldValidationSpy(field)]

  const sut = new ValidationComposite(fieldValidationsSpy)

  return { sut, fieldValidationsSpy }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut()
    fieldValidationsSpy[1].error = new Error(mockError)

    const error = sut.validate(field, { [field]: value })

    expect(error).toBe(mockError)
  })

  test('Should return false if validation success', () => {
    const { sut } = makeSut()

    const error = sut.validate(field, { [field]: value })

    expect(error).toBeFalsy()
  })

  test('Should return first error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut()

    const internalError = faker.datatype.string()

    fieldValidationsSpy[1].error = new Error(mockError)
    fieldValidationsSpy[0].error = new Error(internalError)

    const error = sut.validate(field, { [field]: value })

    expect(error).toBe(internalError)
  })
})
