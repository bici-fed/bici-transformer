/**
 * @File: 表单-表单规范
 */

import React, { Component } from 'react'

export default class TabPaneStandard extends Component {
  render() {
    return (
      <div className="pageWrapper">
        {/* 布局 */}
        <p className="mb12 fstage16 fw500">布局模度</p>
        <ul className="mb12 fstage14">         
          <li className="circleLi">总体布局：采用三列布局；</li>
          <li className="circleLi">必填项（*）：* 右侧距离字段名 8px；</li>
          <li className="circleLi">字段名：定宽 126px，右侧距离表单控件 8px；</li>
          <li className="circleLi">表单控件长度：水平方向挤满该列宽度；</li>
          <li className="circleLi">行间距：垂直方向上的两个表单控件距离 8px；</li>
        </ul>

        {/* 提示语 */}
        <p className="mb12 fstage16 fw500">表单验证提示语方式</p>
        <ul className="mb12 fstage14">  
          <li className="circleLi">类型：placeholder；必填项提示；错误提示；提交提示；</li>
          <li className="circleLi">颜色：红色、灰色、白色。必填项和错误提示会使表单控件边框变红，其他文字提示为灰色（内部placeholder）和白色（气泡提示信息文字）；</li>
          <li className="circleLi">位置：表单控件内、表单控件左上方或页面左下角；placeholder在表单控件内部展示，除提交提示以消息通知框的形式出现在页面左下角，其它的均以表单控件边框变红、左上角气泡提示的形式展示；</li>
          <li className="circleLi">行间距：垂直方向上的两个输入框距离 8px；</li>
          <li className="circleLi">出现时机：“必填”和具体输入错误的提示在表单控件失去焦点后触发；表单整体提交后，错误信息由表单控件边框变红或左下角消息提示方式展示；</li>
        </ul>

        {/* 具体提示语 */}
        <p className="mb12 fstage16 fw500">具体提示语</p>
        <ul className="mb12 fstage14">  
          <li className="circleLi">表单控件附着的Tooltip提示：内容自定制；</li>
          <li className="circleLi">placeholder：提示用户输入的具体格式及要求。例如：请输入 11 位纯数字；</li>
          <li className="circleLi">表单提交成功：提示 提交成功！；</li>
        </ul>
      </div>
    )
  }
}
