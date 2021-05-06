/**
 * @File: 消息通知接口文档
 */

import React, { Component } from 'react'
import { Table } from 'antd'
import { apiPropsColumns } from '../../data/apiDocument'

export default class ApiDocument extends Component {
  render() {
    const dataSource = [{
      params: 'disableAutoClosed',
      description: '设置是否手动关闭',
      type: 'boolean',
      default: 'false',
      isRequired: '否',
    }]

    return (
      <div className="mt12">
        <p className="mb12 fstage16 fw500">biciNotification API</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">biciNotification.success(config)</li>
          <li className="circleLi">biciNotification.error(config)</li>
          <li className="circleLi">biciNotification.info(config)</li>
          <li className="circleLi">biciNotification.warning(config)</li>
          <li className="circleLi">biciNotification.warn(config)</li>
          <li className="circleLi">biciNotification.close(key: String)</li>
        </ul>
        <p className="mb12 fstage14 fw500">config 新增参数如下：</p>
        <Table
          columns={apiPropsColumns}
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
