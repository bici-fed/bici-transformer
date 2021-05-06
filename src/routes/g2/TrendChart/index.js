/**
 * 趋势走向折线图
 */
import React, { Component } from 'react'
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts'
import DataSet from '@antv/data-set'
import { DatePicker, Button, message } from 'antd'
import _ from 'lodash'

import FormSelect from '../../../components/FormSelect'
import { LIDU, GROUPWAY, DATA1, DATA2_MAX, DATA2_MIN, DATA2_MEAN, DATA3_MAX, DATA3_MIN, DATA3_MEAN, DATA4_MAX, DATA4_MIN, DATA4_MEAN } from '../../../data/chart'
import styles from './index.module.css'

const RangePicker = DatePicker.RangePicker

/* 模拟数据 */
function searchSensorInfo(params) {
  const { period, valueDealType } = params
  let dataList = []
  if (period === '1') {
    dataList = _.cloneDeep(DATA1)
  } else if (period === '2' && valueDealType === 'MAX') {
    dataList = _.cloneDeep(DATA2_MAX)
  } else if (period === '2' && valueDealType === 'MIN') {
    dataList = _.cloneDeep(DATA2_MIN)
  } else if (period === '2' && valueDealType === 'MEAN') {
    dataList = _.cloneDeep(DATA2_MEAN)
  } else if (period === '3' && valueDealType === 'MAX') {
    dataList = _.cloneDeep(DATA3_MAX)
  } else if (period === '3' && valueDealType === 'MIN') {
    dataList = _.cloneDeep(DATA3_MIN)
  } else if (period === '3' && valueDealType === 'MEAN') {
    dataList = _.cloneDeep(DATA3_MEAN)
  } else if (period === '4' && valueDealType === 'MAX') {
    dataList = _.cloneDeep(DATA4_MAX)
  } else if (period === '4' && valueDealType === 'MIN') {
    dataList = _.cloneDeep(DATA4_MIN)
  } else if (period === '4' && valueDealType === 'MEAN') {
    dataList = _.cloneDeep(DATA4_MEAN)
  }
  return dataList
}

class TrendChart extends Component {
  state = {
    searchTime: [], // moment格式
    searchTimeString: [], // YYYY-MM-DD HH:mm格式
    searchPeriod: [], // 时间间隔
    searchValueDealType: [], // 聚合方式
    searchValueDealTypeDisabled: false,
    liDus: LIDU, // @Review: liDus 是什么意思？考虑 换命名 或 加注释
    dataList: []
  }

  componentDidMount() {
    //页面加载时给一个图表数据初始值
    let dataList = _.cloneDeep(DATA2_MAX)
    dataList.forEach(item => {
      item.value = item.value ? parseFloat(item.value.toFixed(2)) : 0
    })
    this.setState({ dataList })
  }

