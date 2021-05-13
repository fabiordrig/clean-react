import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login Page', () => {
  test('Should render with initial state', () => {
    const { getByTestId } = render(<Login/>)
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
})
