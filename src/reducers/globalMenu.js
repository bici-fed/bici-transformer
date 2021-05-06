import initialStore from '../constants/initialStore'
import * as actionTypes from '../constants/actionTypes'

export default (state = initialStore.globalMenu, action) => {
  switch (action.type) {
    case actionTypes.SAVE_SLIDER_MENU_COLLAPSED: // 保存侧边栏展开、收起
      return {
        ...state,
        isSliderMenuCollapsed: action.isCollapsed
      }
    default:
      return state
  }
}
