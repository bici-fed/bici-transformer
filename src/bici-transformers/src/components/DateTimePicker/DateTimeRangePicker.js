/**
 * @file 日期时间范围选择组件
 */
import React, { Component } from 'react'
import DateTimePicker from './DateTimePicker'

class DateTimeRangePicker extends Component {
  state = {
    endOpen: false,
  }
  handleDisabledStartDate = (startValue) => {
    const { value } = this.props
    const endValue = (Array.isArray(value) && value[1]) || null
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() >= endValue.valueOf()
  }
  handleDisabledEndDate = (endValue) => {
    const { value } = this.props
    const startValue = (Array.isArray(value) && value[0]) || null
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }
  handleStartOpenChange = () => {
    this.setState({ endOpen: true })
  }
  handleChange = (index, val) => {
    const { format = 'YYYY-MM-DD HH:mm:ss', value, onChange } = this.props
    value[index] = val
    const startFormat = (Array.isArray(format) && format[0]) || format
    const endFormat = (Array.isArray(format) && format[1]) || format
    const startValueStr = (value[0] && value[0].format(startFormat)) || ''
    const endValueStr = (value[1] && value[1].format(endFormat)) || ''
    const valueStr = [startValueStr, endValueStr]
    onChange && onChange(value, valueStr)
  }
  handleOk = () => {
    const { value, onOk } = this.props
    if (onOk && Array.isArray(value) && value[0] && value[1]) {
      onOk(value)
    }
  }
  render() {
    const {
      style,
      className,
      value,
      format = 'YYYY-MM-DD HH:mm:ss',
      placeholder = ['开始日期和时间', '结束日期和时间'],
      allowClear = true,
      size = 'default',
      disabled = false,
      onOk,
    } = this.props
    const { endOpen } = this.state
    const startPlaceholder = (Array.isArray(placeholder) && placeholder[0]) || ''
    const endPlaceholder = (Array.isArray(placeholder) && placeholder[1]) || ''
    const startFormat = (Array.isArray(format) && format[0]) || format
    const endFormat = (Array.isArray(format) && format[1]) || format
    const startValue = (Array.isArray(value) && value[0]) || null
    const endValue = (Array.isArray(value) && value[1]) || null
    return (
      <div style={{ display: 'flex', alignItems: 'center', ...style }} className={className}>
        <DateTimePicker
          allowClear={allowClear}
          size={size}
          placeholder={startPlaceholder}
          disabled={disabled}
          style={{ flex: 1 }}
          format={startFormat}
          disabledDate={this.handleDisabledStartDate}
          limitTime={{ type: 'end', value: endValue }}
          value={startValue}
          onChange={(value) => {
            this.setState({ endOpen: false })
            this.handleChange(0, value)
          }}
          onOpenChange={(open) => {
            if (!open) {
              this.setState({ endOpen: true })
            }
          }}
          onOk={this.handleOk}
        />
        <span style={{ width: '16px', textAlign: 'center' }}>~</span>
        <DateTimePicker
          allowClear={allowClear}
          size={size}
          placeholder={endPlaceholder}
          disabled={disabled}
          style={{ flex: 1 }}
          format={endFormat}
          disabledDate={this.handleDisabledEndDate}
          limitTime={{ type: 'start', value: startValue }}
          value={endValue}
          onChange={(value) => {
            if (endOpen) {
              this.setState({ endOpen: true })
            }
            this.handleChange(1, value)
          }}
          open={endOpen}
          onOpenChange={(open) => this.setState({ endOpen: open })}
          onOk={this.handleOk}
        />
      </div>
    )
  }
}

export default DateTimeRangePicker
