/**
 * @File: 用于 API 文档的公有数据
 */

// 静态属性/方法
export const apiStaticColumns = [{
  title: '静态属性/方法',
  dataIndex: 'params',
  width: '15%'
}, {
  title: '说明',
  dataIndex: 'description',
  width: '40%'
}, {
  title: '值',
  dataIndex: 'val',
  width: '45%'
}]

// props
export const  apiPropsColumns = [{
  title: '参数',
  dataIndex: 'params',
  width: '15%'
}, {
  title: '说明',
  dataIndex: 'description',
  width: '45%'
}, {
  title: '类型',
  dataIndex: 'type',
  width: '10%'
}, {
  title: '默认值',
  dataIndex: 'defaultVal',
  width: '20%'
}, {
  title: '是否必传',
  dataIndex: 'isRequired',
  width: '10%',
}]

// 实例方法
export const apiMethodsColumns = [{
  title: '方法名',
  dataIndex: 'method',
  width: '20%',
}, {
  title: '说明',
  dataIndex: 'description',
  width: '30%',
}, {
  title: '参数类型',
  dataIndex: 'params',
  width: '50%'
}]
