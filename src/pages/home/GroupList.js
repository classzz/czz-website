import React, {useState} from 'react'
import {useRequest, useLocalStorageState} from 'ahooks'
import useGlobal from '../../hooks/useGlobal'
import Pagination from 'rc-pagination'

export default function GroupList() {
  const [accessToken] = useLocalStorageState('accessToken')
  const {baseUrl} = useGlobal()
  const {data, error, loading} = useRequest(
    `${baseUrl}/groups?accesstoken=${accessToken}`,
    {
      formatResult: res => {
        console.log(res)
        let result = []
        for (let i in res) {
          result.push({id: i, name: res[i]})
        }
        console.log(result)
        return result
        //return Object.values(res).map((val,index) => { name:val,id:key[index]})
      },
    },
  )

  const pageChange = e => {
    console.log(e)
  }
  const [current, setCurrent] = useState(1)
  return (
    <div>
      <h2 className="group-title">Service Providers</h2>
      <div>
        {data &&
          data.map((item, index) => (
            <div className="group-item" key={index}>
              {item.name}
            </div>
          ))}
        {data && (
          <div className="page">
            <Pagination
              defaultPageSize={10}
              onChange={setCurrent}
              total={data.length}
              locale="en"
            />
          </div>
        )}
      </div>
    </div>
  )
}
