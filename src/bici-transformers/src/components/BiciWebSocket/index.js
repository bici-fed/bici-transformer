/**
 * @File: BiciWebSocket 构造函数
 * @TODO： ReconnectInterval 定时器问题
 * @Options: 
 *   baseUrl: String, Required, 连接的 WebSocket baseURL
 *   params: Object, Optional, URL 后跟的参数；实现对象转字符串拼接
 *   heartCheckInterval: Number, Optional, 心跳检测时间间隔，单位为毫秒
 *   maxReconnectCount: Number, Optional, 尝试的最大重连次数，超过后放弃重连
 *   reconnectInterval: Number, Optional, 重连时间间隔
 *   messageFormatType: String, Option, 数据处理格式（默认为 "json"）
 *   onOpen: Function, Optional, 应用层连接成功后的回调
 *   onError: Function, Optional, 应用层连接失败后的回调
 *   onMessage: Function, Optional, 应用层从服务器接收到信息时的回调
 *   debug: Boolean, Optional, debug 模式下会打印错误信息（默认为 false）
 **/
import _ from 'lodash'

// 根据传入的配置，整合得到 wsUrl
function getWsUrl() {
  const { baseUrl, params, debug } = this.options
  let distUrl = baseUrl ? baseUrl : ''
  if (baseUrl) {
    // 判断是否需要 baseUrl 后补拼 "?" -> 传了 params 但 baseUrl 没以 “?” 结尾
    if (!_.isEmpty(params) && !(baseUrl.indexOf('?') === (baseUrl.length - 1))) {
      distUrl += '?'
    }
    // 存在参数且不为空对象，进行参数拼接
    if (!_.isEmpty(params)) {
      // add polyfill for Object.entries, 
      // for andriod 5.0 webview & old browsers
      // TODO: use other method to replace the Object.entries
      if (!Object.entries) {
        Object.entries = function( obj ){
          var ownProps = Object.keys( obj ),
              i = ownProps.length,
              resArray = new Array(i); // preallocate the Array
          while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
          return resArray;
        };
      } else {
        let parmasList = Object.entries(params)
        // 构建 url 的参数部分
        let distParams = ''
        parmasList.forEach((param, index) => {
          distParams += `${param[0]}=${param[1]}`
          if (index !== (parmasList.length - 1)) { distParams += '&' } // 非末位参数情况下拼 &&
        })
        distUrl += distParams
      }
    }
  } else {
    debug && console.error("错误: 请传入 baseUrl!")
  }
  return distUrl
}

// 心跳检测
// 心跳重连时候分2种情况：
//   A.正常情况下：websocket.send('HeartBeat') 后，reset()，会先 stop() 后 start()，注意！：stop 只是清了计时器，
//   而 start 没有重新创建新的 WS 实例！，也就是说，正常情况下不会触发 onClose ；
//   B.异常情况下，当 websocket.send('HeartBeat') 触发 onError，会进行尝试重连，这个时候如果“尝试连接”失败，
//   会触发 onClose，此时的 readyState 是 CLOSED；
function heartCheck(type) {
  const that = this
  const { heartCheckInterval, debug } = this.options
  switch (type) {
    case 'start':
      this.heartCheckTimeoutTimer = setTimeout(() => {
        that.ws.send('HeartBeat')
        debug && console.log('WebSocket: Send HeartBeat!')
        heartCheck.call(this, 'reset')
      }, heartCheckInterval)
      break
    case 'stop':
      window.clearTimeout(this.heartCheckTimeoutTimer)
      break
    case 'reset':
      heartCheck.call(this, 'stop')
      heartCheck.call(this, 'start')
      break
    default:
      break
  }
}

function handleReconnect() { // 重连
  // 判断是手动关闭还是没有连接成功，以及达到尝试重连上限
  const { maxReconnectCount, debug } = this.options
  if (this.reconnectCount >= maxReconnectCount) { return false } // 达到最大尝试重连次数后直接返回 false
  if (!this.isActiveClose) { // 如果是自动重连情况；（重连后计数器会 +1）
    this.reconnectCount++
    debug && console.log('WebSocket: Attempt rconnect...')
    return this.init()
  } else { // 如果是手动关闭的情况，不进行重连。重置各标志用属性
    this.isActiveClose = false
    this.reconnectCount = 0
    return true
  }
}

