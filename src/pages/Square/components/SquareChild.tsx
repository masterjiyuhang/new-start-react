import { Input } from 'antd'
import React from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'

export default function SquareChild() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const locationParams = useLocation()

  console.log(locationParams, 'locationParams')

  console.log(searchParams)
  return (
    <div>
      <h1>SquareChild-{id}</h1>
      <Input
        value={searchParams.get('name') ?? ''}
        onChange={(e) => {
          const currentValue = e.target.value
          if (currentValue) {
            setSearchParams({ name: currentValue })
          } else {
            setSearchParams({})
          }
        }}></Input>
      <h3>路由中的name参数: {searchParams.get('name') ?? '没有'}</h3>
    </div>
  )
}
