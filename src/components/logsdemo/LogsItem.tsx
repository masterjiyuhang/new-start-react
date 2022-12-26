import React from 'react'

function LogsItem(props: any) {
  console.log(props)
  const { logsData } = props
  console.log(logsData, props.logsData)
  return (
    <div className='item'>
      <div className='date'>
        <div className='month'>{logsData.date.getMonth()}月</div>
        <div className='day'>{logsData.date.getDate()}</div>
      </div>
      <div className='content'>
        <h2 className='title'>{logsData.title}</h2>
        <div className='desc'>{logsData.desc}</div>
      </div>
    </div>
  )
}

export default LogsItem
