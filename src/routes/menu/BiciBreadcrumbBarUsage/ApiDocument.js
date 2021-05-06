/**
 * @File: 面包屑导航-接口文档
 */
import React, { Component } from 'react'
import { Table } from 'antd'
import { apiPropsColumns } from '@/data/apiDocument'

class ApiDocument extends Component {
  render() {
    const dataSource = [
      {
        params: 'pathname',
        description: '当前路由地址，location.pathname的值',
        type: 'string',
        isRequired: '是'
      },
      {
        params: 'data',
        description:
          '面包屑用来做匹配的数据，例如：{"/menu": {name: "菜单", isRoute: true}}，对象的key是路由地址，isRoute是设置这个面包屑可点击跳转',
        type: 'object',
        isRequired: '是'
      },
      {
        params: 'onNavigate',
        description: '点击跳转的回调函数，将需要跳转的路由地址传递出去，function(pathname)',
        type: 'function',
        isRequired: '是'
      }
    ]

    return (
      <div className="mt12">
        <p className="mb12 fstage16 fw500">BiciModal Props API</p>
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
