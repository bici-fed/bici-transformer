/**
 * @File: 顶部标签栏tabsBar
 */
import initialStore from '@/constants/initialStore'
import globalHeaderData from '@/data/globalHeader'
import { findAllIndex } from '@/utils/arrayUtil'
import * as types from '@/constants/actionTypes'
// 查找符合的tab
function getTab(data, url) {
  if (data[url]) {
    return { ...data[url], path: url }
  }
  for (const path in data) {
    let pathArr = path.split('/').filter((i) => i)
    let urlArr = url.split('/').filter((i) => i)
    if (pathArr.length !== urlArr.length) {
      continue
    }
    // 冒号开头代表路由这个位置是个参数，固定写法
    const regexp = /:[a-zA-Z]+/g
    const targets = path.match(regexp)
    const targetIndexes = findAllIndex(pathArr, targets)
    // 找到有冒号开头的 path
    if (targetIndexes.length === 0) {
      continue
    }
    targetIndexes.forEach((index) => {
      pathArr[index] = urlArr[index]
    })
    if (pathArr.join() !== urlArr.join()) {
      continue
    }
    return { ...data[path], path: url }
  }
  return undefined
}
// 查找固定tab
function getFixedTab(data) {
  let fixedTabs = []
  for (const path in data) {
    if (data[path].hideClose) {
      fixedTabs.push({ ...data[path], path })
    }
  }
  return fixedTabs
}
// 公共处理添加tab的逻辑
function addTab(visitedTabs, tabIndex, currentPath, locationState) {
  const tab = getTab(globalHeaderData, currentPath)
  if (!tab) {
    return {
      visitedTabs,
      tabIndex
    }
  }
  const targetIndex = visitedTabs.findIndex((item) => {
    return item.name === tab.name
  })
  if (targetIndex === -1) {
    visitedTabs.push(tab)
  } else {
    visitedTabs[targetIndex].path = tab.path
  }
  tabIndex = visitedTabs.findIndex((item) => {
    return item.path === currentPath
  })
  if (tabIndex === -1) {
    tabIndex = visitedTabs.length - 1
  }
  if (locationState && visitedTabs[tabIndex]) {
    visitedTabs[tabIndex].state = locationState
  }
  return {
    visitedTabs,
    tabIndex
  }
}

export default (state = initialStore.tabsBar, action) => {
  let visitedTabs = [...state.visitedTabs]
  let tabIndex = state.tabIndex
  const currentPath = action.currentPath
  const toJumpedIndex = action.toJumpedIndex
  const resultTabs = action.resultTabs
  // 如果 location里面传了参数的一定要把 state传过来
  const locationState = action.state
  let tab
  let result

  switch (action.type) {
    case types.INIT_TABS_BAR: // 初始化tab路径数组
      tabIndex = 0 // 初始化index
      visitedTabs = getFixedTab(globalHeaderData)
      tab = getTab(globalHeaderData, currentPath)
      if (
        tab &&
        !visitedTabs.some((item) => {
          return item.path === tab.path
        })
      ) {
        visitedTabs.push(tab)
        tabIndex = visitedTabs.length - 1
      }
      if (locationState && visitedTabs[tabIndex]) {
        visitedTabs[tabIndex].state = locationState
      }
      return {
        ...state,
        visitedTabs,
        tabIndex
      }
    case types.ADD_TAB: // 添加新tab
      result = addTab(visitedTabs, tabIndex, currentPath, locationState)
      return {
        ...state,
        ...result
      }
    case types.BACK_TAB:
      visitedTabs.splice(tabIndex, 1)
      result = addTab(visitedTabs, tabIndex, currentPath, locationState)
      return {
        ...state,
        ...result
      }
    case types.DEL_TAB: // 删除tab
      return {
        ...state,
        visitedTabs: resultTabs,
        tabIndex: toJumpedIndex
      }
    default:
      return state
  }
}
