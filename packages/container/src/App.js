import React, {lazy, Suspense, useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles'
import Header from './components/Header'

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
  // задаем уникальный для этого приложение префикс для классов в продакшене,
  // чтобы в продакшене не было пересечения классов между приложениями
  // с одинаковыми библиотеками css-in-js
  productionPrefix: 'co'
})


export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard" component={DashboardLazy} />
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
    )
}