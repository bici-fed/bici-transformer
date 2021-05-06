/**
 * @File: 标签栏-接口文档
 */

import React, { Component } from 'react'
import { Table } from 'antd'
import { apiPropsColumns } from '@/data/apiDocument'

class ApiDocument extends Component {
  render() {
    const dataSource = [
      {
        params: 'tabs',
        description: "对象数组，每个标签的数据。name 是 string类型、必传，path 是 string 类型、必传，hideClose 是 boolean 类型、可选，例如：{name: '首页', path: '/home', hideClose: true}。",
        type: 'array',
        defaultVal: '[]',
        isRequired: '是',
      },
      {
        params: 'currentIndex',
        description: '为操作记录区域的外层容器添加自定义样式。',
        type: 'number',
        defaultVal: 0,
        isRequired: '是',
      },
      {
        params: 'onSelectTab',
        description: `选中标签处理事件。参数为tabs里面的某一项，例如：{name: '首页', path: '/home', hideClose: true}。`,
        type: 'function(selectedTab)',
        defaultVal: '',
        isRequired: '否',
      },
      {
        params: 'onReloadTab',
        description: '点击刷新按钮处理事件。',
        type: 'function',
        defaultVal: '',
        isRequired: '否',
      },
      {
        params: 'onCloseTab',
        description: '点击标签关闭按钮处理事件。toJumpedIndex 为删除某一项后的下一个 currentIndex 值，如果下标 currentIndex 的项被删除了，toJumpedIndex 是前一项的下标；deletedTab 是被删除的标签数据；resultTabs是数组，里面是删除后剩余的标签数据。',
        type: 'function(toJumpedIndex, resultTabs, toJumpedTab, deletedTab)',
        defaultVal: '',
        isRequired: '否',
      },
      {
        params: 'onCloseAllTabs',
        description: '点击关闭所有标签按钮处理事件。toJumpedIndex 为删除某一项后的下一个 currentIndex 值，如果下标 currentIndex 的项被删除了，toJumpedIndex 是前一项的下标；deletedTabs 是数组，里面是被删除的标签数据；resultTabs是数组，里面是删除后剩余的标签数据。',
        type: 'function(toJumpedIndex, resultTabs, toJumpedTab, deletedTabs)',
        defaultVal: '',
        isRequired: '否',
      }
    ]

    return (
      <div className="mt12">
        <p className="mb12 fstage16 fw500">BiciTabsBar Props API</p>
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
