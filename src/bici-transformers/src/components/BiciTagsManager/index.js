/**
 * @File: 标签管理组件
 */

import React, { Component } from 'react'

import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  LeftOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { Tag, Dropdown, Button, Tooltip, Input, Menu, message } from 'antd';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { addSmallStyle } from '../../utils/styleUtils'
import styles from './biciTagsManager.css'
class BiciTagsManager extends Component {
  state = {
    menuVisible: false, // 标签面板显隐控制
    menuStatus: 1, // 面板状态，1 为选择标签状态，2 为新建标签状态，3 为编辑标签状态，4 为标签搜索状态下的快速创建状态，5 为确认删除标签状态
    searchValue: '', // 搜索标签内容
    newTagName: '', // 创建新标签的输入名称
    optionMouseEnterIndex: null, // 鼠标移入下拉数据选项的索引
    onHoverTagIndex: null, // 鼠标移入展示标签的索引

    // 编辑态
    editedId: null,
    editedName: ''
  }
  resetState = () => {
    this.setState({
      menuStatus: 1,
      searchValue: '',
      newTagName: '',
      optionMouseEnterIndex: null,
      onHoverTagIndex: null,
      editedId: null,
      editedName: ''
    })
  }
  handleMenuVisibleChange = (visible) => {
    this.setState({ menuVisible: visible }, () => {
      if (!visible) { this.resetState() }
    })
  } // TODO: 此处会报错，考虑升级 AntD 后再考察 }
  handleFieldChange = (stateStr, toSetValue) => { this.setState({ [stateStr]: toSetValue }) }
  // 处理点击添加标签按钮
  handleClickCreateTagBtn = () => { this.setState({ menuStatus: 2 }) }
  // 处理从创建/编辑面板返回操作
  handleClickBackBtn = () => {
    const { searchValue } = this.state
    const { selectData } = this.props

    const filteredSelectData = selectData.filter((option) => {
      return option.name.indexOf(searchValue) !== -1
    })
    let toSetMenuStatus = 4 // 快速创建状态
    if (filteredSelectData.length !== 0 || selectData === '') { // 搜索内容匹配到下拉选项 或 输入内容为空
      toSetMenuStatus = 1 // 选择标签状态
    }
    this.setState({ menuStatus: toSetMenuStatus })
  }
  handleCloseMenu = () => {
    this.setState({ menuVisible: false }, () => { this.resetState() })
  }
  // 处理标签选择
  handleSelectTag = (toSetChecked, option) => {
    const { dataSource, onSelectTag, selectMax } = this.props

    if (selectMax && dataSource.length >= selectMax && toSetChecked) { // 选择超出上限
      message.error('选择超出上限')
      return
    }
    let cloneDataSource = _.cloneDeep(dataSource)
    if (toSetChecked) { // 将要选中标签
      cloneDataSource.push(option)
    } else {
      const toSetIndex = cloneDataSource.findIndex((element) => { return element.id === option.id })
      if (toSetIndex !== -1) {
        cloneDataSource.splice(toSetIndex, 1)
      }
    }
    onSelectTag && onSelectTag(cloneDataSource, toSetChecked, option)
  }
  // 处理搜索标签输入值改变
  handleSearchTagChange = (e) => {
    const { selectData } = this.props
    const val = e.target.value
    const filteredSelectData = selectData.filter((option) => {
      return option.name.indexOf(val) !== -1
    })
    let toSetMenuStatus = 4
    if (filteredSelectData.length !== 0 || val === '') { // 搜索内容匹配到下拉选项 或 输入内容为空
      toSetMenuStatus = 1
    }
    this.setState({
      menuStatus: toSetMenuStatus,
      searchValue: val
    })
  }
  // 处理搜索输入控件回车事件
  handleSearchIptPressEnter = () => {
    const { menuStatus } = this.state
    if (menuStatus === 4) { this.handleClickCreateTag() }
  }
  // 处理点击创建按钮
  handleClickCreateTag = () => {
    const { newTagName, searchValue, menuStatus } = this.state
    const { onCreateTag, tagLength } = this.props

    let toSubmitTagName = ''
    switch (menuStatus) {
      case 2: // 创建面板
        toSubmitTagName = newTagName
        break
      case 4: // 搜索标签状态下的快速创建状态
        toSubmitTagName = searchValue
        break
    }
    if (tagLength && toSubmitTagName.length > tagLength) { // 长度超出限制
      message.error('长度超出限制')
      return
    }
    this.setState({
      menuStatus: 1, // 回到标签选择面板
      newTagName: '',
      searchValue: '',
    }, () => { onCreateTag(toSubmitTagName) })
  }
  // 处理点击编辑标签按钮
  handleClickEditTag = (option, e) => {
    e.stopPropagation()
    const { id, name } = option
    this.setState({
      editedId: id,
      editedName: name,
      menuStatus: 3
    })
  }
  // 处理删除标签
  handleDeleteTag = (toDeleteId, isToDatabase) => {
    const { editedId } = this.state
    const { onDeleteTag, dataSource } = this.props
    const distToDeleteId = toDeleteId === null ? editedId : toDeleteId
    let cloneDataSource = _.cloneDeep(dataSource)
    const toDeleteIndex = cloneDataSource.findIndex((element) => { return element.id === distToDeleteId })
    cloneDataSource.splice(toDeleteIndex, 1)
    onDeleteTag(cloneDataSource, distToDeleteId, isToDatabase)
    this.setState({
      editedId: null,
      editedName: '',
      menuStatus: 1,
    })
  }
  // 处理完成编辑标签
  handleSubmitEditTag = () => {
    const { editedId, editedName } = this.state
    const { onEditTag, dataSource, tagLength } = this.props
    if (tagLength && editedName.length > tagLength) { // 长度超出限制
      message.error('长度超出限制')
      return
    }
    let cloneDataSource = _.cloneDeep(dataSource)
    const toChangeIndex = cloneDataSource.findIndex((element) => { return element.id === editedId })
    if (toChangeIndex !== -1) { // 编辑的标签处于已选择状态，则能够匹配到，反之标签处于未选择状态
      cloneDataSource[toChangeIndex].name = editedName
    }
    onEditTag(cloneDataSource, editedId, editedName)
    this.setState({
      editedId: null,
      editedName: '',
      menuStatus: 1,
    })
  }
  // 渲染标签选择/编辑/创建面板
  renderSelectTagMenu = () => {
    const { searchValue, menuStatus } = this.state
    const { dataSource, selectData, size } = this.props
    const searchInputStyle = addSmallStyle(styles, 'searchIpt', size)
    const optionLiStyle = addSmallStyle(styles, 'optionLi', size)
    
    return (
      <div>
        <div className={styles.iptWrapper}>
          <Input
            size={size}
            value={searchValue}
            ref={ele => this.searchIpt = ele}
            placeholder="搜索标签"
            className={searchInputStyle}
            onChange={this.handleSearchTagChange}
            onPressEnter={this.handleSearchIptPressEnter}
          />
          <div className={styles.createTagBtnWrapper} onClick={this.handleClickCreateTagBtn}>
            <Tooltip title="新建标签" mouseEnterDelay={0.4}><PlusCircleOutlined className={[styles.operationBtnIcon, styles.createTagBtn]} /></Tooltip>
          </div>
        </div>
        {/* 选项选择面板 */}
        {
          menuStatus === 1 &&
          <ul className={styles.optionMenu} onMouseLeave={() => { this.setState({ optionMouseEnterIndex: null }) }}>
            {
              selectData
                .filter((item) => { return item.name.indexOf(searchValue) !== -1 })
                .map((option, index) => {
                  const { optionMouseEnterIndex } = this.state
                  const { id, name } = option
                  const checked = dataSource.findIndex((element) => { return element.id === id }) === -1 ? false : true
                  return (
                    <li
                      className={optionLiStyle}
                      key={`${index}-${id}`}
                      onMouseEnter={() => { this.setState({ optionMouseEnterIndex: index }) }}
                      onClick={() => { this.handleSelectTag(!checked, option, index) }}
                    >
                      <div className="pr8"><div className={styles.tagCircle}></div></div>
                      <div className={styles.tagName}>{name}</div>
                      {(optionMouseEnterIndex === index) && <EditOutlined
                        onClick={(e) => { this.handleClickEditTag(option, e) }}
                        className={[styles.operationBtnIcon, styles.editIcon]} />  } {/* 编辑按钮 */}
                      {checked && <CheckOutlined className={[styles.operationBtnIcon, styles.checkedIcon]} />} {/* 勾选对勾 */}
                    </li>
                  );
                })
            }
          </ul>
        }
        {/* 标签搜索状态下的快速创建状态 */}
        {
          menuStatus === 4 &&
          <div className="pd12">
            <Button size={size} type="primary" className={styles.submitCreateBtn} onClick={this.handleClickCreateTag}>创建</Button>
          </div>
        }
      </div>
    );
  }
  // 渲染创建标签状态的面板
  renderCreateTagMenu = () => {
    const { newTagName } = this.state
    const { size } = this.props
    const disabled = newTagName === '' ? true : false
    const createTagMenuTitleStyle = addSmallStyle(styles, 'createTagMenuTitle', size)
    return (
      <div>
        <div className={styles.createTagMenuHeader}>
          <LeftOutlined
            className={[styles.operationBtnIcon, styles.editIcon]}
            onClick={this.handleClickBackBtn} /> {/* 返回按钮 */}
          <div className={createTagMenuTitleStyle}>新建标签</div>
          <CloseOutlined
            className={[styles.operationBtnIcon, styles.editIcon]}
            onClick={this.handleCloseMenu} /> {/* 关闭按钮 */}
        </div>
        <div className="pd12">
          <Input
            size={size}
            placeholder="标签名称"
            value={newTagName}
            onChange={(e) => { this.handleFieldChange('newTagName', e.target.value) }}
            onPressEnter={() => { this.handleClickCreateTag() }}
          />
          <Button
            size={size}
            type="primary"
            className={styles.submitCreateBtn}
            disabled={disabled}
            onClick={this.handleClickCreateTag}
          >
            创建
          </Button>
        </div>
      </div>
    );
  }
  // 渲染编辑标签状态
  renderEditTagMenu = () => {
    const { editedName } = this.state
    const { size } = this.props
    const createTagMenuTitleStyle = addSmallStyle(styles, 'createTagMenuTitle', size)
    return (
      <div>
        <div className={styles.createTagMenuHeader}>
          <LeftOutlined
            className={[styles.operationBtnIcon, styles.editIcon]}
            onClick={this.handleClickBackBtn} /> {/* 返回按钮 */}
          <div className={createTagMenuTitleStyle}>编辑标签</div>
          <CloseOutlined
            className={[styles.operationBtnIcon, styles.editIcon]}
            onClick={this.handleCloseMenu} /> {/* 关闭按钮 */}
        </div>
        <div className="pd12">
          <Input
            size={size}
            placeholder="标签名称"
            value={editedName}
            onChange={(e) => { this.handleFieldChange('editedName', e.target.value) }}
            onPressEnter={() => { this.handleSubmitEditTag() }}
          />
          <div className={styles.editMenuBtnWrapper}>
            <Button size={size} type="danger" onClick={ () => { this.setState({ menuStatus: 5 }) } } className={ styles.editMenuDelBtn }>删除</Button>
            <Button size={size} type="primary" onClick={ this.handleSubmitEditTag } className="flex1">完成</Button>
          </div>
        </div>
      </div>
    );
  }
  // 渲染确认删除标签状态
  renderConfirmDeleteTagMenu = () => {
    const { size } = this.props
    return (
      <div>
        <div className={styles.createTagMenuHeader}>
          <LeftOutlined
            className={[styles.operationBtnIcon, styles.editIcon]}
            onClick={() => { this.setState({ menuStatus: 3 }) }} /> {/* 返回按钮 */}
          <div className={styles.createTagMenuTitle}>删除标签</div>
          <CloseOutlined
            className={[styles.operationBtnIcon, styles.editIcon]}
            onClick={this.handleCloseMenu} /> {/* 关闭按钮 */}
        </div>
        <div className="pd12">
          确认删除标签？
          <Button size={size} type="danger" className="mt20" block onClick={ () => { this.handleDeleteTag(null, true) } }>删除</Button>
        </div>
      </div>
    );
  }
  // 渲染操作面板
  renderOperationMenu = () => {
    const { menuStatus } = this.state
    return (
      <div>
        {(menuStatus === 1 || menuStatus === 4) && this.renderSelectTagMenu()} {/* 选择或搜索快速创建标签状态 */}
        {menuStatus === 2 && this.renderCreateTagMenu()} {/* 新建标签状态 */}
        {menuStatus === 3 && this.renderEditTagMenu() } {/* 编辑标签状态 */}
        {menuStatus === 5 && this.renderConfirmDeleteTagMenu()} {/* 确认删除标签状态 */}
      </div>
    )
  }
  render() {
    const { menuVisible } = this.state
    const { dataSource, labelElement } = this.props
    const Label = labelElement ? labelElement : (<div className="form-label">标签：</div>)
    return (
      <div className="dpflex">
        {Label}
        <div className={styles.tagsBar}>
          {
            dataSource.map((tag, index) => {
              const { onHoverTagIndex } = this.state
              const { id, name } = tag
              const closable = onHoverTagIndex === index ? true : false
              return (
                <Tooltip title={name} mouseEnterDelay={0.5} key={id}>
                  <Tag
                    closable={closable}
                    onMouseEnter={() => { this.setState({ onHoverTagIndex: index }) }}
                    onMouseLeave={() => { this.setState({ onHoverTagIndex: null }) }}
                    onClose={(e) => {
                      e.preventDefault()
                      this.handleDeleteTag(id, false)
                    }}
                    color="#13c2c2"
                    className={styles.tag}
                  >
                    {name}
                  </Tag>
                </Tooltip>
              )
            })
          }
          <Dropdown
            overlay={this.renderOperationMenu()}
            overlayClassName={styles.operationMenuWrapper}
            trigger={['click']}
            className={styles.dropdownWrapper}
            visible={menuVisible}
            onVisibleChange={this.handleMenuVisibleChange}
          >
            <Tooltip title="添加标签" mouseEnterDelay={0.4}>
              <PlusCircleOutlined className={[styles.operationBtnIcon, styles.plusBtn]} />
            </Tooltip>
          </Dropdown>
        </div>
      </div>
    );
  }
}

BiciTagsManager.propTypes = {
  dataSource: PropTypes.array.isRequired, // 受控的标签数据数组，[{ id: xxx, name: xxx }, ...]
  selectData: PropTypes.array.isRequired, // 受控的标签下拉数据可选项
  labelElement: PropTypes.element, // 允许传入字段 Label 节点以覆盖默认样式
  onSelectTag: PropTypes.func.isRequired, // 选择下拉选项的回调，function(toSetDataSource, toSetChecked, option)
  onCreateTag: PropTypes.func.isRequired, // 创建标签的回调，function(newTagName)
  onDeleteTag: PropTypes.func.isRequired, // 删除标签的回调 function(toSetDataSource, toDeleteId, isToDatabase)
  onEditTag: PropTypes.func.isRequired, // 编辑标签的回调 function(toSetDataSource, editedId, editedName)
  size: PropTypes.oneOf(['small', 'default']), // 模度大小
  tagLength: PropTypes.number, // 标签的最长的限制
  selectMax: PropTypes.number, // 勾选标签组的个数限制
}

BiciTagsManager.defaultProps = {
  dataSource: [],
  selectData: [],
  size: 'default'
}

export default BiciTagsManager
