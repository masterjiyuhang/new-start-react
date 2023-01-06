import React from 'react'
import { Button } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Square() {
  const data = [
    {
      id: 1
    },
    {
      id: 2
    }
  ]

  const navigate = useNavigate()
  const gotoLink = () => {
    navigate('/square/3?name=jiyuhang', {
      state: {
        canshu1: 'asdadqwe',
        canshu2: 123,
        canshu3: {
          name: 'cch'
        }
      }
    })
  }

  return (
    <div>
      Square
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`/square/${item.id}`}>点击进入子页面{item.id}</Link>
            </li>
          )
        })}
      </ul>
      <Button onClick={gotoLink}>跳转搭配子页面3</Button>
      <Outlet />
    </div>
  )
}
