import Login from '@/presentation/pages/login/login'
import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/global.scss'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
