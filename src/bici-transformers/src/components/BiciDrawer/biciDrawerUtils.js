import { biciDrawerWidth } from './index'
import _ from 'lodash'

// BiciDrawer 需进行处理的props
export const controlledProps = [
  // BiciDrawer 自身的props
  'footer',
  'onOk',
  'onCancel',
  'cancelButtonName',
  'submitButtonName',

  // 二次处理的 antd的属性
  'width',
]

// 处理 Drawer宽度
export const getDrawerWidth = (width) => {
  if (!width) { return biciDrawerWidth.sm } // 默认返回最小档宽度

  const numberedWidth = Number(width)
  if (!_.isNaN(numberedWidth)) { return numberedWidth }
  if (!_.isString(width)) { return false }

  switch (width) {
    case 'sm':
      return biciDrawerWidth.sm
    case 'nm':
      return biciDrawerWidth.nm
    default: 
      const pxIndex = width.indexOf('px')
      return pxIndex === -1 ? false : Number(width.slice(0, pxIndex))
  }
}
  