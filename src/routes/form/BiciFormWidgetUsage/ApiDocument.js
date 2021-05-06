/**
 * @File: 表单控件 API
 */

import React, { Component } from 'react'
import { Table } from 'antd'
import { apiPropsColumns } from '../../../data/apiDocument'

export default class ApiDocument extends Component {
  render() {
    const biciCommonDataSource = [{
      params: 'isRequired',
      description: '是否必填',
      type: 'Boolean',
      defaultVal: 'false',
      isRequired: '否',
    }, {
      params: 'label',
      description: '字段名',
      type: 'string 或 ReactNode',
      defaultVal: '-',
      isRequired: '是',
    }]

    const biciSelectDataSource = [{
      params: 'originalValue',
      description: '原始值。数据类型是字符串，设置此值后，下拉数据选项会包含该原始值，点击回到初始状态',
      type: 'string',
      defaultVal: '-',
      isRequired: '否',
    }, {
      params: 'data',
      description: '下拉选择数据。数据类型是数组，支持传入字符串数组、对象数组',
      type: 'array',
      defaultVal: '-',
      isRequired: '否',
    }]

    const biciInputDataSource = [{
      params: 'regExp',
      description: '验证正则表达式。数据类型是字符串，值为正则表达式。需注意的是在传入时应去掉表达式首末的斜杠',
      type: 'string',
      defaultVal: '-',
      isRequired: '否',
    }, {
      params: 'verificationRule',
      description: '验证规则。需自定义。该函数的参数是对应的表单值（value），在一些对表单值有特殊校验（无法使用正则表达式校验）的业务场景中使用。其返回值的类型是 Boolean，true时代表验证通过，反之则不通过',
      type: 'function(value)',
      defaultVal: '-',
      isRequired: '否',
    }, {
      params: 'verificationTooltip',
      description: '验证提示信息',
      type: 'string',
      defaultVal: '-',
      isRequired: '否',
    }, {
      params: 'maxStrLength',
      description: '最大长度限制，相当于HTML5中的maxLength',
      type: 'number',
      defaultVal: '-',
      isRequired: '否',
    }]

    const biciInputNumberDataSource = [{
      params: 'regExp',
      description: '验证正则表达式。数据类型是字符串，值为正则表达式。需注意的是在传入时应去掉表达式首末的斜杠',
      type: 'string',
      defaultVal: '-',
      isRequired: '否',
    }, {
      params: 'verificationRule',
      description: '验证规则。需自定义。该函数的参数是对应的表单值（value），在一些对表单值有特殊校验（无法使用正则表达式校验）的业务场景中使用。其返回值的类型是 Boolean，true时代表验证通过，反之则不通过',
      type: 'function(value)',
      defaultVal: '-',
      isRequired: '否',
    }, {
      params: 'verificationTooltip',
      description: '验证提示信息',
      type: 'string',
      defaultVal: '-',
      isRequired: '否',
    }]

    const biciTextAreaDataSource = [{
      params: 'regExp',
      description: '验证正则表达式。数据类型是字符串，值为正则表达式。需注意的是在传入时应去掉表达式首末的斜杠',
      type: 'string',
      defaultVal: '-',
      isRequired: '否',
    }, {
      params: 'verificationRule',
      description: '验证规则。需自定义。该函数的参数是对应的表单值（value），在一些对表单值有特殊校验（无法使用正则表达式校验）的业务场景中使用。其返回值的类型是 Boolean，true时代表验证通过，反之则不通过',
      type: 'function(value)',
      defaultVal: '-',
      isRequired: '否',
    }, {
      params: 'verificationTooltip',
      description: '验证提示信息',
      type: 'string',
      defaultVal: '-',
      isRequired: '否',
    }, {
      params: 'maxStrLength',
      description: '最大长度限制，相当于HTML5中的maxLength',
      type: 'number',
      defaultVal: '-',
      isRequired: '否',
    }]

    const biciDatePickerDataSource = [{
      params: 'type',
      description: '日期选择类型。数据类型是字符串。有四个值：datePicker（日）、rangePicker（范围）、monthPicker（月）、weekPicker（周），可根据需要择一设置',
      type: 'string',
      defaultVal: 'datePicker',
      isRequired: '否',
    }]

    return (
      <div className="mt12">
        <p className="mb12 fstage16 fw500">通用 API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={biciCommonDataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />

        <p className="mt12 mb12 fstage16 fw500">BiciSelect Props API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={biciSelectDataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />

        <p className="mt12 mb12 fstage16 fw500">BiciInput Props API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={biciInputDataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />

        <p className="mt12 mb12 fstage16 fw500">BiciInputNumber API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={biciInputNumberDataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />

        <p className="mt12 mb12 fstage16 fw500">BiciTextArea API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={biciTextAreaDataSource}
          rowKey="method"
          size="middle"
          bordered
          pagination={false}
        />

        <p className="mt12 mb12 fstage16 fw500">BiciDatePicker API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={biciDatePickerDataSource}
          rowKey="method"
          size="middle"
          bordered
          pagination={false}
        />
      </div>
    )
  }
}
