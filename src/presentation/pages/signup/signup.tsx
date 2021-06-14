import React from 'react'
import type { FC } from 'react'
import Styles from './signup-styles.scss'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/form-status/form-status'
import Context from '@/presentation/contexts/form/form-context'
import { Link } from 'react-router-dom'

const SignUp: FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader/>
      <Context.Provider value={ { state: {} } }>
        <form data-testid="form" className={Styles.form} >
          <h2>Criar conta</h2>
          <Input type="name" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button data-testid="submit" className={Styles.submit} type="submit">Entrar</button>
          <Link to="/login" className={Styles.link}>Voltar para login</Link>
        <FormStatus/>
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
