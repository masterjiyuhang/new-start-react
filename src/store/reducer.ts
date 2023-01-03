import { combineReducers } from 'redux'
import { reducer as commoninfoReducer } from './commonInfo'
import { reducer as todoReducer } from './todo'
import counterReducer from './counter/reducer'

export default combineReducers({
  commoninfo: commoninfoReducer, // 公共用户信息
  todo: todoReducer
  // count: counterReducer
})

export const testReducer = {
  reducer: {
    counter: counterReducer
  }
}
