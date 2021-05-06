/**
 * @File: 表单全局规范
 */

import React, { Component } from 'react'
import { Tabs } from 'antd'
import TabPaneExample from './TabPaneExample'
import TabPaneStandard from './TabPaneStandard'

const TabPane = Tabs.TabPane

export default class BiciFormGlobalUsage extends Component {
  state = {
    activeKey: "1",
  }
  handleEvent = (e) => {
    this.setState({
      activeKey: e,
    })
  }
  render() {
    const { activeKey } = this.state 
    return (
      <div className="card-container">
        <Tabs activeKey={activeKey} onTabClick={this.handleEvent} animated={false}>
          <TabPane tab="表单规范" key="1"><TabPaneStandard/></TabPane>
          <TabPane tab="示例" key="2"><TabPaneExample/></TabPane>
        </Tabs>
      </div>
    )
  }
}
