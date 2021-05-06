/**
 * @File: 顶部标签栏tabsBar
 */
import * as types from '@/constants/actionTypes'

export const addTab = (currentPath, state) => {
  return {
    type: types.ADD_TAB,
    currentPath,
    state
  }
}

export const delTab = (toJumpedIndex, resultTabs) => {
  return {
    type: types.DEL_TAB,
    toJumpedIndex,
    resultTabs
  }
}

export const backTab = (currentPath) => {
  return {
    type: types.BACK_TAB,
    currentPath
  }
}

export const initTabsBar = (currentPath, state) => {
  return {
    type: types.INIT_TABS_BAR,
    currentPath,
    state
  }
}
