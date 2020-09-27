import axios from 'axios'

// const domain = window.location.protocol + '//' + window.location.host
const service = axios.create({
  withCredentials: true,
  //baseURL: "http://18.191.52.63:8080",
  headers: { 'Access-Control-Allow-Origin': '*' }
})
service.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)
service.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)
export default {
  post(url, data={}) {
    return service({
      method: 'post',
      url,
      data,
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      // }
    })
  },
  get(url, params={}) {
    return service({
      method: 'get',
      url,
      params
    }).then(res=>{
      if(res.state == 200){
        return res.data
      }
    })
  }
}
