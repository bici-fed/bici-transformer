import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { message } from 'antd';
import _ from 'lodash'
import { BiciMessagePanel } from '@/bici-transformers/dist/bici-transformers'
import { BiciBreadcrumbBar } from 'bici-transformers'
import { saveSliderMenuCollapsed } from '../../actions/globalMenu'
import { addTab } from '../../actions/tabsBar'
import globalHeaderData from '@/data/globalHeader'
import styles from './globalHeader.module.css'
import * as mockData from '@/routes/BiciMessagePanelUsage/mockScrollData'
class GlobalHeader extends Component {
  state = {
    hasMore: true,
    attentionList: [],
    messageList: [],
  }
  componentDidMount() {
    this.setState({
      attentionList: mockData.mockAttentionList,
      messageList: mockData.mockMessageList
    })
  }
  handleSliderMenuTriggerToggle = () => {
    const { globalMenu, dispatch } = this.props
    dispatch(saveSliderMenuCollapsed(!globalMenu.isSliderMenuCollapsed))
  }
  // 点击面包屑跳转tab
  handleNav = (path) => {
    const { dispatch, history } = this.props
    dispatch(addTab(path))
    history.push(path)
  }
  handleAttention = (moduleId) => { console.log(moduleId) }
  handleCollapseChange = (appendixId) => { console.log(appendixId) }
  handleInfiniteOnLoad = (id, index) => {
    console.log(id, index)
    const { messageList } = this.state
    let cloneData = _.cloneDeep(messageList)
    cloneData[0].messageList = cloneData[0].messageList.concat(mockData.mockScrollData)
    cloneData[0].hasMore = false
    this.setState({
      messageList: cloneData,
    })
    message.warning('Infinite List loaded all')
  }

  render() {
    const { attentionList, messageList } = this.state
    const { globalMenu, location: { pathname } } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.breadcrumbWrapper}>
          <LegacyIcon
            type={globalMenu.isSliderMenuCollapsed ? 'menu-unfold' : 'menu-fold'}
            className={styles.trigger}
            onClick={this.handleSliderMenuTriggerToggle}
          />
          <BiciBreadcrumbBar
            className="dpinlineblock"
            data={globalHeaderData}
            pathname={pathname}
            onNavigate={this.handleNav}
          />
        </div>
        <BiciMessagePanel
          messageCount={100}
          attentionList={attentionList}
          messageList={messageList}
          onAttention={(id) => { this.handleAttention(id) }}
          onCollapseChange={id => { this.handleCollapseChange(id) }}
          onInfiniteLoad={(id, index) => { this.handleInfiniteOnLoad(id, index) }}
        />

      </div>
    );
  }
}

export default withRouter(
  connect((state) => {
    return { globalMenu: state.globalMenu }
  })(GlobalHeader)
)
