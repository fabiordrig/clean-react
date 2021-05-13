import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login Page', () => {
  test('Should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login/>)
    const spinner = getByTestId('error-wrap')
    expect(spinner.childElementCount).toBe(0)
  })
})
