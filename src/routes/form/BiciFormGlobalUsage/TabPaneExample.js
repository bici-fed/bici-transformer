/**
 * @File: 表单-表单示例
 */

import React, { Component } from 'react'
import { Row, Col, Button, Divider } from 'antd'
import { biciNotification, BiciInput, BiciInputNumber, BiciTextArea, BiciDatePicker } from 'bici-transformers'

function verifyContractNum(val) {
  // 验证合同号格式
  let valueEffective = false
  if (!val || val === '' || val === undefined || val === null) {
    return true
  }

  let contractNumSplit = val.split('-')
  if (
    contractNumSplit.length === 3 &&
    contractNumSplit[0].length === 4 &&
    contractNumSplit[1].length === 2 &&
    parseInt(contractNumSplit[1]) > 0 &&
    parseInt(contractNumSplit[1]) <= 12 &&
    contractNumSplit[2].length === 2 &&
    parseInt(contractNumSplit[2]) > 0 &&
    parseInt(contractNumSplit[2]) <= 31
  ) {
    valueEffective = true
  }
  return valueEffective
}

function verifyForm(refs) {
  // 验证输入框是否有错误提示 可提为公共 需配合selfRefs
  let isError = false
  for (let key in refs) {
    if (refs[key].hint()) {
      isError = true
    }
  }
  return isError
}

export default class TabPaneExample extends Component {
  state = {
    phoneNum: '', // 手机号
    singleWeight: '', // 单重
    unitPrice: '', // 单价
    signingDate: null, // 签订日期
    remark: '', // 备注
    contractNum: '', // 合同号
    number: '' // 数量
  }
  selfRefs = {}

  handleOnChange = (name, value, infoHint) => {
    // 表单输入框的onChange
    this.setState({ [name]: value })
  }

  handleSave = () => {
    const result = verifyForm(this.selfRefs)
    if (result) {
      biciNotification.error({ message: '表单验证不通过' })
    } else {
      biciNotification.success({ message: '表单全部验证通过' })
    }
  }

