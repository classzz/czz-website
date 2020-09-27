import React, {useEffect, Fragment,useState} from 'react'
import Icon from './Icon'
import Dropdown from 'react-dropdown'
import init from './hox'
import Loading from './component/Loading/index'
import {withRouter,Link} from 'react-router-dom'
import logo from './assets/logo.png'
//  backdrop-filter: saturate(180%) blur(5px);

const links = [
  {name: 'github', link: 'https://github.com/classzz'},
  {name: 'telegram', link: 'https://t.me/classzz'},
  {name: 'twitter', link: 'https://twitter.com/CzzDev'},
  {name: 'czzclub', link: 'http://czz.club'},
]

const Socice = ({data}) => {
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

export const Header = withRouter(props => {
  const [pageTop,setPageTop] = useState(0)
  const {data, setPage, setLanguage, rate, langArr, lang, page} = init()
  const isHome = props.location.pathname === '/'
  useEffect(()=>{
    window.addEventListener('scroll',(e)=>{
      const scrollTop = (e.srcElement ? e.srcElement.documentElement.scrollTop : false)  || window.pageYOffset || (e.srcElement ? e.srcElement.body.scrollTop : 0)
      setPageTop(scrollTop)
    })
  },[])

  return (
    <div className={isHome && pageTop<500 ? 'czz-top' : 'czz-top page'}>
      <div className="f-c-sb czz-head">
        {isHome ? (
          <Socice data={page} />
        ) : (
          <div className="logo-page">
            <Link to="/">
              <img src={logo} />
            </Link>
          </div>
        )}
        <div className="f-c">
          {rate.difficulty ? (
            <Fragment>
              <div className="cus">
                {page.cus.title}:<span>{rate['hash_rate']}H/s</span>
              </div>
              <div className="cus">
                {page.cus.sub}:<span>{rate.difficulty}M</span>
              </div>
            </Fragment>
          ) :  null}
          <div className="f-c czz-select">
            <div className="ico">
              <Icon icon="lang" />
            </div>
            <Dropdown
              className="czz-dropdown"
              controlClassName="czz-dropdown-input"
              menuClassName="czz-dropdown-cont"
              options={langArr}
              onChange={setLanguage}
              value={langArr[lang]}
              placeholder="Select an option"
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export const Footer = () => {
  const {page} = init()
  return (
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
  )
}
