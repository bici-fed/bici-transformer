/**
 * @File: 表单控件
 */
export function verifyReg(regExp, value) { // 验证正则
  if (value === '' || value === undefined || value === null ) { return false }
  if (typeof regExp === 'string') {
    return !new RegExp(regExp).test(value)
  }
  if (regExp instanceof RegExp) {
    return !regExp.test(value)
  }
}
