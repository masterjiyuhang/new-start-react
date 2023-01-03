// import { createStore, applyMiddleware } from 'redux'
import rootReducer, { testReducer } from './reducer'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

// const store = createStore(rootReducer, applyMiddleware(thunk))

function testMiddleWare(store: { getState: () => any }) {
  return function (next: (arg0: any) => void) {
    return function (action: any) {
      console.log('当前的state', store.getState())

      console.log('触发的action', action)

      next(action)

      console.log('next之后的state', store.getState())
    }
  }
}
const store = configureStore({ ...testReducer, middleware: [thunk, testMiddleWare] })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
