import { modalWidth } from "./index"
import styles from './biciModal.css'
import { clientHeight } from '../../data/dimensions'

// 索引 BiciModal 需进行处理的 props
export const controlledProps = [
  // 二次处理的 antd 的属性
  'width',
  'className',
  'style',
  'bodyStyle',
  'footer'
]
  
// 处理模态窗宽度
export const getModalWidth = (width) => { // type：弹窗类型 width：应用层设置的弹窗 width

  if (!width) { // 未设定 width 默认使用 sm 档宽度
    return modalWidth.sm
  } else if (width === 'sm') {
    return modalWidth.sm
  } else if (width === 'nm') {
    return modalWidth.nm
  } else {
    return width
  }
}

// 整合模态窗 className prop
export const getModalClassName = (className) => {
  return styles.centerModal
}

// 整合模态窗 style
export const getModalStyle = (style) => {
  if (style) { return style }
  const height = clientHeight * 0.76
  return { height }
}

// 整合模态窗 bodyStyle
export const getModalBodyStyle = (bodyStyle) => {
  if (bodyStyle) { return bodyStyle }
  return {
    minHeight: clientHeight * 0.76 - 55
  }
}
