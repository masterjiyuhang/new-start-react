import React, { createContext, useState } from 'react'
import { UploadOutlined, UserOutlined, DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, FireOutlined, TeamOutlined } from '@ant-design/icons'
import Dashboard from '../pages/dashboard'
import ArticleCategories from '../pages/articles/categories'
import ArticleList from '../pages/articles/list'
import MedicineCategories from '../pages/medicine/categories'
import UserInfo from '@/pages/UserInfo'
import Download from '@/pages/able/download'
import Square from '@/pages/Square'
import SquareChild from '@/pages/Square/components/SquareChild'

export const context = createContext<any>({})

const sidebarMenu = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    label: '看板',
    element: <Dashboard />
  },
  {
    key: '/admin/articles',
    icon: <MenuFoldOutlined />,
    label: '文章管理',
    roles: ['admin', 'editor'],
    children: [
      {
        label: '文章分类',
        icon: <MenuUnfoldOutlined />,
        key: '/admin/articles/categories',
        roles: ['admin', 'editor'],
        element: <ArticleCategories />
      },
      {
        label: '文章信息',
        icon: <UploadOutlined />,
        key: '/admin/articles/list',
        roles: ['admin'],
        element: <ArticleList />
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
        key: '/admin/medicine/categories',
        element: <MedicineCategories />
      }
    ]
  },
  {
    key: '/admin/user',
    icon: <UserOutlined />,
    label: '个人中心',
    element: <UserInfo />
  },
  {
    key: 'admin/function',
    icon: <FireOutlined />,
    label: '更多功能',
    children: [
      {
        key: '/admin/function/download',
        icon: <TeamOutlined />,
        label: '下载',
        element: <Download />
      },
      {
        key: '/admin/function/square',
        label: '正方形的脑袋',
        element: <Square />
      },
      {
        key: '/admin/function/square/:id',
        label: '小脑袋',
        meta: {
          isShow: false
        },
        element: <SquareChild />
      }
    ]
  }
]

function Myprovider({ children }: any) {
  let defaultMenus = []
  let defaultRoutes = []

  const oldRole = sessionStorage.getItem('role') ?? 'admin'

  if (oldRole) {
    defaultMenus = findRoles(oldRole)
    defaultRoutes = flatRoutes(defaultMenus)
  }

  const [menus, setMenus] = useState(defaultMenus)
  const [routes, setRoutes] = useState(defaultRoutes)

  // 根据当前的角色生成路由数组和侧边栏数组
  const resetMyMenus = (role: string) => {
    console.log('重置菜单和路由数据')
    sessionStorage.setItem('role', role)
    // 此处重置菜单和路由数据
    const tmpMenu = findRoles(role)
    setMenus(tmpMenu)
    setRoutes(flatRoutes(tmpMenu))
  }
  return <context.Provider value={{ menus, routes, resetMyMenus }}>{children}</context.Provider>
}

function findRoles(role: string) {
  const arr: any = []
  findInfo(sidebarMenu)
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
        // if (parent) {
        //   if (info.meta) {
        //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        //     info.meta.isShow ? parent.push(info) : null
        //     return
        //   }
        //   parent.push(info)
        // } else {
        //   arr.push(info)
        // }
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
export default Myprovider
