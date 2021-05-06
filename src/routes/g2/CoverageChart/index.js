/**
 * @File: 覆盖率图表
 * @Docs: BizCharts 自定义 shape：https://github.com/alibaba/BizCharts/blob/master/doc/api/shape.md
 */

import React, { Component } from 'react'
import { Row, Col, DatePicker } from 'antd'
import { Chart, Legend, Axis, Geom, Tooltip, Shape } from 'bizcharts'
import moment from 'moment'

const { RangePicker } = DatePicker

const CHART_HEIGHT = 600

function getMockData() {
  let data = []

  for (let i = 0; i < 15; i++) {
    const name = `系统${i}`
    const value = Math.random() * 90

    for (let j = 1; j < 10; j++) {
      let obj = {}
      obj.name = name
      obj.value = (value + Math.random() * 10) / 100
      obj.time = `10-0${j}`
      data.push(obj)
    }
  }
  return data
}

class CoverageChart extends Component {
  state = {
    startDate: moment().subtract(6, 'd'), // 默认查询近7天数据
    endDate: moment(),
    stashStartDate: null // 用于设置选择范围的暂选开始日期
  }

  handleRangePickerChange = (dates, dateStrings) => {
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      stashStartDate: null
    })
  }
  handleCalendarChange = (dates, dateStrings) => {
    if (dates.length === 1) { // 仅有开始日期
      this.setState({ stashStartDate: dates[0] })
    }
  }
  judgeDisabledDate = (current) => {
    const { stashStartDate } = this.state
    if (stashStartDate === null) { return false } // 不进行日期禁止
    return current < stashStartDate.subtract(2, 'd')
  }

  renderRangePicker = () => {
    const { startDate, endDate } = this.state
    return (
      <Row>
        <Col span={6} offset={18}>
          <RangePicker
            value={[startDate, endDate]}
            disabledDate={this.judgeDisabledDate}
            format="YYYY-MM-DD"
            onChange={this.handleRangePickerChange}
            onCalendarChange={this.handleCalendarChange}
          />
        </Col>
      </Row>
    )
  }
  render() {
    const chartData = getMockData()
    const cols = {
      time: {
        type: 'cat'
      },
      value: {
        alias: '覆盖率',
        type: 'linear',
        formatter: (value) => {
          return (value * 100).toFixed(2) + '%'
        },
        min: 0,
        max: 1
      }
    }

    // 自定义带有宽度的色块
    Shape.registerShape('polygon', 'custom', {
      draw: function (cfg, container) {
        const points = this.parsePoints(cfg.points);
        const startX = points[1].x;
        const startY = points[1].y;
        const size = cfg.size || 1;
        const width = (points[2].x - points[1].x);
        const height = Math.abs(points[1].y - points[0].y);
        // 绘制背景
        container.addShape('rect', {
          attrs: {
            x: startX,
            y: startY,
            width: width,
            height: height
          }
        });
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
        });
      }
    })

    const colorCfg = ['value', 'rgb(215, 25, 28)-rgb(231, 104, 24)-rgb(242, 158, 46)-rgb(249, 208, 87)-rgb(255, 255, 140)-rgb(144, 235, 157)-rgb(0, 204, 188)-rgb(0, 166, 202)-rgb(44, 123, 182)']
    const sizeCfg = ['value', (size) => { return size }]

    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">覆盖率可视化</p>
        {this.renderRangePicker()}
        <div>
          <Chart data={chartData} height={CHART_HEIGHT} width={1100} scale={cols}>
            <Axis name="name" grid={null} />
            <Axis name="time" line={null} tickLine={null} />
            <Tooltip />
            <Geom
              type="polygon"
              position="time*name"
              color={colorCfg}
              size={sizeCfg}
              shape="custom"
              style={{
                lineWidth: 1,
                stroke: '#fff'
              }}
            >
            </Geom>
            <Legend
              itemFormatter={(val) => {
                return val.slice(0, val.indexOf('.')) + '%';
              }}
            />
          </Chart>
        </div>
      </div>
    )
  }
}

export default CoverageChart
