const initialStore = {
  // 全局菜单
  globalMenu: {
    isSliderMenuCollapsed: false // 侧边导航菜单栏是否折叠
  },
  // 标签管理
  tabsBar: {
    visitedTabs: [], // 访问过的tab
    tabIndex: 0
  }
}

export default initialStore
