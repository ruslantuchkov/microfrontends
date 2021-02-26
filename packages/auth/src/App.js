import React from'react'
import {Switch, Route, Router} from 'react-router-dom'
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles'

import Signin from './components/Signin'
import Signup from './components/Signup'

const generateClassName = createGenerateClassName({
  // задаем уникальный для этого приложение префикс для классов в продакшене,
  // чтобы в продакшене не было пересечения классов между приложениями
  // с одинаковыми библиотеками css-in-js
  productionPrefix: 'au'
})

export default ({history}) => {
  return <div>
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Switch>
          <Route path="/auth/signin" component={Signin} />
          <Route path="/auth/signup" component={Signup} />
        </Switch>
      </Router>
    </StylesProvider>
  </div>
}

