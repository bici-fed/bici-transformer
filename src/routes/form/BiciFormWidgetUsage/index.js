/**
 * @File: 表单域控件 
 */
import React, { Component } from 'react'
import { Row, Col, Divider } from 'antd'
import { BiciSelect, BiciInput, BiciInputNumber, BiciTextArea, BiciDatePicker } from '../../../bici-transformers/dist/bici-transformers'
import * as mockData from './mockData'
import ApiDocument from './ApiDocument'

function verifyForm(refs) { // 验证输入框是否有错误提示 可提为公共 需配合selfRefs
  let isError = false
  for (let key in refs) {
    if (refs[key].hint()) { isError = true }
  }
  return isError
}

export default class BiciFormWidgetUsage extends Component {
  state = {
    selectNormalValue: '',
    selectRequiredValue: '',
    selectTranscriptValue: 'Jack',

    inputRequiredValue: '', // BiciInput必填输入框
    inputNormalValue: '', // BiciInput普通输入框
    inputRegValue: '', //BiciInput验证输入框
    inputMaxStrLengthValue: '', // BiciInput最大长度限制输入框值

    inputNumberRequiredValue: '', // BiciInputNumber必填输入框
    inputNumberNormalValue: '', // BiciInputNumber普通输入框
    inputNumberVerifyDecimals: '', // BiciInputNumber验证两位小数
    inputNumberVerifyInt: '', // BiciInputNumber验证整数

    textAreaRequiredValue: '', // BiciTextArea必填文本域
    textAreaNormalValue: '', // BiciTextArea普通文本域
    textAreaMaxStrLengthValue: '', // BiciTextArea最大长度限制输入值

    datePickerRequiredValue: null, // BiciDatePicker选择单日 必填
    rangePickerNormalValue: null, // BiciDatePicker的选择范围
    weekPickerNormalValue: null, // BiciDatePicker的选择周
    monthPickerNormalValue: null, // BiciDatePicker的选择月
    dateTimePickerValue: null, // BiciDatePicker的选择日期时间
    dateTimeRangePickerValue: [], // BiciDatePicker的选择日期时间范围
  }
  selfRefs = {}
  handleFieldChange = (stateStr, val) => { this.setState({ [stateStr]: val }) }
  
  renderSelectUsage = () => { // 渲染下拉选择框用例
    const { selectNormalValue, selectTranscriptValue, selectRequiredValue } = this.state
    return (
      <Row>
        {/* BiciSelect 一般数据 */}
        <Col span={8}>
          <BiciSelect
            label="一般数据"
            value={selectNormalValue}
            data={mockData.selectNormalData}
            onChange={(val) => { this.handleFieldChange('selectNormalValue', val) }}
          />
        </Col>
        <Col span={8}>
          <BiciSelect
            label="数据副本"
            value={selectTranscriptValue}
            data={mockData.selectNormalData}
            onChange={(val) => { this.handleFieldChange('selectTranscriptValue', val) }}
            originalValue="Jack"
          />
        </Col>
        {/* BiciSelect 必填 */}
        <Col span={8}>
          <BiciSelect
            label="必填"
            value={selectRequiredValue}
            isRequired
            data={mockData.selectNormalData}
            onChange={(val) => { this.handleFieldChange('selectRequiredValue', val) }}
          />
        </Col>
      </Row>
    )
  }
  renderInputUsage = () => { // 渲染文本输入框用例
    const { inputRequiredValue, inputNormalValue, inputRegValue, inputMaxStrLengthValue } = this.state
    return (
      <div>
        <Row>
          <Col span={8}>
            <BiciInput 
              label="必填项" 
              isRequired value={inputRequiredValue} 
              ref={(el) => this.selfRefs.requiredRef = el }  // 需要验证（regExp或verificationRule）的表单都要指定ref 并把自身的ref加到this.selfRefs里去做集中验证
              onChange={(e) => { this.handleFieldChange('inputRequiredValue', e.target.value) }} 
            />
          </Col>
          <Col span={8}>
            <BiciInput label="非必填项" value={inputNormalValue} onChange={(e) => { this.handleFieldChange('inputNormalValue', e.target.value) }} />
          </Col>
          <Col span={8}>
            <BiciInput
              label="格式验证"
              ref={(el) => this.selfRefs.verifyFormateRef = el }
              value={inputRegValue}
              regExp="^\d{5,12}$"
              onChange={(e) => { this.handleFieldChange('inputRegValue', e.target.value) }}
              verificationTooltip='请输入5~12位数字'
            />
          </Col>
          <Col span={8} className='mt8'>
            <BiciInput
              label="最大长度限制"
              maxStrLength={2}
              placeholder='最多可输入2个字符'
              value={inputMaxStrLengthValue}
              onChange={(e) => { this.handleFieldChange('inputMaxStrLengthValue', e.target.value) }}
            />
          </Col>
        </Row>
      </div>
    )
  }
  
