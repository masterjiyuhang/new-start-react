import { Button } from 'antd'
import React, { createContext, useContext, useReducer } from 'react'

interface initState {
  token: string
  count: number
}

interface initAction {
  type: string
  payload?: string
}

const initialState: initState = {
  token: 'this is a token',
  count: 0
}

const tokenReducer = (state: initState, action: initAction) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'changeToken':
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return { ...state, token: 'a new token' + action.payload }
    default:
      return state
  }
}

interface context {
  token: string
  dispatch: any
}
const tokenContext = createContext<context>({
  token: '',
  dispatch: ''
})

function ReducerChildComp() {
  const { token, dispatch } = useContext(tokenContext)
  return (
    <div>
      <h1>TestReducerChildComp</h1>
      <h2>{token}</h2>
      <Button onClick={() => dispatch({ type: 'changeToken', payload: ' child 哈哈' })}>change Token Child</Button>
    </div>
  )
}
export default function TestUseReducer() {
  const [tokenState, dispatch] = useReducer(tokenReducer, initialState)
  return (
    <div>
      <h1>TestUseReducer</h1>
      <h2>reducer count : {tokenState.count}</h2>
      <h2>reducer token : {tokenState.token}</h2>
      <Button
        type='primary'
        onClick={() => {
          dispatch({ type: 'increment' })
        }}>
        +
      </Button>
      <Button
        type='primary'
        danger
        onClick={() => {
          dispatch({ type: 'decrement' })
        }}>
        -
      </Button>

      <tokenContext.Provider value={{ token: tokenState.token, dispatch }}>
        <ReducerChildComp />
      </tokenContext.Provider>

      <Button onClick={() => dispatch({ type: 'changeToken', payload: ' parent asdasd' })}> change Token Parent</Button>
    </div>
  )
}
