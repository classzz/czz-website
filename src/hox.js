import {useState,useCallback,useEffect} from 'react'
import {createModel} from 'hox'
import {diffculty, hashRate} from './service/index'
import {data} from './data.js'

const langArr = ['简体中文','English']
const links = [
  {name: 'github', link: 'https://github.com/classzz'},
  {name: 'telegram', link: 'https://t.me/classzz'},
  {name: 'twitter', link: 'https://twitter.com/CzzDev'},
  {name: 'czzclub', link: 'http://czz.club'},
]

function useModel() {
const [lang, setLang] = useState(1)

const [page,setPage] = useState(data[lang])
const [rate, setRate] = useState({})

  // page refresh block Difficulty && block rate
  const resRate = () => {
    setInterval(() => {
      getRate()
    }, 10000)
  }

  const setLanguage = detail => {
    console.log(detail)
    const current = langArr.indexOf(detail.value)
    setLang(current)
    setPage(data[current])
  }

  //get block Difficulty && block rate
  const getRate = () => {
    Promise.all([diffculty({}), hashRate({})]).then(res => {
      setRate({...res[1], ...res[0]})
      return res
    })
  }

  // exoprt all model
  return {
    lang,
    page,
    data,
    rate,
    langArr,
    links,
    getRate,
    resRate,
    setPage,
    setLanguage
  }
}

export default createModel(useModel)
