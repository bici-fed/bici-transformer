/**
 * @File: 涉及 BOM 的公有工具封装函数
 */

// 设置元素进入浏览器全屏状态，处理浏览器兼容性
export const toFullVideo = (videoDom) => {
  if (videoDom.requestFullscreen) {
    return videoDom.requestFullScreen()
  } else if (videoDom.webkitRequestFullScreen) {
    return videoDom.webkitRequestFullScreen()
  } else if (videoDom.mozRequestFullScreen) {
    return videoDom.mozRequestFullScreen()
  } else {
    return videoDom.msRequestFullscreen()
  }
}
