/**
 * @File: BiciDrawer 抽屉组件
 */

import React, { Component } from 'react'
import { Drawer, Button } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as biciDrawerUtils from './biciDrawerUtils'
import { addSmallStyle } from '../../utils/styleUtils'
import styles from './biciDrawer.css'

export const biciDrawerWidth = {
  sm: 552, // 第一档宽度
  nm: 1024 // 第二档宽度
}

class BiciDrawer extends Component {
  handleOnCancel = () => {
    const { onClose, onCancel } = this.props
    onCancel && onCancel()
    onClose()
  }
  handleOnOk = () => {
    const { onOk } = this.props
    onOk && onOk()
  }
  renderDrawerFooter = () => {
    const { footer, cancelButtonName, submitButtonName, size } = this.props
    if (footer === true) {
      const renderCancelButtonName = cancelButtonName ? cancelButtonName : '取消'
      const renderSubmitButtonName = submitButtonName ? submitButtonName : '保存'
      const footerStyle = addSmallStyle(styles, 'footer', size)
      return (
        <div>
          <div className={styles.footerPlaceholder}></div>
          <div className={footerStyle}>
            <Button size={size} className="mr8" onClick={() => { this.handleOnCancel() }}>{renderCancelButtonName}</Button>
            <Button size={size} type="primary" onClick={() => { this.handleOnOk() }}>{renderSubmitButtonName}</Button>
          </div>
        </div>
      )
    } else if (footer === false) {
       return null 
    } else {
      return (
        <div>
          <div className='width100' id="footerPlaceholder"></div>
          <div className={styles.footerByUser} id="footerByUser">{footer}</div>
        </div>
      )
    }
  }
  componentDidUpdate() {
    const { footer } = this.props
    const footerPlaceholderEl = document.getElementById("footerPlaceholder")
    const footerByUserEl = document.getElementById("footerByUser")
    if (typeof(footer) !== 'boolean' && footerPlaceholderEl && footerByUserEl) {
      footerPlaceholderEl.style.height = `${footerByUserEl.clientHeight - 20 }px`
    }
  }
  render () {
    const { width, visible } = this.props
    const uncontrolledProps = _.omit(this.props, biciDrawerUtils.controlledProps) // 过滤受控属性
    let drawerProps = {}
    const drawerWidth = biciDrawerUtils.getDrawerWidth(width)
    if (drawerWidth !== false) {
      drawerProps.width = drawerWidth
    }
    return (
      <Drawer
        visible={visible}
        {...uncontrolledProps}
        {...drawerProps}
      >
        { this.props.children }
        { this.renderDrawerFooter() }
      </Drawer>
    )
  }
}

BiciDrawer.propTypes = {
  footer: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  visible: PropTypes.bool, // 是否显示
  onOk: PropTypes.func,  // 点击确定的回调
  onCancel: PropTypes.func, // 取消的回调
  cancelButtonName: PropTypes.string, // 取消按钮名
  submitButtonName: PropTypes.string,  // 提交按钮名
  size: PropTypes.oneOf(['small', 'default']), // 模度大小
}

BiciDrawer.defaultProps = {
  width: 'sm',
  footer: false,
  visible: false,
  size: 'default'
}

export default BiciDrawer
