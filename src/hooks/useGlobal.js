import { useContext } from 'react'
import { AppContext } from '../context/state'

const useGlobal = () => {
  return useContext(AppContext)
}

export default useGlobal
