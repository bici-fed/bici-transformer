/**
 * @File: 标签栏管理用例
 */
import React, { Component } from 'react'
import ApiDocument from './ApiDocument'

export default class BiciTabsBarUsage extends Component {
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">标签栏（BiciTabsBar）</p>

        {/* 布局模度 */}
        <p className="mb12 fstage16 fw500">布局模度</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">标签栏作为全局页面导航使用，置于应用顶部导航之下。与顶部导航间距为 12px，Tab 标签间的间距为 8px；</li>
          <li className="circleLi">标签选中态时背景色为蓝色 #1890ff，未被选中时背景为白色 #fff；</li>
        </ul>

        {/* 通用功能 */}
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">自适应浏览器宽度；</li>
          <li className="circleLi">标签从左到右按出现时间升序排列，最新的一个标签出现在右侧；</li>
          <li className="circleLi">标签栏超出可视宽度时，可通过点击左右移动按钮浏览被隐藏的内容；</li>
          <li className="circleLi">删除被选中的标签后跳转到的是前一个标签页面；</li>
          <li className="circleLi">支持可配置固定 Tab 页，不允许被删除；</li>
          <li className="circleLi">提供刷新当前页面按钮，点击后重新请求当前 Tab 页数据；</li>
          <li className="circleLi">提供删除所有非固定标签的按钮，点击后删除所有非固定标签，切换至最左侧的固定 Tab 页；</li>
        </ul>
        {/* 接口文档 */}
        <ApiDocument />
      </div>
    )
  }
}
