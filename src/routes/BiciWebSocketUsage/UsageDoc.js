import React, { Component } from 'react'
import { Table } from 'antd'
import { apiPropsColumns, apiMethodsColumns } from '@/data/apiDocument'

export default class UsageDoc extends Component {
  render() {
    const propsDataSource = [{
      params: 'baseUrl',
      description: '连接的 WebSocket URL',
      type: 'string',
      defaultVal: '-',
      isRequired: '是'
    }, {
      params: 'params',
      description: 'URL的参数',
      type: 'object',
      defaultVal: '-',
      isRequired: '否'
    }, {
      params: 'heartCheckInterval',
      description: '心跳检测时间间隔',
      type: 'number',
      defaultVal: '60000(ms)',
      isRequired: '否'
    }, {
      params: 'maxReconnectCount',
      description: '最大重连次数',
      type: 'number',
      defaultVal: '5',
      isRequired: '否'
    }, {
      params: 'reconnectInterval',
      description: '重连时间间隔',
      type: 'number',
      defaultVal: '1000(ms)',
      isRequired: '否'
    }, {
      params: 'messageFormatType',
      description: '处理服务器返回数据格式。若不需要任何格式转换传入空字符串""',
      type: 'string',
      defaultVal: 'json',
      isRequired: '否'
    }, {
      params: 'onOpen',
      description: '连接成功后的回调',
      type: 'function(ev)',
      defaultVal: '-',
      isRequired: '否'
    }, {
      params: 'onError',
      description: '连接失败后的回调',
      type: 'function(ev)',
      defaultVal: '-',
      isRequired: '否'
    }, {
      params: 'onMessage',
      description: '从服务器接收到信息时的回调，参数 val 为转换格式后的信息',
      type: 'function(val)',
      defaultVal: '-',
      isRequired: '否'
    }, {
      params: 'Debug',
      description: 'Debug模式',
      type: 'boolean',
      defaultVal: 'false',
      isRequired: '否'
    }]
    const methodDataSource = [{
      method: 'init()',
      description: '初始化可配置webSocket对象',
      params: '无'
    }, {
      method: 'close(code, reason)',
      description: '关闭WebSocket连接，如果连接已关闭，则此方法不执行任何操作。code为数字状态码，reason可读的字符串，解释连接关闭的原因',
      params: 'code: number(optional),reason: string(optional)'
    }, {
      method: 'replace(params)',
      description: '同一连接URL参数的替换',
      params: 'params: object'
    }]
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">BiciWebSocket</p>
        <p className="mb12 fstage16 fw500">功能封装点</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">可传入 URL 参数对象，会完成对象到 URL 参数字符串拼接的处理；</li>
          <li className="circleLi">进行了浏览器对 WebSocket 兼容性的判断；</li>
          <li className="circleLi">WebSocket 链接创建失败或 Error 时会尝试进行重连，可以设置最大尝试的重连次数和尝试重连的时间间隔；</li>
          <li className="circleLi">封装了对 onMessage 数据的默认 JSON 格式处理，也可通过传空字符串放弃默认处理；</li>
          <li className="circleLi">封装了心跳检测策略，过一段间隔时间后会通过向服务端发送数据来验证链接是否异常，可设置心跳检测时间间隔；</li>
          <li className="circleLi">可通过 close() 方法主动关闭 WebSocket 链接；</li>
          <li className="circleLi">可通过 replace() 方法在不销毁 BiciWebSocket Class 实例的情况下更新参数并重新建立 WebSocket 链接；</li>
          <li className="circleLi">可开启 Debug 模式来打印调试信息；</li>
        </ul>
        <p className="mt12 mb12 fstage16 fw500">BiciWebSocket Props API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={propsDataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />

        <p className="mt12 mb12 fstage16 fw500">BiciWebSocket Methods</p>
        <Table
          columns={apiMethodsColumns}
          dataSource={methodDataSource}
          rowKey="method"
          size="middle"
          bordered
          pagination={false}
        />
      </div>
    )
  }
}
