import React from 'react'
import LogsItem from './LogsItem'
import './index.less'

export default function Logs() {
  const data = [
    { date: new Date(), title: '盖伦', desc: '转圈圈的德玛西亚' },
    { date: new Date(), title: '青钢影', desc: '优雅永不过时' }
  ]
  return (
    <div className='logs'>
      {data.map((item, index) => {
        return <LogsItem logsData={item} key={index} />
      })}
      {/* <LogsItem />
      <LogsItem />
      <LogsItem />
      <LogsItem /> */}
    </div>
  )
}
