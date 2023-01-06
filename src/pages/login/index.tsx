import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import './index.less'
import { loginApi } from '@/api/auth'
import { useAppSelector, useAppDispatch } from '@/hooks/core/StoreHooks'
import { setCurrentUserInfo, selectCurrentUser } from '@/store/userInfo/reducer'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '@/hooks/core/useLocalStorage'

function Login() {
  const navigate = useNavigate()

  const [current, setCurrentUser] = useLocalStorage('currentUser', '')

  const onFinish = (values: any) => {
    console.log('Success:', values)
    // login api
    login(values)
  }

  const userInfo = useAppSelector(selectCurrentUser)
  console.log(userInfo)

  const dispatch = useAppDispatch()

  const login = async (params: any) => {
    const res = await loginApi(params)
    console.log(res)
    // 设置userInfo
    dispatch(
      setCurrentUserInfo({
        user: res.data.name,
        token: res.data.token
      })
    )
    setCurrentUser(res.data.name)
    // 登录跳转
    navigate('/')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  console.log(form)

  return (
    <div className='login'>
      <Form
        name='basic'
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ username: 'admin', password: 'admin123', remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
