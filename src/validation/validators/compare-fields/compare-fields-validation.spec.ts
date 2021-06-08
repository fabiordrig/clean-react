import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.datatype.string(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.datatype.string())
    const error = sut.validate('')

    expect(error).toEqual(new InvalidFieldError())
  })
  test('Should return false if field is not empty', () => {
    const input = faker.datatype.string()
    const sut = makeSut(input)
    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })
})
