import Router from '@/presentation/components/router/router'
import React from 'react'
import ReactDOM from 'react-dom'
import { makeLogin } from './factories/pages/login/login-factory'

ReactDOM.render(
  <Router
    makeLogin={makeLogin}
  />,
  document.getElementById('main')
)
