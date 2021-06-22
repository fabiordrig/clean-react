import { ValidationBuilder } from '@/validation/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { makeSignUpValidation } from './signup-validation-factory'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite correctly', () => {
    const composite = makeSignUpValidation()

    expect(composite).toEqual(
      new ValidationComposite([
        ...ValidationBuilder.field('name').required().min(5).build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
        ...ValidationBuilder.field('passwordConfirmation').required().sameAs('password').build()
      ])
    )
  })
})
