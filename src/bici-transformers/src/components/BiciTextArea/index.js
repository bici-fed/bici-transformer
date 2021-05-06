/**
 * @File: TextArea 文本域
 */

import React, { Component } from 'react'
import { Input, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as biciTextAreaUtils from './biciTextAreaUtils'
import { verifyReg } from '../../utils/formUtils'
import { getFormLabelStyle } from '../../utils/styleUtils'

const {TextArea} = Input

class BiciTextArea extends Component {
  state = {
    isHinted: false, // 是否有错误提示
  }
  // 清除错误提示
  clearHint = () => {
    this.setState({isHinted: false})
  }

  hint = () => { // 做提交验证触发blur事件
    const blurResult = this.handleOnblur() // 拿到验证结果
    return blurResult
  }

  handleOnFocus = () => {
    const {onFocus} = this.props
    if (onFocus) {
      onFocus()
    } else {
      this.setState({isHinted: false})
    }
  }
  handleOnblur = () => {
    const {isRequired, value, onBlur, verificationRule, regExp, maxLength} = this.props
    onBlur && onBlur()
    // 验证逻辑校验
    const isRequiredFail = isRequired && (value === undefined || value.trim() === '') // 验证必填
    const isVerifyLengthFail = value.trim().length > maxLength // 验证最大长度
    const isRegFail = verifyReg(regExp, value) // 验证正则
    const isRuleFail = verificationRule && !verificationRule(value) // 验证规则执行后返回 false 则失败
    const toSetHinted = isRequiredFail || isRuleFail || isRegFail || isVerifyLengthFail
    this.setState({isHinted: toSetHinted})
    return toSetHinted
  }
  renderTextArea = () => {
    const {style, maxStrLength} = this.props
    const {isHinted} = this.state
    const uncontrolledProps = _.omit(this.props, biciTextAreaUtils.controlledProps)

    // 输入框样式变更控制
    let hintStyle = {}
    if (isHinted) {
      hintStyle = {
        border: '1px solid #f5222d',
        borderRadius: 4,
      }
    }
    return (
      <TextArea
        maxLength={maxStrLength}
        style={{...hintStyle, ...style}}
        className="widthPct100"
        onFocus={this.handleOnFocus}
        autosize={{minRows: 4}}
        onBlur={this.handleOnblur}
        {...uncontrolledProps}
      />
    )
  }

  render () {
    const {isRequired, label, verificationTooltip, size} = this.props
    const formLabelStyle = getFormLabelStyle(size)
    // 判断 label 类型，如果是字符串，渲染默认样式的 label
    // 如果是 ReactNode 直接渲染
    const isLableString = _.isString(label)
    const stringTypeLabel = (
      <div className={formLabelStyle}>
        {isRequired && <span className="form-labelRequired">*</span>}
        {`${label}：`}
      </div>
    )
    const labelContent = isLableString ? stringTypeLabel : label
    return (
      <div className="dpflex">
        {labelContent}
        <div className="flex1">
          {
            verificationTooltip // 是否传入规则提示信息
              ?
              <Tooltip placement="topLeft" title={verificationTooltip}>{this.renderTextArea()}</Tooltip>
              :
              this.renderTextArea()
          }
        </div>
      </div>
    )
  }
}

BiciTextArea.propTypes = {
  isRequired: PropTypes.bool, // 是否必填
  label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]), // 字段名
  verificationRule: PropTypes.func, // 验证规则
  verificationTooltip: PropTypes.string, // 验证提示信息
  regExp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(RegExp)
  ]), // 正则表达式
  maxLength: PropTypes.number, // 最大字符长度
  style: PropTypes.object, // 组件的样式
  maxStrLength: PropTypes.number, // 最大字符长度限制

  // 仅对进行了 format 的 AntD props 进行类型检测
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

BiciTextArea.defaultProps = {
  isRequired: false,
  maxLength: 250,
  style: {},
}

export default BiciTextArea
