/**
 * @File: 标签管理组件用例
 */

import React, { Component } from 'react'
import { Row, Col } from 'antd'
import _ from 'lodash'
import { BiciTagsManager } from 'bici-transformers'
import { selectData } from './mockData'

export default class BiciTagsManagerUsage extends Component {
  state = {
    dataSource: [{
      id: 1,
      name: '标签名1',
    }, {
      id: 2,
      name: '标签名2',
    }, {
      id: 3,
      name: '标签名很长',
    }, {
      id: 4,
      name: '标签名非常长'
    }],
    dynamicSelectData: selectData,
  }
  handleSelectTag = (toSetDataSource, toSetChecked, option) => { this.setState({ dataSource: toSetDataSource }) }
  handleCreateTag = (newTagName) => {
    const { dataSource, dynamicSelectData } = this.state
    const toPushOption = {
      id: Date.parse(new Date()),
      name: newTagName
    }
    let cloneDataSource = _.cloneDeep(dataSource)
    let cloneDynamicSelectData = _.cloneDeep(dynamicSelectData)
    cloneDataSource.push(toPushOption)
    cloneDynamicSelectData.push(toPushOption)
    this.setState({
      dataSource: cloneDataSource,
      dynamicSelectData: cloneDynamicSelectData
    })
  }
  handleDeleteTag = (toSetDataSource, toDeleteId, isToDatabase) => {
    const { dynamicSelectData } = this.state
    let cloneDynamicSelectData = _.cloneDeep(dynamicSelectData)
    const toDeleteIndex = cloneDynamicSelectData.findIndex((element) => { return element.id === toDeleteId })
    cloneDynamicSelectData.splice(toDeleteIndex, 1)
    this.setState({
      dataSource: toSetDataSource,
      dynamicSelectData: cloneDynamicSelectData
    })
  }
  handleEditTag = (toSetDataSource, editedId, editedName) => {
    const { dynamicSelectData } = this.state
    let cloneDynamicSelectData = _.cloneDeep(dynamicSelectData)
    const toChangeIndex = cloneDynamicSelectData.findIndex((element) => { return element.id === editedId })
    cloneDynamicSelectData[toChangeIndex].name = editedName
    this.setState({
      dataSource: toSetDataSource,
      dynamicSelectData: cloneDynamicSelectData
    })
  }
  render() {
    const { dataSource, dynamicSelectData } = this.state
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">标签管理</p>

        {/* 布局模度 */}
        <p className="mb12 fstage16 fw500">布局模度</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">标签字段布局遵循表单规范，字段与控件水平间距 8px；</li>
          <li className="circleLi">标签高度为 24px，标签间的水平间距为 8px，垂直间距为 6px；</li>
          <li className="circleLi">标签下拉选择面板，支持最多展示5条选项，超出后自动展示下拉滚动条；</li>
          <li className="circleLi">标签展示区域，标签名过长时（超过200px）展示省略号...；</li>
          <li className="circleLi">标签展示区域，鼠标移入标签 0.5s 后展示 Tooltip 显示标签名；</li>
        </ul>

        {/* 通用功能 */}
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb20 fstage14">
          <li className="circleLi">标签展示区域宽度为占满一行，超出最大宽度后自动换行；</li>
          <li className="circleLi">标签下拉选择面板，以对勾的形式示意已选、未选标签；</li>
          <li className="circleLi">标签下拉选择面板，鼠标移入选项后右侧显示可编辑按钮；</li>
          <li className="circleLi">标签下拉选择面板，标签名过长会结尾显示...；</li>
          <li className="circleLi">支持下拉搜索输入，下拉选择面板匹配搜索内容，当输入标签名不再下拉数据中时，显示标签快速创建面板；</li>
          <li className="circleLi">支持通过点击下拉选择面板右上角的“+”按钮，来创建标签；</li>
          <li className="circleLi">标签编辑面板支持标签的删除、更名；</li>
        </ul>

        {/* 功能示例 */}
        <p className="mb12 fstage16 fw500">功能示例</p>
        <Row>
          <Col span={16}>
            <BiciTagsManager
              selectMax={4}
              tagLength={20}
              size="small"
              dataSource={dataSource}
              selectData={dynamicSelectData}
              onSelectTag={this.handleSelectTag}
              onCreateTag={this.handleCreateTag}
              onDeleteTag={this.handleDeleteTag}
              onEditTag={this.handleEditTag}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
