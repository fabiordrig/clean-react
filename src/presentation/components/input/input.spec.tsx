import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

describe('Input', () => {
  test('Should begin with readOnly', () => {
    const { getByTestId } = render(
    <Context.Provider value={{ state: {} }}>
      <Input name="field"/>
    </Context.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
  test('Should remove readOnly', () => {
    const { getByTestId } = render(
    <Context.Provider value={{ state: {} }}>
      <Input name="field"/>
    </Context.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
