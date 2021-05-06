/**
 * @File: 字段配置抽屉涉及的常量
 */

// 用于描述”是否“ - 下拉数据
export const YES_OR_NO_SELECT_DATA = [{
  id: 0,
  name: '否'
}, {
  id: 1,
  name: '是'
}]

// 字段 1/2/3/4，宽度档，支持 1/4~4/4 四档宽度设置 - 下拉选择数据
export const WIDTH_LEVEL_SELECT_DATA = [{
  id: 1,
  name: '1/4 列宽'
}, {
  id: 2,
  name: '2/4 列宽'
}, {
  id: 3,
  name: '3/4 列宽'
}, {
  id: 4,
  name: '4/4 列宽'
}]

// 表单类型 - 下拉数据
export const FIELD_DATA_TYPE_SELECT_DATA = [{
  id: 0,
  name: '文本输入'
}, {
  id: 1,
  name: '数字输入'
}, {
  id: 2,
  name: '下拉单选'
}, {
  id: 3,
  name: '下拉多选'
}, {
  id: 4,
  name: '文本域'
}, {
  id: 5,
  name: '时间日期选择'
}, {
  id: 6,
  name: '时间日期范围选择'
}]

// 日期类型 - 下拉数据
export const DATE_TYPE_SELECT_DATA = [{
  id: 'YYYY-MM',
  name: '年月'
}, {
  id: 'YYYY-MM-DD',
  name: '年月日'
}, {
  id: 'YYYY-MM-DD HH:mm:ss',
  name: '年月日时分秒'
}]
