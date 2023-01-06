import LogsDemo from '@/components/logsdemo'

import React from 'react'
import { redirect } from 'react-router-dom'
import './index.less'

export function homeLoader() {
  // const user = useUserInfo()
  // console.log(user, 'user....')
  console.log('this is home loader..')
  return null
}
const Home: React.FC = () => {
  return (
    <div>
      <LogsDemo />
    </div>
  )
}

export default Home
