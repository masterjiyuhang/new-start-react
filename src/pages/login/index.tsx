import { Button, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const Login: React.FC = () => {
  const navigate = useNavigate()
  const goAppPage = () => {
    navigate('/')
  }
  return (
    <div className='login'>
      <img src='' alt='' />
      <div className='ipt-con'>
        <Input placeholder='账号' />
      </div>
      <div className='ipt-con'>
        <Input.Password placeholder='密码' />
      </div>
      <div className='ipt-con'>
        <Button type='primary' block={true} onClick={goAppPage}>
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
