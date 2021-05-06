/**
 * @File: DatePicker日期选择
 */
import React, { Component } from 'react'
import { DatePicker } from 'antd'
import DateTimePicker from '../DateTimePicker'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { getFormLabelStyle } from '../../utils/styleUtils'
import * as biciDatePickerUtils from './biciDatePickerUtils'
import styles from './biciDatePicker.css'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker
const { DateTimeRangePicker } = DateTimePicker

class BiciDatePicker extends Component {
  state = {
    isHinted: false, // 是否有错误提示
  }
  // 清除错误提示
  clearHint = () => {
    this.setState({ isHinted: false })
  }

  hint = () => {
    const blurResult = this.handleOnBlur() // 拿到验证结果
    return blurResult
  }

  handleOnBlur = () => {
    const { isRequired, onBlur, value } = this.props
    onBlur && onBlur()
    // 验证必填
    const isRequiredFail = isRequired && (value === undefined || value === '' || value === null)
    if (isRequiredFail) {
      this.setState({ isHinted: true })
    }
    return isRequiredFail
  }

  handleOnFocus = () => {
    const { onFocus } = this.props
    if (onFocus) {
      onFocus()
      return
    }
    this.setState({ isHinted: false })
  }

  renderDatePicker = () => {
    const { type } = this.props
    const { isHinted } = this.state
    const uncontrolledProps = _.omit(this.props, biciDatePickerUtils.controlledProps)
    // 控制边框变红，显示红框的元素不是根元素组件只能通过css 选择器去控制border
    const datePickerStyle = classNames({
      widthPct100: true,
      [styles.hasErr]: isHinted,
    })
    switch (type) {
      case 'datePicker':
        return (
          <DatePicker
            className={datePickerStyle}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            {...uncontrolledProps}
          />
        )
      case 'monthPicker':
        return (
          <MonthPicker
            className={datePickerStyle}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            {...uncontrolledProps}
          />
        )
      case 'rangePicker':
        return (
          <RangePicker
            className={datePickerStyle}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            {...uncontrolledProps}
          />
        )
      case 'weekPicker':
        return (
          <WeekPicker
            className={datePickerStyle}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            {...uncontrolledProps}
          />
        )
      case 'dateTimePicker':
        return (
          <DateTimePicker
            className={datePickerStyle}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            {...uncontrolledProps}
          />
        )
      case 'dateTimeRangePicker':
        return (
          <DateTimeRangePicker
            className={datePickerStyle}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            {...uncontrolledProps}
          />
        )
    }
  }

  render() {
    const { isRequired, label, size } = this.props
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
        <div className="flex1">{this.renderDatePicker()}</div>
      </div>
    )
  }
}

BiciDatePicker.propTypes = {
  isRequired: PropTypes.bool, // 是否必填
  label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]), // 字段名
  type: PropTypes.oneOf([
    'datePicker',
    'rangePicker',
    'weekPicker',
    'monthPicker',
    'dateTimePicker',
    'dateTimeRangePicker',
  ]),

  // 仅对进行了 format 的 AntD props 进行类型检测
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

BiciDatePicker.defaultProps = {
  isRequired: false,
  type: 'datePicker',
}

export default BiciDatePicker
