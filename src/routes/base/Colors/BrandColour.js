/**
 * @File: 色彩 - 品牌色
 */
import React from 'react'
import { Table } from 'antd'
import * as colors from '../../../data/colors'

const BrandColour = () => {
  const columns = [{
    title: '颜色',
    dataIndex: 'name',
    width: '15%',
    render: (text, record) => {
      const { hex, fontColor } = record
      const wrapperStyle = {
        backgroundColor: hex,
        color: fontColor,
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
    name: 'blue-1',
    hex: colors.BLUE_1,
    scene: '选中时的背景色',
    fontColor: colors.BLACK_2,
  }, {
    name: 'blue-5',
    hex: colors.BLUE_5,
    scene: '鼠标移入时的状态色',
    fontColor: colors.BLACK_2,
  }, {
    name: 'blue-6',
    hex: colors.BLUE_6,
    scene: '品牌色。关键行动点、操作状态、重要信息高亮、图形化等',
    fontColor: colors.WHITE_2,
  }, {
    name: 'blue-7',
    hex: colors.BLUE_7,
    scene: '点击时的状态色',
    fontColor: colors.WHITE_2,
  }]
  
  return (
    <div>
      <p className="mb12 fstage16 fw500">品牌色</p>
      <ul className="mb12 fstage14">
        <li>Daybreak Blue / 拂晓蓝。象征着包容、科技、惠普。</li>
        <li>体现产品特性和传播理念最直观的视觉元素之一。我们从浅到深地选择 1、5、6、7 四档作为同一色系不同应用场景下的颜色区分。</li>
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

export default BrandColour
