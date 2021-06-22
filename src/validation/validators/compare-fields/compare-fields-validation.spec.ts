import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field: string, valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.datatype.string()
    const fieldToCompare = faker.datatype.string()
    const sut = makeSut(field, fieldToCompare)

    const error = sut.validate({ [field]: faker.datatype.string(), [fieldToCompare]: faker.datatype.string() })

    expect(error).toEqual(new InvalidFieldError())
  })
  test('Should return false if field is not empty', () => {
    const input = faker.datatype.string()
    const field = faker.datatype.string()
    const fieldToCompare = faker.datatype.string()
    const sut = makeSut(field, fieldToCompare)

    const error = sut.validate({ [field]: input, [fieldToCompare]: input })

    expect(error).toBeFalsy()
  })
})
