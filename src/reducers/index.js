import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import globalMenu from './globalMenu'
import tabsBar from './tabsBar'

export default (history) => combineReducers({
  router: connectRouter(history),
  globalMenu, // 全局菜单
  tabsBar
})
