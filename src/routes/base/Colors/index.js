/**
 * @File: 基础规范 - 色彩
 * @TODO: 表格的最小宽度适配
 */
import React, { Component } from 'react'
import BrandColour from './BrandColour'
import FeatureColour from './FeatureColour'
import NeutralColour from './NeutralColour'

export default class Colors extends Component {
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">色彩</p>

        {/* 品牌色 */}
        <BrandColour />

        {/* 功能色 */}
        <FeatureColour />
        
        {/* 中性色 */}
        <NeutralColour />
      </div>
    )
  }
}
