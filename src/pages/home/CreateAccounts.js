import React, {useState} from 'react'
import {useRequest, useLocalStorageState} from 'ahooks'
import useGlobal from '../../hooks/useGlobal'

export default function CreateAccounts(props) {
  const [accesstoken] = useLocalStorageState('accessToken')
  const {baseUrl} = useGlobal()
  const [spname, setSpName] = useState('')
  const [email, setEmail] = useState('')

  const {data, error, run, loading} = useRequest(
    {
      url: `${baseUrl}/serviceprovider`,
      method: 'post',
      body: {
        accesstoken,
        spname,
        email,
      },
    },
    {
      manual: true,
    },
  )

  return (
    <div className="mask">
      <div className="create">
        <h2>New Service Provider</h2>
        <div className="close ico-x" onClose={() => props.onClose(false)} />
        <div className="item tip">
          DB can be PostgreSQL / MySQL / SQL Server/ AWS Redshift / AWS Athena /
          ....
        </div>
        <div className="item">
          <input
            name="spname"
            placeholder="spname"
            onChange={e => setSpName(e.target.value)}
          />
        </div>
        <div className="item">
          <input
            name="email"
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button className="create-button" onClick={run}>
          New Accounts
        </button>
      </div>
    </div>
  )
}
