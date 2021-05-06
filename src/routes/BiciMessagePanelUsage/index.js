import React, { Component } from 'react'
import { Table } from 'antd'
import { apiPropsColumns } from '@/data/apiDocument'
class BiciMessagePanelUsage extends Component {
  render() {
    const propsDataSource = [{
      params: 'accordion',
      description: '手风琴模式',
      type: 'boolean',
      defaultVal: 'false',
      isRequired: '否'
    }, {
      params: 'messageCount',
      description: '徽标数量',
      type: 'number',
      defaultVal: '-',
      isRequired: '否'
    }, {
      params: 'attentionList',
      description: '关注列表数据',
      type: 'array',
      defaultVal: '[]',
      isRequired: '是'
    }, {
      params: 'messageList',
      description: '消息列表数据',
      type: 'array',
      defaultVal: '[]',
      isRequired: '是'
    }, {
      params: 'onAttention',
      description: '关注后的回调,参数moduleId为点击关注/未关注的Id',
      type: 'function(moduleId)',
      defaultVal: '-',
      isRequired: '否'
    }, {
      params: 'onCollapseChange',
      description: '展开折叠面板后的回调,参数appendixId为展开折叠面板的Id',
      type: 'function(appendixId)',
      defaultVal: '-',
      isRequired: '否'
    }, {
      params: 'onInfiniteLoad',
      description: '滚动加载后的回调',
      type: 'function()',
      defaultVal: '-',
      isRequired: '否'
    }]
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">消息面板（BiciMessagePanel）</p>
        <p className="mb12 fstage16 fw500">何时使用</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">当点击消息图标时，消息推送面板从父窗体边缘滑入，覆盖住部分父窗体内容。</li>
        </ul>
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">消息推送面板默认定宽760px；默认从右侧弹出；</li>
          <li className="circleLi">消息推送面板默认有两栏（关注列表、消息列表），在关注列表里关注对应的模块，消息列表里会出现对应的消息模块；</li>
          <li className="circleLi">封装了徽标数量显示功能，为0时候隐藏，大于99时显示为99+；</li>
          <li className="circleLi">封装了消息模块的消息列表滚动加载功能；</li>
          <li className="circleLi">封装了手风琴模式，每次只打开一个折叠面板；</li>
          <li className="circleLi">onAttention() 方法为关注/未关注后的回调；</li>
          <li className="circleLi">onCollapseChange() 方法为展开/折叠折叠面板后的回调；</li>
          <li className="circleLi">onInfiniteLoad() 方法为滚动加载后的回调，与hasMore配合使用，控制是否加载全部消息；</li>
        </ul>
        <p className="mt12 mb12 fstage16 fw500">BiciMessagePanel Props API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={propsDataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />
      </div>
    )
  }
}
export default BiciMessagePanelUsage
