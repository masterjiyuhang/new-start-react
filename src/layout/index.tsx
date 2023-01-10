import { Layout, Menu, theme as hhs, Avatar, Badge, Switch, MenuTheme, Tabs, Dropdown } from 'antd'
import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, TeamOutlined } from '@ant-design/icons'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from '@/hooks/core/useLocalStorage'
import { PrivateOutlet } from '@/components/PrivateOutlet'
import logo from '../assets/logo.jpg'

// import SysTabs from './tabs'

const { Header, Sider, Content } = Layout

const SysLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [theme, setTheme] = useState<MenuTheme>('light')
  const [current, setCurrent] = useLocalStorage('currentKey', '/')
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useLocalStorage('defaultSelectedKeys', ['/'])

  /**
   * 查找当前选中的menu菜单的值
   * @param key
   * @returns
   */
  const findOpenKeys = (key: string, menus: any) => {
    const result: string[] = []
    const findInfo = (arr: any) => {
      arr.forEach((item: any) => {
        if (key.includes(item.key)) {
          result.push(item.key)
          if (item.children) {
            findInfo(item.children) // 使用递归的方式查找当前页面刷新之后的默认选中项
          }
        }
      })
    }
    findInfo(menus)
    return result
  }

  const {
    token: { colorBgContainer }
  } = hhs.useToken()

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'light' : 'dark')
  }

  const navigate = useNavigate()

  const clickMenuItem = (e: any) => {
    console.log(e, '点击了menu')
    setCurrent(e.key)
    setDefaultSelectedKeys(e.keyPath)
    navigate(e.key)
  }

  // const defaultSelectedKeys = ['/']
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

  const { pathname } = useLocation() // 获取location中的数据
  const tmpOpenKeys = findOpenKeys(pathname, menuItems)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme={theme}>
        <div>
          <h1 style={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: theme === 'dark' ? '#fff' : '#333' }}>阿三大苏打系统</h1>
        </div>
        <div className='logo'>
          <img src={logo} alt='cc' />
        </div>

        <Menu
          theme={theme}
          mode='inline'
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultSelectedKeys}
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
          <Dropdown
            menu={{
              items: [
                {
                  label: '个人中心',
                  key: 'userCenter'
                },
                {
                  label: (
                    <span
                      onClick={() => {
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                      }}>
                      切换模式
                    </span>
                  ),
                  key: 'changeTheme'
                },
                {
                  label: (
                    <span
                      onClick={() => {
                        // console.log('退出');
                        navigate('/login')
                      }}>
                      退出
                    </span>
                  ),
                  key: 'logOut'
                }
              ]
            }}>
            <div
              style={{
                width: '30px',
                borderRadius: '50%',
                float: 'right',
                marginTop: '16px',
                marginRight: '20px'
              }}>
              <Badge count={1}>
                <img
                  src={logo}
                  style={{
                    width: '30px',
                    borderRadius: '50%',
                    float: 'right'
                  }}
                />
              </Badge>
            </div>
            {/* <img
              src={logo}
              style={{
                width: '30px',
                borderRadius: '50%',
                float: 'right',
                marginTop: '16px',
                marginRight: '20px'
              }}
            /> */}
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}>
          <PrivateOutlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default SysLayout
