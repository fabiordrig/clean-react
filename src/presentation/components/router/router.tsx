
import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/global.scss'
import SignUp from '@/presentation/pages/signup/signup'

type Props ={
  makeLogin: FC
}

const Router: FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin}/>
        <Route path="/signup" exact component={SignUp}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
