import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SysLayout from './layout'
import './App.css'

function App(props: any) {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState('hi')

  const navigate = useNavigate()

  const goback = () => {
    console.log('回退', navigate)
    navigate(-1)
  }

  // // 某些特定的值在两次重新渲染之间没有发生变化，可以通知react跳过对effect的调用。
  // useEffect(() => {
  //   document.title = `${count}You clicked ${count} times`
  // }, [count])

  return (
    <div className='App'>
      <SysLayout />
    </div>
  )
}

export default App
