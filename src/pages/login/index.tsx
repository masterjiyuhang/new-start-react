import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import './index.less'
import { loginAPI, loginApi } from '@/api/auth'
import { useAppSelector, useAppDispatch } from '@/hooks/core/StoreHooks'
import { setCurrentUserInfo, selectCurrentUser } from '@/store/userInfo/reducer'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '@/hooks/core/useLocalStorage'
import useSessionStorage from '@/hooks/core/useSessionStorage'

function Login() {
  const navigate = useNavigate()

  const [current, setCurrentUser] = useSessionStorage('currentUser', '')
  const [token, setToken] = useSessionStorage('token', '')

  const onFinish = (values: any) => {
    console.log('Success:', values)
    // login api
    login(values)
  }

  const userInfo = useAppSelector(selectCurrentUser)
  // console.log(userInfo, '用户信息')

  const dispatch = useAppDispatch()

  const login = async (params: any) => {
    // const res = await loginApi(params)
    const res = await loginAPI(params)
    console.log(res)

    if (res.success) {
      // 设置userInfo
      dispatch(
        setCurrentUserInfo({
          user: {
            userName: res.data.name ?? form.getFieldsValue().userName
          },
          token: res.data
        })
      )
      setCurrentUser(res.data.name || form.getFieldsValue().userName)
      setToken(res.data)
      // 登录跳转
      navigate('/admin/dashboard')
    } else {
      message.error(res.errorMessage)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  // console.log(form.getFieldsValue().userName)

  return (
    <div className='login'>
      <Form
        name='basic'
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ userName: 'admin', password: 'admin', remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item label='Username' name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
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
