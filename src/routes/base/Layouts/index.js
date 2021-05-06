/**
 * @File: 基础规范 - 布局
 */
import React, { Component } from 'react'
import Spacing from './Spacing'
import LayoutConst from './LayoutConst'

export default class Colors extends Component {
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">布局</p>

        {/* 亲密性原则 */}
        <p className="mb12 fstage16 fw500">亲密性原则</p>
        <ul className="mb12 fstage14">
          <li>
            如果信息之间关联性越高，它们之间的距离就应该越接近，也越像一个视觉单元；反之，则它们的距离就应该越远，也越像多个视觉单元。
          </li>
          <li>亲密性的根本目的是实现组织性，让用户对页面结构和信息层次一目了然。</li>
        </ul>

        {/* 布局模度公式 */}
        <p className="mt20 mb12 fstage16 fw500">布局模度公式</p>
        <p className="mb12 fstage14">
          所有常用或非常用布局模度（px）的设定，都应遵守 <span className="fw600">公式 y = 8 + 4*n</span>。其中, n >=
          0，y 是 <span className="fw600">布局模度值</span>，4 是 <span className="fw600">基础模度值</span>。
        </p>

        {/* 间距 */}
        <Spacing />

        {/* 布局常量 */}
        <LayoutConst />

        {/* 紧凑布局要点 */}
        <p className="mt20 mb12 fstage16 fw500">紧凑布局要点</p>
        <ul className="mb12 fstage14">
          <li>设置antd的less变量，可设置的变量分为全局变量和组件变量，主要涉及字号、动画、色号、边距、边框</li>
          <li>通过css选择器修改公共组件库样式</li>
        </ul>
      </div>
    )
  }
}
