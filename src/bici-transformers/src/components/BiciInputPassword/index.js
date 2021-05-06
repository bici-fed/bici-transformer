/**
 * @File: InputPassword输入框
 */

import React, { Component } from 'react'
import { Input, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as biciInputPasswordUtils from './biciInputPasswordUtils'
import { verifyReg } from '../../utils/formUtils'
import { getFormLabelStyle } from '../../utils/styleUtils'

const {Password} = Input

class BiciInputPassword extends Component {
  state = {
    isHinted: false, // 是否有错误提示
  }
  // 清除错误提示
  clearHint = () => {
    this.setState({isHinted: false})
  }
  // 对外验证接口
  hint = () => { // 做提交验证触发 blur事件
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
    const isVerifyLengthFail = value.length < 6 || value.length > 18 // 验证长度为6-18位
    const isRegFail = verifyReg(regExp, value) // 验证正则
    const isRuleFail = verificationRule && !verificationRule(value) // 验证规则执行后返回 false 则失败
    const toSetHinted = isRequiredFail || isRuleFail || isRegFail || isVerifyLengthFail
    this.setState({isHinted: toSetHinted})
    return toSetHinted
  }
  renderInputPassword = () => {
    const {style} = this.props
    const {isHinted} = this.state
    const uncontrolledProps = _.omit(this.props, biciInputPasswordUtils.controlledProps)

    // 输入框样式变更控制
    let hintStyle = {}
    if (isHinted) {
      hintStyle = {
        border: '1px solid #f5222d',
        borderRadius: 4,
      }
    }
    return (
      <Password
        autoComplete="off"
        style={{...hintStyle, ...style}}
        className="widthPct100"
        onFocus={this.handleOnFocus}
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
              <Tooltip placement="topLeft" title={verificationTooltip}>{this.renderInputPassword()}</Tooltip>
              :
              this.renderInputPassword()
          }
        </div>
      </div>
    )
  }
}

BiciInputPassword.propTypes = {
  isRequired: PropTypes.bool, // 是否必填
  label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]), // 字段名
  verificationRule: PropTypes.func, // 验证规则
  verificationTooltip: PropTypes.string, // 验证提示信息
  regExp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(RegExp)
  ]), // 正则表达式
  style: PropTypes.object, // 组件的样式

  // 仅对进行了 format 的 AntD props 进行类型检测
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

BiciInputPassword.defaultProps = {
  isRequired: false,
  style: {},
}

export default BiciInputPassword
