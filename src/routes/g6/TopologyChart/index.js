/**
 * @File: 硬件拓扑结构图
 * @TODO: 卡片数量增多时的视图适配
 */
import React, { Component } from 'react'
import { registerG6Topology } from './registerG6Topology'
import styles from './topologyChart.module.css'

export default class TopologyChart extends Component {
  componentDidMount() {
    registerG6Topology()
  }
  render() {
    return (
      <div className={styles.pageWrapper}>
        <p className="mb20 fstage20 fw600">硬件拓扑结构图</p>
        <div id='topologyMiniMap'  className={styles.miniMap}/>
        <div id="topologyContainer" className="flex1"/>
      </div>
    )
  }
}
