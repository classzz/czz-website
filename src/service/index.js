import api from './ajax'

export const diffculty = (params ={}) => api.get(`/czzinterfaces/getdifficulty`, params)
export const hashRate = (params={}) => api.get(`/czzinterfaces/getHashRate`, params)
export const getStateInfo = (params={}) => api.get(`/czzinterfaces/getStateInfo`, params)
export const getStateInfoById = (params={}) => api.get(`/czzinterfaces/getStateInfoById`, params)