// 获取进行格式化后的 message Data
function getFomattedMessageData(data) {
  let distData
  const { messageFormatType, debug } = this.options
  switch (messageFormatType) {
    case 'json':
      if (debug) {
        try {
          distData = JSON.parse(data)
        } catch(e) {
          console.error('WebSocket: MessageData JSON 解析错误！')
          console.log(e)
        }
      } else {
        distData = JSON.parse(data)
      }
      break
    default: // messageFormatType 为 "" 或其他情况
      distData = data
  }
  return distData
}

class BiciWebSocket {
  constructor(props) {
    this.options = {
      baseUrl: '', // 连接 WebSocket URL
      params: null, // URL 后跟的参数，由对象转字符串拼接
      heartCheckInterval: 60000, // 心跳检测时间间隔
      maxReconnectCount: 5, // 最大重连次数
      reconnectInterval: 1000,    //重连时间间隔
      messageFormatType: '',
      debug: false,
      onOpen: null, //连接成功后的回调
      onError: null, //连接失败后的回调
      onMessage: null, //接收到信息时的回调
      ...props
    }
    this.heartCheckTimeoutTimer = null // 心跳检测延时 Timer
    this.isActiveClose = false // 判断是否为手动关闭
    this.reconnectCount = 0 // 重连次数
    this.reconnectTimeoutTimer = null // 尝试重连的延时计时器
  }
  // 对外实例方法 - 初始化创建 WebSocket 实例，并进行各事件监听，返回当前 BiciWebSocket 实例对象
  init = () => {
    const { onOpen, onError, onMessage, reconnectInterval, debug } = this.options
    //检测浏览器是否支持，不支持则返回 false
    window.WebSocket = window.WebSocket || window.MozWebSocket
    if (!window.WebSocket) { // 检测浏览器支持
      debug && console.error('错误: 浏览器不支持 websocket!')
      return false
    }
    const wsUrl = getWsUrl.call(this) // 拼接传参对象，得到最终的 wsUrl
    if (wsUrl !== '') {
      this.ws = new WebSocket(wsUrl)
      // 指定连接成功后的回调函数。当 WebSocket 的连接状态 readyState 变为“OPEN”时调用；这意味着当前连接已经准备好发送和接受数据
      this.ws.onopen = (ev) => {
        heartCheck.call(this, 'start')  //开始心跳检测
        onOpen && onOpen(ev)
      }
      // 指定连接失败后的回调函数
      this.ws.onerror = (ev) => {
        onError && onError(ev)
        if (this.reconnectTimeoutTimer === null) { // 当前没有正在进行的尝试重连延时器
          handleReconnect.call(this)
          window.setTimeout(() => {
            window.clearTimeout(this.reconnectTimeoutTimer)
          }, reconnectInterval)
        }
      }
      // 指定连接关闭后的回调函数。在 WebSocket 连接的 readyState 变为 CLOSED时被调用
      this.ws.onclose = () => { // 心跳重连时会主动触发 onclose
        heartCheck.call(this, 'stop')
        // 当 ws 连接已关闭/正在关闭或者没有链接成功
        if (this.reconnectTimeoutTimer === null) { // 当前没有正在进行的尝试重连延时器
          handleReconnect.call(this)
          window.setTimeout(() => {
            window.clearTimeout(this.reconnectTimeoutTimer)
          }, reconnectInterval)
        }
      }
      // 指定当从服务器接受到信息时的回调函数
      this.ws.onmessage = (message) => {
        heartCheck.call(this, 'reset')
        //处理数据格式
        debug && console.log("接受到服务器的信息", message.data)
        const formattedMessageData = getFomattedMessageData.call(this, message.data)
        onMessage && onMessage(formattedMessageData)
      }
    }
    return this
  }
  //对外实例方法
  close = (code, reason) => { // 手动关闭连接
    if (!this.ws) { return false }
    const distCode = code ? code : 1000 // 默认 Code 码为 100
    this.isActiveClose = true
    this.reconnectCount = 0
    this.ws.close(distCode, reason)
  }

  // 更新参数重新创建 WebSocket 链接
  replace = (params) => {
    this.options.params = params
    this.reconnectCount = 0
    return this.init()
  }
}

export default BiciWebSocket
