/**
 * @File: Input 输入框
 */

import React, { Component } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import * as biciInputUtils from './biciInputUtils'
import { verifyReg } from '../../utils/formUtils'
import { getFormLabelStyle } from '../../utils/styleUtils'

class BiciInput extends Component {
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
    const isVerifyLengthFail = value.trim().length > maxLength // 验证最大长度
    const isRegFail = verifyReg(regExp, value) // 验证正则
    const isRuleFail = verificationRule && !verificationRule(value) // 验证规则执行后返回 false 则失败
    const toSetHinted = isRequiredFail || isRuleFail || isRegFail || isVerifyLengthFail
    this.setState({isHinted: toSetHinted})
    return toSetHinted
  }
  renderInput = () => {
    const {style, hintRight, verificationTooltip, maxStrLength} = this.props
    const {isHinted} = this.state
    const uncontrolledProps = _.omit(this.props, biciInputUtils.controlledProps)
    if (hintRight && verificationTooltip) {
      uncontrolledProps.suffix = <Tooltip title={verificationTooltip}><InfoCircleOutlined style={{color: isHinted ? '#f5222d' : 'rgba(0,0,0,.45)'}} /></Tooltip>
    }
    // 输入框样式变更控制
    const inputStyle = classNames({
      widthPct100: true,
      inputHint: hintRight && verificationTooltip && isHinted
    })
    let hintStyle = {}
    if (!(hintRight && verificationTooltip) && isHinted) {
      hintStyle = {border: '1px solid #f5222d'}
    }
    return (
      <Input
        maxLength={maxStrLength}
        style={{...hintStyle, ...style}}
        className={inputStyle}
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnblur}
        {...uncontrolledProps}
      />
    )
  }

  render () {
    const {isRequired, label, verificationTooltip, hintRight, size} = this.props
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
            !hintRight && verificationTooltip // 是否传入规则提示信息
              ?
              <Tooltip placement="topLeft" title={verificationTooltip}>{this.renderInput()}</Tooltip>
              :
              this.renderInput()
          }
        </div>
      </div>
    )
  }
}

BiciInput.propTypes = {
  isRequired: PropTypes.bool, // 是否必填
  label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]), // 字段名
  verificationRule: PropTypes.func, // 验证规则
  verificationTooltip: PropTypes.string, // 验证提示信息
  hintRight: PropTypes.bool, // 提示信息在右侧
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

BiciInput.defaultProps = {
  isRequired: false,
  maxLength: 250,
  style: {},
  hintRight: false,
}

export default BiciInput
