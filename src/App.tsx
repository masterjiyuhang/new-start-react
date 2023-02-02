import { Route, Routes } from 'react-router-dom'
import SysLayout from './layout'
import './App.css'

import { useContext } from 'react'
import { context } from './components/MyProvider'

function App(props: any) {
  // // 某些特定的值在两次重新渲染之间没有发生变化，可以通知react跳过对effect的调用。
  // useEffect(() => {
  //   document.title = `${count}You clicked ${count} times`
  // }, [count])
  const { routes } = useContext(context)
  console.log(routes, 'routes///')
  return (
    <div className='App'>
      <SysLayout>
        <Routes>
          {routes.map((item: any) => (
            <Route key={item.key} path={item.key?.replace('/admin/', '')} element={item.element} />
          ))}
        </Routes>
      </SysLayout>
    </div>
  )
}

export default App
