import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import './common/styles/global.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import store from '@/store'
import { Provider } from 'react-redux'
import { globalRouters, browserRouters } from '@/router'
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Login from './pages/login'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        {/* <App /> */}
        <Provider store={store}>
          {/* <RouterProvider router={globalRouters} /> */}
          {/* <RouterProvider router={browserRouters} /> */}
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/admin/*' element={<App />} />
            <Route path='*' element={<Login />} />
          </Routes>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  </>
)
