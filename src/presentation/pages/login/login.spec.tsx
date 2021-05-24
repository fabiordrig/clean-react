import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Login from './login'
import faker from 'faker'
import { ValidationSpy } from '@/presentation/test/mock-validation'
import { AuthenticationSpy } from '@/presentation/test/mock-authentication'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (error?: string): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.errorMessage = error

  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy}/>)
  return { sut, validationSpy, authenticationSpy }
}

describe('Login Page', () => {
  afterEach(cleanup)

  test('Should render with initial state', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut(faker.datatype.string())

    const spinner = getByTestId('error-wrap')
    expect(spinner.childElementCount).toBe(0)

    const button = getByTestId('submit') as HTMLButtonElement
    expect(button.disabled).toBe(true)

    const email = getByTestId('email-status')
    expect(email.title).toBe(validationSpy.errorMessage)
    expect(email.textContent).toBe('🔴')

    const password = getByTestId('password-status')
    expect(password.title).toBe(validationSpy.errorMessage)
    expect(password.textContent).toBe('🔴')
  })

  test('Should show email error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    validationSpy.errorMessage = faker.datatype.string()

    const emailInput = getByTestId('email')

    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = getByTestId('email-status')

    expect(emailStatus.title).toBe(validationSpy.errorMessage)
  })

  test('Should show password error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    validationSpy.errorMessage = faker.datatype.string()

    const passwordInput = getByTestId('password')

    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = getByTestId('password-status')

    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
  })

  test('Should show valid email state if validation success', () => {
    const { sut: { getByTestId } } = makeSut()

    const emailInput = getByTestId('email')

    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = getByTestId('email-status')

    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if validation success', () => {
    const { sut: { getByTestId } } = makeSut()

    const passwordInput = getByTestId('password')

    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = getByTestId('password-status')

    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enabled disabled if form is valid', () => {
    const { sut: { getByTestId } } = makeSut()

    const emailInput = getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    const passwordInput = getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })

    const button = getByTestId('submit') as HTMLButtonElement
    expect(button.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut: { getByTestId } } = makeSut()

    const emailInput = getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    const passwordInput = getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })

    const button = getByTestId('submit')

    fireEvent.click(button)

    const spinner = getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()

    const emailInput = getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    const passwordInput = getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })

    const button = getByTestId('submit')

    fireEvent.click(button)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()

    const emailInput = getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    const passwordInput = getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })

    const button = getByTestId('submit')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication is form is invalid', () => {
    const error = faker.datatype.string()
    const { sut: { getByTestId }, authenticationSpy } = makeSut(error)

    const emailInput = getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    fireEvent.submit(getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })
})
