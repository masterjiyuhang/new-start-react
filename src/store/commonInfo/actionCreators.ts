import actionTypes from './constants'

// 侧边状态
export const changeCollapsed = (data: any) => ({
  type: actionTypes.SET_COLLAPSED,
  data
})

// 改变左侧侧边栏高亮
export const changeActiveTag = (data: any) => ({
  type: actionTypes.CHANGE_ACTIVETAG,
  data
})

// 改变tab list数组
export const changeTabList = (data: any) => ({
  type: actionTypes.CHANGE_TABLIST,
  data
})
