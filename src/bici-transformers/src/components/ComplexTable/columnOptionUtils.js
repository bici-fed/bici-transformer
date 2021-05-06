/**
 * @File: 列表选项功能的辅助函数
 */

import _ from 'lodash'

// 根据 columns 配置得到 columnOption state
export const getColumnOptionStatesByColumns = (columns) => {
  return columns.map((column) => {
    return {
      dataIndex: column.dataIndex,
      title: column.title,
      checkDisabled: column.checkDisabled ? true : false, // 是否禁止改变该列的列表选项
      checked: _.has(column, 'checkDefault') ? column.checkDefault : true // 初始时是否被选中
    }
  })
}

// 初始化列表选项多选 state
export const getInitColumnOptionStates = (props) => {
  const { hasColumnOption, initialColumnOption, columns } = props
  if (!hasColumnOption) { return {} }

  let columnOption
  if (_.isArray(initialColumnOption)) { // 根据传入的初始化列表选项配置去设置 state
    columnOption = initialColumnOption
  } else { // 根据 columns 配置去设置 state
    columnOption = getColumnOptionStatesByColumns(columns)
  }

  return {
    columnOptionVisible: false, // 列表选项 下拉菜单是否显示
    columnOption
  }
}
