import useLocalStorage from '@/hooks/core/useLocalStorage'
import { Button, Input, InputRef } from 'antd'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import TestContext from './TestContext'
import TestUseCallback from './TestUseCallback'
import TestUseEffect from './TestUseEffect'
import TestUseMemo from './TestUseMemo'
import TestUseReducer from './TestUseReducer'

/**
 * hooks使用规则
 *
 * 只在最顶层使用Hook (不在循环，条件，嵌套中使用)
 *
 * 只在react函数中使用Hook 类组件中不行
 *
 * 能够在Hook中调用其他Hook
 *
 * 自定义hooks必须是use开头 主要是为了方便react进行校验
 *
 * 两个组件中的hooks不会共享state的状态（都有自己的作用域）
 *
 * 自定义的hooks逻辑相对完整且独立
 */

interface Props {
  name: string
  age?: number
}
interface State {
  date: Date
  city: string
}
// 类组件
class TestClassComp extends React.Component<Props, State> {
  timerID: NodeJS.Timer | undefined
  constructor(props: { name: string }) {
    super(props)
    this.state = { date: new Date(), city: '河北' }
  }

  componentDidMount() {
    // componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行，所以，最好在这里设置计时器：
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    const { name } = this.props
    return (
      <div>
        <h1>TestClassComp {name}</h1>
        <h2>{this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

const TestClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [currentTime])

  return (
    <div>
      <h1>TestClock</h1>
      <h2>
        {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
      </h2>
    </div>
  )
}

function ChildComp() {
  const context = useContext(ColorContext)
  return (
    <div>
      <h1 style={context}>ChildComp {context.color}</h1>
    </div>
  )
}

const ColorContext = createContext<{ color: string }>({ color: '' })

const themes = {
  light: {
    foreground: '#f80',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}
// 定义createContext后需要导出，在其他页面必须要引入才可以使用
export const ThemeContext = createContext(themes.light)

let temp: React.MutableRefObject<HTMLHeadingElement | null>

export default function NewCar() {
  const h1Ref: React.MutableRefObject<HTMLHeadingElement | null> = useRef<HTMLHeadingElement | null>(null)
  const inputRef: React.MutableRefObject<InputRef | null> = useRef<InputRef | null>(null)
  useEffect(() => {
    if (inputRef.current != null) {
      inputRef.current.focus()
    }
  }, [])
  const clickBtn = () => {
    console.log(h1Ref)
  }

  // 而 useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。
  console.log(temp === h1Ref)

  temp = h1Ref
  const [count, setCount] = useState(1)
  const [color, setColor] = useState('blue')
  const [inputValue, setInputValue] = useState('')
  const addCountHandler = () => {
    setCount((prevState) => prevState + 1)
  }

  const [localCount, setLocalCount] = useLocalStorage('localCount', 2)

  return (
    <ColorContext.Provider value={{ color }}>
      <div>
        <h1 ref={h1Ref}>哈哈{count}</h1>
        <Button onClick={clickBtn}>log ref</Button>
        <Button onClick={addCountHandler}>addCount</Button>

        <TestClassComp name={'纪宇航'} />

        <TestClock />

        <Button onClick={() => setColor((prev) => (prev === 'blue' ? '#bfa' : 'blue'))}>change color</Button>
        <h2>inputValue : {inputValue}</h2>
        <Input ref={inputRef} placeholder='请输入...' value={inputValue} onChange={(e) => setInputValue((pre) => (pre = e.target.value))} />
        <Button
          onClick={() =>
            setColor((prev) => {
              return (prev = inputValue)
            })
          }>
          change color by input
        </Button>

        <ChildComp />

        <TestUseEffect />

        <ThemeContext.Provider value={themes.dark}>
          <TestContext />
        </ThemeContext.Provider>

        <TestUseReducer />

        <TestUseMemo />

        <TestUseCallback />

        <div>
          <h1>TestSelfHooks</h1>
          <h2>localCount: {localCount}</h2>
          <Button
            type='dashed'
            danger
            onClick={() =>
              setLocalCount((prevState: number) => {
                return prevState + 1
              })
            }>
            set local count
          </Button>
          <Button
            type='dashed'
            danger
            onClick={() =>
              setLocalCount((prevState: number) => {
                return (prevState = 0)
              })
            }>
            reset local count
          </Button>
        </div>
      </div>
    </ColorContext.Provider>
  )
}
