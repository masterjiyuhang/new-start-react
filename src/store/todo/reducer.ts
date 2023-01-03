import actionTypes from './constants'
import { produce } from 'immer'

const defaultState = {
  count: 100
}

interface todoAction {
  type: string
  data: number
}
export default (state = defaultState, action: todoAction) =>
  produce(state, (draft) => {
    const { type, data } = action
    switch (type) {
      case actionTypes.INCREMENT:
        draft.count += data
        break
      case actionTypes.DECREMENT:
        draft.count -= data
        break
      default:
        return state
    }
  })
// export default (state = defaultState, action: todoAction) => {
//   const { type, data } = action
//   console.log(type, 'todo actions type')
//   switch (type) {
//     case actionTypes.INCREMENT:
//       return {
//         count: state.count + data
//       }
//     case actionTypes.DECREMENT:
//       state.count -= data
//       return { ...state }
//     default:
//       return state
//   }
// }
