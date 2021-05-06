/**
 * @File: 操作记录组件
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

class BiciOperatingRecord extends Component {
  render() {
    const { data, wrapperStyle, size } = this.props
    const cardStyle = size === 'small' ? styles.cardItemSM : styles.cardItem
    return (
      <div style={wrapperStyle}>
        {
          data.map((record, index) => {
            const { content, gmtCreate, item, user } = record
            return (
              <Card
                size={size}
                type="inner"
                title={`${gmtCreate}，${user}，${item}`}
                key={`${gmtCreate} ${index}`} //这里不能使用 gmtCreate 作为 key，gmtCreate 是允许重复的
                style={cardStyle}
              >
                {content}
              </Card>
            )
          })
        }
      </div>
    )
  }
}

BiciOperatingRecord.propTypes = {
  data: PropTypes.array.isRequired, // 操作记录数据数组
  wrapperStyle: PropTypes.object, // 外层容器自定制覆盖样式
  size: PropTypes.oneOf(['small', 'default']), // 模度大小
}

BiciOperatingRecord.defaultProps = {
  wrapperStyle: {},
  size: 'default'
}

const styles = {
  cardItem: { marginBottom: 12 },
  cardItemSM: { marginBottom: 4 }
}

export default BiciOperatingRecord
