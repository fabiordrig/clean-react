import faker from 'faker'
import { RequiredFieldError } from '../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.datatype.string())

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })
  test('Should return false if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.datatype.string())

    expect(error).toBeFalsy()
  })
})
