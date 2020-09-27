import React, {useEffect, useState, Fragment} from 'react'
import {getStateInfoById, getStateInfo} from './service/index'
import useInitModel from './hox'
import './assets/stateinfo.less'
import Loading from './component/Loading'
import Icon from './Icon'

const coin = {
  b1: 'BTC',
  c2: 'BCH',
  b4: 'BSV',
  b8: 'LTC',
  b16: 'USDT',
  b32: 'DOGE',
}
const StateDetail = (props) =>{
  const {page} = useInitModel.data
  const {hd} = page.stateInfo.detail
  return (
    <div className="czz-state-mask">
      <div className="detail">
        <h1>BEACON{props.id}</h1>
        <div className="detail-head">
          {/* head:['灯塔地址','质押数(CZZ)','交易手续费','交易有效期','竞拍手续费','兑换销毁(CZZ)','竞拍销毁(CZZ)','白名单地址'], */}
        {/* hd:['exchange_id','address','toAddress_pk_hex','staking_amount','asset_flag','fee','keep_time','white_list','CoinBaseAddress'], */}
          <div>{hd[0]}：<span>{props.id}</span></div>
          <div>{hd[1]}：<span>{props.address}</span></div>
          <div>{hd[2]}：<span>{props.beacon_address}</span></div>
          <div>{hd[3]}：<span>{props.staking_amount}</span></div>
          <div>{hd[4]}：<span>{coin[`b${props.asset_flag}`]}</span></div>
          <div>{hd[5]}：<span>{props.fee}</span></div>
          <div>{hd[6]}：<span>{props.keep_time}h</span></div>
          <div>{hd[7]}：<span>{props.white_list}</span></div>
          <div>{hd[8]}：<span>{props.CoinBaseAddress && props.CoinBaseAddress.map((item,index) =><i key={index}>{item}</i>)}</span></div>
        </div>
      </div>
      <div onClick={()=>props.close(null)} className="detail-close"><div className="detail-close-ico"><Icon  icon="close" /></div></div>
    </div>
  )
}

function StateInfo() {
  const datas = useInitModel()
  const page = datas.page
  let emptys = ''
  for(let i =0 ;i<=90; i++) emptys += `1`
  const [light, setLight] = useState([])
  const [lightDetail, setLightDetail] = useState(null)
  const [current, setCurrent] = useState(0)
  const [load, setLoad] = useState(null)

  useEffect(() => {
    let arr = []
    try{
      getStateInfo().then(res => {
        setCurrent(res.length)
        if (res.length < 90) for (let i = res.length+1; i <= 90; i++) arr.push({ids: i})
        if (res) setLight(res.concat(arr))
      })
    }catch{
      for (let i = 1; i <= 90; i++) arr.push({id: i})
      if (res) setLight(arr)
    }
  }, ["light"])

  // getDetail
  const getDetail = async (id) => {
    if(id){
      setLoad(id)
      try{
        const res = await getStateInfoById({id})
        console.log(res)
        setLightDetail(res)
        setLoad(null)
      }catch{
        setLoad(null)
        alert('empty!!')
      }
    }
  }

  return (
    <Fragment>
      <div className="czz-beacon-head">
        <div className="container">
          <div>{page.stateInfo.statistical[0]}:<b>90</b></div>
          <div>
            {page.stateInfo.statistical[1]}:<b>{current}</b>
          </div>
          <div>{page.stateInfo.statistical[2]}:<b>0BTC 0USDT  0BCH</b></div>
        </div>
      </div>
      <div className="czz-state">
        <div className="container">
          {light.length>0 ?
            light.map((item, index) => {
              const loading = load === item.id ? <div className="czz-state-item-loading"><Loading color="#181E3C" /></div> : null
              return (
                <div key={index} className={item.beacon_address ? 'czz-state-item active' : 'czz-state-item empty'} onClick={()=>getDetail(item.id)}>
                  <div>
                    <h2>BEACON{item.id || item.ids} { loading }</h2>
                    {item.beacon_address ? (
                      <>
                        <div className="czz-state-p">
                          {item['beacon_address']}
                        </div>
                        <div className="czz-state-p">
                          {page.stateInfo.support}:{coin[`b${item.asset_flag}`]}
                        </div>
                      </>
                    ) : <div className="czz-state-reg">{page.stateInfo.reg}</div>}
                  </div>
                  
                </div>
              )
            }) : emptys.split('').map((item,index) => {
              return <div key={index} className="czz-state-item normal"><Loading color="#eee" key={index} /></div>
            }) }
          
        </div>
      </div>
      {lightDetail ?  <StateDetail {...lightDetail  } close={id=>setLightDetail(id)} /> : null}
    </Fragment>
  )
}
export default StateInfo
