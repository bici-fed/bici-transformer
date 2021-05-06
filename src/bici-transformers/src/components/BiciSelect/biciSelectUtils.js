/**
 * 索引 BiciSelect 需进行处理的 props，其它 props 将不作处理传递给 AntD Select
 */
export const controlledProps = [
  // BiciSelect 自身的 props
  'data',
  'label',
  'isRequired',
  'originalValue',
  
  // 二次处理 AntD Table 的 props
  'onFocus',
  'onBlur',
]

// 格式化下拉数据，支持传入 字符串数组、对象数组
export const formatData = (srcData) => {
  if (srcData.length === 0) { return [] }

  // 字符串数组
  if (typeof(srcData[0]) === 'string') {
    return srcData.map((item) => {
      return { id: item, name: item }
    })
  }

  // 对象数组
  return srcData
}
