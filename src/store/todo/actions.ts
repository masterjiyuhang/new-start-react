import actionTypes from './constants'

// let nextTodoId = 0
// export const addTodo = (text: any) => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })

// export const setVisibilityFilter = (filter: any) => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter
// })

// export const toggleTodo = (id: any) => ({
//   type: 'TOGGLE_TODO',
//   id
// })

export const increment = (data: any) => ({
  type: actionTypes.INCREMENT,
  data
})
export const incrementAsync: any = (data: any) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(increment(data))
    }, 2000)
  }
}
export const decrement = (data: any) => ({
  type: actionTypes.DECREMENT,
  data
})
