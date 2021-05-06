/**
 * @File: 菜单-侧边导航
 */
import React, { Component } from 'react'

export default class SliderMenuUsage extends Component {
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">侧边导航</p>

        {/* 布局模度 */}
        <p className="mb12 fstage16 fw500">布局模度</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">侧边导航未折叠状态下宽度为 208 px，折叠状态下宽度为 80 px；</li>
          <li className="circleLi">每行菜单高度为 40 px</li>
        </ul>

        {/* 通用功能 */}
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">自动适配：侧边导航高度为浏览器窗口高度，菜单内容高度超过窗口高度时会自动出现纵向滚动条；</li>
          <li className="circleLi">功能：支持 1、2 级导航配置，进行折叠展示，折叠状态下鼠标移入 1 级菜单弹出显示 2 级菜单；</li>
          <li className="circleLi">功能：支持 1、2 级菜单图标配置；</li>
          <li className="circleLi">功能：支持菜单折叠，折叠按钮外置于顶部菜单最左侧；</li>
          <li className="circleLi">功能：支持当前菜单项高亮显示；</li>
        </ul>

        {/* 正在研发中的功能 */}
        <p className="mb12 fstage16 fw500">正在研发中的功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">自动适配：浏览器地址栏输入 URL 后对应菜单高亮显示；</li>
          <li className="circleLi">功能：支持递归地进行 1、2 级菜单权限分配</li>
        </ul>
      </div>
    )
  }
}
