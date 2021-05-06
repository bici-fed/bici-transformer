/**
 * @File: 面包屑导航条
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { findAllIndex } from './biciBreadcrumbBarUtils'

class BiciBreadcrumbBar extends Component {
  render() {
    const { pathname, data, onNavigate } = this.props
    let breadcrumbMap = { ...data }
    // 处理没有匹配项
    if (!breadcrumbMap[pathname]) {
      // 处理思路：如果有冒号开头的就新增一条数据在对象里面
      for (const url in breadcrumbMap) {
        const urlSnippets = url.split('/').filter((i) => i)
        const pathnameSnippets = pathname.split('/').filter((i) => i)
        if (urlSnippets.length !== pathnameSnippets.length) {
          continue
        }
        // 冒号开头的代表路由这个位置是个参数
        const regexp = /:[a-zA-Z]+/g
        const targets = url.match(regexp)
        const targetIndexes = findAllIndex(urlSnippets, targets)
        if (targetIndexes.length === 0) {
          continue
        }
        targetIndexes.forEach((index) => {
          urlSnippets[index] = pathnameSnippets[index]
        })
        if (urlSnippets.join() !== pathnameSnippets.join()) {
          continue
        }
        breadcrumbMap[pathname] = breadcrumbMap[url]
      }
    }
    // 渲染面包屑，如果有匹配项就渲染否则就为空
    const pathnameSnippets = pathname.split('/').filter((i) => i)
    const breadcrumbItems = pathnameSnippets.map((_, index) => {
      const pathname = `/${pathnameSnippets.slice(0, index + 1).join('/')}`
      return (
        <Breadcrumb.Item key={pathname}>
          {breadcrumbMap[pathname] ? (
            pathnameSnippets.length !== index + 1 && breadcrumbMap[pathname].isRoute ? (
              <Link onClick={() => onNavigate(pathname)} to={pathname}>{breadcrumbMap[pathname].name}</Link>
            ) : (
              breadcrumbMap[pathname].name
            )
          ) : (
            ''
          )}
        </Breadcrumb.Item>
      )
    })
    return <Breadcrumb>{breadcrumbItems}</Breadcrumb>
  }
}

BiciBreadcrumbBar.propTypes = {
  pathname: PropTypes.string.isRequired, // 当前路由地址
  data: PropTypes.object.isRequired, // 面包屑数据
  onNavigate: PropTypes.func.isRequired // 导航处理函数回调function(path)
}

export default BiciBreadcrumbBar
