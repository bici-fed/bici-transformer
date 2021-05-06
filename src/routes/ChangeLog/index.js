/**
 * @File: 更新日志
 */
import React, { Component } from 'react';
import { Timeline } from 'antd';

const TimelineItem = Timeline.Item;

class ChangeLog extends Component {
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">更新日志</p>
        <p className="mb20 fstage14">
          设计规范 bici-design 和组件库 bici-transformers 项目严格遵循
          <a href="https://semver.org/lang/zh-CN/" rel="noopener noreferrer" target="_blank">
            Semantic Versioning 2.0.0
          </a>
          语义化版本规范。
        </p>

        <Timeline>
          <TimelineItem key="2.1.1/0.19.9">
            <p className="mb12 fstage16 fw600">设计规范 2.1.2 / 组件库 0.19.9</p>
            <p className="mb12 fstage14">2021-05-06</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">
                🐞 修复：当自定义title为非字符串（element时），错误展示的问题
              </li>
            </ul>
          </TimelineItem>
          <TimelineItem key="2.1.2/0.17.6">
            <p className="mb12 fstage16 fw600">设计规范 2.1.2 / 组件库 0.17.6</p>
            <p className="mb12 fstage14">2020-04-17</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 新增：复杂表格列表选项自定义图标</li>
              <li className="circleLi">🌟 新增：复杂表格列表选项选择列方法暴露</li>
              <li className="circleLi">🌟 新增：复杂表格顶部筛选条件存在多行样式调整</li>
            </ul>
          </TimelineItem>
          <TimelineItem key="2.1.1/0.17.0">
            <p className="mb12 fstage16 fw600">设计规范 2.1.1 / 组件库 0.17.0</p>
            <p className="mb12 fstage14">2020-01-13</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">
                🌟 新增：日期组件增加日期时间、日期时间范围两种类型的组件
              </li>
            </ul>
          </TimelineItem>
          <TimelineItem key="2.1.00">
            <p className="mb12 fstage16 fw600">设计规范 2.1.0 / 组件库 0.14.2</p>
            <p className="mb12 fstage14">2019-04-18</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 新增：组件库文件上传组件新增自定义按钮功能；</li>
            </ul>
          </TimelineItem>
          <TimelineItem key="2.1.0">
            <p className="mb12 fstage16 fw600">设计规范 2.1.0 / 组件库 0.13.6</p>
            <p className="mb12 fstage14">2019-04-12</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🔥 升级；升级 AntD 版本由 V3.12.4 至 V3.16.2；</li>
              <li className="circleLi">
                🔥 新增；新增了消息面板组件，并发布了相关功能描述及接口调用文档；
              </li>
              <li className="circleLi">
                🔥 新增；新增了 WebSocket 模块，并发布了相关功能描述及接口调用文档；
              </li>
              <li className="circleLi">
                🌟 新增；各表单控件新增支持可配置 React 节点类型的 Label；
              </li>
              <li className="circleLi">💄 优化：完善了”复杂表格-下拉多选”功能相关文档；</li>
              <li className="circleLi">🐞 修复：修复了“复杂表格”设置 onRow 无效的 Bug；</li>
            </ul>
          </TimelineItem>
          <TimelineItem key="2.0.0">
            <p className="mb12 fstage16 fw600">设计规范 2.0.0 / 组件库 0.13.5</p>
            <p className="mb12 fstage14">2019-04-04</p>
            <p className="mb12 fstage14">规范示例使用新版紧凑布局</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">
                🌟 去掉了页面主体区域与左侧菜单栏、顶部导航栏的12px间距，节省了展示空间；
              </li>
              <li className="circleLi">🔥 已有各组件提供小号尺寸调用；</li>
              <li className="circleLi">🌟 示例了修改 AntD 默认样式的配置项（Less 变量）；</li>
              <li className="circleLi">
                🔥 新增了新版布局下的表单示例，由3列布局调整为4列布局，且各表单控件使用小号尺寸；
              </li>
            </ul>

            <p className="mb12 fstage14">复杂表格支持配置使用小号尺寸</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 顶部条件筛选栏与表格主体间距缩小至4px；</li>
              <li className="circleLi">🌟 表格相关的功能按钮均调整为使用小号尺寸；</li>
              <li className="circleLi">🌟 表格行高缩小至20px；</li>
              <li className="circleLi">🌟 取消表格单元格内部左边距，上下边距缩小至1px；</li>
            </ul>

