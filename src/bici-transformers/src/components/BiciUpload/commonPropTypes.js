import PropTypes from 'prop-types'

export const commonPropTypes = {
  width: PropTypes.oneOfType([
    // 设置文件上传组件区域宽度，默认为 336
    PropTypes.number,
    PropTypes.string
  ]),
  maxWidth: PropTypes.oneOfType([
    // 设置文件上传组件区域最大宽度，默认为 336
    PropTypes.number,
    PropTypes.string
  ]),
  size: PropTypes.oneOf(['small', 'default']), // 模度大小
  label: PropTypes.string, // 输入框label
  isRequired: PropTypes.bool, // 是否必填
  description: PropTypes.string,
  draggable: PropTypes.bool, // 是否支持拖拽
  maxListLength: PropTypes.number, // 文件上传列表的最大长度，即最多允许上传的文件数
  maxFileSizeM: PropTypes.number // 限制上传文件的大小，单位为 M
}

export const commonDefaultProps = {
  width: 336,
  maxWidth: 336,
  size: 'default',
  label: '',
  isRequired: false,
  draggable: false,
  maxListLength: 10,
  maxFileSizeM: 5,
  description: '',
  multiple: true
}
