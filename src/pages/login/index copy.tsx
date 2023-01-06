import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const goAppPage = () => {
    console.log('click login.')
    // navigate('/')
  }

  const [formState, setFormState] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e: any, type: string) => {
    console.log(e.target.value, type, e)
    const value = e.target.value
    setFormState((prev) => ({ ...prev, [type]: value }))
  }
  const styles = {
    marginTop: '20px'
  }
  return (
    <div className='login'>
      <img src='' alt='' />
      <h2>{formState.username}</h2>
      <h2>{formState.password}</h2>
      <div className='ipt-con'>
        <Input placeholder='账号' value={formState.username} onChange={(e) => handleChange(e, 'username')} />
      </div>
      <div className='ipt-con' style={styles}>
        <Input.Password placeholder='密码' onChange={(e) => handleChange(e, 'password')} />
      </div>
      <div className='ipt-con' style={styles}>
        <Button type='primary' block={true} onClick={goAppPage}>
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
