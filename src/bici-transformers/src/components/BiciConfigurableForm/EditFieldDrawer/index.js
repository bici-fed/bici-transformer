/**
 * @File: 编辑表单域抽屉
 */
import React, { Component } from 'react'
import { Tabs, Row, Col, Button } from 'antd'
import { BiciDrawer, BiciInput, BiciSelect } from '../../../index'
import * as drawerData from './drawerData'
import styles from './EditFieldDrawer.module.css'

const TabPane = Tabs.TabPane
const TAB_KEYS = [
  'EDIT_FIELD', // 新增/编辑字段
  'RECYCLE_FIELD', // 字段回收站
]
const INITIAL_FIELD_STATE = { // 初始化的字段配置，用于初始化 State 和新增字段。注意：这里一定确保全字段
  fieldType: 1, // 0 为系统字段，1 为自定义字段，只有自定义字段支持跨卡片拖放
  // 表单类型
  // 0: 文本输入;
  // 1: 数字输入;
  // 2: 下拉单选; // 该类型下可通过补充设置 dictionaries 设置字典名称数组作为下拉数据源
  // 3: 下拉多选; // 该类型下可通过补充设置 dictionaries 设置字典名称数组作为下拉数据源
  // 4: 文本域;
  // 5: 时间日期选择; 该类型下可通过补充设置 dateFormat 字段来定义时间日期格式
  // 6: 时间日期范围选择; 该类型下可通过补充设置 dateFormat 字段来定义时间日期格式
  // 7: 文件上传
  dataType: 0,
  // 'YYYY-MM': 年月
  // 'YYYY-MM-DD': 年月日
  // 'YYYY-MM-DD HH:mm:ss': 年月日时分秒
  dateFormat: 'YYYY-MM-DD', // String，定义时间日期格式，dataType 为 5 或 6 时需要
  dictionaries: [], // Array，对象数组（{ id: 'abc', name: 'abc' }），作为自定义字段的下拉数据源，dataType 为 2 或 3 时需要
  isRequired: 0, // 是否必填，0 为非必填，1为必填
  displayName: '字段名称', // 展示名称
  isShowToTable: 0, // 是否在列表页的复杂表格中展示该列，0 为不展示，1 为展示
  widthLevel: 1, // 1/2/3/4，宽度档，支持 1/4~4/4 四档宽度设置
  enableConfigRequired: true, // 仅系统字段有效，是否支持可配置是否必填
}

class EditFieldDrawer extends Component {
  state = {
    drawerVisible: false, // 抽屉显隐控制
    tabActivityKey: TAB_KEYS[0], // 激活态的卡片 Key
    dictionaryData: [], // 数据字典下拉数据，由应用层初始化后导入

    // 新增与编辑字段
    ...INITIAL_FIELD_STATE
  }

  // 对外实例方法，打开抽屉并初始化设置字段配置
  openAndInitField = (fieldData, updateFieldStateCb) => {
    let dynamicToSetState = INITIAL_FIELD_STATE
    if (fieldData !== null) { // 若 fieldData 为 null，则向卡片中新增字段，使用初始化的字段 state；不为 null 则取值覆盖 state
      dynamicToSetState = fieldData
    }
    this.updateFieldStateCb = updateFieldStateCb // 将更新表单域属性值的回调绑定到该 Class 的实例对象上
    this.setState({
      drawerVisible: true,
      ...dynamicToSetState
    })
  }
  // 对外实例方法，初始化设置数据字典下拉数据
  initDictionary = (dictionaryData) => { this.setState({ dictionaryData }) }

