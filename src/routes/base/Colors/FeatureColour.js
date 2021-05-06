/**
 * @File: 色彩 - 功能色
 */
import React from 'react'
import { Table } from 'antd'
import * as colors from '@/data/colors'

const FeatureColour = () => {
  const columns = [{
    title: '颜色',
    dataIndex: 'name',
    width: '15%',
    render: (text, record) => {
      const { hex } = record
      const wrapperStyle = {
        backgroundColor: hex,
        color: colors.WHITE_2,
      }
      return (<p className="pl8" style={wrapperStyle}>{text}</p>)
    }
  }, {
    title: 'Hex 值',
    dataIndex: 'hex',
    width: '15%',
  }, {
    title: '应用场景',
    dataIndex: 'scene',
    width: '70%',
  }]

  const dataSource = [{
    name: 'blue-6',
    hex: colors.BLUE_6,
    scene: '链接',
  }, {
    name: 'green-6',
    hex: colors.GREEN_6,
    scene: '成功',
  }, {
    name: 'gold-6',
    hex: colors.GOLD_6,
    scene: '警告',
  }, {
    name: 'red-6',
    hex: colors.RED_6,
    scene: '错误/失败',
  }]

  return (
    <div>
      <p className="mt20 mb12 fstage16 fw500">功能色</p>
      <p className="mb12 fstage14">代表了明确的信息以及状态，比如成功、出错、失败、提醒、链接等。在一套产品体系下，各功能色应尽量保持一致。</p>
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

export default FeatureColour
