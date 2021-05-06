/**
 * @File: 文件上传接口文档
 */

import React, { Component } from 'react'
import { Table } from 'antd'

export default class ApiDocument extends Component {
  render() {
    const columns = [{
      title: '参数',
      dataIndex: 'params',
      width: '15%',
    }, {
      title: '描述',
      dataIndex: 'description',
      width: '45%',
    }, {
      title: '类型',
      dataIndex: 'type',
      width: '15%',
    }, {
      title: '默认值',
      dataIndex: 'default',
      width: '25%',
    }]

    const dataSource = [{
      params: 'width',
      description: '设置图片上传组件宽度',
      type: 'number | string',
      default: '336'
    }, {
      params: 'maxWidth',
      description: '设置文件上传组件最大宽度',
      type: 'number | string',
      default: '336'
    }, {
      params: 'description',
      description: '提示文案，一般用于描述对上传的文件有何种限制',
      type: 'string',
      default: '-'
    }, {
      params: 'draggable',
      description: '是否支持拖拽上传。默认为 false。设为 true 后出现拖拽上传区域',
      type: 'boolean',
      default: 'false'
    }, {
      params: 'size',
      description: '文件上传按钮大小',
      type: 'element',
      default: ''
    }, {
      params: 'label',
      description: '输入组件的label',
      type: 'string',
      default: ''
    }, {
      params: 'isRequired',
      description: '是否必填，显示星标，但是目前不做校验',
      type: 'boolean',
      default: 'false'
    }, {
      params: 'maxListLength',
      description: '文件上传列表的最大长度，即最多允许上传的文件数。默认为 10。',
      type: 'number',
      default: '10'
    }, {
      params: 'maxFileSize',
      description: '限制上传文件的大小，单位为 M，默认为 5 M。',
      type: 'number',
      default: '5'
    }, {
      params: 'fileList',
      description: '受控文件列表',
      type: 'array',
      default: ''
    }, {
      params: 'onChange',
      description: '文件列表修改的回调函数function({ file, fileList, event })',
      type: 'function',
      default: ''
    }]

    return (
      <div className="mt12">
        <p className="mb12 fstage16 fw500">BiciImageUpload & BiciFileUpload Props API</p>
        <p className="mb12 fstage14">通用</p>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="name"
          size="middle"
          bordered
          pagination={false}
        />
      </div>
    )
  }
}
