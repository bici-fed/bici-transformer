/**
 * @File: 预排产统计图表
 * @TODO:
 *   1.首次进入时宽度应拉满浏览器宽度，现在是定宽
 *   2.改缩进
 *   3.时间选择器位置调整到靠右侧，参考 覆盖率可视化 图表布局
 *   4.CSS样式与JSX分离，并且使用模块化
 *   5.加导航图标，加标题，布局参考 覆盖率可视化图表
 *   6.去掉分号;
 */

import React, { Component } from 'react'
import { Chart, Legend, Axis, Geom, Tooltip, Shape, Label } from 'bizcharts'
import { DatePicker } from 'antd'
import moment from 'moment'
import _ from 'lodash'

const { RangePicker } = DatePicker
const CHART_HEIGHT = 600
const dateFormat = 'YYYY-MM-DD'
const wrappWidthDefault = window.screen.availWidth - 200

function getMockData() {
  let data = []
  for (let i = 0; i < 15; i++) {
    const name = `系统${i}`
    const value = Math.random() * 90
    for (let j = 1; j < 10; j++) {
      let obj = {}
      obj.name = name
      obj.value = (value + Math.random() * 10) / 100
      obj.sumOutputWeight = (Math.random() * 100).toFixed(2)
      obj.time = `10-0${j}`
      data.push(obj)
    }
  }
  return data
}

export default class CoverageChart2 extends Component {
  state = {
    wrapperWidth: wrappWidthDefault,
    wrapperHeight: CHART_HEIGHT,
    startDate: moment()
      .subtract(7, 'days')
      .format(dateFormat),
    endDate: moment().format(dateFormat),
    dataSource: []
  }
  componentDidMount() {
    if (this.wrapper) {
      this.setState({
        wrapperWidth: this.wrapper.clientWidth - 48,
        wrapperHeight: this.wrapper.clientHeight
      })
    }
    this.setState({
      dataSource: getMockData()
    })
    window.addEventListener('resize', this.handleWindowResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }
  handleWindowResize = () => {
    this.setState({ wrapperWidth: this.wrapper.clientWidth, wrapperHeight: this.wrapper.clientHeight })
  }
  onCalendarChange = (dates) => {
    this.date = dates[0]
  }
  disabledTime = (value) => {
    if (this.date) {
      let messdate = _.cloneDeep(this.date)
      let maxdate = _.cloneDeep(this.date)
      if (
        value.valueOf() > messdate.add(30, 'days').valueOf() ||
        value.valueOf() < maxdate.subtract(30, 'days').valueOf()
      ) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  render() {
    const { dataSource, startDate, endDate, wrapperWidth, wrapperHeight } = this.state
    const cols = {
      time: {
        type: 'cat'
      },
      value: {
        alias: '负荷率',
        type: 'linear',
        formatter: (value) => {
          if (value === 0) {
            return '0%'
          } else if (value >= 1) {
            return '100%'
          } else {
            return (value * 100).toFixed(2) + '%'
          }
        },
        min: 0,
        max: 1
      }
    }
    // 自定义带有宽度的色块
    Shape.registerShape('polygon', 'custom', {
      draw: function (cfg, container) {
        const points = this.parsePoints(cfg.points)
        const startX = points[1].x
        const startY = points[1].y
        const size = cfg.size
        const width = points[2].x - points[1].x
        const height = Math.abs(points[1].y - points[0].y)

        // 绘制背景
        container.addShape('rect', {
          attrs: {
            x: startX,
            y: startY,
            width: width,
            height: height
          }
        })
        // 绘制色块
        return container.addShape('rect', {
          attrs: {
            x: startX,
            y: startY,
            width: width * size,
            height: height,
            fill: cfg.color,
            stroke: '#fff'
          }
        })
      }
    })
    const colorCfg = ['value', '#BAE7FF-#1890FF-#0050B3']
    const sizeCfg = [
      'value',
      (size) => {
        return 1
      }
    ]
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">预排产图表</p>
        <div style={{ float: 'right' }}>
          <RangePicker
            defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
            format={dateFormat}
            onChange={this.changeDate}
            onCalendarChange={this.onCalendarChange}
            disabledDate={this.disabledTime}
          />
        </div>
        <div
          ref={(ref) => {
            this.wrapper = ref
          }}
        >
          <Chart data={dataSource} height={wrapperHeight} width={wrapperWidth} scale={cols}>
            <Axis name="name" grid={null} />
            <Axis name="time" line={null} tickLine={null} />
            <Tooltip />
            <Geom
              type="polygon"
              position="time*name"
              color={colorCfg}
              size={sizeCfg}
              shape="custom"
              tooltip={[
                'name*value*sumOutputWeight',
                (name, value, sumOutputWeight) => {
                  let formatPercent
                  if (value === 0) {
                    formatPercent = '0%'
                  } else if (value >= 1) {
                    formatPercent = '100%'
                  } else {
                    formatPercent = (value * 100).toFixed(2) + '%'
                  }
                  return {
                    name: name,
                    value: `负荷率 ${formatPercent}，排产量 ${sumOutputWeight}(t)`
                  }
                }
              ]}
              style={{
                lineWidth: 1,
                stroke: '#fff'
              }}
            >
              <Label
                content="sumOutputWeight"
                offset={-2}
                textStyle={{
                  textAlign: 'center',
                  fill: '#fff',
                  shadowBlur: 2,
                  shadowColor: 'rgba(0, 0, 0, .45)'
                }}
              />
            </Geom>
            <Legend
              itemFormatter={(val) => {
                let res = parseInt(val.slice(0, val.indexOf('.')))
                return res + '%'
              }}
            />
          </Chart>
        </div>
      </div>
    )
  }
}
