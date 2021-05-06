/**
 * @File: 侧边导航
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout, Menu } from 'antd';
import sliderMenuData from '../../data/sliderMenu'
import * as dimensions from '../../data/dimensions'
import styles from './sliderMenu.module.css'
import { addTab } from '../../actions/tabsBar'

const LayoutSider = Layout.Sider
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class SliderMenu extends Component {
  handleLogoClick = () => {
    const { history } = this.props
    history.push('/')
  }
  // 跳转tab
  handleNav = (curPath) => {
    const { dispatch } = this.props
    dispatch(addTab(curPath))
  }
  renderMenu = () => {
    const { currentKey } = this.props
    return (
      <Menu theme="dark" mode="inline" onClick={this.handleMenuClick} selectedKeys={[currentKey]}>
        {sliderMenuData.map((subMenu) => {
          const title = (
            <span>
              <LegacyIcon type={subMenu.icon} />
              <span>{subMenu.name}</span>
            </span>
          )

          if (subMenu.children) {
            // 含有二级菜单
            return (
              <SubMenu key={subMenu.path} title={title}>
                {subMenu.children.map((item) => {
                  return (
                    <MenuItem key={item.path}>
                      <Link onClick={() => this.handleNav(item.path)} to={item.path}>
                        <span>
                          <LegacyIcon type={item.icon} />
                          <span>{item.name}</span>
                        </span>
                      </Link>
                    </MenuItem>
                  );
                })}
              </SubMenu>
            );
          }

          // 仅一级菜单
          return (
            <MenuItem key={subMenu.path}>
              <Link onClick={() => this.handleNav(subMenu.path)} to={subMenu.path}>
                <span>
                  <LegacyIcon type={subMenu.icon} />
                  <span>{subMenu.name}</span>
                </span>
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    );
  }
  render() {
    const { globalMenu } = this.props
    return (
      <LayoutSider
        className={styles.root}
        width={dimensions.SLIDER_MENU_WIDTH}
        collapsible
        collapsed={globalMenu.isSliderMenuCollapsed}
        collapsedWidth={dimensions.SLIDER_MENU_COLLAPSED_WIDTH}
        trigger={null}
      >
        <div onClick={this.handleLogoClick} className={styles.logo}>
          BICI
        </div>
        {this.renderMenu()}
      </LayoutSider>
    )
  }
}

export default withRouter(
  connect((state) => {
    const { visitedTabs, tabIndex } = state.tabsBar
    const currentTab = { ...visitedTabs[tabIndex] }
    const currentKey = currentTab.path || ''
    return { globalMenu: state.globalMenu, currentKey }
  })(SliderMenu)
)
