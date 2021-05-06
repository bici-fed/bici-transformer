/**
 * @File: 布局 - 间距
 * @TODO: 表格左侧列为表头，显示优化
 */
import React from 'react'
import { Table } from 'antd'

const Spacing = () => {
  const columns = [{
    title: '布局模度（px）',
    dataIndex: 'dimension',
    width: '16%'
  }, {
    title: '4/6',
    dataIndex: 'dimension1',
    width: '14%'
  }, {
    title: '8（很小）',
    dataIndex: 'dimension2',
    width: '14%'
  }, {
    title: '12（小）',
    dataIndex: 'dimension3',
    width: '14%'
  }, {
    title: '16（中）',
    dataIndex: 'dimension4',
    width: '14%'
  }, {
    title: '20（大）',
    dataIndex: 'dimension5',
    width: '14%'
  }, {
    title: '24',
    dataIndex: 'dimension6',
    width: '14%'
  }]

  const dataSource = [{
    dimension: '应用场景',
    dimension1: '',
    dimension2: '组件内填充',
    dimension3: '同一视觉单元中的同级关系',
    dimension4: '同一视觉单元中的总分关系',
    dimension5: '不同视觉单元',
    dimension6: '卡片间距'
  }]

  return (
    <div>
      <p className="mt20 mb12 fstage16 fw500">间距（横向/纵向）</p>
      <ul className="mb12 fstage14">
        <li>通过 <span className="fw600">很小、小、中、大</span> 四种规格来划分常用的间距层次。</li>
        <li>很小 8px，小 12px，中 16px，大 20px。</li>
        <li>在这四种规格不适用的情况下，可以通过加减 <span className="fw600">基础间距（4px，同基础模度值）</span>的倍数，或者增加元素（如分割线）来拉开信息层次。</li>
      </ul>
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

export default Spacing
