/* eslint-disable new-cap */
/**
 * @File: 注册硬件拓扑结构图项
 * @Docs:
 *   1.ES6 对象的扩展-方法的 name 属性：http://es6.ruanyifeng.com/#docs/object#%E6%96%B9%E6%B3%95%E7%9A%84-name-%E5%B1%9E%E6%80%A7
 *   2.Edge getPoints API：https://www.yuque.com/antv/g6/api-edge#_getPoints
 *   3.g 的图形图组 API：https://github.com/antvis/g#group
 *   4.G6.Util.createDOM 源码位置：https://github.com/antvis/g6/blob/b900df8720123468ef3eda11968a62eed629a309/src/util/dom.js#L33
 *   5.g 的图形基类 Shape API：https://github.com/antvis/g#shape
 *   6.G6 自定义节点-锚点 API：https://www.yuque.com/antv/g6/custom-node#z2y7og
 *   7.G6 Tree API：https://www.yuque.com/antv/g6/api-tree
 *   8.G6 Layouts 紧凑树 CompactBoxTree：https://www.yuque.com/antv/g6/api-layouts-compact-box-tree
 *   9.G6 节点映射：https://www.yuque.com/antv/g6/api-graph#1yemgg
 *   10.G6 边映射：https://www.yuque.com/antv/g6/api-graph#pxmhlx
 */
import G6 from '@antv/g6'
import topologyData from './mockData'
import '@antv/g6/build/plugin.behaviour.analysis'
import '@antv/g6/build/plugin.tool.minimap'
import '@antv/g6/build/plugin.tool.tooltip'

// 注册自定义边
function registerTopologyEdge() {
  G6.registerEdge('pology-VHV', {
    getPath(item) { // 获取路径
      const points = item.getPoints() // 获取用于绘制边的点集合
      const start = points[0]
      const end = points[points.length - 1]
      const vgap = end.y - start.y // 垂直间距
      const ygap = vgap / 4 * 3
      return [
        ['M', start.x, start.y], // 起始点
        ['L', start.x, start.y + ygap], // 中转连接点 1
        ['L', end.x, start.y + ygap], // 中转连接点 2
        ['L', end.x, end.y] // 结束点
      ]
    }
  })
}

function registerTopologyCard() {
  G6.registerNode('pology-card', {
    // TODO: 改为本地图片文件
    collapseButtonUrl: 'https://gw.alipayobjects.com/zos/rmsportal/GGzWwlTjflbJHmXhjMXg.svg',
    expandButtonUrl: 'https://gw.alipayobjects.com/zos/rmsportal/DzWdTiwanggjaWKwcnWZ.svg',
    // draw 方法返回的图形即是该图项的 keyShape -- 关键形。简单来说，keyShape 是该图项参与图形计算的关键图形。
    // 所有的击中、锚点、控制点，都是根据关键图形生成的，所以这个形（shape）非常关键。
    draw(item) {
      const group = item.getGraphicGroup() // 获取 G 的图形图组
      const { title, key1, name, collapsed, children } = item.getModel() // 获取数据模型
      const width = 170
      const height = 80
      const buttonWidth = 14
      const buttonHeight = 14

      let button = ''
      if (children && children.length > 0) { // 若存在子节点，设置折叠按钮
        const buttonImgUrl = collapsed ? this.expandButtonUrl : this.collapseButtonUrl
        button = `<img class="pology-collapsingBtn g6-hoverPointer" src=${buttonImgUrl} />`
      }

      const html = G6.Util.createDOM(`
        <div class="pology-cardContainer">
          <h1 class="pology-cardTitle">${title}</h1>
          <p class="pology-cardLi">
            <span class="pology-cardKey">${key1}</span>
            <span class="pology-cardValue">${name}</span>
          </p>
        </div>
      `)

      const keyShape = group.addShape('dom', { // 添加图形分组的图形，拓扑卡片
        attrs: { x: 0, y: 0, width, height, html }
      })

      group.addShape('dom', { // 折叠按钮
        attrs: {
          x: width / 2 - buttonWidth / 2,
          y: height - buttonHeight,
          width: buttonWidth,
          height: buttonHeight,
          html: button
        }
      })
      return keyShape
    },
    anchor: [ // 设置锚点
      [0.5, 0],
      [0.5, 1]
    ]
  })
}

export const registerG6Topology = () => {
  registerTopologyEdge()
  registerTopologyCard()

  const tooltip = new G6.Plugins['tool.tooltip']({
    getTooltip({ item }) {
      if (!item) {
        return ''
      }
      const model = item.getModel()
      return `<div class="pology-toolTip-wrapper">
                <div class="pology-toolTip-triangle"></div>
                <div class="pology-toolTip-text">${model.key1} : ${model.name}</div>
               </div>`
    }, dx: 0, dy: 0
  })

  const tree = new G6.Tree({
    container: 'topologyContainer', // 需传入 dom 容器或者容器id {domObject || string} [必选]
    height: 500,
    renderer: 'svg',
    modes: {
      default: ['panCanvas'] // 拖拽画布，平移画布
    },
    plugins: [new G6.Plugins['tool.minimap']({
      container: 'topologyMiniMap' //  需传入 dom 容器或者容器id {domObject || string} [必选]
    }), tooltip],
    fitView: 'tc', // 初始化视口区域，中部顶端
    layout: new G6.Layouts.CompactBoxTree({ // 设置布局参数，紧凑盒树布局
      direction: 'TB', // 根节点在上，往下布局
      getHGap: () => { return 20 }, // 设置每个节点的水平间距
      getVGap: () => { return 24 }, // 设置每个节点的垂直间距
    })
  })
  tree.node({ shape: 'pology-card' }) // 节点形状映射
  tree.edge({ shape: 'pology-VHV' }) // 边形状映射
  tree.on('node:click', (ev) => {
    const { domEvent, item } = ev
    const { target } = domEvent
    const { collapsed } = item.getModel()
    if (target.className === 'pology-collapsingBtn g6-hoverPointer') { // 通过识别 className 去筛出事件元素
      if (collapsed) {
        tree.update(item, { collapsed: false })
      } else {
        tree.update(item, { collapsed: true })
      }
    }
  })
  tree.read(topologyData) // 读取并渲染数据
}
