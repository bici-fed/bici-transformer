/**
 * 在table上嵌套控制刷新
 */
import React from 'react'
import { Table } from 'antd'
import _ from 'lodash'

export class BiciTable extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    const columnsCheckedAry = nextProps.columns.map(col => col.checked)
    const newColumnsCheckedAry = this.props.columns.map(col => col.checked)

    return !_.isEqual(nextProps.dataSource, this.props.dataSource) || // 数据源更新
      !_.isEqual(nextProps.pagination, this.props.pagination) || // 分页更新
      !_.isEqual(columnsCheckedAry, newColumnsCheckedAry) || // 列表选项更新（列的显示与隐藏）
      !_.isEqual(nextProps.rowSelection, this.props.rowSelection) // 勾选列的更新
  }

  render () {
    return <Table {...this.props} />
  }
}
