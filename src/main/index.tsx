import Router from '@/presentation/components/router/router'
import React from 'react'
import ReactDOM from 'react-dom'
import { makeLogin } from './factories/pages/login/login-factory'
import { makeSignUp } from './factories/pages/signup/signup-factory'

ReactDOM.render(
  <Router
    makeLogin={makeLogin}
    makeSignUp={makeSignUp}
  />,
  document.getElementById('main')
)
