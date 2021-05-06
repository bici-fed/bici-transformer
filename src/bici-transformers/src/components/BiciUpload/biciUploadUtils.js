/**
 * 索引 BiciUpload 需进行处理的公有 props，其它 props 将不作处理传递给 AntD upload
 */
export const commonControlledProps = [
  'width',
  'maxWidth',
  'label',
  'size',
  'isRequired',
  'description',
  'draggable',
  'maxListLength',
  'maxFileSize',
  'modalWidth',
  // 被覆盖的ant的自带属性
  'onChange',
  'beforeUpload'
]
