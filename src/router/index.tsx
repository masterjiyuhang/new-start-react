import { createHashRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Home, { homeLoader } from '@/pages/home'
import Login from '../pages/login'
import LearnHook from '@/pages/learnHook'
import TodoList from '@/pages/TodoList'
import NewCar from '@/pages/newcar'
import App from '@/App'

export const globalRouters = createHashRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <App />,
    loader: homeLoader,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'learn',
        element: <LearnHook />
      },
      {
        path: 'todolist',
        element: <TodoList />
      },
      {
        path: 'car',
        element: <NewCar />
      }
    ]
  },
  // 未匹配，，跳转Login页面
  {
    path: '*',
    element: <Navigate to='/login' />
  }
] as RouteObject[])
