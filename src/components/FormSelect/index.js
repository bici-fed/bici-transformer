/**
 * 表单校验：下拉选择框
 * @乔伊：做表单规范时该组件请详细 Review 一下，有封装必要性的话整合至组件库
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select, Row, Col } from 'antd'

const Option = Select.Option

class FormSelect extends Component {
  state = {
    isError: false,
    message: ''
  }

  blur = (value, handleBlur) => {
    let backValidation = {
      isError: false,
      message: ''
    }
    if (handleBlur) {
      backValidation = handleBlur(value)
    }
    this.setState({
      isError: backValidation.isError,
      message: backValidation.message
    })
    return backValidation.isError
  }

  initial = () => {
    this.setState({
      isError: false,
      message: ''
    })
  }

  render() {
    let { required, disabled, value, labelCol, wrapperCol, label, placeholder, handleBlur, onChange, options, valueName,
      textName, allowClear } = this.props

    return (
      <div>
        <Row>
          <Col span={labelCol} style={styles.labelCol}>
            {
              required && <span style={styles.required}>*</span>
            }
            <span>{label}：</span>
          </Col>
          <Col span={wrapperCol}>
            <Select
              showSearch
              disabled={disabled}
              value={value}
              style={{ width: '100%' }}
              placeholder={placeholder || `请选择${label}`}
              optionFilterProp='children'
              allowClear={allowClear}
              onChange={onChange}
              onBlur={() => this.blur(value, handleBlur)}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                options.map(item =>
                  <Option key={item instanceof Object ? item[valueName] : item}>
                    {item instanceof Object ? item[textName] : item}
                  </Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={styles.errorRow}>
          <Col offset={labelCol} className='pl12'>
            <span>{this.state.message}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

FormSelect.defaultProps = {
  required: false,
  disabled: false,
  value: [],
  labelCol: 6,
  wrapperCol: 12,
  onChange: () => {},
  options: [],
  valueName: 'id',
  textName: 'name',
  allowClear: true
}
FormSelect.propTypes = {
  label: PropTypes.string.isRequired, // 组件的label名
  onChange: PropTypes.func, // 下拉项的change事件
  required: PropTypes.bool, // 是否必选
  disabled: PropTypes.bool, // 是否禁用
  value: PropTypes.array, // 已选择项
  labelCol: PropTypes.number, // label的col份数，总24份
  wrapperCol: PropTypes.number, // 展示下拉框的col份数，总24份
  placeholder: PropTypes.string, // 占位文字，hint
  handleBlur: PropTypes.func, // 焦点离开事件
  options: PropTypes.array, // 下拉可选项
  valueName: PropTypes.string, // option的value值
  textName: PropTypes.string, // option的展示文字
  allowClear: PropTypes.bool // 选择框是否带删除
}

const styles = {
  required: {
    marginRight: 2,
    color: 'red',
    verticalAlign: 'middle'
  },
  errorRow: {
    height: 16,
    color: 'red',
    fontSize: 12
  },
  labelCol: {
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'right',
    color: 'rgba(0, 0, 0, .85)'
  }
}

export default FormSelect
