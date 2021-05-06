/**
 * @file 日期时间选择组件
 */
import React, { Component } from 'react'
import { DatePicker as AntDatePicker } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import classNames from 'classnames'
import styles from './DateTimePicker.css'

let hours = []
let minutes = []
let seconds = []
for (let i = 0; i < 60; i++) {
  let item = i < 10 ? `0${i}` : `${i}`
  if (i < 24) {
    hours.push(item)
  }
  minutes.push(item)
  seconds.push(item)
}
function itemStyle(value, item, data) {
  return classNames({
    [styles.item]: true,
    [styles.disabled]: !value,
    [styles.active]: value && item - data === 0,
  })
}

class DatePicker extends Component {
  componentKey = moment().valueOf() // 设置id的唯一标识
  state = {
    open: false,
  }
  handleTimeChange = (key, val) => {
    const { format = 'YYYY-MM-DD HH:mm:ss', value, onChange } = this.props
    if (!value) {
      return
    }
    value.set(key, val)
    const valueStr = (value && value.format(format)) || ''
    onChange && onChange(value.clone(), valueStr)
  }
  handleOpenChange = (open) => {
    const { onOpenChange } = this.props
    onOpenChange && onOpenChange(open)
    this.setState({ open })
  }
  handleChange = (date, dateString) => {
    const { onChange } = this.props
    const { open } = this.state
    if (open) {
      this.setState({ open: true })
    }
    onChange && onChange(date, dateString)
  }
  handleConfirm = () => {
    const { onOk } = this.props
    onOk && onOk()
    this.handleOpenChange(false)
  }
  renderTimeItem = (list, key, data) => {
    const { limitTime, value } = this.props
    const element = document.getElementById(`${this.componentKey}${key}${data}`)
    element && element.scrollIntoView(true)
    return (
      <div className={styles.column}>
        {list.map((item) => {
          if (value && limitTime && limitTime.value) {
            const cacheValue = value.clone()
            cacheValue.set(key, +item)
            if (limitTime.type === 'start' && cacheValue.isBefore(limitTime.value)) {
              return null
            }
            if (limitTime.type === 'end' && cacheValue.isAfter(limitTime.value)) {
              return null
            }
          }
          const id = `${this.componentKey}${key}${+item}`
          return (
            <div id={id} className={itemStyle(value, item, data)} onClick={() => this.handleTimeChange(key, +item)}>
              {item}
            </div>
          )
        })}
        <div style={{ height: '230px' }}></div>
      </div>
    )
  }
  render() {
    const { format = 'YYYY-MM-DD HH:mm:ss', value, placeholder = '请选择日期和时间' } = this.props
    const { open } = this.state
    const dynamicProps = _.omit(this.props, [
      'showToday',
      'showTime',
      'renderExtraFooter',
      'format',
      'disabledTime',
      'limitTime',
      'onOpenChange',
      'onChange',
      'onOk',
    ])
    const hour = (value && value.get('hour')) || ''
    const minute = (value && value.get('minute')) || ''
    const second = (value && value.get('second')) || ''
    const footerNode = (
      <div>
        <div className={styles.wrapper}>
          {format.indexOf('HH') !== -1 && this.renderTimeItem(hours, 'hour', hour)}
          {format.indexOf('mm') !== -1 && this.renderTimeItem(minutes, 'minute', minute)}
          {format.indexOf('ss') !== -1 && this.renderTimeItem(seconds, 'second', second)}
        </div>
        <div className={styles.okBtn} onClick={this.handleConfirm}>
          确定
        </div>
      </div>
    )
    return (
      <AntDatePicker
        placeholder={placeholder}
        showToday={false}
        format={format}
        open={open}
        popupStyle={{ width: '430px' }}
        onOpenChange={(open) => this.handleOpenChange(open)}
        renderExtraFooter={() => footerNode}
        onChange={this.handleChange}
        {...dynamicProps}
      />
    )
  }
}

export default DatePicker
