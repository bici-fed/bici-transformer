/**
 * 索引 BiciInput 需进行处理的 props，其它 props 将不作处理传递给 AntD Input
 */
export const controlledProps = [
  // BiciInput 自身的 props
  'label',
  'isRequired',
  'verificationRule',
  'verificationTooltip',
  'hintRight',
  'regExp',
  'maxLength',
  'style',
  'maxStrLength',
  
  // 二次处理 AntD Input 的 props
  'onFocus',
  'onBlur',
  'suffix',
]
