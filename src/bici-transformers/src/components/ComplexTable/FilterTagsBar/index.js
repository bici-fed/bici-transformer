/**
 * @File: 表格上方区域，包括条件筛选标签和右侧区域
 */

import React, { Component } from 'react'
import { Tag, Tooltip } from 'antd'
import { FILTER_TYPES } from '../complexTableUtils'
import * as colors from '../../../static/colors'
import styles from './filterTagsBar.css'
// import './filterTagsBar.css'

const LONG_TAG_STRINGS = 30 // 界定长标签的字符数

// 根据筛选类型返回初始化筛选值
function getInitValByType(filterType, isRange) {
  switch (filterType) {
    case FILTER_TYPES[0]: // 模糊搜索
      return ''
    case FILTER_TYPES[1]: // 下拉单选搜索
      return undefined
    case FILTER_TYPES[2]: // 选择日期，精确到日
      if (isRange) {
        return [null, null]
      } else {
        return null
      }
    case FILTER_TYPES[3]: // 下拉多选
      return []
    case 'check': // 单选、多选过滤
      return []
    case FILTER_TYPES[4]: // 范围数值
      return ['', '']
  }
}

class FilterTagsBar extends Component {
  // 处理关闭标签
  handleAfterTagClose = (tag) => {
    const { handleAfterTagClose } = this.props
    const { dataIndex, filterType, val } = tag
    const isRange = Array.isArray(val)
    const stateStr = `filter_${dataIndex}_${filterType}_val`
    const toSetVal = getInitValByType(filterType, isRange)
    const uiState = { stateStr, toSetVal }

    handleAfterTagClose(tag, uiState)
  }
  // 处理清空筛选标签
  handleClearAllTag = () => {
    const { filterTags, handleClearAllTags } = this.props
    const initFilterTags = filterTags.map((tag) => {
      const isRange = Array.isArray(tag.val)
      return {
        ...tag,
        val: getInitValByType(tag.filterType, isRange),
      }
    })
    let toSetState = {}
    filterTags.forEach((tag) => {
      const isRange = Array.isArray(tag.val)
      toSetState[tag.key] = getInitValByType(tag.filterType, isRange)
    })
    handleClearAllTags(toSetState, initFilterTags)
  }
  // 渲染清除标签
  renderClearAllTag = () => {
    return (
      <Tag onClick={this.handleClearAllTag} className="clearAllTag">
        清除
      </Tag>
    )
  }
  render() {
    const { filterTags } = this.props
    const filteredTags = filterTags.filter((tag) => {
      return tag.displayStr !== ''
    }) // 过滤出有值得条件筛选标签
    return (
      <div className={styles.root}>
        <div className={styles.label}>筛选条件：</div>
        <div>
          {filteredTags.map((tag) => {
            const { dataIndex, displayStr } = tag
            const isLongTag = displayStr.length > LONG_TAG_STRINGS
            const tagElm = (
              <Tag closable color={colors.BLUE_6} key={dataIndex} onClose={this.handleAfterTagClose.bind(this, tag)}>
                {isLongTag ? `${displayStr.slice(0, LONG_TAG_STRINGS - 2)}...` : displayStr}
              </Tag>
            )
            // 长标签显示 ToolTip
            if (isLongTag) {
              return (
                <Tooltip placement="topLeft" title={displayStr} key={dataIndex}>
                  {tagElm}
                </Tooltip>
              )
            }
            // 短标签直接返回 tag
            return tagElm
          })}
          {/* 渲染清除标签 */}
          {filteredTags.length !== 0 && this.renderClearAllTag()}
        </div>
      </div>
    )
  }
}

export default FilterTagsBar
