/**
 * @File: 界面可视化配置组件
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'antd'
import _ from 'lodash'
import { DragDropContext  } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ConfigurableCard from './ConfigurableCard'
import EditFieldDrawer from './EditFieldDrawer'

class BiciConfigurableForm extends Component {
  state = {
    areaList: [] // 最外层卡片、区域组件数组，数组元素顺序即为其布局排序
  }
  // 对外实例方法
  initFormAreaList = (areaList) => { this.setState({ areaList }) } // 初始化可配置表单数据
  initDictionary = (dictionaryData) => { this.editFieldDrawer.initDictionary(dictionaryData) } // 初始化自定义字段的数据字典数据

  handleClickCancel = () => { this.props.onCancel() }
  handleClickSubmit = () => { this.props.onSubmit(this.state.areaList) } // 点击处理保存
  handleAddCard = () => { // 处理新增卡片
    const { areaList } = this.state
    let cloneAreaList = _.cloneDeep(areaList)
    cloneAreaList.push({
      type: 'card',
      title: '卡片标题',
      fields: []
    })
    this.setState({ areaList: cloneAreaList })
  }
  // 处理更新卡片 State，用于传递给卡片的回调
  handleUpdateCardState = (toShallowExtendsAreaData, areaIndex) => {
    const { areaList } = this.state
    let cloneAreaList = _.cloneDeep(areaList)
    if (toShallowExtendsAreaData === null) { // 若 toShallowExtendsAreaData 为 null，则为删除该 Area
      cloneAreaList.splice(areaIndex, 1)
    } else { // 若 toShallowExtendsAreaData 不为 null，则浅覆盖
      cloneAreaList[areaIndex] = {
        ...cloneAreaList[areaIndex],
        ...toShallowExtendsAreaData
      }
    }
    this.setState({ areaList: cloneAreaList })
  }
  // 处理更改卡片顺序
  handleChangeAreaOrder = (dragAreaIndex, hoverAreaIndex) => {
    const { areaList } = this.state
    let cloneAreaList = _.cloneDeep(areaList)
    const dragAreaData = cloneAreaList[dragAreaIndex]
    
    // 进行字段调换：先清掉拖拽 Area 位置的数据，然后在 Hover 位置插入拖拽 Area 数据
    cloneAreaList.splice(dragAreaIndex, 1)
    cloneAreaList.splice(hoverAreaIndex, 0, dragAreaData)
    this.setState({ areaList: cloneAreaList })
  }
  // 处理跨卡片拖放更换自定义字段位置
  handleChangeCrossAreaFieldOrder = (dragFieldIndexArr, dropFieldIndexArr) => {
    const { areaList } = this.state
    let cloneAreaList = _.cloneDeep(areaList)
    const dragAreaIndex = dragFieldIndexArr[0]
    const dragFieldIndex = dragFieldIndexArr[1]
    const dropAreaIndex = dropFieldIndexArr[0]
    const dropFieldIndex = dropFieldIndexArr[1]
    // 缓存拖拽源和放置目标 Field 数据
    const dragFieldData = cloneAreaList[dragAreaIndex].fields[dragFieldIndex]
    const dropFieldData = cloneAreaList[dropAreaIndex].fields[dropFieldIndex]
    // 进行位置替换
    cloneAreaList[dragAreaIndex].fields[dragFieldIndex] = dropFieldData
    cloneAreaList[dropAreaIndex].fields[dropFieldIndex] = dragFieldData
    this.setState({ areaList: cloneAreaList })
  }
  getEditFieldDrawerInstance = () => { return this.editFieldDrawer } // Return 配置字段抽屉示例，供底层组件内部调用
  // 渲染可配置卡片
  renderConfigurableCards = () => {
    const { areaList } = this.state
    return areaList.map((areaData, index) => {
      const { title } = this.state
      const distAreaData = { // 补充构建索引，便于比较拖拽源与放置目标位置关系
        ...areaData,
        areaIndex: index
      }
      // @TODO: 当后续增加【区域组件】后进行根据 type 的判断
      return (
        <ConfigurableCard
          areaData={distAreaData}
          updateCardStateCb={(toShallowExtendsAreaData) => { this.handleUpdateCardState(toShallowExtendsAreaData, index) }}
          changeCardOrderCb={this.handleChangeAreaOrder}
          changeCrossAreaFieldOrderCb={this.handleChangeCrossAreaFieldOrder}
          getEditFieldDrawerInstance={this.getEditFieldDrawerInstance}
          className="mb6"
          key={`${index}-${title}`}
        />
      )
    })
  }
  render() {
    return (
      <div>
        <Row className="mb6">
          <Col offset={18} span={6} className="taRight">
            <Button onClick={this.handleClickCancel} className="mr4" size="small">取消</Button>
            <Button onClick={this.handleClickSubmit} type="primary" size="small">保存</Button>
          </Col>
        </Row>
        { this.renderConfigurableCards() }
        <Button onClick={this.handleAddCard} type="dashed" block>+ 新增卡片</Button>
        <EditFieldDrawer ref={(el) => { this.editFieldDrawer = el }} />
      </div>
    )
  }
}

BiciConfigurableForm.propTypes = {
  onCancel: PropTypes.func.isRequired, // 点击取消时的回调
  onSubmit: PropTypes.func.isRequired, // 点击提交保存时的回调。参数 areaList 为配置数据
}

export default DragDropContext(HTML5Backend)(BiciConfigurableForm)
