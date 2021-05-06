/**
 * @File: 硬件拓扑结构模拟数据
 * @Docs:
 *   1.G6 数据格式 Tree: https://www.yuque.com/antv/g6/data-format#5zpmec
 *   2.网关下拓补结构网关及OPC的 key1 为编号
 */

const KEY1 = '名称'
const KEY2 = '编号'
const topologyData = {
  roots: [{
    title: '网关',
    key1: KEY2,
    name: '网关编号001',
    children: [{
      title: '数字传感器',
      key1: KEY1,
      name: '传感器001'
    }, {
      title: 'AD',
      key1: KEY1,
      name: 'AD001',
      children: [{
        title: '模拟传感器',
        key1: KEY1,
        name: '传感器002'
      }]
    }, {
      title: 'PLC',
      key1: KEY1,
      name: 'PLC001',
      children: [{
        title: '数字传感器',
        key1: KEY1,
        name: '传感器003'
      }, {
        title: '模拟传感器',
        key1: KEY1,
        name: '传感器004'
      }]
    }]
  }]
}

export default topologyData
