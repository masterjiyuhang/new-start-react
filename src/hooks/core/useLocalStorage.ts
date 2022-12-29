import { useState } from 'react'

// 使用local storage来缓存数据
const useLocalStorage = (key: string, initialValue: any) => {
  // console.log(initialValue, 'initialValue....')
  const [stateValue, setStateValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item != null ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setStorage = (newVal: any) => {
    let valueToStore
    if (newVal instanceof Function) {
      // stateValue 这块注意一定要传参
      valueToStore = newVal(stateValue)
    } else {
      valueToStore = newVal
    }
    setStateValue(valueToStore)
    localStorage.setItem(key, JSON.stringify(valueToStore))
  }
  return [stateValue, setStorage]
}

export default useLocalStorage
