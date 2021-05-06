/**
 * @File: 拖放配置卡片
 * @Docs: 设置拖放 handle：http://react-dnd.github.io/react-dnd/docs/api/drag-source-connector#properties
 */
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { CloseCircleTwoTone, DownCircleTwoTone, PlusCircleTwoTone, PushpinTwoTone } from '@ant-design/icons';
import { Card, Dropdown, Menu, Input, Row, Col, Modal } from 'antd';
import _ from 'lodash'
import ConfigurableField from '../ConfigurableField'
import * as utils from './utils'
import * as dndTypes from '../../../dndConstant'
import styles from './ConfigurableCard.module.css'

const MenuItem = Menu.Item
// 设置拖拽源 Drag Source Specification
const cardSource = {
  // When the dragging starts, beginDrag is called
  // What you return is the only information available to the drop targets about the drag source so it's important to pick the minimal data they need to know
  beginDrag(props, monitor, component) {
    const { areaData } = props
    return { areaData }
  }
}

// 设置放置目标
// It describes how the drop target reacts to the drag and drop events
const cardTarget = {
  // Called when a compatible item is dropped on the target
  hover(props, monitor, component) {
    if (!component) { return }
    const areaData = monitor.getItem().areaData
    const dragAreaIndex = areaData.areaIndex // 被拖拽的 Area 索引
    const hoverAreaIndex = props.areaData.areaIndex // hover 放置目标 Area 索引
    if (dragAreaIndex === hoverAreaIndex) { return } // 拖拽与放置目标索引一致则不做处理

    // 碰撞检测 - 垂直方向的卡片顺序替换
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const DragclientOffset = monitor.getClientOffset() // 拖拽源的 clientOffset
    const hoverClientY = DragclientOffset.y - hoverBoundingRect.top

    // 碰撞情况未达到要修改字段顺序的条件时不做处理
    if (dragAreaIndex < hoverAreaIndex && hoverClientY < hoverMiddleY) { return }
    if (dragAreaIndex > hoverAreaIndex && hoverClientY > hoverMiddleY) { return }

    // 处理调整顺序
    props.changeCardOrderCb(dragAreaIndex, hoverAreaIndex)
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().areaData.areaIndex = hoverAreaIndex
  }
}

class ConfigurableCard extends Component {
  state = {
    cardTitle: '标题', // 卡片标题
    cardTitleIsEdit: false, // 卡片标题是否处于编辑态
  }

  handleAddField = () => { // 处理添加卡片字段
    this.getEditFieldDrawerInstance().openAndInitField(null, (toShallowExtendsFieldData) => { this.handleUpdateFieldState(toShallowExtendsFieldData, -1) })
  }
  handleDeleteCard = () => { // 处理删除卡片
    const { updateCardStateCb } = this.props
    Modal.confirm({
      title: '是否确认删除该卡片？',
      maskClosable: true,
      onOk() { updateCardStateCb(null) }
    })
  }
  handleCardTitleClick = () => { this.setState({ cardTitleIsEdit: true }, () => { this.cardTitleIpt.focus() }) }
  handleCardTitleIptBlur = () => { // 处理卡片标题失焦
    const { areaData, updateCardStateCb } = this.props
    const { title } = areaData
    if (title === '') { updateCardStateCb({ title: '卡片标题' }) } // 若失焦时卡片标题为空，则重置为 ”卡片标题“
    this.setState({ cardTitleIsEdit: false })
  }
  handleCardTitleChange = (e) => { this.props.updateCardStateCb({ title: e.target.value }) } // 处理卡片标题编辑
  // 处理更新表单域字段数据
  handleUpdateFieldState = (toShallowExtendsFieldData, fieldIndex) => {
    const { areaData, updateCardStateCb } = this.props
    let cloneFields = _.cloneDeep(areaData.fields)
    
    if (toShallowExtendsFieldData === null) { // 若 toShallowExtendsFieldData 为 null，则从 areaData 中删除该字段
      cloneFields.splice(fieldIndex, 1)
    } else { // 若 toShallowExtendsFieldData 不为 null，则处理新增或更新字段
      if (fieldIndex === -1) { // 处理向卡片中新增字段
        cloneFields.push(toShallowExtendsFieldData)
      } else { // 处理从 areaData 中浅覆盖该字段
        cloneFields[fieldIndex] = {
          ...cloneFields[fieldIndex],
          ...toShallowExtendsFieldData
        }
      }
    }
    updateCardStateCb({ fields: cloneFields })
  }
  // 处理卡片内修改 Field 顺序
  handleChangeFieldOrderInCard = (dragFieldIndex, hoverFieldIndex) => {
    const { areaData, updateCardStateCb } = this.props
    let cloneFields = _.cloneDeep(areaData.fields)
    // 缓存调换位置前的 field 数据
    const dragFieldData = cloneFields[dragFieldIndex]
    // 进行字段调换：先清掉拖拽字段位置的数据，然后在 Hover 位置插入拖拽字段数据
    cloneFields.splice(dragFieldIndex, 1)
    cloneFields.splice(hoverFieldIndex, 0, dragFieldData)
    updateCardStateCb({ fields: cloneFields })
  }
  getEditFieldDrawerInstance = () => { return this.props.getEditFieldDrawerInstance() } // Return 配置字段抽屉示例，供底层组件内部调用

