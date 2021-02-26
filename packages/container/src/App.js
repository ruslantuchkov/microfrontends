import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles'
import MarketingApp from './components/MarketingApp'
import AuthApp from './components/AuthApp'
import Header from './components/Header'

const generateClassName = createGenerateClassName({
  // задаем уникальный для этого приложение префикс для классов в продакшене,
  // чтобы в продакшене не было пересечения классов между приложениями
  // с одинаковыми библиотеками css-in-js
  productionPrefix: 'co'
})


export default () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route path="/auth" component={AuthApp} />
            <Route path="/" component={MarketingApp} />
          </Switch>
        </div>
      </BrowserRouter>
    </StylesProvider>
    )
}