  handleTabClick = (e) => { this.setState({ tabActivityKey: e }) }
  handleFieldChange = (stateStr, val) => { this.setState({ [stateStr]: val }) }
  handleDictionariesSelectChange = (val) => { this.setState({ dictionaries: val.map((item) => ({ id: item, name: item })) }) } // 处理数据字段下拉选择。需要将值结构（字符串数组）转化为下拉数据源结构（id、name 的对象数组）
  handleCloseDrawer = () => { this.setState({ drawerVisible: false }) }
  handleSubmitUpdateField = () => { // 处理提交修改字段配置
    const { fieldType, dataType, dateFormat, dictionaries, isRequired, displayName, isShowToTable, widthLevel, enableDragCrossCard, enableConfigRequired } = this.state
    this.updateFieldStateCb && this.updateFieldStateCb({ fieldType, dataType, dateFormat, dictionaries, isRequired, displayName, isShowToTable, widthLevel, enableDragCrossCard, enableConfigRequired })
    this.setState({ drawerVisible: false })
  }
  // 根据不同表单类型，渲染额外的可配置表单区域
  renderExtraConfigurableForm = () => {
    const { dataType, dictionaries, dateFormat, dictionaryData } = this.state
    const dictionariesSelectValue = dictionaries.map((item) => (item.name)) // 将作为下拉数据源的 dictionaries 的对象数组转化为用于 AntD Select 传值的字符串数组
    switch (dataType) {
      case 2: // 下拉单选 => 需要选择关联字典名称
      case 3: // 下拉多选 => 需要选择关联字典名称 @TODO: 具体业务页面需要请求字典数据
        return (<BiciSelect label="关联字典" mode="multiple" isRequired data={dictionaryData} value={dictionariesSelectValue} onChange={this.handleDictionariesSelectChange} size="small" />)
      case 5: // 时间日期选择
      case 6: // 时间日期范围选择
        return (<BiciSelect label="日期类型" isRequired data={drawerData.DATE_TYPE_SELECT_DATA} value={dateFormat} onChange={(val) => { this.handleFieldChange('dateFormat', val) }} size="small" />)
      default:
        return null
    }
  }
  // 渲染编辑字段 Tab
  renderEditFieldTab = () => {
    const { fieldType, displayName, isShowToTable, widthLevel, isRequired, dataType, enableConfigRequired } = this.state
    const fieldDisabled = fieldType === 0 ? true : false // 若为系统字段，则部分属性不允许配置
    // 是否可配置是否必填，部分系统字段不允许配置是否必填，自定义字段均允许配置是否必填
    let isRequiredDisabled = false
    if (fieldType === 0 && enableConfigRequired === false) { isRequiredDisabled = true } // 若为系统字段且不允许配置是否必填
    return (
      <TabPane tab="编辑字段" key={TAB_KEYS[0]}>
        <Row className="mb6">
          <Col span={24}>
            <BiciInput
              label="字段名称"
              isRequired
              value={displayName}
              onChange={(e) => { this.handleFieldChange('displayName', e.target.value) }}
              size="small"
            />
          </Col>
        </Row>
        <Row className="mb6">
          <Col span={24}>
            <BiciSelect
              label="是否必填"
              isRequired
              value={isRequired}
              data={drawerData.YES_OR_NO_SELECT_DATA}
              onChange={(val) => { this.handleFieldChange('isRequired', val) }}
              disabled={isRequiredDisabled}
              size="small"
            />
          </Col>
        </Row>
        <Row className="mb6">
          <Col span={24}>
            <BiciSelect
              label="是否展示在列表"
              isRequired
              value={isShowToTable}
              data={drawerData.YES_OR_NO_SELECT_DATA}
              onChange={(val) => { this.handleFieldChange('isShowToTable', val) }}
              size="small"
            />
          </Col>
        </Row>
        <Row className="mb6">
          <Col span={24}>
            <BiciSelect
              label="布局宽度"
              isRequired
              value={widthLevel}
              data={drawerData.WIDTH_LEVEL_SELECT_DATA}
              onChange={(val) => { this.handleFieldChange('widthLevel', val) }}
              disabled={fieldDisabled}
              size="small"
            />
          </Col>
        </Row>
        <Row className="mb6">
          <Col span={24}>
            <BiciSelect
              label="表单类型"
              isRequired
              value={dataType}
              data={drawerData.FIELD_DATA_TYPE_SELECT_DATA}
              onChange={(val) => { this.handleFieldChange('dataType', val) }}
              disabled={fieldDisabled}
              size="small"
            />
          </Col>
        </Row>
        { fieldType === 1 && this.renderExtraConfigurableForm() /* 仅自定义字段有额外的属性配置区域 */ }
      </TabPane>
    )
  }
  // 渲染抽屉 Footer
  renderDrawerFooter = () => {
    return (
      <div>
        <div className={styles.footerPlaceholder}></div>
        <div className={styles.footerMain}>
          <Button onClick={this.handleCloseDrawer} size="small" className="mr4">取消</Button>
          <Button onClick={this.handleSubmitUpdateField} size="small" type="primary">确定</Button>
        </div>
      </div>
    )
  }
  render() {
    const { drawerVisible, tabActivityKey } = this.state
    return (
      <BiciDrawer
        size="small"
        width="sm"
        visible={drawerVisible}
        footer={this.renderDrawerFooter()}
        onClose={this.handleCloseDrawer}
      >
        <Tabs activeKey={tabActivityKey} onTabClick={this.handleTabClick} animated={false}>
          { this.renderEditFieldTab() }
          {/* <TabPane tab="字段回收站" key={TAB_KEYS[1]}>功能待定</TabPane> */}
        </Tabs>
      </BiciDrawer>
    )
  }
}

export default EditFieldDrawer
