/**
 * @File: 面包屑导航用例
 */
import React, { Component } from 'react'
import ApiDocument from './ApiDocument'

export default class BiciBreadcrumbBarUsage extends Component {
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">面包屑导航（BiciBreadcrumbBar）</p>

        {/* 布局模度 */}
        <p className="mb12 fstage16 fw500">布局模度</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">位于顶部，与头像等内容同一行；</li>
          <li className="circleLi">整体靠左。</li>
        </ul>

        {/* 通用功能 */}
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">体现用户访问的页面层级，快速定位位置；</li>
          <li className="circleLi">可点击面包屑跳转页面；</li>
          <li className="circleLi">可点击跳转的面包屑鼠标移入会显示蓝色；</li>
          <li className="circleLi">目录及最后一级面包屑不可点击跳转。</li>
        </ul>

        {/* 接口文档 */}
        <ApiDocument />
      </div>
    )
  }
}
