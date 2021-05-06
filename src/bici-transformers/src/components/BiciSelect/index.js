/**
 * @File: 下拉选择控件
 */
import React, { Component } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import * as biciSelectUtils from './biciSelectUtils'
import { getFormLabelStyle } from '../../utils/styleUtils'
import styles from './biciSelect.css'

const { Option, OptGroup } = Select;

class BiciSelect extends Component {
  state = {
    isHinted: false,
  }
  // 清除错误提示
  clearHint = () => {
    this.setState({ isHinted: false })
  }
  hint = () => { // 做提交验证触发blur事件
    const  blurResult = this.handleOnBlur() // 拿到验证结果
    return blurResult
  }
  handleOnFocus = () => {
    const { onFocus } = this.props
    const { isHinted } = this.state
    if (isHinted) { // 正处于提示状态 
      this.setState({ isHinted: false }, () => {
        onFocus && onFocus()
      })
    } else {
      onFocus && onFocus()
    }
  }
  handleOnBlur = () => {
    const { isRequired, onBlur, value } = this.props
    let toSetHinted = false
    if (!isRequired) { // 非必填
      onBlur && onBlur()
    } else { // 必填
      if (value === '' || value === undefined || value === null || value.length === 0) {
        toSetHinted = true
        this.setState({ isHinted: toSetHinted }, () => { onBlur && onBlur() })
      }
    }
    return toSetHinted
  }
  render() {
    const { data, label, isRequired, originalValue, size } = this.props
    const { isHinted } = this.state
    const uncontrolledProps = _.omit(this.props, biciSelectUtils.controlledProps)
    const formatedData = biciSelectUtils.formatData(data)
    const options = formatedData.map((item) => {
      const { id, name, dataStatus = 1 } = item
      const isOptionDisabled = dataStatus !== 1 // dataStatus 是与后端确定的表示是否禁用态的字段
      return (<Option key={id} value={id} disabled={isOptionDisabled}>{name}</Option>)
    })
    const hasOriginalValue = !(typeof(originalValue) === 'undefined') // 是否设置了原始值，用于数据副本场景
    // 控制边框变红，显示红框的元素不是根元素组件只能通过css 选择器去控制border
    const selectStyle= classNames({
      widthPct100: true,
      [styles.hasErr]: isHinted
    })
    const formLabelStyle = getFormLabelStyle(size)
    // 判断 label 类型，如果是字符串，渲染默认样式的 label
    // 如果是 ReactNode 直接渲染
    const isLableString = _.isString(label)
    const stringTypeLabel = (
      <div className={formLabelStyle}>
        { isRequired && <span className="form-labelRequired">*</span> }
        { `${label}：`}
      </div>
    )
    const labelContent = isLableString ? stringTypeLabel : label
    return (
      <div className="dpflex">
        {labelContent}
        <div className="flex1">
          {
            hasOriginalValue
            ? // 有原始值
            <Select
              className={selectStyle}
              onFocus={this.handleOnFocus}
              onBlur={this.handleOnBlur}
              { ...uncontrolledProps }
            >
              <OptGroup label="原数据"><Option value={originalValue}>{originalValue}</Option></OptGroup>
              <OptGroup label="选项">{options}</OptGroup>
            </Select>
            : // 无原始值
            <Select
              className={selectStyle}
              onFocus={this.handleOnFocus}
              onBlur={this.handleOnBlur}
              { ...uncontrolledProps }
            >
              {options}
            </Select>
          }
        </div>
      </div>
    )
  }
}

BiciSelect.propTypes = {
  isRequired: PropTypes.bool.isRequired, // 是否必填
  label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]), // 字段名
  originalValue: PropTypes.string, // 原始值，支持数据副本模式
  data: PropTypes.array.isRequired, // 下拉选择数据

  // 仅对进行了 format 的 AntD props 进行类型检测
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

BiciSelect.defaultProps = {
  isRequired: false,
}

export default BiciSelect
