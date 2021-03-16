import React, {useState, useEffect, lazy} from 'react'
import {hot} from 'react-hot-loader/root'
import Dropdown from 'react-dropdown'
import {data} from './data.js'
import {diffculty, hashRate} from './service/index'

const requireContext = require.context('./assets/svg', false, /\.svg/)
const requireAll = context => context.keys().map(context)
requireAll(requireContext)

function Icon({icon}) {
  const iconName = `#${icon}`
  return (
    <svg className="svg-icon" aria-hidden="true">
      <use xlinkHref={iconName}></use>
    </svg>
  )
}

const links = [
  {name: 'github', link: 'https://github.com/classzz'},
  // {name:'kakaotalk',link:''},
  {name: 'telegram', link: 'https://t.me/classzzoffical'},
  {name: 'twitter', link: 'https://www.twitter.com/class_zz'},
  {name: 'czzclub', link: 'http://czz.club'},
]

function Socice({data}) {
  return (
    <div className="czz-link">
      {links.map((item, index) => {
        return (
          <a
            key={index}
            className="czz-link-ico"
            target="_bank"
            href={item.link}
          >
            <Icon icon={item.name} />
          </a>
        )
      })}
      <a
        className="czz-link-ico czz-paper"
        target="_bank"
        href="http://czz.club/assets/uploads/files/czz-whitepaper-v1.3.pdf"
      >
        {data.whitePaper}
      </a>
    </div>
  )
}

function Home() {
  const langArr = [
    {label: '简体中文', value: 0},
    {label: 'English', value: 1},
  ]
  const [lang, setLang] = useState(1)
  const [rate, setRate] = useState({})
  const [page, setPage] = useState(data[lang])
  const setLangs = detail => {
    setPage(data[detail.value])
    setLang(detail.value)
    window.location.href = `./?lang=${detail.value}`
  }

  useEffect(() => {
    const {search} = window.location
    const paramsString = search.substring(1)
    const searchParams = new URLSearchParams(paramsString)
    setLang(searchParams.get('lang') || 1)
    setPage(data[searchParams.get('lang') || lang])
    rates()
    resRate()
  }, [])
  const resRate = () => {
    setInterval(() => {
      rates()
    }, 10000)
  }
  const rates = () => {
    Promise.all([diffculty({}), hashRate({})]).then(res => {
      setRate({...res[1], ...res[0]})
    })
  }
  return (
    <div className="czz">
      <div className="czz-top">
        <div className="f-c-sb czz-head">
          <Socice data={page} />
          <div className="f-c-c logo">
            <div className="bg">
              <Icon icon="bg" />
            </div>
          </div>
          <div className="f-c">
            <div className="cus">
              {page.cus.title}:<span>{rate['hash_rate']}H/s</span>
            </div>
            <div className="cus">
              {page.cus.sub}:<span>{rate.difficulty}M</span>
            </div>
            <div className="f-c czz-select">
              <div className="ico">
                <Icon icon="lang" />
              </div>
              <Dropdown
                className="czz-dropdown"
                controlClassName="czz-dropdown-input"
                menuClassName="czz-dropdown-cont"
                options={langArr}
                onChange={setLangs}
                value={langArr[lang]}
                placeholder="Select an option"
              />
            </div>
          </div>
        </div>
        <div className="czz-banner">
          <div className="bgs"></div>
          <div className="container">
            <h1>{page.banner.title}</h1>
            <p>{page.banner.subTitle}</p>
          </div>
        </div>
      </div>
      <div className="czz-part">
        <div className="container">
          {page.part1.map((item, index) => {
            const icon = `f${index + 1}`
            return (
              <div key={index} className="czz-part-block">
                <div className="czz-part-ico">
                  <Icon icon={icon} />
                </div>
                <div className="czz-part-contont">
                  <h2>{item.title}</h2>
                  <p>{item.name}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="f-c-c-c czz-about">
        <h2>{page.about.title}</h2>
        <p>{page.about.content}</p>
      </div>
      <div className="f-c-c czz-img-1">
        <Icon icon="s1" />
      </div>
      <div className="czz-ad">
        <div className="container">
          <h1 className="f-c-c">{page.address.title}</h1>
          <div className="czz-ad-block">
            {page.address.content.map((item, index) => {
              const icon = `n${index + 1}`
              return (
                <div className="czz-ad-item" key={index}>
                  <div className="czz-ad-img">
                    <Icon icon={icon} />
                  </div>
                  <div className="czz-ad-cont">
                    <p> {item}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="f-c-c czz-img">
        <Icon icon="s2" />
      </div>
      <div className="f-c-c-c czz-code">
        <h3>{page.code.title}</h3>
        <div className="czz-code-button">
          {' '}
          <a href={links[0].link} target="_bank">
            {' '}
            {page.code.button}
          </a>
        </div>
      </div>
      <div className="czz-task">
        <div className="container">
          <div className="f-c-c-c czz-task-head">
            <h2>{page.task.title}</h2>
            <p>{page.task.subTitle}</p>
          </div>
          <div className="f-c-sb">
            <div className="czz-task-cont">
              {page.task.content.map((item, index) => {
                if (index < 4) {
                  const icon = `t${index + 1}`
                  return (
                    <div className="czz-task-item" key={index}>
                      <div className="czz-task-img">
                        {' '}
                        <Icon icon={icon} />
                      </div>
                      <p> {item}</p>
                    </div>
                  )
                }
              })}
            </div>
          </div>
          <div>
            <div className="czz-task-block">
              <div className="czz-task-icon">
                <Icon icon="s3" />
              </div>
              <h3>{page.task.content[4]}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="czz-footer">
        <div className="czz-footer-bgs"></div>
        <div className="f-c-sb container">
          <Socice data={page} />
          <div className="f-c czz-footer-mail">
            <Icon style="width:30px;height:30px" icon="mail" />
            <div className="czz-footer-contact">
              <h4>{page.contact}</h4>
              <p>
                <a>czz@classzz.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default hot(Home)
