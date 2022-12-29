import { Button } from 'antd'
import React, { useCallback, useState } from 'react'

interface Props {
  logCountValue: () => void
}
class TestPureComponent extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
    this.state = { date: new Date(), city: '河南' }
  }

  render() {
    const { logCountValue } = this.props
    console.log('TestPureComponent rendered')
    logCountValue?.()
    return <div>TestPureComponent</div>
  }
}
export default function TestUseCallback() {
  // useCallback 缓存一些回调函数的
  const [callbackCount, setCallbackCount] = useState(0)
  const logCountValue = useCallback(() => {
    console.log('logCountValue')
    // 只有当依赖的callbackCount 发生变化， useCallBack才会执行
  }, [callbackCount])
  return (
    <div>
      <h1>TestUseCallback</h1>
      <h2>{callbackCount}</h2>
      <TestPureComponent logCountValue={logCountValue} />
      <Button onClick={() => setCallbackCount((pre) => pre + 1)}> change callbackCount</Button>
    </div>
  )
}
