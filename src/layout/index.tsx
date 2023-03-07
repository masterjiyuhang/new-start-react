import { Layout, Menu, theme as hhs, Badge, MenuTheme, Dropdown, Breadcrumb, message } from 'antd'
import type { MenuProps } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import useSessionStorage from '@/hooks/core/useSessionStorage'
import { context } from '@/components/MyProvider'

import SysTabs from './tabs'

const { Header, Sider, Content } = Layout

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

/**
 * 获取当前选中的数据的所有父节点
 * @param key
 * @returns
 */
const findDeepPath = (key: string, menus: any) => {
  const result: any = [] // 处理完所有的menu数据成为一个一维数组
  const findInfo = (arr: any) => {
    arr.forEach((item: any) => {
      const { children, ...info } = item
      result.push(info)
      if (children) {
        findInfo(children) // 递归处理子节点
      }
    })
  }
  findInfo(menus)
  // 根据当前传递的key值过滤数据，获取到当前用来显示的menu item数据
  const tmpData = result.filter((item: any) => key.includes(item.key))
  if (tmpData.length > 0) {
    // return [{ label: '首页', key: '/admin/dashboard' }, ...tmpData]
    return [...tmpData]
  }
  return []
}

const SysLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false)
  const [theme, setTheme] = useState<MenuTheme>('light')
  const [current, setCurrent] = useSessionStorage('currentKey', '/')
  const [breadcrumbs, setBreadcrumbs] = useState<any>([])
  const {
    token: { colorBgContainer }
  } = hhs.useToken()
  const { menus: sidebarMenu } = useContext(context)

  // console.log(sidebarMenu, 'sidebarMenu//')
  const navigate = useNavigate()
  const clickMenuItem = (e: any) => {
    // console.log(e.key, '点击的key')
    setCurrent(e.key)
    navigate(e.key)
  }

  const { pathname } = useLocation() // 获取location中的数据
  const tmpOpenKeys = findOpenKeys(pathname, sidebarMenu)

  // console.log(tmpOpenKeys, 'tmpOpenKeys')
  // 监听pathname的改变，重新这是面包屑数据
  useEffect(() => {
    setBreadcrumbs(findDeepPath(pathname, sidebarMenu))
  }, [pathname])

  const onClickDropdown: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`)

    switch (key) {
      case 'logOut':
        navigate('/login')
        break
      case 'changeTheme':
        setTheme(theme === 'dark' ? 'light' : 'dark')
        break
      case 'userCenter':
        navigate('/admin/user')
        break

      default:
        break
    }
  }

  const dropdownMenuItems: MenuProps['items'] = [
    {
      label: '个人中心',
      key: 'userCenter'
    },
    {
      label: <span onClick={(e) => e.preventDefault()}>切换模式</span>,
      key: 'changeTheme'
    },
    {
      label: <span>退出11</span>,
      key: 'logOut'
    }
  ]

  const tableList: Array<{ title: string, key: string, closable: boolean, path: string }> = [
    {
      title: '首页',
      key: 'dashboard',
      closable: false,
      path: '/dashboard'
    }
  ]
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme={theme}>
        <div>
          <h1
            style={{
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: theme === 'dark' ? '#fff' : '#333'
            }}>
            CCH的小系统
          </h1>
        </div>
        <div className='logo'>
          <img src={logo} alt='cc' />
        </div>

        <Menu
          theme={theme}
          mode='inline'
          defaultSelectedKeys={tmpOpenKeys}
          defaultOpenKeys={tmpOpenKeys}
          selectedKeys={tmpOpenKeys}
          onClick={clickMenuItem}
          items={sidebarMenu}></Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* 展开折叠 */}
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          })}

          <Dropdown
            menu={{
              items: dropdownMenuItems,
              onClick: onClickDropdown
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
          </Dropdown>
        </Header>
        <SysTabs tabList={tableList} />

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}>
          <Breadcrumb>
            {breadcrumbs.map((item: any) => (
              <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default SysLayout
