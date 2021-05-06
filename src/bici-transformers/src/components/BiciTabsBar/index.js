/**
 * @File: 顶部标签栏管理
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CloseOutlined, LeftOutlined, ReloadOutlined, RightOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames'
import _ from 'lodash'
import { addSmallStyle } from '../../utils/styleUtils'
import styles from './biciTabsBar.css'

// 判断是否是当前活动标签
function getTabsClassNames(path, curPath, size) {
  const isActive = path === curPath
  return classNames({
    [styles.item]: true,
    [styles.itemSM]: size === 'small',
    [styles.active]: isActive
  })
}

class BiciTabsBar extends Component {
  // 导航栏右移显示左边隐藏内容
  handlePrev = () => {
    const offsetLeft = this.tabsBarContainerRef.offsetLeft
    let left = 0
    if (offsetLeft >= 0) { return }
    if (-offsetLeft / 300 > 1) { left = offsetLeft + 300 }
    this.tabsBarContainerRef.style.left = `${left}px`
  }
  // 导航栏左移显示右边隐藏内容
  handleNext = () => {
    const clientWidth = this.tabsBarMainRef.clientWidth
    const scrollWidth = this.tabsBarMainRef.scrollWidth
    const offsetLeft = this.tabsBarContainerRef.offsetLeft
    const overflowWidth = scrollWidth > clientWidth ? scrollWidth - clientWidth : 0
    let left = 0

    if (overflowWidth <= 0) {
      return
    }

    if (overflowWidth / 300 > 1) {
      left = offsetLeft - 300
    } else {
      left = offsetLeft - overflowWidth
    }
    this.tabsBarContainerRef.style.left = `${left}px`
  }
  // 删除tab
  handleDelTab = (index, event) => {
    event.stopPropagation()
    const { tabs, currentIndex, onCloseTab } = this.props
    let resultTabs = _.cloneDeep(tabs)
    const deletedTab = resultTabs.splice(index, 1)[0]
    let toJumpedIndex = currentIndex
    if (currentIndex >= index && currentIndex > 0) {
      toJumpedIndex -= 1
    }
    const toJumpedTab = resultTabs[toJumpedIndex]
    onCloseTab(toJumpedIndex, resultTabs, toJumpedTab, deletedTab)
  }
  // 删除除固定tab外的所有tabs
  handleDelAllTabs = () => {
    const { tabs, currentIndex, onCloseAllTabs } = this.props
    let deletedTabs = []
    let resultTabs = []
    let toJumpedIndex = currentIndex
    tabs.forEach((item, index) => {
      if (item.hideClose) {
        resultTabs.push(item)
      } else {
        if (currentIndex === index) {
          toJumpedIndex = 0
        }
        deletedTabs.push(item)
      }
    })
    const toJumpedTab = resultTabs[toJumpedIndex]
    onCloseAllTabs(toJumpedIndex, resultTabs, toJumpedTab, deletedTabs)
  }

  render() {
    const { tabs, currentIndex, onSelectTab, onReloadTab, size } = this.props
    const currentTab = tabs[currentIndex]
    const mainStyle = addSmallStyle(styles, 'main', size)
    const containerStyle = addSmallStyle(styles, 'container', size)
    const iconLeftStyle = addSmallStyle(styles, 'iconLeft', size)
    const iconRightStyle = addSmallStyle(styles, 'iconRight', size)
    const iconCloseStyle = addSmallStyle(styles, 'iconClose', size)
    const btnReloadStyle = addSmallStyle(styles, 'btnReload', size)
    const btnCloseStyle = addSmallStyle(styles, 'btnClose', size)

    return (
      <div className={styles.root}>
        <LeftOutlined className={iconLeftStyle} onClick={this.handlePrev} />

        <div ref={(ref) => (this.tabsBarMainRef = ref)} className={mainStyle}>
          <div ref={(ref) => (this.tabsBarContainerRef = ref)} className={containerStyle}>
            {tabs.map((item, index) => {
              return (
                <nav
                  onClick={() => onSelectTab(item)}
                  key={item.path}
                  className={getTabsClassNames(item.path, currentTab.path, size)}
                >
                  {item.name}
                  {!item.hideClose && (
                    <CloseOutlined className={iconCloseStyle} onClick={this.handleDelTab.bind(this, index)} />
                  )}
                </nav>
              );
            })}
          </div>
        </div>

        <Tooltip placement="bottomRight" title="重新加载当前页面">
          <ReloadOutlined className={btnReloadStyle} onClick={onReloadTab} />
        </Tooltip>
        <Tooltip placement="bottomRight" title="关闭所有">
          <CloseOutlined className={btnCloseStyle} onClick={this.handleDelAllTabs} />
        </Tooltip>
        <RightOutlined className={iconRightStyle} onClick={this.handleNext} />
      </div>
    );
  }
}

BiciTabsBar.propTypes = {
  tabs: PropTypes.array.isRequired, // 所有的标签数组, [{ name, path, hideClose }]
  currentIndex: PropTypes.number.isRequired, // 当前索引
  size: PropTypes.oneOf(['small', 'default']), // 模度大小

  onSelectTab: PropTypes.func, // 选择标签回调 onSelectTab(selectedTab)
  onReloadTab: PropTypes.func, // 刷新当前标签的回调
  onCloseTab: PropTypes.func, // 删除标签的回调 onCloseTab(toJumpedIndex, resultTabs, toJumpedTab, deletedTab)
  onCloseAllTabs: PropTypes.func // 删除所有标签的回调 onCloseAllTabs(toJumpedIndex, resultTabs, toJumpedTab, deletedTabs)
}

BiciTabsBar.defaultProps = {
  size: 'default'
}

export default BiciTabsBar
