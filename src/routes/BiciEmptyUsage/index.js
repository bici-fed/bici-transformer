/**
 * @File: BiciEmpty 规范说明 
 */

import React, { Component } from 'react'
import imgEmpty from '@/assets/img/empty.png'
import styles from './biciEmptyUsage.module.css'

export default class BiciEmptyUsage extends Component {
  render() {
    return (
      <div className={styles.root}>
        <p className="mb20 fstage20 fw600">置空态组件（BiciEmpty）</p>

        <div className={styles.emptyWrapper}>
          {/* BiciEmpty 调用 */}
          <div className={styles.empty}>
            <img className={styles.imgEmpty} src={imgEmpty} />
          </div>
        </div>
      </div>
    )
  }
}
