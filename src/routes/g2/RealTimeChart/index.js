/**
 * 实时数据曲线图
 * @KeyPoint：
 *   1.time 类型的度量也是 linear 的子类，除了支持所有通用的属性和 linear 度量的属性外，还有自己特殊的属性。
 *     https://www.yuque.com/antv/g2-docs/tutorial-scale#time
 */
import React, { Component } from 'react'
import { Chart, Axis, Geom, Guide, Tooltip } from 'bizcharts'
import moment from 'moment'
import _ from 'lodash'
import * as colors from '../../../data/colors'

const Line = Guide.Line
const RegionFilter  = Guide.RegionFilter
const DataMarker = Guide.DataMarker
const WARNING_LINE_STYLE = {
  stroke: colors.RED_6, // 线的颜色
  lineDash: [0, 2, 2], // 虚线的设置
  lineWidth: 1, // 线的宽度
}
const GUIDE_LINE_STYLE = {
  position: 'start', // 文本的显示位置
  style: { fill: colors.RED_6 }, // 文本图形样式配置
  offsetX: 10, // x 方向的偏移量
  offsetY: -5, // y 方向的偏移量
}

class RealTimeChart extends Component {
  state = {
    dataList: [{ date: moment().format('YYYY-MM-DD HH:mm:ss'), value: 322 }], // 模拟新请求到的数据 [{ date: 'xxx', value: xxx }, ...]
    minY: 100, // y轴下限
    maxY: 550, // y轴上限
    minWarningY: 250, // 警告线小值
    maxWarningY: 450, // 警告线大值
  }
  componentDidMount() {
    window.setInterval(() => {
      this.setState({ dataList: this.getMockDataList() })
    }, 1000)
  }
  getMockDataList = () => {
    const { dataList } = this.state
    const MAX_POINTS = 100
    const mockDataPoint = {
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      value: (Math.random() * 300 + 200).toFixed(2)
    }

    let cloneDataList = _.cloneDeep(dataList)
    if (cloneDataList.length >= MAX_POINTS) { // 新传入的数据点个数超过限制
      cloneDataList.shift()
    }
    cloneDataList.push(mockDataPoint)
    return cloneDataList
  }
  // 配置数据比例尺，该配置会影响数据在图表中的展示方式
  getScale = () => {
    const { minY, maxY } = this.state
    return {
      date: {
        type: 'time', // 指定数据类型为“连续的时间类型”
        alias: '时间', // 为数据属性定义别名，用于图例、坐标轴、tooltip 的个性化显示 // ???
        mask: 'MM-DD HH:mm:ss', // 指定时间的显示格式，默认：'YYYY-MM-DD'
        tickCount: 15, // 坐标轴上刻度点的个数，不同的度量类型对应不同的默认值
        nice: false, // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。 // ???
      },
      value: {
        alias: '数据名称（单位）', // ???
        type: 'linear',
        min: minY, // 定义数值范围的最小值
        max: maxY, // 定义数值范围的最大值
        nice: false,
        tickCount: 10, // ???
      }
    }
  }
  getTooltip = () => {
    // Array 格式为 [abc, callback], 该几何标记上 tooltip 需要显示的数据字段, 同时可以在 callback 中调整数据的显示格式。
    return ['date*value', (date, value) => {
      // 抽成组件后允许外部传递回调
      return {
        name: '一号炉温度（℃）',
        title: date,
        value: value === null ? '-' : value
      }
    }]
  }
  renderGuideLine = () => {
    const { dataList, minY, maxY, minWarningY, maxWarningY } = this.state
    const floorLineStart = [dataList[0].date, minWarningY] // 下限警告线的起始位置
    const floorLineEnd = [dataList[dataList.length - 1].date, minWarningY] // 下限警告线的终止位置
    const ceilingLineStart = [dataList[0].date, maxWarningY]
    const ceilingLineEnd = [dataList[dataList.length - 1].date, maxWarningY]
    return (
      <Guide>
        {/* 下限警告线 */}
        <Line
          top // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
          start={floorLineStart} // start={[ '2018-06-15 04:00:00', 200 ]} // 辅助线起始位置，值为原始数据值，支持 callback
          end={floorLineEnd}
          text={{ content: `范围下限（${minWarningY}）`, ...GUIDE_LINE_STYLE }}
          lineStyle={WARNING_LINE_STYLE}
        />
        {/* 下限警告线到Y轴最小值之间的标红区域。辅助区域过滤，将图表中位于矩形选区中的图形元素提取出来，重新着色。*/}
        <RegionFilter
          top
          start={['min', minY ]}
          end={['max', minWarningY]}
          color={colors.RED_6}
          apply={['line']} // 可选，设定 regionFilter 只对特定 geom 类型起作用
        />
        {/* 上限警告线 */}
        <Line
          top
          start={ceilingLineStart}
          end={ceilingLineEnd}
          text={{ content: `范围上限（${maxWarningY}）`, ...GUIDE_LINE_STYLE }}
          lineStyle={WARNING_LINE_STYLE}
        />
        {/* 上限警告线到Y周最大值之间的标红区域 */}
        <RegionFilter
          top
          start={['min', maxWarningY ]}
          end={['max', maxY]}
          color={colors.RED_6}
          apply={['line']} // 可选，设定 regionFilter 只对特定 geom 类型起作用
        />
      </Guide>
    )
  }
  renderGuideDataMarker = () => { // 渲染标注点
    const { dataList } = this.state
    const dataListLength = dataList.length
    if (dataListLength === 0) { return null }

    const dataPoint = dataList[dataListLength - 1]
    const crtPoint = {
      date: dataPoint.date,
      value: dataPoint.value
    }
    return (
      <DataMarker
        content={`当前值：${dataPoint.value}`} // 显示的文本内容
        position={crtPoint} // 标注点起始位置，值为原始数据值，支持 callback,
        style={{ text: { fontSize: 14 }, point: { stroke: '#096dd9' } }}
      />
    )
  }
  renderGuideLine0 = () => { // 渲染0标志线
    const { dataList } = this.state
    const dataListLength = dataList.length
    const xStart = dataListLength > 0 ? dataList[0].date : ''
    const xEnd = dataListLength > 0 ? dataList[dataListLength - 1].date : ''
    return (
      <Line
        top
        start={[xStart, 0]}
        end={[xEnd, 0]}
      />
    )
  }
  renderTooltip = () => {
    return (
      <Tooltip crosshairs={{
        type: 'cross' // rect:，矩形框，x: 水平辅助线，y: 垂直辅助线，cross: 十字辅助线
        
      }} />
    )
  }
  render() {
    const { dataList } = this.state
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">实时数据曲线图</p>
        <div>
          <Chart
            data={dataList}
            scale={this.getScale()}
            height={700}
            padding={[20, 100, 70, 100]}
            forceFit
            animate={false}
          >
            {/* ??? 需要细化 */}
            <Axis name="date" />
            {/* ??? 判断是否优化 */}
            <Geom type="line" position="date*value" size={1} />
            <Geom type="point" position="date*value" tooltip={this.getTooltip()} shape='circle' size={2} />
            {this.renderGuideLine()}
            {this.renderGuideDataMarker()}
            {this.renderGuideLine0()}
            {this.renderTooltip()}
          </Chart>
        </div>
      </div>
    )
  }
}

export default RealTimeChart