            <p className="mb12 fstage14">表单场景的功能支撑优化</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 表单列由3列增加为4列；</li>
              <li className="circleLi">🌟 支持控件1/4~4/4各档宽度；</li>
              <li className="circleLi">🌟 各表单控件高度缩小至24px；</li>
              <li className="circleLi">🌟 缩小表单控件内边距至”上下1px，左右7px“；</li>
            </ul>

            <p className="mb12 fstage14">操作记录支持配置使用小号尺寸</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 各条操作记录卡片使用 AntD Small 尺寸；</li>
              <li className="circleLi">🌟 缩小各条操作记录间垂直间距为4px；</li>
            </ul>

            <p className="mb12 fstage14">Tabs 页签在新版紧凑布局下的使用规范</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 页签样式由”卡片式页签“调整为”基本页签“；</li>
              <li className="circleLi">🌟 使用 AntD Small 尺寸；</li>
              <li className="circleLi">🌟 缩小页签距离下方主体内容的间距为 10px；</li>
              <li className="circleLi">🌟 缩小水平页签的外边距至”上下左右0px“；</li>
              <li className="circleLi">
                🌟 缩小水平页签的内边距至”上下内边距6px，左右内边距10px“；
              </li>
              <li className="circleLi">🌟 缩小垂直页签的外边距至”上下左右0px“；</li>
              <li className="circleLi">🌟 缩小垂直页签的内边距至”上下6px，左右16px“；</li>
            </ul>

            <p className="mb12 fstage14">目前支持配置小号尺寸的组件</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 抽屉 BiciDrawer；</li>
              <li className="circleLi">🌟 操作记录 BiciOperatingRecord；</li>
              <li className="circleLi">🌟 Tab 页管理 BiciTabsBar；</li>
              <li className="circleLi">🌟 BiciTagsManager 标签管理；</li>
              <li className="circleLi">🌟 Tab 页管理 BiciTabsBar；</li>
              <li className="circleLi">🌟 复杂表格 ComplexTable；</li>
              <li className="circleLi">🌟 文本输入框 BiciInput；</li>
              <li className="circleLi">🌟 日期选择器 BiciDatePicker；</li>
              <li className="circleLi">🌟 数字输入框 BiciInputNumber；</li>
              <li className="circleLi">🌟 密码输入框 BiciInputPassword；</li>
              <li className="circleLi">🌟 下拉选择输入框 BiciSelect；</li>
              <li className="circleLi">🌟 文件上传 BiciUpload；</li>
              <li className="circleLi">🌟 及其他 AntDesign 提供 size="small" 的组件；</li>
            </ul>

