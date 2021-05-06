/**
 * @File: 可配置表单域
 */
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import { MinusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import _ from 'lodash'
import { BiciInput, BiciInputNumber, BiciSelect, BiciTextArea, BiciDatePicker } from '../../../index'
import * as dndTypes from '../../../dndConstant'
import styles from './ConfigurableField.module.css'

// 设置拖拽源 Drag Source Specification
const fieldSource = {
  // When the dragging starts, beginDrag is called
  // What you return is the only information available to the drop targets about the drag source so it's important to pick the minimal data they need to know
  beginDrag(props, monitor, component) {
    const { fromAreaIndex, fieldData } = props
    return { fromAreaIndex, fieldData }
  }
}

// 设置放置目标
// It describes how the drop target reacts to the drag and drop events
const fieldTarget = {
  // Called when a compatible item is dropped on the target
  hover(props, monitor, component) {
    if (!component) { return }

    const dragFieldIndex = monitor.getItem().fieldData.fieldIndex // 被拖拽的 Field 的在卡片中的顺序索引
    const dragFieldFromAreaIndex = monitor.getItem().fromAreaIndex // 被拖拽的 Field 原所处卡片的卡片索引
    const hoverFieldIndex = props.fieldData.fieldIndex // hover 放置目标 Field 的在卡片中的顺序索引

    if (dragFieldFromAreaIndex !== props.fromAreaIndex) { return } // 跨卡片拖放字段情况下，Hover 不做处理
    if (dragFieldIndex === hoverFieldIndex) { return } // 在同一卡片内，拖拽与放置目标索引一致则不做处理

    // 碰撞检测 - 水平与垂直方向的卡片内字段替换
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2 // Hover 放置目标的水平中轴线坐标
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const DragclientOffset = monitor.getClientOffset() // 拖拽源的 clientOffset
    const hoverClientX = DragclientOffset.x - hoverBoundingRect.left
    const hoverClientY = DragclientOffset.y - hoverBoundingRect.top

    // 碰撞情况未达到要修改字段顺序的条件时不做处理
    if (dragFieldIndex < hoverFieldIndex && hoverClientX < hoverMiddleX && hoverClientY < hoverMiddleY) { return }
    if (dragFieldIndex > hoverFieldIndex && hoverClientX > hoverMiddleX && hoverClientY > hoverMiddleY) { return }

    // 处理调整顺序
    props.changeFieldOrderInCardCb(dragFieldIndex, hoverFieldIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().fieldData.fieldIndex = hoverFieldIndex
  },
  // Called when a compatible item is dropped on the target
  drop(props, monitor, component) {
    const { fromAreaIndex, fieldData } = props
    const dragItem = monitor.getItem()
    if (fromAreaIndex !== dragItem.fromAreaIndex) { // 处理跨卡片拖放
      if (dragItem.fieldData.fieldType === 1 && fieldData.fieldType === 1) { // 仅处理自定义字段的跨卡片拖放
        props.changeCrossAreaFieldOrderCb( // 进行跨卡片自定义字段位置替换
          [dragItem.fromAreaIndex, dragItem.fieldData.fieldIndex],
          [fromAreaIndex, fieldData.fieldIndex]
        )
      }
    }
  }
}

class ConfigurableField extends Component {
  state = {
    isMouseEnter: false, // 是否是鼠标移入态
  }
  handleFieldMouseEnter = () => { this.setState({ isMouseEnter: true }) }
  handleFieldMouseLeave = () => { this.setState({ isMouseEnter: false }) }
  handleDeleteField = () => { this.props.updateFieldStateCb(null) } // 处理删除字段
  handleToConfigField = () => { // 处理调用抽屉进行字段配置
    const { fieldData, updateFieldStateCb, getEditFieldDrawerInstance } = this.props
    getEditFieldDrawerInstance().openAndInitField(fieldData, updateFieldStateCb)
  }
  renderField = () => { // 区分类型渲染表单域
    const { fieldData } = this.props
    const { dataType, isRequired, displayName } = fieldData
    const isRequiredProp = isRequired === 1 ? true : false // 0 为非必填，1为必填

    switch (dataType) {
      case 0: // 文本输入
        return (<BiciInput label={displayName} isRequired={isRequiredProp} value="" size="small" disabled />)
      case 1: // 数字输入
        return (<BiciInputNumber label={displayName} isRequired={isRequiredProp} value="" size="small" disabled />)
      case 2: // 下拉单选 @TODO: 处理请求数据字典下拉，与应用层接口对接
        return (<BiciSelect label={displayName} isRequired={isRequiredProp} data={[]} value="" size="small" disabled />)
      case 3: // 下拉多选 @TODO: 处理请求数据字典下拉，与应用层接口对接
        return (<BiciSelect label={displayName} isRequired={isRequiredProp} data={[]} value="" size="small" disabled />)
      case 4: // 文本域
        return (<BiciTextArea label={displayName} isRequired={isRequiredProp} autosize={{ minRows: 2 }} rows={1} size="small" disabled />)
      case 5: // 时间日期选择
        return (<BiciDatePicker label={displayName} isRequired={isRequiredProp} value={null} size="small" disabled />)
      case 6: // 时间日期范围选择
        return (<BiciDatePicker type="rangePicker" label={displayName} isRequired={isRequiredProp} value={null} size="small" disabled />)
      // @TODO: Case 7 文件上传
      default:
        return null
    }
  }
  // 区分场景渲染字段遮罩层
  renderFieldMask = () => {
    const { fieldData, isDragging } = this.props
    const { fieldType } = fieldData
    // 拖拽态进行样式区分
    if (isDragging) {
      return <div className={styles.fieldMask} style={{ opacity: 1, background: '#e8e8e8' }}></div>
    }
    
    return (
      <div className={styles.fieldMask}>
        <SettingOutlined onClick={this.handleToConfigField} className={styles.fieldOperationIcon} />
        { // 系统字段不允许删除
          (fieldType === 1) ? <MinusCircleOutlined onClick={this.handleDeleteField} className={styles.fieldOperationIcon} /> : null
        }
      </div>
    );
  }
  render() {
    const { connectDragSource, connectDropTarget, isOver, dragItemData, fieldData, fromAreaIndex } = this.props
    const { isMouseEnter } = this.state


    // 以下情况下作为放置目标的 Field 显示蓝色虚线外边框
    // A.当字段作为放置目标并处于被拖拽源 hover 状态（注意确切是鼠标指针 Hover）时；
    // B.拖拽源与放置目标在同一卡片中的索引不同；
    // C.跨卡片拖放情况下，拖拽源 Field 是自定义字段类型；
    let dynamicMainProps = {}
    let isFieldIndexDiffrent = true
    let enableCrossCardDrop = true
    if (isOver) {
      isFieldIndexDiffrent = fieldData.fieldIndex !== dragItemData.fieldData.fieldIndex
      if (fromAreaIndex !== dragItemData.fromAreaIndex) {
        if (dragItemData.fieldData.fieldType === 0) { // 跨卡片拖放情况下，拖拽源 Field 是系统字段则不显示蓝色虚线外边框
          enableCrossCardDrop = false
        }
      }
    }
    if (isOver && isFieldIndexDiffrent && enableCrossCardDrop) { dynamicMainProps.style = { outline: '#1890ff dashed 1px' } }

    const FieldMask = this.renderFieldMask()
    const main = (
      <div
        className={styles.fieldWrapper}
        onMouseEnter={this.handleFieldMouseEnter}
        onMouseLeave={this.handleFieldMouseLeave}
        {...dynamicMainProps}
      >
        { isMouseEnter ? FieldMask : null }
        { this.renderField() }
      </div>
    )

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(connectDropTarget(main))
    )
  }
}

ConfigurableField.propTypes = {
  fromAreaIndex: PropTypes.number.isRequired, // 字段所处卡片的索引
  fieldData: PropTypes.object.isRequired, // 字段数据
  updateFieldStateCb: PropTypes.func.isRequired, // 用于更新表单域属性的回调，参数 toShallowExtendsFieldData 为要去浅覆盖卡片中该字段的属性对象，传 null 表示删除该字段
  changeFieldOrderInCardCb: PropTypes.func.isRequired, // 用于更新表单域顺序（卡片内）的回调，参数 dragFieldIndex 为拖拽源字段索引，hoverFieldIndex 为放置源字段索引
  getEditFieldDrawerInstance: PropTypes.func.isRequired, // 获取外层的配置字段抽屉组件实例
  changeCrossAreaFieldOrderCb: PropTypes.func.isRequired, // 处理跨卡片替换字段回调，参数 dragFieldIndexArr 和 dropFieldIndexArr 分别是拖拽源和放置源的卡片、字段索引数组

  // React DnD Props
  isDragging: PropTypes.bool,
  connectDragSource: PropTypes.func,
  isOver: PropTypes.bool,
  connectDropTarget: PropTypes.func,
}

export default _.flow(
  DragSource(
    dndTypes.CONFIGURABLE_FORM_FIELD,
    fieldSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
      dragItemData: monitor.getItem()
    })
  ),
  DropTarget(
    dndTypes.CONFIGURABLE_FORM_FIELD,
    fieldTarget,
    (connect, monitor) => ({ // It should return a plain object of the props to inject into your component.
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver({ shallow: true }) // Returns true if there is a drag operation in progress, and the pointer is currently hovering over the owner
    })
  )
)(ConfigurableField)

/**
 * @Docs: Nesting-behavior: http://react-dnd.github.io/react-dnd/docs/api/drag-source#nesting-behavior
 * 当一个拖拽源嵌套在另一个拖拽源中，最内层的拖拽源将匹配适合的 Type。那些在 canDrag 中 return false 的拖拽源将被忽略。
 * 当前选中的拖拽源是唯一能触发 beginDrag 和 endDrag 的拖拽源。一旦拖拽源被决定那么不会发生冒泡行为。
 */