  render() {
    const { phoneNum, contractNum, number, singleWeight, unitPrice, signingDate, remark } = this.state

    return (
      <div className="pageWrapper">
        <Row className="mb6">
          <Col span={8}>
            <BiciInput
              label="手机号"
              isRequired
              value={phoneNum}
              ref={(el) => (this.selfRefs.verifyPhoneNumRef = el)}
              placeholder="请输入11位纯数字"
              regExp="^1\d{10}$"
              onChange={(e) => {
                this.handleOnChange('phoneNum', e.target.value)
              }}
              verificationTooltip="请输入11位纯数字"
            />
          </Col>
          <Col span={8}>
            <BiciInput
              label="合同号"
              value={contractNum}
              ref={(el) => (this.selfRefs.verifyContractNumRef = el)}
              placeholder="请输入合同号"
              verificationTooltip="格式如：2018-12-06"
              verificationRule={verifyContractNum}
              onChange={(e) => {
                this.handleOnChange('contractNum', e.target.value)
              }}
            />
          </Col>
          <Col span={8}>
            <BiciInputNumber
              label="数量"
              value={number}
              ref={(el) => (this.selfRefs.verifyNumberRef = el)}
              placeholder="请输入整数"
              verificationTooltip="请输入整数"
              regExp="^[1-9]\d*$"
              onChange={(val) => {
                this.handleOnChange('number', val)
              }}
            />
          </Col>
        </Row>

        <Row className="mb6">
          <Col span={8}>
            <BiciInputNumber
              label="单重"
              value={singleWeight}
              ref={(el) => (this.selfRefs.verifySingleWeightRef = el)}
              placeholder="只能输入数字，小数点后只能保留两位"
              verificationTooltip="只能输入数字，小数点后只能保留两位"
              regExp="^\d+(\.\d{1,2})?$"
              onChange={(val) => {
                this.handleOnChange('singleWeight', val)
              }}
            />
          </Col>
          <Col span={8}>
            <BiciInputNumber
              label="单价"
              isRequired
              value={unitPrice}
              ref={(el) => (this.selfRefs.verifyUnitPriceRef = el)}
              placeholder="只能输入数字，小数点后只能保留两位"
              verificationTooltip="只能输入数字，小数点后只能保留两位"
              regExp="^\d+(\.\d{1,2})?$"
              onChange={(val) => {
                this.handleOnChange('unitPrice', val)
              }}
            />
          </Col>
          <Col span={8}>
            <BiciDatePicker
              label="签订日期"
              isRequired
              value={signingDate}
              ref={(el) => (this.selfRefs.verifySigningDateRef = el)}
              onChange={(val) => {
                this.handleOnChange('signingDate', val)
              }}
            />
          </Col>
        </Row>

        <Row className="mb20">
          <Col span={24}>
            <BiciTextArea
              label="备注"
              value={remark}
              onChange={(e) => {
                this.handleOnChange('remark', e.target.value)
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button className="mb32" onClick={this.handleSave}>
              保存
            </Button>
          </Col>
        </Row>
        <Divider />
        
        {/* 紧凑布局 */}
        <Row className="mb6">
          <Col span={6}>
            <BiciInput
              size="small"
              label="手机号"
              isRequired
              value={phoneNum}
              ref={(el) => (this.selfRefs.verifyPhoneNumRef = el)}
              placeholder="请输入11位纯数字"
              regExp="^1\d{10}$"
              onChange={(e) => {
                this.handleOnChange('phoneNum', e.target.value)
              }}
              verificationTooltip="请输入11位纯数字"
            />
          </Col>
          <Col span={6}>
            <BiciInput
              size="small"
              label="合同号"
              value={contractNum}
              ref={(el) => (this.selfRefs.verifyContractNumRef = el)}
              placeholder="请输入合同号"
              verificationTooltip="格式如：2018-12-06"
              verificationRule={verifyContractNum}
              onChange={(e) => {
                this.handleOnChange('contractNum', e.target.value)
              }}
            />
          </Col>
          <Col span={6}>
            <BiciInputNumber
              size="small"
              label="数量"
              value={number}
              ref={(el) => (this.selfRefs.verifyNumberRef = el)}
              placeholder="请输入整数"
              verificationTooltip="请输入整数"
              regExp="^[1-9]\d*$"
              onChange={(val) => {
                this.handleOnChange('number', val)
              }}
            />
          </Col>
          <Col span={6}>
            <BiciInputNumber
              size="small"
              label="数量"
              value={number}
              ref={(el) => (this.selfRefs.verifyNumberRef = el)}
              placeholder="请输入整数"
              verificationTooltip="请输入整数"
              regExp="^[1-9]\d*$"
              onChange={(val) => {
                this.handleOnChange('number', val)
              }}
            />
          </Col>
        </Row>

        <Row className="mb6">
          <Col span={6}>
            <BiciInputNumber
              size="small"
              label="单重"
              value={singleWeight}
              ref={(el) => (this.selfRefs.verifySingleWeightRef = el)}
              placeholder="只能输入数字，小数点后只能保留两位"
              verificationTooltip="只能输入数字，小数点后只能保留两位"
              regExp="^\d+(\.\d{1,2})?$"
              onChange={(val) => {
                this.handleOnChange('singleWeight', val)
              }}
            />
          </Col>
          <Col span={6}>
            <BiciInputNumber
              size="small"
              label="单价"
              isRequired
              value={unitPrice}
              ref={(el) => (this.selfRefs.verifyUnitPriceRef = el)}
              placeholder="只能输入数字，小数点后只能保留两位"
              verificationTooltip="只能输入数字，小数点后只能保留两位"
              regExp="^\d+(\.\d{1,2})?$"
              onChange={(val) => {
                this.handleOnChange('unitPrice', val)
              }}
            />
          </Col>
          <Col span={6}>
            <BiciDatePicker
              size="small"
              label="签订日期"
              isRequired
              value={signingDate}
              ref={(el) => (this.selfRefs.verifySigningDateRef = el)}
              onChange={(val) => {
                this.handleOnChange('signingDate', val)
              }}
            />
          </Col>
          <Col span={6}>
            <BiciDatePicker
              size="small"
              label="签订日期签订日"
              isRequired
              value={signingDate}
              ref={(el) => (this.selfRefs.verifySigningDateRef = el)}
              onChange={(val) => {
                this.handleOnChange('signingDate', val)
              }}
            />
          </Col>
        </Row>

        <Row className="mb20">
          <Col span={12}>
            <BiciTextArea
              size="small"
              label="备注"
              value={remark}
              onChange={(e) => {
                this.handleOnChange('remark', e.target.value)
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button size="small" className="mb32" onClick={this.handleSave}>
              保存
            </Button>
          </Col>
        </Row>

        <Divider />
        <div>
          <p className="mb12 fstage16 fw500">示例说明</p>
          <ul className="mb12 fstage14">
            <li className="circleLi">
              验证方式：带*的为必填项，点击输入框未输入在失去焦点后，输入框边框会变红。例如：手机号字段；
            </li>
            <li className="circleLi">验证方式：输入时格式错误在失焦后，输入框边框会变红。例如：合同号字段；</li>
            <li className="circleLi">
              验证方式：带校验的输入框，内部placeholder和鼠标移入时的气泡会提示填写格式。例如：单重字段；
            </li>
            <li className="circleLi">
              验证方式：除 合同号、单价、单重、数量会有气泡提示填写规则，其他字段输入均不设限。例如：备注字段；
            </li>
            <li className="circleLi">
              验证方式：点击保存，若必填项没有填写或某些字段填写不规范，相应输入框边框会变红。鼠标移入输入框，左上角回显示填写格式。例如：保存按钮；
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
