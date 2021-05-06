/**
 * @File: 模态窗组件
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Modal } from 'antd'
import * as biciModalUtils from './biciModalUtils'

// 模态框宽度分档
export const modalWidth = {
      // 中间弹窗
  sm: 896, // 第一档宽度 用于表单编辑的模态窗宽度
  nm: 1176, // 第二档宽度 用于展示一些表格的模态窗宽度
}

export class BiciModal extends Component {
  render() {
    const { width, className, style, bodyStyle, footer } = this.props
    const uncontrolledProps = _.omit(this.props, biciModalUtils.controlledProps) // 过滤受控属性

    return (
      <Modal
        className={biciModalUtils.getModalClassName(className)}
        width={biciModalUtils.getModalWidth(width)}
        style={biciModalUtils.getModalStyle(style)}
        bodyStyle={biciModalUtils.getModalBodyStyle(bodyStyle)}
        footer={footer}
        {...uncontrolledProps}
      >
      </Modal>     
    )
  }
}

// 类型检测

BiciModal.defaultProps = {
  footer: null
}
export default BiciModal
