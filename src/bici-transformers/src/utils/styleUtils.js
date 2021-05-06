/**
 * @File: 动态计算style的工具函数
 */
import classNames from 'classnames'
// 处理类名
export function addSmallStyle(styles, name, size) {
  return classNames({
    [styles[name]]: true,
    [styles[`${name}SM`]]: size === 'small'
  })
}
// 处理表单label样式
export function getFormLabelStyle(size) {
  return classNames({
    'form-label': true,
    'form-label-sm': size === 'small'
  })
}
