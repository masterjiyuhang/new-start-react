import { createContext, useEffect, useState } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined, DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, FireOutlined, TeamOutlined } from '@ant-design/icons'
import Dashboard from '../pages/dashboard'
import ArticleCategories from '../pages/articles/categories'
import ArticleList from '../pages/articles/list'
import MedicineCategories from '../pages/medicine/categories'
import UserInfo from '@/pages/UserInfo'
import Download from '@/pages/able/download'
import Square from '@/pages/Square'
import SquareChild from '@/pages/Square/components/SquareChild'

export const context = createContext<any>({})

// 如果需要再加新的页面，只需要写好组件之后 改这个数组就好
const sideMenuData = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    element: <Dashboard />,
    label: '看板'
  },

  {
    key: '/admin/articles',
    icon: <UploadOutlined />,
    label: '文章管理',
    roles: ['admin', 'editor'],
    children: [
      {
        label: '文章分类',
        key: '/admin/articles/categories',
        element: <ArticleCategories />,
        roles: ['admin', 'editor']
      },
      {
        label: '文章信息',
        key: '/admin/articles/list',
        element: <ArticleList />,
        roles: ['admin', 'editor']
      }
    ]
  }
]

/**
 * 根据role角色生成侧边栏菜单
 * @param role
 * @returns
 */
function findRoles(role: string) {
  const arr: any = []
  findInfo(sideMenuData)
  function findInfo(data: any, parent: any = null) {
    data.forEach((item: any) => {
      const { children, ...info } = item
      if (children) {
        info.children = []
        findInfo(children, info.children)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        info.children.length === 0 ? delete info.children : null
      }
      if (info.roles) {
        if (info.roles?.includes(role)) parent ? parent.push(info) : arr.push(info)
      } else {
        parent ? parent.push(info) : arr.push(info)
      }
    })
  }

  return arr
}

/**
 * 根据侧边栏实现路由信息的扁平化处理
 * @param menus
 * @returns
 */
function flatRoutes(menus: any) {
  const arr: any = []
  function findInfo(data: any) {
    data.forEach((item: any) => {
      const { children, ...info } = item
      arr.push(info)
      if (children) {
        findInfo(children)
      }
    })
  }
  findInfo(menus)
  return arr
}

function AppProvider({ children }: any) {
  // 初始化的时候从本地存储获取角色信息
  let defaultMenus = []
  let defaultRoutes = []
  const oldRole = sessionStorage.getItem('role')
  if (oldRole) {
    defaultMenus = findRoles(oldRole)
    defaultRoutes = flatRoutes(defaultMenus)
  }
  const [menus, setMenus] = useState(defaultMenus)
  const [routes, setRoutes] = useState(defaultRoutes)

  // 根据当前的角色生成路由数组和侧边栏数组
  const resetMenus = (role: string) => {
    sessionStorage.setItem('role', role)
    // 此处重置菜单和路由数据
    const tmpMenu = findRoles(role)
    setMenus(tmpMenu)
    setRoutes(flatRoutes(tmpMenu))
  }
  return <context.Provider value={{ menus, routes, resetMenus }}>{children}</context.Provider>
}

export default AppProvider