  // 渲染卡片标题
  renderCardTitle = () => {
    const { areaData } = this.props
    const { cardTitleIsEdit } = this.state
    const { title } = areaData

    if (!cardTitleIsEdit) { return (<div className={styles.notEditableCardTitle} onClick={this.handleCardTitleClick}>{title}</div>) } // 非编辑态
    return (
      <div className={styles.cardTitleIptWrapper}>
        <Input
          placeholder="请输入卡片标题"
          value={title}
          size="small"
          className={styles.cardTitleIpt}
          onChange={this.handleCardTitleChange}
          onBlur={this.handleCardTitleIptBlur}
          onPressEnter={this.handleCardTitleIptBlur}
          ref={(el) => { this.cardTitleIpt = el }}
        />
      </div>
    )
  }
  // 渲染卡片操作 DropDown
  renderCardExtra = () => {
    const { connectDragSource } = this.props
    // 卡片操作下拉菜单项
    const CardOperationMenu = (
      <Menu>
        <MenuItem onClick={this.handleAddField}><PlusCircleTwoTone className="verticalMiddle fs14" />添加字段</MenuItem>
        <MenuItem onClick={this.handleDeleteCard}><CloseCircleTwoTone className="verticalMiddle fs14" />删除卡片</MenuItem>
      </Menu>
    )
    return (
      <div>
        {connectDragSource(<span><PushpinTwoTone className="fs16 cursorMove mr6" /></span>)}
        <Dropdown overlay={CardOperationMenu}><DownCircleTwoTone className="fs16 cursorPointer" /></Dropdown>
      </div>
    );
  }
  // 渲染表单域行列布局
  // @TODO: 根据 1/4 ~ 4/4 布局模度实现自动换行排版
  renderFieldsRowAndCol = () => {
    const { areaData, changeCrossAreaFieldOrderCb } = this.props
    const { fields, areaIndex } = areaData
    const typesettingFields = utils.getTypesettingFields(fields) // 处理自动换行排版后的字段数组，会缓存字段在原卡片中的索引以便于更新字段值时回溯

    return typesettingFields.map((colArr, rowIndex) => {
      return (
        <Row className="mb6" key={rowIndex}>
          {
            colArr.map((colData, colIndex) => {
              const { displayName, widthLevel, fieldIndex } = colData
              const colSpan = widthLevel * 6
              return (
                <Col span={colSpan} key={`${colIndex}-${displayName}`}>
                  <ConfigurableField
                    fromAreaIndex={areaIndex}
                    fieldData={colData}
                    updateFieldStateCb={(toShallowExtendsFieldData) => { this.handleUpdateFieldState(toShallowExtendsFieldData, fieldIndex) }}
                    changeFieldOrderInCardCb={this.handleChangeFieldOrderInCard}
                    getEditFieldDrawerInstance={this.getEditFieldDrawerInstance}
                    changeCrossAreaFieldOrderCb={changeCrossAreaFieldOrderCb}
                  />
                </Col>
              )
            })
          }
        </Row>
      )
    })
  }
  render() {
    const { className, connectDragPreview, connectDropTarget, isOver, areaData, dragItemData } = this.props

    // 处理最外层包裹元素动态 props
    let dynamicMainProps = {}
    if (isOver && areaData.areaIndex !== dragItemData.areaData.areaIndex) { // 当字段作为放置目标并处于被拖拽源 hover 状态时（且拖拽源与放置目标不是同一元素）
      dynamicMainProps.style = { outline: '#1890ff dashed 1px' }
    }

    // 处理卡片动态 props
    let dynamicCardProps = {}
    if (className) { dynamicCardProps.className = className }

    // Only native element nodes can now be passed to React DnD connectors.You can either wrap Card into a <div>, or turn it into a drag source or a drop target itself.
    const main = (
      <div {...dynamicMainProps}>
        <Card
          size="small"
          title={this.renderCardTitle()}
          extra={this.renderCardExtra()}
          {...dynamicCardProps}
        >
          {this.renderFieldsRowAndCol()}
        </Card>
      </div>
    )
    return (
      connectDragPreview &&
      connectDropTarget &&
      connectDragPreview(connectDropTarget(main))
    )
  }
}

ConfigurableCard.propTypes = {
  areaData: PropTypes.object.isRequired, // 卡片数据
  updateCardStateCb: PropTypes.func.isRequired, // 用于更新卡片 State 的父级组件回调，参数 toShallowExtendsAreaData 为要去浅覆盖该卡片 state 的 toSetState 对象，传 null 则为删除卡片
  changeCardOrderCb: PropTypes.func.isRequired, // 用于更换卡片位置的回调，参数 dragAreaIndex 和 hoverAreaIndex 分别为拖拽区域索引和放置区域索引
  changeCrossAreaFieldOrderCb: PropTypes.func.isRequired, // // 处理跨卡片替换字段回调，参数 dragFieldIndexArr 和 dropFieldIndexArr 分别是拖拽源和放置源的卡片、字段索引数组
  className: PropTypes.any, // 定制卡片 className
  getEditFieldDrawerInstance: PropTypes.func.isRequired, // 获取外层的配置字段抽屉组件实例
}

export default _.flow(
  DragSource(
    dndTypes.CONFIGURABLE_FORM_CARD,
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
      dragItemData: monitor.getItem()
    })
  ),
  DropTarget(
    dndTypes.CONFIGURABLE_FORM_CARD,
    cardTarget,
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver({ shallow: true }) // Returns true if there is a drag operation in progress, and the pointer is currently hovering over the owner
    })
  )
)(ConfigurableCard)
