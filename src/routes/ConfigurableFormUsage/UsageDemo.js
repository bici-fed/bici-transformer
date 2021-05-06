/**
 * @File: 页面配置调用示例 Tab
 */
import React, { Component } from 'react'
import { BiciConfigurableForm } from 'bici-transformers'
import dictionaryData from './dictionaryData'
import * as formData from './formData'

class UsageDemo extends Component {
  handleCancel = () => { console.log('>>>>>> handleCancel') }
  handleSubmit = (areaList) => {
    // @TODO: 入 Store 逻辑示例
    console.log('>>>>>> handleSubmit: areaList', areaList)
  }
  componentDidMount() {
    const decoratedComponentInstance = this.biciConfigurableForm.getDecoratedComponentInstance()
    decoratedComponentInstance.initFormAreaList(formData.INITIAL_AREA_LIST_DATA) // 初始化可配置表单数据
    decoratedComponentInstance.initDictionary(dictionaryData) // 初始化数据字典
  }
  render() {
    return (
      <BiciConfigurableForm
        ref={(el) => { this.biciConfigurableForm = el }}
        onCancel={this.handleCancel}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default UsageDemo
