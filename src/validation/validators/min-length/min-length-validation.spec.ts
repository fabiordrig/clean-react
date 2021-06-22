import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 3)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.datatype.string()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.datatype.string(1) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.datatype.string()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if value doesnt exists', () => {
    const field = faker.datatype.string()
    const sut = makeSut(field)
    const error = sut.validate({ [faker.datatype.string()]: faker.internet.email() })
    expect(error).toBeFalsy()
  })
})
