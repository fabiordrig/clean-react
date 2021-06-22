import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import Styles from './signup-styles.scss'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/form-status/form-status'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases/add-account'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      )
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const disabled = !!state.emailError ||
  !!state.passwordError ||
  !!state.nameError ||
  !!state.passwordConfirmationError

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    const { name, email, password, passwordConfirmation, isLoading } = state
    try {
      if (isLoading || disabled) {
        return
      }
      event.preventDefault()

      setState({
        ...state, isLoading: true
      })

      const { accessToken } = await addAccount.add({ name, email, password, passwordConfirmation })
      await saveAccessToken.save(accessToken)
      history.replace('/')
    } catch (error) {
      setState({ ...state, mainError: error.message, isLoading: false })
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button
            data-testid="submit"
            disabled={disabled}
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <Link replace to="/login" data-testid="login" className={Styles.link}>Voltar Para Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
