/**
 * 索引 BiciDatePicker 需进行处理的 props，其它 props 将不作处理传递给 AntD DatePicker
 */
export const controlledProps = [
  // BiciDatePicker 自身的 props
  'label',
  'isRequired',
  'type',
  
  // 二次处理 AntD DatePicker 的 props
  'onFocus',
  'onBlur'
]
