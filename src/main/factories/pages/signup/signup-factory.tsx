import React, { FC } from 'react'
import { makeSaveAccessToken } from '../../use-cases/save-access-token/save-access-token-factory'
import SignUp from '@/presentation/pages/signup/signup'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../use-cases/add-account/remote-add-account-factory'

export const makeSignUp: FC = () => {
  const url = `${process.env.API_URL}/signup`

  return (
    <SignUp
      addAccount={makeRemoteAddAccount(url)}
      validation={makeSignUpValidation()}
      saveAccessToken={makeSaveAccessToken()}
    />)
}
