/**
 * @File: 操作记录组件用例
 */
import React, { Component } from 'react'
import { BiciOperatingRecord } from 'bici-transformers'
import ApiDocument from './ApiDocument'
import operatingRecordData from './mockData'

export default class BiciOperatingRecordUsage extends Component {
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">操作记录（BiciOperatingRecord）</p>

        {/* 布局模度 */}
        <p className="mb12 fstage16 fw500">布局模度</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">操作记录一般独立为整个 Tab 页进行展示，少数场景下也会作为页面竖排版中的一部分进行展示；</li>
        </ul>

        {/* 通用功能 */}
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">一条操作记录包含如下字段：日期，时间，操作人，操作类型，操作记录主体内容；</li>
          <li className="circleLi">操作记录逐条由上至下以操作时间降序排列，最新的记录条目在第一条显示；</li>
        </ul>

        {/* 示例 */}
        <p className="mb12 fstage16 fw500">示例</p>
        <BiciOperatingRecord size="small" data={operatingRecordData} />

        {/* 接口文档 */}
        <ApiDocument/>
      </div>
    )
  }
}
