import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import Home from './pages/home'
import { HashRouter, Link, Routes, Route } from 'react-router-dom'
import { Button } from 'antd'
import LearnHook from './pages/learnHook'

function App() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState('hi')

  // // 某些特定的值在两次重新渲染之间没有发生变化，可以通知react跳过对effect的调用。
  // useEffect(() => {
  //   document.title = `${count}You clicked ${count} times`
  // }, [count])

  return (
    <div className='App'>
      <Button type='primary'>Button</Button>
      {/* <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>

        {msg}

        <button onClick={() => setMsg((msg) => msg + '!')}>修改msg</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p> */}

      <HashRouter>
        <Link to='/'>Home</Link>
        <Link to='/hook'>Hook</Link>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/hook' element={<LearnHook />}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App