import React, {createContext, useReducer} from 'react'
import AppReducer from './reducer'
import * as config from '../settings-code'

const ininState = {
  accessToken: null,
  ...config,
}

export const AppContext = createContext(ininState)

export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, ininState)

  function setState(payload) {
    dispatch({
      type: 'SET_STATE',
      payload,
    })
  }
  return (
    <AppContext.Provider value={{...state, dispatch, setState}}>
      {children}
    </AppContext.Provider>
  )
}
