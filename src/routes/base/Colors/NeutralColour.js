/**
 * @File: 色彩 - 中性色
 * @TODO: 解决无内容时如何设置颜色块样式；如何控制表头文字换行
 */
import React from 'react'
import { Table } from 'antd'
import * as colors from '../../../data/colors'

const TABLE_TD_HEIGHT = 21

const NeutralColour = () => {
  const columns = [{
    title: '应用场景',
    dataIndex: 'scene',
    width: '18%',
  }, {
    title: '颜色',
    dataIndex: 'colourLight',
    width: '5%',
    render: (text) => {
      const wrapperStyle = {
        height: TABLE_TD_HEIGHT,
        backgroundColor: text,
      }
      return (
        <div style={{ background: '#fff' }}>
          <p style={wrapperStyle}></p>
        </div>
      )
    }
  }, {
    title: 'rgba值（浅色背景下）',
    dataIndex: 'rgbaLight',
    width: '18%',
  }, {
    title: '透明度（浅色背景下）',
    dataIndex: 'opacityLight',
    width: '18%',
  }, {
    title: '颜色',
    dataIndex: 'colourDark',
    width: '5%',
    render: (text) => {
      const wrapperStyle = {
        height: TABLE_TD_HEIGHT,
        backgroundColor: text,
      }
      return (
        <div style={{ background: '#000' }}>
          <p style={wrapperStyle}></p>
        </div>
      )
    }
  }, {
    title: 'rgba值（深色背景下）',
    dataIndex: 'rgbaDark',
    width: '18%',
  }, {
    title: '透明度（深色背景下）',
    dataIndex: 'opacityDark',
    width: '18%',
  }]

  const dataSource = [{
    scene: '标题',
    colourLight: colors.BLACK_1,
    rgbaLight: colors.BLACK_1,
    opacityLight: '85%',
    colourDark: colors.WHITE_1,
    rgbaDark: colors.WHITE_2,
    opacityDark: '100%',
  }, {
    scene: '主要内容',
    colourLight: colors.BLACK_2,
    rgbaLight: colors.BLACK_2,
    opacityLight: '65%',
    colourDark: colors.WHITE_2,
    rgbaDark: colors.WHITE_2,
    opacityDark: '85%',
  }, {
    scene: '次要内容',
    colourLight: colors.BLACK_3,
    rgbaLight: colors.BLACK_3,
    opacityLight: '45%',
    colourDark: colors.WHITE_3,
    rgbaDark: colors.WHITE_3,
    opacityDark: '65%',
  }, {
    scene: '禁用',
    colourLight: colors.BLACK_4,
    rgbaLight: colors.BLACK_4,
    opacityLight: '25%',
    colourDark: colors.WHITE_4,
    rgbaDark: colors.WHITE_4,
    opacityDark: '45%',
  }, {
    scene: '边框',
    colourLight: colors.BLACK_5,
    rgbaLight: colors.BLACK_5,
    opacityLight: '15%',
    colourDark: colors.WHITE_5,
    rgbaDark: colors.WHITE_5,
    opacityDark: '25%',
  }, {
    scene: '分割线',
    colourLight: colors.BLACK_6,
    rgbaLight: colors.BLACK_6,
    opacityLight: '9%',
    colourDark: colors.WHITE_6,
    rgbaDark: colors.WHITE_6,
    opacityDark: '15%',
  }, {
    scene: '背景色',
    colourLight: colors.BLACK_7,
    rgbaLight: colors.BLACK_7,
    opacityLight: '4%',
    colourDark: colors.WHITE_7,
    rgbaDark: colors.WHITE_7,
    opacityDark: '9%',
  }, {
    scene: '表头',
    colourLight: colors.BLACK_8,
    rgbaLight: colors.BLACK_8,
    opacityLight: '2%',
    colourDark: colors.WHITE_8,
    rgbaDark: colors.WHITE_8,
    opacityDark: '4%',
  }]

  return (
    <div>
      <p className="mt20 mb12 fstage16 fw500">中性色</p>
      <ul className="mb12 fstage14">
        <li>大量应用在界面的文字部分，此外在背景、边框、分割线等场景中也非常常见。</li>
        <li>参考 AntD，在编码时，中性色使用 rgba 实现。rgb(0, 0, 0) 色系用于浅色背景下，rgb(254, 254, 254) 色系用于深色背景下。</li>
      </ul>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="scene"
        size="middle"
        bordered
        pagination={false}
      />
    </div>
  )
}

export default NeutralColour
