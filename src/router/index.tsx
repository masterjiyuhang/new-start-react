import { createHashRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Home from '@/pages/home'
import Login from '../pages/login'

export const globalRouters = createHashRouter([
  {
    path: '/login',
    element: <Login />
  },

  {
    path: '/home',
    element: <Home />
  },

  {
    path: '/',
    element: <Home />
  },
  // 未匹配，，跳转Login页面
  {
    path: '*',
    element: <Navigate to='/login' />
  }
] as RouteObject[])
