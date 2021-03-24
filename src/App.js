import React, {Suspense} from 'react'
import {AppProvider} from './context/state'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {useLocalStorageState} from 'ahooks'
import Authorization from './pages/authorization/index'
import Home from './pages/Home/index'
import routes from './routes'
import './assets/icon.scss'
import './pages/home/style.scss'

export default function App() {
  const [accessToken] = useLocalStorageState('accessToken')
  // const pages = routes.map((item, index) => {
  //   const {compontent: Page, ...rest} = item

  //   return (
  //     <Route
  //       {...rest}
  //       key={index}
  //       render={routerProps => {
  //         const redirectProps = {
  //           pathname: '/authorization',
  //         }
  //         return accessToken ? (
  //           <Page {...rest} {...routerProps} />
  //         ) : (
  //           <Redirect to={redirectProps} />
  //         )
  //       }}
  //     />
  //   )
  // })

  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route exact path="/">
            {accessToken ? <Home /> : <Redirect to="/authorization" />}
          </Route>
          <Route exact="false" path="/authorization">
            <Authorization />
          </Route>
        </Switch>
      </AppProvider>
    </BrowserRouter>
  )
}
