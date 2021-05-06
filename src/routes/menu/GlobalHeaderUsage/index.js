/**
 * @File: 菜单-顶部导航
 */
import React, { Component } from 'react'

export default class GlobalHeaderUsage extends Component {
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">顶部菜单</p>

        {/* 布局模度 */}
        <p className="mb12 fstage16 fw500">布局模度</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">顶部菜单高度为 48 px；</li>
        </ul>

        {/* 通用功能 */}
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">功能：左侧配合侧边导航的折叠按钮</li>
        </ul>

        {/* 正在研发中的功能 */}
        <p className="mb12 fstage16 fw500">正在研发中的功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">功能：面包屑标题；</li>
          <li className="circleLi">功能：右侧下拉菜单及功能导航</li>
        </ul>
      </div>
    )
  }
}
