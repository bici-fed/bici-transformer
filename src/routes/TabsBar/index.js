/**
 * @File: 标签栏导航组件
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { BiciTabsBar } from 'bici-transformers'
import { initTabsBar, addTab, delTab } from '../../actions/tabsBar'
import * as TYPES from '../../constants/actionTypes'

class TabsBar extends Component {
  // 处理路由跳转
  handleNav = (selectedTab) => {
    const { dispatch, history } = this.props
    const pathname = selectedTab.path
    history.push({ pathname })
    dispatch(addTab(pathname))
  }
  // 删除当前tab
  handleDelTab = (toJumpedIndex, resultTabs, toJumpedTab, deletedTab) => {
    const { dispatch, tabIndex, visitedTabs, history } = this.props
    const currentTab = visitedTabs[tabIndex]
    if (currentTab.path === deletedTab.path) {
      const pathname = toJumpedTab.path
      history.push({ pathname })
    }
    dispatch(delTab(toJumpedIndex, resultTabs))
  }
  // 删除所有tab
  handleDelAllTabs = (toJumpedIndex, resultTabs) => {
    const { dispatch, history } = this.props
    history.push('/')
    dispatch(delTab(toJumpedIndex, resultTabs))
  }
  // 刷新当前tab
  handleReload = () => {
    const { dispatch } = this.props
    dispatch({ type: TYPES.RELOAD_CUR_TAB })
  }
  componentDidMount() {
    const { dispatch, location } = this.props
    dispatch(initTabsBar(location.pathname))
  }
  render() {
    const { visitedTabs, tabIndex } = this.props
    if (visitedTabs.length <= 0) { return null }
    return (
      <div className="mt4 mb4">
        <BiciTabsBar
          tabs={visitedTabs}
          currentIndex={tabIndex}
          size="small"
          onSelectTab={this.handleNav}
          onReloadTab={this.handleReload}
          onCloseTab={this.handleDelTab}
          onCloseAllTabs={this.handleDelAllTabs}
        />
      </div>
    )
  }
}

export default withRouter(
  connect((state) => {
    return {
      visitedTabs: state.tabsBar.visitedTabs,
      tabIndex: state.tabsBar.tabIndex
    }
  })(TabsBar)
)
