// let base64 = require('base-64')
import React, {useState} from 'react'
import base64 from 'base-64'
import OAuth2Login from './oauth/OAuth2Login'
import ErrorAlert from './ErrorAlert'
import {useLocalStorageState} from 'ahooks'
import {useHistory} from 'react-router-dom'

import {
  authorizationUrl,
  clientId,
  clientSecret,
  redirectUri,
  serverUrl,
} from '../../settings-code'

export default function AuthorizationPage(props) {
  const history = useHistory()
  // const [accessToken, setAccessToken] = useState(null)
  const [error, setError] = useState(null)
  const [groups, setGroups] = useState(null)
  const [accessToken, setAccessToken] = useLocalStorageState('accessToken')

  const onSuccess = ({code}) =>
    fetch(`${serverUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64.encode(`${clientId}:${clientSecret}`),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: `${code}`,
        redirect_uri: redirectUri,
        client_id: clientId,
      }).toString(),
    })
      .then(res => {
        console.log(props)
        return res.json()
      })
      .then(data => {
        if (data.access_token) {
          history.replace({
            pathname: '/',
          })
          setAccessToken(data.access_token)
        }
        return data
      })
      .then(data => {
        console.log(data)
        return fetch(
          `https://tips-fbyd7ynncq-uc.a.run.app/groups?accesstoken=${data.access_token}`,
        )
      })
      .then(res2 => {
        console.log(res2)
        res2.json()
      })
      .then(data2 => {
        console.log(data2)
        setGroups(data2)
      })
  return (
    <div className="column">
      <div>{error && <ErrorAlert error={error} />}</div>
      <OAuth2Login
        authorizationUrl={authorizationUrl}
        clientId={clientId}
        clientSecret={clientSecret}
        redirectUri={redirectUri}
        responseType="code"
        scope="openid intertrust_platform"
        state="ea6f652c-ae02-4863-ac92-df6ee68491d6"
        buttonText="Auth code login"
        onSuccess={onSuccess}
        onFailure={setError}
      />
      <div>{accessToken && <p> accessToken: {accessToken} </p>}</div>
    </div>
  )
}
