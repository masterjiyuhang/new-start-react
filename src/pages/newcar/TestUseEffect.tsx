import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

// useEffect 监听state的变化 执行某些方法  类似于vue中的watch
export default function TestUseEffect() {
  const [effectCount, setEffectCount] = useState({
    name: '纪宇航',
    age: 30
  })
  useEffect(() => {
    console.log('in use effect')
    // const subscription = props.source.subscribe()
    return () => {
      // 做一些清除页面缓存的工作 如 组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源
      console.log('[effectCount] is changed')
      // subscription.unsubscribe()
    }
  }, [effectCount])

  return (
    <div>
      <h1>TestUseEffect</h1>
      <h2>
        {effectCount.name} - {effectCount.age}
      </h2>
      <Button
        onClick={() =>
          setEffectCount((pre) => {
            return {
              ...pre,
              age: pre.age + 1
            }
          })
        }
        type='primary'
        danger>
        change effectCount
      </Button>
    </div>
  )
}
