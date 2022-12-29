import { Button } from 'antd'
import React, { useMemo, useState } from 'react'

// useMemo 缓存数据 类似于vue中的computed属性
// useCallback 监听依赖变化做出变化 处理内联的回调函数
export default function TestUseMemo() {
  const [memoCount, setMemoCount] = useState(0)
  const doubleMemoCount = useMemo(() => memoCount * 2, [memoCount])
  return (
    <div>
      <h1>TestUseMemo</h1>
      <h2>memoCount: {memoCount}</h2>
      <h2>doubleMemoCount: {doubleMemoCount}</h2>
      <Button onClick={() => setMemoCount((pre) => pre + 1)}> set memoCount</Button>
    </div>
  )
}