  renderInputNumberUsage = () => { // 渲染数字输入框用例
    const { inputNumberRequiredValue, inputNumberNormalValue, inputNumberVerifyDecimals, inputNumberVerifyInt } = this.state
    return (
      <div>
        <Row>
          <Col span={8}>
            <BiciInputNumber 
              label="必填" 
              isRequired 
              value={inputNumberRequiredValue} 
              onChange={(val) => { this.handleFieldChange('inputNumberRequiredValue', val) }}
            />
          </Col>
          <Col span={8}>
            <BiciInputNumber 
              label="非必填" 
              isRequired={false}
              value={inputNumberNormalValue} 
              onChange={(val) => { this.handleFieldChange('inputNumberNormalValue', val) }}
            />
          </Col>
          <Col span={8}>
            <BiciInputNumber 
              label="验证两位小数" 
              isRequired 
              value={inputNumberVerifyDecimals} 
              regExp="^\d+(\.\d{1,2})?$"
              verificationTooltip='只能输入数字，小数点后只能保留两位'
              onChange={(val) => { this.handleFieldChange('inputNumberVerifyDecimals', val) }}
            />
          </Col>
        </Row>
        <Row className="mt8">
          <Col span={8}>
            <BiciInputNumber 
              label="验证整数" 
              value={inputNumberVerifyInt} 
              regExp="^[1-9]\d*$"
              verificationTooltip='只能输入整数'
              onChange={(val) => { this.handleFieldChange('inputNumberVerifyInt', val) }}
            />            
          </Col>
        </Row>
      </div>
    )
  }
  renderTextareaUsage = () => { // 渲染文本域
    const { textAreaRequiredValue, textAreaNormalValue, textAreaMaxStrLengthValue } = this.state
    return (
      <div>
        <Row>
          <Col span={24}>
            <BiciTextArea
              isRequired
              label="必填"
              value={textAreaRequiredValue}
              onChange={(e) => { this.handleFieldChange('textAreaRequiredValue', e.target.value) }}
            />
          </Col>
          <Col span={24} className='mt8'>
            <BiciTextArea
              label="非必填"
              value={textAreaNormalValue}
              onChange={(e) => { this.handleFieldChange('textAreaNormalValue', e.target.value) }}
            />
          </Col>
          <Col span={24} className='mt8'>
            <BiciTextArea
              label="最大长度限制"
              maxStrLength={10}
              placeholder='最多可输入10个字符'
              value={textAreaMaxStrLengthValue}
              onChange={(e) => { this.handleFieldChange('textAreaMaxStrLengthValue', e.target.value) }}
            />
          </Col>
        </Row>
      </div>
    )
  }
  renderDatePickerUsage = () => { // 渲染日期组件
    const {
      datePickerRequiredValue,
      rangePickerNormalValue,
      weekPickerNormalValue,
      monthPickerNormalValue,
      dateTimePickerValue,
      dateTimeRangePickerValue,
    } = this.state
    return (
      <div>
        <Row>
          <Col span={8}>
            <BiciDatePicker
              label="范围（按日）"
              isRequired
              value={datePickerRequiredValue}
              onChange={(val) => { this.handleFieldChange('datePickerRequiredValue', val) }}
            />
          </Col>
          <Col span={8}>
            <BiciDatePicker
              label="选择范围"
              type="rangePicker"
              value={rangePickerNormalValue}
              onChange={(val) => { this.handleFieldChange('rangePickerNormalValue', val) }}
            />
          </Col>
          <Col span={8}>
            <BiciDatePicker
              label="选择周"
              type="weekPicker"
              value={weekPickerNormalValue}
              onChange={(val) => { this.handleFieldChange('weekPickerNormalValue', val) }}
            />
          </Col>
        </Row>
        <Row className="mt8">
          <Col span={8}>
            <BiciDatePicker
              label="选择月"
              type="monthPicker"
              value={monthPickerNormalValue}
              onChange={(val) => { this.handleFieldChange('monthPickerNormalValue', val) }}
            />
          </Col>
          <Col span={8}>
            <BiciDatePicker
              label="选择日期时间"
              type="dateTimePicker"
              value={dateTimePickerValue}
              onChange={(val) => { this.handleFieldChange('dateTimePickerValue', val) }}
            />
          </Col>
          <Col span={8}>
            <BiciDatePicker
              label="选择日期时间范围"
              type="dateTimeRangePicker"
              value={dateTimeRangePickerValue}
              onChange={(val) => { this.handleFieldChange('dateTimeRangePickerValue', val) }}
              onOk={() => console.log('ok')}
            />
          </Col>
        </Row>
      </div>
    )
  }
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">表单域控件</p>
        
        {/* 布局模度 */}
        <p className="mb12 fstage16 fw500">布局模度</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">字段名距输入框 8px，控件最大显示长度为 126px，控件竖直方向间隙为 8px；</li>
          <li className="circleLi">表单区域底部的保存、取消等功能按钮，距表单区域垂直间距为 20px；</li>
        </ul>

        {/* 通用功能 */}
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb20 fstage14">
          <li className="circleLi">可设置字段名；</li>
          <li className="circleLi">可设置必填验证及自定制规则验证；</li>
          <li className="circleLi">验证错误提示：控件失焦或提交时边框变红，重新获取焦点后边框颜色还原；</li>
        </ul>
        <Divider/>

        <p className="mb12 fstage16 fw500">下拉选择（BiciSelect）</p>
        { this.renderSelectUsage() }
        <Divider/>

        <p className="mt20 mb12 fstage16 fw500">文本输入框（BiciInput）</p>
        { this.renderInputUsage() }
        <Divider/>

        <p className="mt20 mb12 fstage16 fw500">数字输入框（BiciInputNumber）</p>
        { this.renderInputNumberUsage() }
        <Divider/>

        <p className="mt20 mb12 fstage16 fw500">文本域（BiciTextArea）</p>
        { this.renderTextareaUsage() }
        <Divider/>

        <p className="mt20 mb12 fstage16 fw500">日期组件（BiciDatePicker）</p>
        { this.renderDatePickerUsage() }
        <Divider/>

        {/* 接口文档 */}
        <ApiDocument/>
      </div>
    )
  }
}
