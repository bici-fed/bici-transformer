/**
 * @File: 界面可视化配置
 * @Docs: 获取 DragDropContext 高阶组件实例 http://react-dnd.github.io/react-dnd/docs/api/drag-drop-context
 */
import React, { Component } from 'react'
import { Tabs } from 'antd'
import UsageDemo from './UsageDemo'
import UsageDoc from './UsageDoc'

const TabPane = Tabs.TabPane
const TAB_KEYS = ['DEMO', 'DOC']

class ConfigurableFormUsage extends Component {
  state = {
    activeTabKey: TAB_KEYS[0]
  }
  handleTabChange = (val) => { this.setState({ activeTabKey: val }) }
  render() {
    const { activeTabKey } = this.state
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">界面可视化配置</p>
        <div className="card-container">
          <Tabs activeKey={activeTabKey} onTabClick={this.handleTabChange} animated={false}>
            <TabPane tab="示例" key={TAB_KEYS[0]}>
              <UsageDemo />
            </TabPane>
            <TabPane tab="文档" key={TAB_KEYS[1]}>
              <UsageDoc />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default ConfigurableFormUsage
