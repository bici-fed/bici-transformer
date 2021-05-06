Bici Design
===

## 核心库

* [React 16.x](https://github.com/facebook/react)
* [React Router 4.x](https://github.com/ReactTraining/react-router)
* [Redux](https://github.com/reactjs/redux)

React 16 的几点重要更新：

* render 函数支持返回数组和字符串
* 更好的异常处理：老版本 render 出错直接 break 整个应用，V16 中出错组件被从根节点移除，添加了 `componentDidCatch` 方法定义备用视图渲染异常组件，这被称作组件的错误边界，可理解为组件层面的 try catch 声明
* 新的组件类型 portals：可以将子组件直接渲染到当前容器组件 DOM 结构之外的任意 DOM 节点中，这将使得开发对话框、浮层、提示信息等需要打破当前 DOM 结构的组件更为方便
* 更好的服务端渲染支持
* 打包总体体积减少 30%
* MIT 许可
* 核心架构 Fiber：使得上述的组件错误边界得以实现；异步渲染的支持将陆续推出，可以在更细的粒度上控制组件的绘制过程。

React Router 4 几个重点思想：

* 静态路由：任何页面渲染触发前，App 初始化过程中对配置的路由进行匹配处理
* 动态路由：路由和 app 的渲染同时发生，而不是在当前运行的 app 之外进行配置。Router 本身也是 React Component
* 嵌套路由：V4 中不存在嵌套路由配置，路由的匹配是在组件渲染过程中动态决定的

相关资源：

* [React Router v4 几乎误我一生](https://zhuanlan.zhihu.com/p/27433116)

## UI 库

* [AntDesign 3.x](https://github.com/ant-design/ant-design)

## 数据可视化

* [AntV G2](https://github.com/antvis/g2)
* [BizCharts](https://github.com/alibaba/BizCharts)

## 工具库

* 不可变数据：[Immutable Data](https://github.com/facebook/immutable-js) 或体系下轻量级解决方案
* 工具库：[Lodash](https://github.com/lodash/lodash)

相关线上资源：

* [Immutable 详解及 React 中实践](https://github.com/camsong/blog/issues/3)

## 构建工具

* 依赖管理（包管理）：[Yarn](https://github.com/yarnpkg/yarn/)
* 脚手架：[create-react-app](https://github.com/facebook/create-react-app)
* 编译、打包：[webpack 4](https://github.com/webpack/webpack)

## 合理的编码结构

参考 [ant-design-pro](https://github.com/ant-design/ant-design-pro)

相关线上资源：

* [DOES NPM 5 DEPRECATE YARN?](http://blog.scottlogic.com/2017/06/06/does-npm5-deprecate-yarn.html)
* [npm@5 — Yarn killer?](https://medium.com/netscape/npm-5-yarn-killer-ba69737b24d0)
* [Roadmap for react-scripts@2.0](https://github.com/facebook/create-react-app/issues/3815)
* [First start take more than one minute, and modify one file take 10s to recompile. Is this ok?](https://github.com/facebook/create-react-app/issues/3749)
* [webpack 4: released today!!](https://medium.com/webpack/webpack-4-released-today-6cdb994702d4)

## 调试工具

* [react-devtools](https://github.com/facebook/react-devtools)
* [redux-devtools](https://github.com/gaearon/redux-devtools)
* [redux-logger](https://github.com/evgenyrodionov/redux-logger)
