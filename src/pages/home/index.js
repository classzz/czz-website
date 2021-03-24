import React, {useState, Fragment} from 'react'
import GroupList from './GroupList'
import CreateAccounts from './CreateAccounts'
import useGlobal from '../../hooks/useGlobal'
import {useRequest, useLocalStorageState} from 'ahooks'

export default function Home() {
  const {baseUrl} = useGlobal()
  const [createStatus, setCreateStatus] = useState(false)
  const [accessToken] = useLocalStorageState('accessToken')
  const {data: status, error, loading} = useRequest(
    `${baseUrl}/status?accesstoken=${accessToken}`,
  )
  console.log(status)
  return (
    <Fragment>
      <div className="t-head">
        <h2>Reporting Express</h2>
        <div className="t-head-container">Conetent Aggregator</div>
        <div className="user">
          Admmin
          <i className="ico ico-meh" />
        </div>
      </div>
      <div className="t-container">
        <div className="t-side">
          <div className="create-button" onClick={() => setCreateStatus(true)}>
            Create New Service Provider
          </div>
        </div>
        <div className="t-content">
          <GroupList />
        </div>
      </div>
      {createStatus && (
        <CreateAccounts onClose={() => setCreateStatus(false)} />
      )}
    </Fragment>
  )
}
