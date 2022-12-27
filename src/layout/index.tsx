import { Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, TeamOutlined } from '@ant-design/icons'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const SysLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const navigate = useNavigate()
  const clickMenuItem = (e: any) => {
    navigate(e.key)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' style={{ background: '#eee', margin: 24, height: '32px' }} />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          onClick={clickMenuItem}
          items={[
            {
              key: '/',
              icon: <UserOutlined />,
              label: '首页'
            },
            {
              key: 'learn',
              icon: <VideoCameraOutlined />,
              label: '搜索页'
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: '更多功能',
              children: [
                {
                  key: 'home',
                  icon: <TeamOutlined />,
                  label: '功能页面1'
                },
                {
                  key: 'todolist',
                  icon: <TeamOutlined />,
                  label: 'TodoList'
                },
                {
                  key: 'car',
                  icon: <TeamOutlined />,
                  label: '车车'
                }
              ]
            }
          ]}></Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default SysLayout
