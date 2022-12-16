import React, { useContext } from 'react'

const themes = {
  light: {
    background: '#eee'
  },
  dark: {
    background: '#222'
  }
}
const ThemeContext = React.createContext(themes.light)

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar(props: any) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

export const ThemedButton = () => {
  const theme = useContext(ThemeContext)

  return <button style={{ background: theme.background }}>I am styled by theme context!</button>
}
