import { Route, Routes } from 'react-router-dom'
import SysLayout from './layout'
import './App.css'
import Dashboard from './pages/dashboard'
import UserInfo from './pages/UserInfo'
import ArticleCategories from './pages/articles/categories'
import ArticleList from './pages/articles/list'
import Download from './pages/able/download'
import Square from './pages/Square'
import SquareChild from './pages/Square/components/SquareChild'
import MedicineCategories from './pages/medicine/categories'
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

          {/* <Route path='dashboard' element={<Dashboard />} />
          <Route path='articles/categories' element={<ArticleCategories />} />
          <Route path='articles/list' element={<ArticleList />} />
          <Route path='medicine/categories' element={<MedicineCategories />} />
          <Route path='function/download' element={<Download />} />
          <Route path='function/square' element={<Square />}>
            <Route path=':id' element={<SquareChild />} />
          </Route>
          <Route path='user' element={<UserInfo />} /> */}
        </Routes>
      </SysLayout>
    </div>
  )
}

export default App