  /* 更改弹窗的查询时间 */
  changeModalSearchDate = (date, dateString) => {
    this.setState({
      searchTime: date,
      searchTimeString: dateString
    })
  }
  /* 确定时间选择 */
  doneSearchDate = () => {
    // 根据用户选择的时间范围确定粒度的选择范围
    const { searchTime } = this.state
    let tempLiDus
    const start = searchTime[0]
    const end = searchTime[1]
    const seconds = end.diff(start) / 1000
    let temp = seconds / 4320
    if (temp <= 5) { // 五秒
      tempLiDus = LIDU
    } else if (temp > 5 && temp <= 60) {
      tempLiDus = [
        {
          id: 2,
          name: '一分钟'
        },
        {
          id: 3,
          name: '半小时'
        },
        {
          id: 4,
          name: '一小时'
        }
      ]
    } else if (temp > 60 && temp <= 1800) {
      tempLiDus = [
        {
          id: 3,
          name: '半小时'
        },
        {
          id: 4,
          name: '一小时'
        }
      ]
    } else  {
      tempLiDus = [
        {
          id: 4,
          name: '一小时'
        }
      ]
    }
    this.setState({
      liDus: tempLiDus,
      searchPeriod: []
    })
  }
  /* 更改时间间隔 */
  changeSelectPeriod = (value) => {
    const { searchValueDealType } = this.state
    let period
    let valueDealType = searchValueDealType // 当时间间隔为五秒时，不聚合
    let valueDealTypeDisabled = false
    if (value instanceof Array) {
      period = value
    } else {
      period = value ? [value] : []
    }
    if (period[0] === '1') {
      valueDealType = []
      valueDealTypeDisabled = true
    }
    this.setState({
      searchPeriod: period,
      searchValueDealType: valueDealType,
      searchValueDealTypeDisabled: valueDealTypeDisabled
    })
  }
  /* 更改下拉选择框 */
  changeSelectValueDealType = (value) => {
    let valueDealType
    if (value instanceof Array) {
      valueDealType = value
    } else {
      valueDealType = value ? [value] : []
    }
    this.setState({
      searchValueDealType: valueDealType
    })
  }
  /* 查询数据 */
  fetchSingleSensorInfo = () => {
    const { searchTimeString, searchPeriod, searchValueDealType, searchValueDealTypeDisabled } = this.state
    if (!searchTimeString[0]) {
      message.error('请选择时间范围')
      return
    } else if (searchPeriod.length === 0) {
      message.error('请选择时间间隔')
      return
    } else if (!searchValueDealTypeDisabled && searchValueDealType.length === 0) {
      message.error('请选择聚合方式')
      return
    }
    let params = {
      period: searchPeriod.join(),
      valueDealType: searchValueDealType.join()
    }
    let dataList = searchSensorInfo(params)
    dataList.forEach(item => {
      item.value = item.value ? parseFloat(item.value.toFixed(2)) : 0
    })
    this.setState({ dataList })
  }

  render() {
    const { searchTime, searchPeriod, liDus, searchValueDealType, searchValueDealTypeDisabled, dataList } = this.state

    const ds = new DataSet()
    const dv = ds.createView().source(dataList)
    dv.transform({
      type: 'fold',
      fields: ['value'], // 展开字段集
      key: 'keyValue', // key字段
      value: 'value' // value字段
    })

    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">趋势走向折线图</p>
        <div className={styles.modalSearchDate}>
          <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
            <span>时间范围：</span>
            <RangePicker
              value={searchTime}
              onChange={this.changeModalSearchDate}

              onOk={this.doneSearchDate}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['开始时间', '结束时间']}
            />
          </div>
          {/* @Review: 禁止出现直接在 JSX 里面通过 style 直接声明样式。考虑使用 面向属性 CSS 或 CSS Modules，后不赘述 */}
          <div style={{ display: 'inline-block', width: 250 }}>
            <FormSelect
              label='时间间隔'
              value={searchPeriod}
              labelCol={8}
              wrapperCol={14}
              allowClear={false}
              options={liDus}
              onChange={(val) => this.changeSelectPeriod(val)}
            />
          </div>
          <div style={{ display: 'inline-block', width: 250 }}>
            <FormSelect
              label='聚合方式'
              value={searchValueDealType}
              labelCol={8}
              wrapperCol={14}
              valueName="code"
              options={GROUPWAY}
              disabled={searchValueDealTypeDisabled}
              onChange={(val) => this.changeSelectValueDealType(val)}
            />
          </div>
          <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
            <Button type="primary" onClick={this.fetchSingleSensorInfo}>查询</Button>
          </div>
        </div>

        <div>
          <Chart height={560} forceFit data={dv} padding={[ 20, 40, 110, 40 ]}
            scale={{
              time: {
                type: 'time',
                tickCount: 30,
                mask: 'MM-DD hh:mm:ss'
              }
            }}
          >
            <Legend offsetY={40} />
            <Axis name='time' label={{ textStyle: { rotate: 30 } }} />
            <Axis name='value' label={{ formatter: val => `${val}` }} />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom type='line' position={`time*value`} size={1} color={'keyValue'} />
          </Chart>
        </div>
      </div>
    )
  }
}

export default TrendChart
