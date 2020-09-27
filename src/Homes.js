import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import Icon from './Icon'
import init from './hox'

function Homes(){
  const {page,links} = init()
  return (
    <Fragment>
      <div className="czz-banner">
        <div className="bgs"></div>
        <div className="container">
          <h1>{page.banner.title}</h1>
          <p>{page.banner.subTitle}</p>
          <div className="czz-banner-button">
              <Link to='/beacon' >{page.banner.address}</Link>
            </div>
        </div>
        <div className="f-c-c logo">
          <div className="bg">
            <Icon icon="bg" />
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
          <a href={links[0].link} target="_bank">
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
    </Fragment>
  )
}
export default Homes