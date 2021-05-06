/**
 * 索引 BiciTextArea 需进行处理的 props，其它 props 将不作处理传递给 AntD TextArea
 */
export const controlledProps = [
  // BiciTextArea 自身的 props
  'label',
  'isRequired',
  'verificationRule',
  'verificationTooltip',
  'regExp',
  'maxLength',
  'style',
  'maxStrLength',
  
  // 二次处理 AntD TextArea 的 props
  'onFocus',
  'onBlur',
]
