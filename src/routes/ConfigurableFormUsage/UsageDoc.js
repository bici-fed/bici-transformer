/**
 * @File: 页面配置文档
 */
import React, { Component } from 'react'
import { Table } from 'antd'
import { apiPropsColumns, apiMethodsColumns } from '@/data/apiDocument'

class UsageDoc extends Component {
  render() {
    const propsDataSource = [{
      params: 'onCancel',
      description: '页面配置页点击取消时的回调',
      type: 'function()',
      defaultVal: '-',
      isRequired: '是'
    }, {
      params: 'onSubmit',
      description: '页面配置页点击确定时的回调，参数 areaList 为当前页面配置的配置数据',
      type: 'function(areaList)',
      defaultVal: '-',
      isRequired: '是'
    }]
    const methodDataSource = [{
      method: 'initFormAreaList(areaList)',
      description: '初始化可配置表单数据',
      params: 'areaList: 对象数组'
    }, {
      method: 'initDictionary(dictionaryData)',
      description: '初始化自定义字段的数据字典数据',
      params: 'dictionaryData: 对象数组 [{ id, name }]'
    }]
    return (
      <div>
        <p className="mb12 fstage16 fw500">功能关键点</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">配置界面展示的布局与使用场景一致，配置界面将可配置区域和不可配置区域一并展示，展示的是业务页面的一个整体（所见即所得，不需要额外的预览页面）；</li>
          <li className="circleLi">配置对象【卡片】支持新增、删除（校验其下是否有系统字段）、编辑名称、竖直方向拖放排序；</li>
          <li className="circleLi">配置对象【字段】支撑新增、删除、编辑、拖放排序（支持水平与竖直方向拖放、跨卡片拖放）；</li>
          <li className="circleLi">配置对象【字段】支持类型：</li>
          <li className="circleLi-2">文本输入；</li>
          <li className="circleLi-2">数字输入；</li>
          <li className="circleLi-2">下拉单选；</li>
          <li className="circleLi-2">下拉多选；</li>
          <li className="circleLi-2">文本域；</li>
          <li className="circleLi-2">时间日期选择（年/月/日/时/分/秒）；</li>
          <li className="circleLi-2">时间日期范围选择（年/月/日/时/分/秒）；</li>
          <li className="circleLi">配置对象【区域组件】，是一套布局、交互、基础控件、接口请求的组合，代表一整块可配置的业务功能块儿；（规划在后续阶段）；</li>
          <li className="circleLi">字段回收站；（规划在后续阶段）；</li>
        </ul>

        <p className="mb12 fstage16 fw500">【卡片】交互点：</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">新增/修改卡片标题：</li>
          <li className="circleLi-2">鼠标指针移入卡片标题区域时，指针光标类型更改为“指示文本”；</li>
          <li className="circleLi-2">鼠标指针点击卡片标题区域时，切换为编辑态，失焦或按键盘回车后会完成编辑切换到非编辑态；</li>
          <li className="circleLi-2">新增卡片后，卡片标题默认设置为“卡片标题”；</li>

          <li className="circleLi">卡片拖放排序：</li>
          <li className="circleLi-2">鼠标按住卡片右上方的“图钉”按钮（鼠标移入后指针样式类型更改为“移动中”）后可进行拖放；</li>
          <li className="circleLi-2">卡片支持竖向拖放排序；碰撞检测规则：“拖拽源卡片”位置越过“放置目标卡片”的垂直中轴线时，进行顺序更换；</li>

          <li className="circleLi">新增卡片：点击页面配置区域底部的“新增卡片”按钮，会在末位新增一个无归属字段的卡片；</li>
          <li className="circleLi">删除卡片：包含系统字段的卡片无“删除卡片”菜单选项；</li>
          <li className="circleLi">卡片内添加字段：点击卡片右上方下拉菜单的“添加字段”菜单，会弹出字段配置抽屉，完成添加后字段被添加在当前卡片内末位；</li>
        </ul>

        <p className="mb12 fstage16 fw500">【字段】交互点：</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">自动排版布局：</li>
          <li className="circleLi-2">各字段支持 1/4 ~ 4/4 列宽的 4 档布局；</li>
          <li className="circleLi-2">各字段控件均是禁用态，会区分表单类型；</li>
          <li className="circleLi-2">渲染卡片内字段时，当字段长度超过一行（即超过 4/4）时会自动换行；</li>
          <li className="circleLi-2">字段在静态渲染和动态拖放时，均会进行自动排版换行；</li>
          <li className="circleLi">遮罩层字段菜单：</li>
          <li className="circleLi-2">鼠标移入字段后，字段展示半透明遮罩层以进行字段操作；</li>
          <li className="circleLi-2">点击遮罩层菜单的齿轮状“配置按钮”，弹出侧边抽屉进行字段配置；</li>
          <li className="circleLi-2">点击遮罩层菜单的减号状“删除按钮”，删除当前字段（仅自定义字段可被删除并显示删除按钮）；</li>
          <li className="circleLi">字段拖放排序：</li>
          <li className="circleLi-2">鼠标移入字段后指针光标更改为“移动中”，可按住字段任何位置进行拖放；</li>
          <li className="circleLi-2">字段处于拖拽状态时，原控件位置采用灰色背景区域标识；</li>
          <li className="circleLi-2">字段可以进行横向和纵向拖放，位置更换的判断边界是“拖拽源字段”是否越过“放置目标字段”的水平与竖直中轴线；</li>
          <li className="circleLi-2">自定义字段允许跨卡片拖放，自定义字段跨卡片拖放后与“放置目标字段”替换位置；</li>
        </ul>

        <p className="mt12 mb12 fstage16 fw500">BiciConfigurableForm Props API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={propsDataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />

        <p className="mt12 mb12 fstage16 fw500">BiciConfigurableForm Methods</p>
        <Table
          columns={apiMethodsColumns}
          dataSource={methodDataSource}
          rowKey="method"
          size="middle"
          bordered
          pagination={false}
        />
      </div>
    )
  }
}

export default UsageDoc
