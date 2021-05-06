/**
 * @File: 抽屉组件 API
 */

import React, { Component } from 'react'
import { Table } from 'antd'
import { apiPropsColumns } from '../../data/apiDocument'

const dataSource = [{
  params: 'width',
  description: '抽屉组件宽度。有两档推荐定宽。小档（sm）定宽为 552 px，中档（nm）定宽为 1024 px。支持自定义宽度设置',
  type: 'string || number',
  defaultVal: 'sm',
  isRequired: '否'
}, {
  params: 'footer',
  description: '抽屉组件底部区域。默认底部带取消和确定按钮，也支持用户自定义',
  type: 'bool || element',
  defaultVal: 'false',
  isRequired: '否'
}, {
  params: 'onOk',
  description: '抽屉组件确定回调',
  type: 'function(e)',
  defaultVal: '-',
  isRequired: '否'
}, {
  params: 'onCancel',
  description: '抽屉组件取消回调。在除了关闭抽屉外还需进行其他操作的场景下，可使用此方法',
  type: 'function(e)',
  defaultVal: '-',
  isRequired: '否'
}, {
  params: 'cancelButtonName',
  description: '关闭抽屉的按钮名，默认为取消，也支持用户自定义。配合默认的底部（footer）使用；',
  type: 'string',
  defaultVal: '取消',
  isRequired: '否'
}, {
  params: 'submitButtonName',
  description: '提交抽屉的按钮名，默认为保存，也支持用户自定义。配合默认的底部（footer）使用；',
  type: 'string',
  defaultVal: '保存',
  isRequired: '否'
}]

export default class ApiDocument extends Component {
  render() {
    return (
      <div className="mt12">
        <p className="mb12 fstage16 fw500">通用 API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={dataSource}
          rowKey="params"
          size="middle"
          pagination={false}
        />
      </div>
    )
  }
}
