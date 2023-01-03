import actionTypes from './constants'
import { produce } from 'immer'

const defaultState = {
  activeTag: '/', // 当前活跃tag
  collapsed: false, // 顶部按钮的状态
  tabList: [
    {
      title: '首页',
      key: '/',
      closable: false,
      path: '/'
    }
  ]
}

export default (state = defaultState, action: any) =>
  produce(state, (draft) => {
    const { type, data } = action
    switch (type) {
      case actionTypes.SET_COLLAPSED:
        draft.collapsed = data
        break
      case actionTypes.CHANGE_ACTIVETAG:
        draft.activeTag = data
        break
      case actionTypes.CHANGE_TABLIST:
        draft.tabList = data
        break
      default:
        return state
    }
  })
