import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import './common/styles/global.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router-dom'
import { globalRouters } from '@/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
      {/* <RouterProvider router={globalRouters} /> */}
    </ConfigProvider>
  </React.StrictMode>
)
