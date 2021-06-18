import { testChildCount, testButtonIsDisabled, testStatusForField, populateField, testElementExists } from '@/presentation/test/form-helper'
import { AddAccountSpy } from '@/presentation/test/mock-add-account'
import { ValidationSpy } from '@/presentation/test/mock-validation'
import { RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <SignUp
      validation={validationStub}
      addAccount={addAccountSpy}
    />
  )
  return {
    sut, addAccountSpy
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  name = faker.name.findName(),
  password = faker.internet.password()
): Promise<void> => {
  populateField(sut, 'email', email)
  populateField(sut, 'name', name)
  populateField(sut, 'password', password)
  populateField(sut, 'passwordConfirmation', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'name')
    testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'email')
    testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'password')
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'passwordConfirmation')
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'name')
    testStatusForField(sut, 'name')
  })

  test('Should show name state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'name')
    testStatusForField(sut, 'name')
  })

  test('Should show email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'email')
    testStatusForField(sut, 'email')
  })

  test('Should show password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'password')
    testStatusForField(sut, 'password')
  })

  test('Should show passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'passwordConfirmation')
    testStatusForField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateField(sut, 'email')
    populateField(sut, 'name')
    populateField(sut, 'password')
    populateField(sut, 'passwordConfirmation')
    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const email = faker.internet.email()
    const name = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, email, name, password)
    expect(addAccountSpy.params).toEqual({
      email, password, name, passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })
})
