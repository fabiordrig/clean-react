import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Login from './login'
import faker from 'faker'
import { Validation } from '@/presentation/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object
  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)
  return { sut, validationSpy }
}

describe('Login Page', () => {
  afterEach(cleanup)

  test('Should render with initial state', () => {
    const { sut: { getByTestId } } = makeSut()
    const spinner = getByTestId('error-wrap')
    expect(spinner.childElementCount).toBe(0)

    const button = getByTestId('submit') as HTMLButtonElement
    expect(button.disabled).toBe(true)

    const email = getByTestId('email-status')
    expect(email.title).toBe('Campo obrigatório')
    expect(email.textContent).toBe('🔴')

    const password = getByTestId('password-status')
    expect(password.title).toBe('Campo obrigatório')
    expect(password.textContent).toBe('🔴')
  })

  test('Should call validation with correct email', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    const emailInput = getByTestId('email')

    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    expect(validationSpy.input).toEqual({ email })
  })

  test('Should call validation with correct password', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    const passwordInput = getByTestId('password')

    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })

    expect(validationSpy.input).toEqual({ password })
  })
})
