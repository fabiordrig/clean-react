import React, { useState } from 'react'
import type { FC } from 'react'
import Styles from './login-styles.scss'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/form-status/form-status'
import Context from '@/presentation/contexts/form/form-content'

const Login: FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <Context.Provider value={ { state, errorState } }>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
        <FormStatus/>
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
