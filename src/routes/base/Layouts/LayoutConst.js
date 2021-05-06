/**
 * @File: 布局 - 布局常量
 * @TODO: 表格左侧列为表头，显示优化
 */
import React from 'react'
import { Table } from 'antd'

const LayoutConst = () => {
  const columns = [{
    title: '布局模度（px）',
    dataIndex: 'dimension',
    width: '16%'
  }, {
    title: '48',
    dataIndex: 'dimension1',
    width: '12%'
  }, {
    title: '80',
    dataIndex: 'dimension2',
    width: '12%'
  }, {
    title: '128',
    dataIndex: 'dimension3',
    width: '12%'
  }, {
    title: '208',
    dataIndex: 'dimension4',
    width: '12%'
  }, {
    title: '336',
    dataIndex: 'dimension5',
    width: '12%'
  }, {
    title: '552',
    dataIndex: 'dimension6',
    width: '12%'
  }, {
    title: '896',
    dataIndex: 'dimension7',
    width: '12%'
  }]

  const dataSource = [{
    dimension: '应用场景',
    dimension1: '顶部导航高度',
    dimension2: '',
    dimension3: '',
    dimension4: '侧边导航栏宽度',
    dimension5: '',
    dimension6: '',
    dimension7: ''
  }]

  return (
    <div>
      <p className="mt20 mb12 fstage16 fw500">布局常量</p>
      <p className="mb12 fstage14">布局常量的设定同样遵守布局模度公式。</p>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="name"
        size="middle"
        bordered
        pagination={false}
      />
    </div>
  )
}

export default LayoutConst
