import React, {lazy, Suspense} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles'
import Header from './components/Header'

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

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
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/auth" component={AuthLazy} />
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
    )
}