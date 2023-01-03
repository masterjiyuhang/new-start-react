import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import './common/styles/global.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router-dom'
import { globalRouters } from '@/router'

import store from '@/store'
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      {/* <App /> */}
      <Provider store={store}>
        <RouterProvider router={globalRouters} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)
