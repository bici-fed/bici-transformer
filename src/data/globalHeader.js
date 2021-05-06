/**
 * @File: 顶部导航数据
 */
import * as routerPaths from './routerPaths'

const breadcrumbData = {
  [routerPaths.changelog.path]: { name: routerPaths.changelog.name, isRoute: true, hideClose: true },
  [routerPaths.base.path]: { name: routerPaths.base.name },
  [routerPaths.colors.path]: { name: routerPaths.colors.name, isRoute: true },
  [routerPaths.layouts.path]: { name: routerPaths.layouts.name, isRoute: true },
  [routerPaths.fonts.path]: { name: routerPaths.fonts.name, isRoute: true },
  [routerPaths.menu.path]: { name: routerPaths.menu.name },
  [routerPaths.sliderMenu.path]: { name: routerPaths.sliderMenu.name, isRoute: true },
  [routerPaths.globalHeader.path]: { name: routerPaths.globalHeader.name, isRoute: true },
  [routerPaths.tabsBar.path]: { name: routerPaths.tabsBar.name, isRoute: true },
  [routerPaths.breadcrumb.path]: { name: routerPaths.breadcrumb.name, isRoute: true },
  [routerPaths.table.path]: { name: routerPaths.table.name },
  [routerPaths.configurableForm.path]: { name: routerPaths.configurableForm.name, isRoute: true },
  [routerPaths.complexTable.path]: { name: routerPaths.complexTable.name, isRoute: true },
  [routerPaths.drawer.path]: { name: routerPaths.drawer.name, isRoute: true },
  [routerPaths.upload.path]: { name: routerPaths.upload.name, isRoute: true },
  [routerPaths.websocket.path]: { name: routerPaths.websocket.name, isRoute: true },
  [routerPaths.messagePanel.path]: { name: routerPaths.messagePanel.name, isRoute: true },
  [routerPaths.g2.path]: { name: routerPaths.g2.name },
  [routerPaths.coverage.path]: { name: routerPaths.coverage.name, isRoute: true },
  [routerPaths.coverage2.path]: { name: routerPaths.coverage2.name, isRoute: true },
  [routerPaths.trend.path]: { name: routerPaths.trend.name, isRoute: true },
  [routerPaths.realTime.path]: { name: routerPaths.realTime.name, isRoute: true },
  [routerPaths.g6.path]: { name: routerPaths.g6.name },
  [routerPaths.topology.path]: { name: routerPaths.topology.name, isRoute: true },
  [routerPaths.form.path]: { name: routerPaths.form.name },
  [routerPaths.empty.path]: { name: routerPaths.empty.name, isRoute: true },
  [routerPaths.global.path]: { name: routerPaths.global.name, isRoute: true },
  [routerPaths.widget.path]: { name: routerPaths.widget.name, isRoute: true },
  [routerPaths.tagsManager.path]: { name: routerPaths.tagsManager.name, isRoute: true },
  [routerPaths.biciNotification.path]: { name: routerPaths.biciNotification.name, isRoute: true },
  [routerPaths.operatingRecord.path]: { name: routerPaths.operatingRecord.name, isRoute: true }
}

export default breadcrumbData
