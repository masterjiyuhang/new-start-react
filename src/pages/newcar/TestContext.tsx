import React, { useContext } from 'react'
import { ThemeContext } from './index'
export default function TestContext() {
  const theme = useContext(ThemeContext)

  console.log(theme, 'theme')
  return (
    <div>
      <h1>TestContext</h1>
      <h2 style={{ background: theme.background, color: theme.foreground }}>哈哈</h2>
    </div>
  )
}
