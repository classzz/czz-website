import {lazy} from 'react'
const routes = [
  {
    name: 'home',
    exact: true,
    path: '/',
    compontent: lazy(() => import('./pages/home/index')),
  },
]
export default routes
