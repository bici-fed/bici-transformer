/**
 * @File: 顶层路由组件
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import SliderMenu from '../../components/SliderMenu'
import GlobalHeader from '../../components/GlobalHeader'
import TabsBar from '../TabsBar'
import * as dimensions from '../../data/dimensions'
import styles from './index.module.css'
import * as routerPaths from '@/data/routerPaths'
import ChangeLog from '../ChangeLog'
import Colors from '../base/Colors'
import Layouts from '../base/Layouts'
import Fonts from '../base/Fonts'
import SliderMenuUsage from '../menu/SliderMenuUsage'
import GlobalHeaderUsage from '../menu/GlobalHeaderUsage'
import BiciBreadcrumbBarUsage from '../menu/BiciBreadcrumbBarUsage'
import ComplexTableUsage from '../table/ComplexTableUsage'
import ConfigurableFormUsage from '../ConfigurableFormUsage'
import BiciUploadUsage from '../BiciUploadUsage'
import BiciWebSocketUsage from '../BiciWebSocketUsage'
import BiciMessagePanelUsage from '../BiciMessagePanelUsage'
import BiciEmptyUsage from '../BiciEmptyUsage'

// G2
import CoverageChart from '../g2/CoverageChart'
import CoverageChart2 from '../g2/CoverageChart2'
import TrendChart from '../g2/TrendChart'
import RealTimeChart from '../g2/RealTimeChart'

// G6
import TopologyChart from '../g6/TopologyChart'

// 表单
import BiciFormGlobalUsage from '../form/BiciFormGlobalUsage'
import BiciFormWidgetUsage from '../form/BiciFormWidgetUsage'

import BiciTagsManagerUsage from '@/routes/BiciTagsManagerUsage'
import BiciNotificationUsage from '../BiciNotificationUsage'
import BiciOperatingRecordUsage from '../BiciOperatingRecordUsage'
import BiciTabsBarUsage from '@/routes/menu/BiciTabsBarUsage'

// 抽屉
import BiciDrawerUsage from '../BiciDrawerUsage'

const LayoutContent = Layout.Content
const LayoutHeader = Layout.Header

class RouterLayout extends Component {
  render() {
    const { isSliderMenuCollapsed } = this.props
    const mainOffsetLeft = isSliderMenuCollapsed ? dimensions.SLIDER_MENU_COLLAPSED_WIDTH : dimensions.SLIDER_MENU_WIDTH

    return (
      <Router>
        <Layout className={styles.root}>
          <SliderMenu />
          <Layout style={{ marginLeft: mainOffsetLeft }} className={styles.main}>
            <LayoutHeader className={styles.header}>
              <GlobalHeader />
              <TabsBar />
            </LayoutHeader>
            <LayoutContent className={styles.content}>
              <Switch>
                {/* 更新日志 */}
                <Route exact path={routerPaths.changelog.path} component={ChangeLog} />

                {/* 基础规范 */}
                <Route exact path={routerPaths.colors.path} component={Colors} />
                <Route exact path={routerPaths.layouts.path} component={Layouts} />
                <Route exact path={routerPaths.fonts.path} component={Fonts} />

                {/* 菜单 */}
                <Route exact path={routerPaths.sliderMenu.path} component={SliderMenuUsage} />
                <Route exact path={routerPaths.globalHeader.path} component={GlobalHeaderUsage} />
                <Route exact path={routerPaths.tabsBar.path} component={BiciTabsBarUsage} />
                <Route exact path={routerPaths.breadcrumb.path} component={BiciBreadcrumbBarUsage} />

                {/* 表格 */}
                <Route exact path={routerPaths.complexTable.path} component={ComplexTableUsage} />

                {/* 界面可视化配置 */}
                <Route exact path={routerPaths.configurableForm.path} component={ConfigurableFormUsage} />

                {/* 抽屉组件 */}
                <Route exact path={routerPaths.drawer.path} component={BiciDrawerUsage} />

                {/* 文件上传 */}
                <Route exact path={routerPaths.upload.path} component={BiciUploadUsage} />
                
                {/* webSocket */}
                <Route exact path={routerPaths.websocket.path} component={BiciWebSocketUsage} />

                {/* webSocket */}
                <Route exact path={routerPaths.messagePanel.path} component={BiciMessagePanelUsage} />

                {/* 消息提示 */}
                <Route exact path={routerPaths.biciNotification.path} component={BiciNotificationUsage} />

                {/* G2 可视化 */}
                <Route exact path={routerPaths.coverage.path} component={CoverageChart} />
                <Route exact path={routerPaths.coverage2.path} component={CoverageChart2} />
                <Route exact path={routerPaths.trend.path} component={TrendChart} />
                <Route exact path={routerPaths.realTime.path} component={RealTimeChart} />

                {/* G6 可视化 */}
                <Route exact path={routerPaths.topology.path} component={TopologyChart} />

                {/* 表单 */}
                <Route exact path={routerPaths.global.path} component={BiciFormGlobalUsage} />
                <Route exact path={routerPaths.widget.path} component={BiciFormWidgetUsage} />

                {/* 置空态 */}
                <Route exact path={routerPaths.empty.path} component={BiciEmptyUsage} />

                {/* 标签管理 */}
                <Route exact path={routerPaths.tagsManager.path} component={BiciTagsManagerUsage} />

                {/* 操作记录 */}
                <Route exact path={routerPaths.operatingRecord.path} component={BiciOperatingRecordUsage} />

                <Redirect from="/" to={routerPaths.changelog.path} />
              </Switch>
            </LayoutContent>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

export default connect((state) => {
  return {
    isSliderMenuCollapsed: state.globalMenu.isSliderMenuCollapsed
  }
})(RouterLayout)
