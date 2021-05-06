/**
 * @File: 拖放列表选项
 */

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './moveItem.css'
// 拖拽类型标识符，用来表示同类拖拽item
const ITEM_TYPE = 'BICI_COLUMN_OPTION'
// 组件拖动相关事件
const sourceSpec = {
  beginDrag(props) {
    const { index } = props
    return { index }
  },
  endDrag(props, monitor) {
    const { index, handleEndDrag } = props
    const endIndex = monitor.getItem().index
    handleEndDrag && handleEndDrag(index, endIndex)
  }
}
// 组件放置相关事件
const targetSpec = {
  hover(props, monitor, component) {
    if (!component) {
      return null
    }

    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }
    // 碰撞检测
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    monitor.getItem().index = hoverIndex
  }
}

class MoveItem extends Component {
  static propTypes = {
    // 应用父组件传入的属性
    index: PropTypes.number, // 列表选项索引
    draggable: PropTypes.bool, // 是否可拖拽
    handleEndDrag: PropTypes.func, // 处理选项拖动成功的回调
    // collect注入的属性
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func
  }
  static defaultProps = {
    draggable: false
  }
  render() {
    const { connectDragSource, connectDropTarget, isDragging, draggable } = this.props
    const moveItemCN = classNames({
      [styles.root]: true,
      [styles.dragging]: isDragging
    })
    const view = <div className={moveItemCN}>{!isDragging && this.props.children}</div>
    if (draggable) {
      return (
        // Connector用来建立React与DnD Backend需要的具体DOM元素之间的联系
        connectDragSource(connectDropTarget(view))
      )
    }
    return view
  }
}
// 封装组件使其既是拖拽源又是放置目标
export default _.flow(
  DragSource(ITEM_TYPE, sourceSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ITEM_TYPE, targetSpec, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(MoveItem)
