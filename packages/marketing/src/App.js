import React from'react'
import {Switch, Route, Router} from 'react-router-dom'
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles'

import Landing from './components/Landing'
import Pricing from './components/Pricing'

const generateClassName = createGenerateClassName({
  // задаем уникальный для этого приложение префикс для классов в продакшене,
  // чтобы в продакшене не было пересечения классов между приложениями
  // с одинаковыми библиотеками css-in-js
  productionPrefix: 'ma'
})

export default ({history}) => {
  return <div>
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Switch>
          <Route exact path='/pricing' component={Pricing} />
          <Route path='/' component={Landing} />
        </Switch>
      </Router>
    </StylesProvider>
  </div>
}

