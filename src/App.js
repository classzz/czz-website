import React, {Suspense, lazy, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import {Header, Footer} from './Common'
import init from './hox'
import PagePlaceholder from 'component/pagePlaceholder'
const Homes = lazy(() => import('./Homes'))
const StateInfo = lazy(() => import('./StateInfo'))
const NotFound = lazy(() => import('./NotFound'))

function App() {
  const {page, getRate, resRate, setLang, data} = init()
  //init page data
  useEffect(() => {
    // const {search} = window.location
    // const paramsString = search.substring(1)
    // const searchParams = new URLSearchParams(paramsString)
    // setLang(searchParams.get('lang') || 1)
    // setPage(data[searchParams.get('lang') || lang])
    getRate()
    // resRate()
  }, [])

  return (
    <Router>
      <div className="czz">
        <Suspense fallback={<PagePlaceholder />}>
          <Header />
          <Switch>
            <Route path="/" exact component={props => <Homes {...props} />} />
            <Route path="/beacon" component={props => <StateInfo {...props} />} />
            <Route component={props => <NotFound {...props} />} />
          </Switch>
          <Footer />
        </Suspense>
      </div>
    </Router>
  )
}

export default App
