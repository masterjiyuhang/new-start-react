import { Button, Input, InputRef } from 'antd'
import React, { useRef, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import type { RootState } from '@/store/index'
// import { increment, decrement, incrementAsync } from '@/store/todo/actions'
import Counter from './src/Counter'

export default function TodoList() {
  // const count = useSelector((state: RootState) => state.todo?.count)
  // const dispatch = useDispatch()

  const [list, setList] = useState(['1', '2', '3', '4', '5'])
  const [value, setValue] = useState('')

  const inputRef = useRef<InputRef | null>(null)

  interface currentItemProp {
    item: string
    index: number
  }
  const [currentItem, setCurrentItem] = useState<currentItemProp>()

  // console.log()
  return (
    <div>
      <h2>TodoList </h2>
      {/* <h3>{count}</h3>
      <Button onClick={() => dispatch(increment(1))}>+ change store state count </Button>
      <Button onClick={() => dispatch(incrementAsync(22))}>+ change store state count async </Button>
      <Button onClick={() => dispatch(decrement(1))}>- change store state count </Button> */}
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue((pre) => (pre = e.target.value))}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            if (currentItem != null) {
              const newList = [...list]
              newList[currentItem.index] = value
              setList(newList)
              setCurrentItem(undefined)
            } else {
              setList([...list, value])
            }
            setValue('')
          }
        }}></Input>
      <ul>
        {list.map((item: string, index: number) => {
          return (
            <li key={index}>
              {item}

              <Button
                onClick={() => {
                  setCurrentItem({ item, index })
                  setValue(item)
                  inputRef.current?.focus()
                }}>
                edit
              </Button>

              <Button
                danger
                onClick={() => {
                  setList(
                    list.filter((_, i) => {
                      return i !== index
                    })
                  )
                }}>
                删除
              </Button>
            </li>
          )
        })}
      </ul>

      <Counter />
    </div>
  )
}
