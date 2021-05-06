/**
 * @File: 条件筛选标签管理 工具函数
 */

import _ from 'lodash'
import { FILTER_TYPES } from '../complexTableUtils'

// 根据下拉选择值从下拉数据中取得 name
function getSelectedName(val, selectData) {
  if (selectData.length === 0) { return '' }
  for (let i = 0; i < selectData.length; i++) {
    if (String(selectData[i].id) === String(val)) {
      return selectData[i].name
    }
  }
  return ''
}

function getTagSelectedName(val,selectData) {
  if (selectData.length === 0) { return '' }
  let nameArr = []
  val.forEach((val) => {
    selectData.forEach((data) => {
      if (String(val) === String(data.id)) {
        nameArr.push(data.name)
      }
    })
  })
  return nameArr.join('，')
}

// 根据单选/多选过滤选择值从过滤数据中取得 text
function getFiltertedJoinedText(vals, filters) {
  if (filters.length === 0) { return '' }

  let textArr = []
  vals.forEach((val) => {
    for (let i = 0; i < filters.length; i++) {
      if (String(filters[i].value) === String(val)) {
        textArr.push(filters[i].text)
      }
    }
  })
  return textArr.join('，')
}

// 从 Table 组件中过滤 Filter 相关的 state，并格式化为描述各 Tag 的对象数组
export const getFilterTagsByState = (srcState) => {
  let distArr = []
  _.forOwn(srcState, (value, key) => {
    if (key.indexOf('filter') === 0 && key.slice(-3) === 'val') { // 以 filter 开头并以 val 结尾
      const splited = key.split('_')
      const dataIndex = splited[1]
      const filterType = splited[2]
      const columnTitle = srcState[`filter_${dataIndex}_${filterType}_title`]
      let displayStr = '' // Tag 展示值
      let val = null // 接口传参值

      // 按过滤类型对 Tag 展示值、接口传参值进行转换
      switch (filterType) {
        case FILTER_TYPES[0]: // 模糊搜索
          displayStr = value === '' ? '' : `${columnTitle}：${value}`
          val = value
          break
        case FILTER_TYPES[1]: // 下拉单选搜索
          const selectName = getSelectedName(value, srcState[`filter_${dataIndex}_${FILTER_TYPES[1]}_selectData`])
          displayStr = selectName === '' ? '' : `${columnTitle}：${selectName}`
          val = value
          break
        case FILTER_TYPES[2]: // 选择日期，精确到日
          if (Array.isArray(value)) {
            if (value[0] === null) { // 未选择日期
              displayStr = ''
              val = [null, null]
            } else {
              const format = srcState[`filter_${dataIndex}_${FILTER_TYPES[2]}_format`]
              const startDate = value[0].format(format)
              const endDate = value[1].format(format)
              displayStr = `${columnTitle}：${startDate} ~ ${endDate}`
              val = [startDate, endDate]
            }
          } else {
            if (value === null) {
              displayStr = ''
              val = null
            } else {
              const format = srcState[`filter_${dataIndex}_${FILTER_TYPES[2]}_format`]
              const date = value.format(format)
              displayStr = `${columnTitle}：${date}`
              val = date
            }
          }
          break
        case FILTER_TYPES[3]: // 下拉多选搜索
          if (value.length === 0) {
            displayStr = ''
          } else {
            const selectData = srcState[`filter_${dataIndex}_${FILTER_TYPES[3]}_selectData`]
            if (typeof selectData[0] === 'object') {
              const filteredJoinedText = getTagSelectedName(value, selectData)
              displayStr = `${columnTitle}：${filteredJoinedText}`
            } else {
              displayStr = `${columnTitle}：${value.join('，')}`
            }
          }
          val = value
					break
				case FILTER_TYPES[4]: // 范围数值查询
					const [beginValue, endValue] = value
					const beginVal = _.isNumber(beginValue) ? beginValue : ''
					const endVal = _.isNumber(endValue) ? endValue : ''
					const hasVal = _.isNumber(beginVal) || _.isNumber(endValue)
					displayStr = hasVal ? `${columnTitle}：${beginVal} ~ ${endVal}` : ''
					val = value
					break
        case 'check': // 单选及多选过滤
          if (value === null || value.length === 0) {
            displayStr = ''
          } else {
            const filteredJoinedText = getFiltertedJoinedText(value, srcState[`filter_${dataIndex}_check_checkData`])
            displayStr = `${columnTitle}：${filteredJoinedText}`
          }
          val = value
          break
      }

      distArr.push({dataIndex, filterType, displayStr, val, key})
    }
  })
	return distArr
}
