/**
 * @File: 左侧菜单数据
 */
import * as routerPaths from './routerPaths'

const sliderMenuData = [{ // 更新日志
  name: routerPaths.changelog.name,
  icon: 'file-text',
  hideClose: true,
  path: routerPaths.changelog.path
}, { // 基础规范
  name: routerPaths.base.name,
  icon: 'global',
  path: routerPaths.base.path,
  children: [{
    name: routerPaths.colors.name,
    icon: 'global',
    path: routerPaths.colors.path
  }, {
    name: routerPaths.layouts.name,
    icon: 'global',
    path: routerPaths.layouts.path
  }, {
    name: routerPaths.fonts.name,
    icon: 'global',
    path: routerPaths.fonts.path
  }]
}, { // 菜单
  name: routerPaths.menu.name,
  icon: 'menu-unfold',
  path: routerPaths.menu.path,
  children: [{
    name: routerPaths.sliderMenu.name,
    icon: 'menu-unfold',
    path: routerPaths.sliderMenu.path
  }, {
    name: routerPaths.globalHeader.name,
    icon: 'menu-unfold',
    path: routerPaths.globalHeader.path
  }, {
    name: routerPaths.tabsBar.name,
    icon: 'bars',
    path: routerPaths.tabsBar.path
  }, {
    name: routerPaths.breadcrumb.name,
    icon: 'bars',
    path: routerPaths.breadcrumb.path
  }]
}, { // 表格
  name: routerPaths.table.name,
  icon: 'table',
  path: routerPaths.table.path,
  children: [{
    name: routerPaths.complexTable.name,
    icon: 'table',
    path: routerPaths.complexTable.path
  }]
}, { // 界面可视化配置
  name: routerPaths.configurableForm.name,
  icon: 'tool',
  path: routerPaths.configurableForm.path,
}, { // 抽屉
  name: routerPaths.drawer.name,
  icon: 'hdd',
  path: routerPaths.drawer.path
}, { // 文件上传
  name: routerPaths.upload.name,
  icon: 'to-top',
  path: routerPaths.upload.path
}, { // websocket
  name: routerPaths.websocket.name,
  icon: 'deployment-unit',
  path: routerPaths.websocket.path
}, { // messagePanel
  name: routerPaths.messagePanel.name,
  icon: 'bell',
  path: routerPaths.messagePanel.path
}, { // G2可视化图形语法
  name: routerPaths.g2.name,
  icon: 'area-chart',
  path: routerPaths.g2.path,
  children: [{
    name: routerPaths.coverage.name,
    icon: 'area-chart',
    path: routerPaths.coverage.path
  }, {
    name: routerPaths.coverage2.name,
    icon: 'area-chart',
    path: routerPaths.coverage2.path
  }, {
    name: routerPaths.trend.name,
    icon: 'line-chart',
    path: routerPaths.trend.path
  }, {
    name: routerPaths.realTime.name,
    icon: 'line-chart',
    path: routerPaths.realTime.path
  }]
}, { // G6图可视化引擎
  name: routerPaths.g6.name,
  icon: 'area-chart',
  path: routerPaths.g6.path,
  children: [{
    name: routerPaths.topology.name,
    icon: 'area-chart',
    path: routerPaths.topology.path
  }]
}, { // 表单
  name: routerPaths.form.name,
  icon: 'profile',
  path: routerPaths.form.path,
  children: [{
    name: routerPaths.global.name,
    icon: 'profile',
    path: routerPaths.global.path
  }, {
    name: routerPaths.widget.name,
    icon: 'profile',
    path: routerPaths.widget.path
  }]
}, { // 置空态
  name: routerPaths.empty.name,
  icon: 'block',
  path: routerPaths.empty.path,
}, { // 标签管理
  name: routerPaths.tagsManager.name,
  icon: 'tags',
  path: routerPaths.tagsManager.path
}, { // 消息提示
  name: routerPaths.biciNotification.name,
  icon: 'exclamation-circle-o',
  path: routerPaths.biciNotification.path
}, { // 操作记录
  name: routerPaths.operatingRecord.name,
  icon: 'copy',
  path: routerPaths.operatingRecord.path
}]

export default sliderMenuData
