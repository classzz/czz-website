import React from 'react'
import './index.less'

function Loading({color}){
  const anm = '123'
  const styles = {backgroundColor:color}
  return (
    <div className="c-loading">
      {anm.split('').map((item,index)=>{
        return <div style={styles}  key={index}>{item}</div>
      })}
    </div>
  )
}
export default Loading