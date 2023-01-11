import { Layout, Menu, theme as hhs, Badge, MenuTheme, Dropdown, Breadcrumb } from 'antd'
import React, { useEffect, useState } from 'react'
import { FireOutlined, DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, TeamOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { PrivateOutlet } from '@/components/PrivateOutlet'
import logo from '../assets/logo.jpg'
import useSessionStorage from '@/hooks/core/useSessionStorage'

// import SysTabs from './tabs'

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
  const navigate = useNavigate()
  const clickMenuItem = (e: any) => {
    console.log(e.key, '点击的key')
    setCurrent(e.key)
    navigate(e.key)
  }
  const sidebarMenu = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: '看板'
    },
    {
      key: '/admin/articles',
      icon: <MenuFoldOutlined />,
      label: '文章管理',
      children: [
        {
          label: '文章分类',
          icon: <MenuUnfoldOutlined />,
          key: '/admin/articles/categories'
        },
        {
          label: '文章信息',
          icon: <UploadOutlined />,
          key: '/admin/articles/list'
        }
      ]
    },
    {
      key: '/admin/medicine',
      icon: <MenuFoldOutlined />,
      label: '药品管理',
      children: [
        {
          label: '药品分类',
          icon: <MenuUnfoldOutlined />,
          key: '/admin/medicine/categories'
        }
      ]
    },
    {
      key: '/admin/user',
      icon: <UserOutlined />,
      label: '个人中心'
    },
    {
      key: 'admin/function',
      icon: <FireOutlined />,
      label: '更多功能',
      children: [
        {
          key: '/admin/function/download',
          icon: <TeamOutlined />,
          label: '下载'
        },
        {
          key: '/admin/function/square',
          label: '正方形的脑袋'
        }
      ]
    }
  ]

  const { pathname } = useLocation() // 获取location中的数据
  const tmpOpenKeys = findOpenKeys(pathname, sidebarMenu)

  // 监听pathname的改变，重新这是面包屑数据
  useEffect(() => {
    setBreadcrumbs(findDeepPath(pathname, sidebarMenu))
  }, [pathname])

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
          selectedKeys={[current]}
          onClick={clickMenuItem}
          items={sidebarMenu}></Menu>
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