            <p className="mb12 fstage14">其他较大幅度更新</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">
                🔥 新增：界面可视化配置。包含调用示例及功能描述文档、接口文档；
              </li>
              <li className="circleLi">
                🌟 去掉了废弃的模态窗调用示例，模态窗场景由抽屉（右侧滑动弹窗）代替；
              </li>
              <li className="circleLi">
                🔥 合并了设计规范和组件库项目，优化了组件库与设计规范的联调构建流程，提升研发效率；
              </li>
            </ul>
          </TimelineItem>
          <TimelineItem key="1.7.0">
            <p className="mb12 fstage16 fw600">设计规范 1.7.0 / 组件库 0.6.6</p>
            <p className="mb12 fstage14">2018-01-17</p>
            <p className="mb12 fstage14">新增 Tab 页标签管理组件 BiciTabsBar：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 自适应浏览器宽度；</li>
              <li className="circleLi">
                🌟 标签从左到右按出现时间升序排列，最新的一个标签出现在右侧；
              </li>
              <li className="circleLi">
                🌟 标签栏超出可视宽度时，可通过点击左右移动按钮浏览被隐藏的内容；
              </li>
              <li className="circleLi">🌟 删除被选中的标签后跳转到的是前一个标签页面；</li>
              <li className="circleLi">🌟 支持可配置固定 Tab 页，不允许被删除；</li>
              <li className="circleLi">🌟 提供刷新当前页面按钮，点击后重新请求当前 Tab 页数据；</li>
              <li className="circleLi">
                🌟 提供删除所有非固定标签的按钮，点击后删除所有非固定标签，切换至最左侧的固定 Tab
                页；
              </li>
            </ul>
            <p className="mb12 fstage14">技术栈大面积升级：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 React 升级至 16.7.0；</li>
              <li className="circleLi">
                🌟 Redux 升级至 4.0.1，且 react-redux、react-router、connected-react-router
                均做了升级；
              </li>
              <li className="circleLi">🌟 脚手架配置由 CRA1 升级至 2，并更新了架构配置；</li>
              <li className="circleLi">🌟 引入了 AntPro，支持按需引入 AntPro 组件；</li>
              <li className="circleLi">🌟 AntD 升级至目前最新版 3.12.3；</li>
            </ul>
          </TimelineItem>
          <TimelineItem key="1.6.0">
            <p className="mb12 fstage16 fw600">设计规范 1.6.0 / 组件库 0.6.2</p>
            <p className="mb12 fstage14">2018-12-28</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🔥 新增：抽屉组件 Drawer；</li>
              <li className="circleLi">🔥 技术栈升级 AntD 至 3.11.6；</li>
            </ul>
          </TimelineItem>
          <TimelineItem key="1.5.1">
            <p className="mb12 fstage16 fw600">设计规范 1.5.1 / 组件库 0.6.2</p>
            <p className="mb12 fstage14">2018-12-24</p>
            <p className="mb12 fstage14">标签管理：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">
                🌟 新增：标签展示区域，标签名过长时（超过200px）展示省略号...；
              </li>
              <li className="circleLi">
                🌟 新增：标签展示区域，鼠标移入标签 0.5s 后展示 Tooltip 显示标签名；
              </li>
              <li className="circleLi">
                💄 优化：组件删除标签的 API 接口新增参数
                isToDatabase，来区分是展示层面的标签取消选择，还是入数据库的标签删除；
              </li>
              <li className="circleLi">💄 优化：完善了文档内容（布局模度）；</li>
              <li className="circleLi">
                🐞 修复：修复了从快速创建面板切换至创建面板后再返回时面板消失的问题；
              </li>
              <li className="circleLi">🐞 修复：修复了调用后控制台报错遍历需独立 key 的问题；</li>
              <li className="circleLi">🐞 修复：修复了编辑未选择状态下标签提交时的报错问题；</li>
              <li className="circleLi">
                😕 遗留问题：AntD 存在
                Bug：AntD3.11与React16对于DropDown控件的运行时警告，不影响正常功能，考虑后续进行设计规范技术栈升级后解决；
                AntD Issues：https://github.com/ant-design/ant-design/issues/7798。
              </li>
            </ul>
          </TimelineItem>
          <TimelineItem key="1.5.0">
            <p className="mb12 fstage16 fw600">设计规范 1.5.0 / 组件库 0.6.0</p>
            <p className="mb12 fstage14">2018-12-22</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🔥 新增：标签管理组件（BiciTagsManager）；</li>
              <li className="circleLi">🌟新增：允许表格外部受控地去设置条件筛选；</li>
            </ul>
          </TimelineItem>
          <TimelineItem key="1.4.0">
            <p className="mb12 fstage16 fw600">设计规范 1.4.0 / 组件库 0.5.1</p>
            <p className="mb12 fstage14">2018-12-15</p>
            <p className="mb12 fstage14">技术架构升级：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 新增：增加 g2 ^2.3.13；</li>
              <li className="circleLi">💄 升级：升级 bizcharts 至 ^3.4.1；</li>
            </ul>
            <p className="mb12 fstage14">G2 可视化图形语法：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">
                🔥 重构：完全重构了实时数据曲线图，对数据的展示更加友好、直观；
              </li>
              <li className="circleLi">🔥 新增：支持用于演示的模拟数据生成；</li>
            </ul>
          </TimelineItem>
          <TimelineItem key="1.3.0">
            <p className="mb12 fstage16 fw600">设计规范 1.3.0 / 组件库 0.5.1</p>
            <p className="mb12 fstage14">2018-12-11</p>
            <p className="mb12 fstage14">表单：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">
                🔥
                重构：原表单控件完全重构。新的表单控件垂直布局更紧凑、支持数据副本并采用了新的表单验证提示机制；
              </li>
              <li className="circleLi">
                🔥
                重构：组件库表单控件包括：普通输入框（BiciInput）、数字输入框（BiciInputNumber）、文本域（BiciTextArea）、日期组件（BiciDatePicker）；
              </li>
              <li className="circleLi">🔥 重构：重构了全局规范及示例；</li>
            </ul>
            <p className="mb12 fstage14">其他：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">
                🌟 新增：将“图表”模块拆分成“G2可视化图形语法”和“G6图可视化引擎”；
              </li>
              <li className="circleLi">🔥 新增：G6图可视化引擎，新增硬件拓扑结构图；</li>
              <li className="circleLi">🌟 新增：复杂表格，允许表格外部受控地去设置条件筛选；</li>
            </ul>
          </TimelineItem>
          <TimelineItem key="1.2.0">
            <p className="mb12 fstage16 fw600">设计规范 1.2.0 / 组件库 0.4.7</p>
            <p className="mb12 fstage14">2018-09-30</p>
            <p className="mb12 fstage14">复杂表格：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 新增：底部区域可配置，一般用于展示统计信息；</li>
              <li className="circleLi">🌟 新增：列表选项可保存/重置；</li>
              <li className="circleLi">
                💄
                优化：自动适配，当各列设定宽度和小于表格展示区域宽度时，取消固定列，以防止固定列重叠问题；
              </li>
              <li className="circleLi">🐞 修复：列表选项配置在分页跳转后配置失效；</li>
            </ul>
            <p className="mb12 fstage14">文件上传：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 新增：文件及图片上传均支持上传数量、大小限制；</li>
              <li className="circleLi">🌟 新增：支持应用层随时去设置、获取当前的文件列表；</li>
              <li className="circleLi">
                💄 优化：大范围重构了组件编码实现及文档展现，优化编码组织逻辑、应用层调用易用性；
              </li>
            </ul>
            <p className="mb12 fstage14">其他：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">
                🌟 新增：设计规范外网访问地址（编码已经过压缩、混淆处理）：
                <a href="http://design.bicitech.cn" rel="noopener noreferrer" target="_blank">
                  http://design.bicitech.cn
                </a>
              </li>
              <li className="circleLi">🌟 新增：操作记录模块；</li>
              <li className="circleLi">🌟 新增：图表，趋势走向折线图；</li>
              <li className="circleLi">🌟 新增：图表，实时数据曲线图；</li>
              <li className="circleLi">🌟 新增：更新日志，增加组件库版本的显示；</li>
              <li className="circleLi">
                💄 优化：更新日志，调整日志展示顺序，新版本更新日志置顶；
              </li>
              <li className="circleLi">💄 优化：各模块文档标题体现组件名；</li>
              <li className="circleLi">💄 优化：消息提示，优化示例展示布局，更容易通局浏览了；</li>
            </ul>
          </TimelineItem>
          <TimelineItem key="1.1.0">
            <p className="mb12 fstage16 fw600">设计规范 1.1.0 / 组件库 0.3.9</p>
            <p className="mb12 fstage14">2018-06-20</p>
            <p className="mb12 fstage14">复杂表格：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">
                🌟 新增：支持初始化条件筛选标签，即对应支持了复杂表格的保留查询条件功能；
              </li>
              <li className="circleLi">
                💄 优化：条件筛选标签管理功能，文案由“全部 >”优化为“筛选条件 >”；
              </li>
            </ul>
            <p className="mb12 fstage14">其他：</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 新增：模态窗模块；</li>
              <li className="circleLi">🌟 新增：表单模块；</li>
              <li className="circleLi">🌟 新增：消息提示模块</li>
              <li className="circleLi">💄 优化：优化并统一各模块文案描述；</li>
            </ul>
          </TimelineItem>
          <TimelineItem key="1.0.0">
            <p className="mb12 fstage16 fw600">设计规范 1.0.0 / 组件库 0.3.0</p>
            <p className="mb12 fstage14">2018-06-06</p>
            <ul className="mb12 fstage14">
              <li className="circleLi">🌟 新增：更新日志模块；</li>
              <li className="circleLi">
                🌟 新增：基础规范模块，包括色彩、布局模度、字体 3 个子模块；
              </li>
              <li className="circleLi">🌟 新增：菜单模块，包括侧边导航、顶部菜单 2 个子模块；</li>
              <li className="circleLi">🌟 新增：表格模块，包括复杂表格 1 个子模块；</li>
              <li className="circleLi">🌟 新增：文件上传模块；</li>
              <li className="circleLi">
                🌟 新增：图表模块，包括覆盖率可视化、预排产图表、趋势走向可视化 3 个子模块。
              </li>
            </ul>
          </TimelineItem>
        </Timeline>
      </div>
    );
  }
}

export default ChangeLog;
