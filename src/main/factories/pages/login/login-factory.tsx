import React, { FC } from 'react'
import Login from '@/presentation/pages/login/login'
import { makeRemoteAuthentication } from '../../use-cases/authentication/remote-authentication-factory'
import { makeValidation } from './login-validation-factory'

export const makeLogin: FC = () => {
  const url = 'process.env.API_URL/login'

  return (<Login authentication={makeRemoteAuthentication(url)} validation={makeValidation()} />)
}
