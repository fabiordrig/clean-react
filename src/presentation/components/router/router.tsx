
import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/global.scss'

type Props ={
  makeLogin: FC
  makeSignUp: FC
}

const Router: FC<Props> = ({ makeLogin, makeSignUp }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin}/>
        <Route path="/signup" exact component={makeSignUp}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
