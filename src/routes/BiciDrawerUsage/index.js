/**
 * @File: BiciDrawer 规范说明 
 */
import React, { Component } from 'react'
import { Button, Row, Col, Pagination  } from 'antd'
import { BiciInput, ComplexTable, BiciDrawer } from 'bici-transformers'
import { dataSource } from '../table/ComplexTableUsage/mockData'
import ModalContent from '../../mockData/ModalContent'
import ApiDocument from './ApiDocument'
import styles from './drawer.module.css'

export default class BiciDrawerUsage extends Component {
  state = {
    smallDrawerVisible: false, // 552px 档弹窗显隐控制
    normalDrawerVisible: false, // 1024px 档弹窗显隐控制
    fixFooterDrawerVisible: false, // 默认底部弹窗显隐控制
    fixFooterBuutonByUserDrawerVisible: false, // 默认底部按钮自定义弹窗显隐控制
    footerByUserDrawerVisible: false, // 自定义底部弹窗显隐控制
    operateType: '', // 加工类型
    processingType: '', // 工艺类别
  }
  // 综合处理各档抽屉
  handleChangeDrawerVisible = (drawerSize, toSetVisible) => {
    this.setState({ [`${drawerSize}DrawerVisible`]: toSetVisible })
  }
  handleFormOnChange = (stateField, value) => {
    this.setState({ [stateField]: value })
  }
  // 渲染 552 px 宽度抽屉，Small 档
  renderSmallWidthDrawer = () => {
    const { smallDrawerVisible, operateType, processingType } = this.state
    return (
      <div className="mr8">
        <Button onClick={() => { this.handleChangeDrawerVisible('small', true) }}>宽度 552px 的弹窗的弹窗</Button>
        <BiciDrawer
          size="small"
          title="宽度 552px 的弹窗"
          width="sm"
          visible={smallDrawerVisible}
          onClose={() => { this.handleChangeDrawerVisible('small', false) }}
        >
          <Row>
            <Col span={24}>
              <BiciInput 
                className="mb8" 
                label="加工类型" 
                value={operateType} 
                onChange={(e) => { this.handleFormOnChange('operateType', e.target.value) }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <BiciInput 
                label="工艺类别" 
                value={processingType}
                onChange={(e) => { this.handleFormOnChange('processingType', e.target.value) }}
              />
            </Col>
          </Row>
        </BiciDrawer>
      </div>
    )
  }
  // 渲染 1024 px 宽度抽屉，Normal 档
  renderNormalWidthDrawer = () => {
    const { normalDrawerVisible } = this.state
    const columns = [{
      title: '检测日期',
      dataIndex: 'detectionDate',
      width: 'nm',
      fixed: 'left',
      checkDisabled: true, // 禁止改变该列的列表选项
    }, {
      title: '截止日期',
      dataIndex: 'deadDate',
      width: 'nm',
    }, {
      title: '检测编号',
      dataIndex: 'detectionNo',
      width: 'nm',
    }, {
      title: '检测地点',
      dataIndex: 'address',
      width: 'nm',
    }, {
      title: '检测技术',
      dataIndex: 'detectionTech',
      width: 'hg'
    }, {
      title: '样本总重',
      dataIndex: 'weight',
      width: 'nm',
    }, {
      title: '预算',
      dataIndex: 'budget',
      width: 'nm',
      checkDefault: false // 列表选项是否默认选中
    }, {
      title: '检测结果',
      dataIndex: 'result',
      width: 'sm',
      checkDefault: false
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: 150,
      fixed: 'right',
      checkDisabled: true
    }]

    return (
      <div className="mr8">
        <Button onClick={() => { this.handleChangeDrawerVisible('normal', true) }}>宽度 1024px 的弹窗</Button>
        <BiciDrawer
          size="small"
          title="宽度 1024px 的弹窗"
          width="nm"
          visible={normalDrawerVisible}
          onClose={() => { this.handleChangeDrawerVisible('normal', false) }}
        >
          <ComplexTable
            rowKey="detectionNo"
            columns={columns}
            dataSource={dataSource}
          />
        </BiciDrawer>
      </div>
    )
  }
  // 渲染底部固定操作栏的抽屉
  renderFooterFixedDrawer = () => {
    const { fixFooterDrawerVisible } = this.state
    return (
      <div className="mr8">
        <Button onClick={() => { this.handleChangeDrawerVisible('fixFooter', true) }}>带默认底部的弹窗</Button>
        <BiciDrawer
          size="small"
          title="底部按钮固定的弹窗"
          width="552px"
          visible={fixFooterDrawerVisible}
          footer={true}
          onClose={() => { this.handleChangeDrawerVisible('fixFooter', false) }}
        >
          <ModalContent />
        </BiciDrawer>
      </div>
    )
  }
  // 渲染底部固定操作栏的抽屉
  renderFooterButtonByUserDrawer = () => {
    const { fixFooterBuutonByUserDrawerVisible } = this.state
    return (
      <div>
        <Button onClick={() => { this.handleChangeDrawerVisible('fixFooterBuutonByUser', true) }}>带默认底部(可配置按钮名)的弹窗</Button>
        <BiciDrawer
          size="small"
          title="(可配置按钮名)的弹窗"
          width="552px"
          visible={fixFooterBuutonByUserDrawerVisible}
          submitButtonName="保存并返回"
          cancelButtonName="复制并取消"
          footer={true}
          onClose={() => { this.handleChangeDrawerVisible('fixFooterBuutonByUser', false) }}
        >
          <ModalContent />
        </BiciDrawer>
      </div>
    )
  }
  // 渲染自定义底部的抽屉
  renderFooterByUser = () => {
    const { footerByUserDrawerVisible } = this.state
    const renderFooter = (
      <div className={styles.footerByUser}>
        <Pagination simple defaultCurrent={1} total={50} />
        <div className="mt8">本故事纯属虚构，如有雷同，纯属巧合</div>
      </div>
    )
    return (
      <div className="ml8">
        <Button onClick={() => { this.handleChangeDrawerVisible('footerByUser', true) }}>带自定义底部的弹窗</Button>
        <BiciDrawer
          size="small"
          title="底部自定义的弹窗"
          width="sm"
          visible={footerByUserDrawerVisible}
          footer={renderFooter}
          onClose={() => { this.handleChangeDrawerVisible('footerByUser', false) }}
        >
          <ModalContent />
        </BiciDrawer>
      </div>
    )
  }

  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">抽屉组件（BiciDrawer）</p>

        <p className="mb12 fstage16 fw500">何时使用</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。</li>
          <li className="circleLi">当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。</li>
          <li className="circleLi">当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。</li>
        </ul>

        {/* 通用功能 */}
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">宽度有两档推荐值，方便快速布局；</li>
          <li className="circleLi">有默认的底部区域（footer）方便快速调用；</li>
          <li className="circleLi">可自定义底部区域（footer）；</li>
          <li className="circleLi">可配置默认底部的取消和保存的按钮名；</li>
        </ul>

        {/* 使用规范 */}
        <p className="mb12 fstage16 fw500">使用规范</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">抽屉默认从右侧弹出（placement 值默认为 right）；</li>
          <li className="circleLi">提供两档定宽值来规范抽屉控件宽度：552px 和 1024px：</li>
          <li className="circleLi-2">552px 档用于简单的信息浏览、配置、表单填写提交场景，其往往仅承载简单的交互；</li>
          <li className="circleLi-2">1024px 档用于浏览信息量较大的场景，其往往承载较复杂交互，比如复杂表格筛选、多列表单；</li>
          <li className="circleLi">宽度不使用基于窗口宽度的百分比，应设置具体像素数值。支持使用推荐值或根据实际场景自定义设置；</li>
          <li className="circleLi">可设置底部固定操作栏，操作按钮居中显示，按钮之间间隙为 8px；</li>
        </ul>

        {/* 示例 */}
        <p className="mb12 fstage16 fw500">示例</p>
        <div className="dpflex">
          { this.renderSmallWidthDrawer() }
          { this.renderNormalWidthDrawer() }
          { this.renderFooterFixedDrawer() }
          { this.renderFooterButtonByUserDrawer() }
          { this.renderFooterByUser()}
        </div>
        <ApiDocument/>
      </div>
    )
  }
}
