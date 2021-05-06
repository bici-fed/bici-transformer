/**
 * @File: 消息通知
 */

import { notification } from 'antd'

let keyArr = [] // 存放通知框的key
const delayArr = [8, 5, 2] // 延时数组

const handleNotificationOpen = (type, config) => {
  const getNewConfig = () => { // 根据是否传入description饭后新的配置项
    if (config.description) {
      return config
    } else if (!config.description &&  type ==="success" || type ==="error" || type ==="warn" || type ==="info" || type ==="warning" ) {
      config.description = " "
      return config
    } else {
      config.description = ""
      return config
    }
  }
  const newConfig = getNewConfig()
  const keyItem = {
    key: `${Date.now()}`,
    notyType: type, // 自定义字段，消息类型
    ...newConfig,
  }
  keyArr.push(keyItem)

  // 当超过 3 个消息时，顶掉最早的消息
  if (keyArr.length > 3) {
    notification.close(keyArr[0].key)
    keyArr.shift()
  }

  keyArr.forEach((item, index) => {
    const { key, disableAutoClosed } = item

    // 设置延时关闭时间
    let toSetDuration = null // AntD: 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭
    if (!disableAutoClosed) {
      if (index === keyArr.length-1) {
        toSetDuration = delayArr[0]
      } else if (index === keyArr.length-2) {
        toSetDuration = delayArr[1]
      } else if (index === 0) {
        toSetDuration = delayArr[2]
      }
    }
    
    const distConfig = {
      placement: 'bottomLeft',
      duration: toSetDuration,
      onClose: () => {
        const toDeleteIndex = keyArr.findIndex((obj) => { return obj.key === key })
        keyArr.splice(toDeleteIndex, 1)
      },
      ...item
    }

    switch (item.notyType) { // 根据类型打开不同样式的消息通知
      case 'open': 
        notification.open(distConfig)
        break
      case 'info':
        notification.info(distConfig)
        break
      case 'success':
        notification.success(distConfig)
        break
      case 'error':
        notification.error(distConfig)
        break
      case 'warn':        
        notification.warn(distConfig)
        break
      case 'warning':
        notification.warning(distConfig)
        break
      case 'close':
        notification.close(config)
        break
    }
  })
}

const biciNotification = {
  open: handleNotificationOpen.bind(this, 'open'),
  info: handleNotificationOpen.bind(this, 'info'),
  success: handleNotificationOpen.bind(this, 'success'),
  error: handleNotificationOpen.bind(this, 'error'),
  warn: handleNotificationOpen.bind(this, 'warn'),
  warning: handleNotificationOpen.bind(this, 'warning'),
  close: handleNotificationOpen.bind(this, 'close')
}

export default biciNotification
