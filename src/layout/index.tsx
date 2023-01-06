import { Layout, Menu, theme as hhs, Avatar, Badge, Switch, MenuTheme, Tabs } from 'antd'
import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, TeamOutlined } from '@ant-design/icons'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import useLocalStorage from '@/hooks/core/useLocalStorage'
import { PrivateOutlet } from '@/components/PrivateOutlet'

// import SysTabs from './tabs'

const { Header, Sider, Content } = Layout

const SysLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [theme, setTheme] = useState<MenuTheme>('dark')
  const [current, setCurrent] = useLocalStorage('currentKey', '/')
  // const [tabList, setTabList] = useState([
  //   {
  //     title: '首页',
  //     key: '/',
  //     closable: false,
  //     path: '/'
  //   }
  // ])

  const {
    token: { colorBgContainer }
  } = hhs.useToken()

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  }

  const navigate = useNavigate()

  const clickMenuItem = (e: any) => {
    console.log(e.key, 'key 是什么')
    // switch (e.key) {
    //   case 'learn':
    //     console.log('当前key为learn')
    //     setTabList((pre) => pre.concat({ title: '搜索页', key: '/learn', closable: false, path: '/learn' }))
    //     break
    //   default:
    //     break
    // }
    setCurrent(e.key)
    navigate(e.key)
  }

  const defaultSelectedKeys = ['/']
  const menuItems = [
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
    },
    {
      key: '4',
      icon: <UploadOutlined />,
      label: '功能',
      children: [
        {
          key: 'able/download',
          icon: <TeamOutlined />,
          label: '下载页面'
        },
        {
          key: 'square',
          label: '正方形的脑袋'
        }
      ]
    }
  ]

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme={theme}>
        <div className='logo' style={{ background: '#eee', margin: 24, height: '32px' }}>
          {current}
        </div>

        <Switch checked={theme === 'dark'} onChange={changeTheme} checkedChildren='Dark' unCheckedChildren='Light' />
        <Menu
          theme={theme}
          mode='inline'
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={['3']}
          selectedKeys={[current]}
          onClick={clickMenuItem}
          items={menuItems}></Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}

          <span className='avatar-item'>
            <Badge count={1}>
              <Avatar shape='square' icon={<UserOutlined />} />
            </Badge>
          </span>
        </Header>

        {/* <SysTabs tabList={tabList} /> */}

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}>
          {/* <Outlet /> */}
          <PrivateOutlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default SysLayout
