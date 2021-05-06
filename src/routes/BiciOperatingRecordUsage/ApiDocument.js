/**
 * @File: 操作记录-接口文档
 */

import React, { Component } from 'react'
import { Table } from 'antd'
import { apiPropsColumns } from '../../data/apiDocument'

class ApiDocument extends Component {
  render() {
    const dataSource = [{
      params: 'data',
      description: '必传，操作记录数据的对象数组。对象字段结构为 { content, gmtCreate, item, user }，分别对应操作记录主体内容、日期及时间、操作类型、操作人',
      type: 'array',
      defaultVal: '-',
      isRequired: '是'
    }, {
      params: 'wrapperStyle',
      description: '可选，为操作记录区域的外层容器添加自定义样式',
      type: 'object',
      defaultVal: '{}',
      isRequired: '否'
    }]

    return (
      <div className="mt12">
        <p className="mb12 fstage16 fw500">BiciOperatingRecord Props API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={dataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />
      </div>
    )
  }
}

export default ApiDocument
