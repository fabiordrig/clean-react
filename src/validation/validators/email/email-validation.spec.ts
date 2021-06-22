import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import faker from 'faker'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const field = faker.datatype.string()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.domainName() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if email is valid', () => {
    const field = faker.datatype.string()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('Should return false if email is empty', () => {
    const field = faker.datatype.string()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
