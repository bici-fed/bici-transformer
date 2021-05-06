/**
 * @File: 文件上传
 */
import React, { Component } from 'react'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload, Button, message } from 'antd';
import _ from 'lodash'
import * as commonPropTypes from '../commonPropTypes'
import * as biciUploadUtils from '../biciUploadUtils'
import { getFormLabelStyle } from '../../../utils/styleUtils'

const Dragger = Upload.Dragger

class BiciFileUpload extends Component {
  // 对上传文件大小进行限制
  handleBeforeUpload = (file) => {
    const { maxFileSizeM } = this.props
    const isLtFileSize = file.size / 1024 / 1024 < maxFileSizeM
    if (!isLtFileSize) {
      message.error(`上传文件大小需小于${maxFileSizeM}M，请重新上传！`)
    }
    return isLtFileSize
  }
  // 限制文件列表、过滤上传失败的文件
  handleChange = ({ file, fileList, event }) => {
    const { maxListLength, onChange } = this.props
    // 限制文件列表长度
    if (fileList.length > maxListLength) {
      message.error(`最多上传${maxListLength}个文件！`)
      // 保留旧文件
      fileList = fileList.slice(0, maxListLength)
      onChange && onChange({ file, fileList, event })
      return
    }
    // 过滤上传失败的文件
    fileList = fileList.filter((file) => {
      if (file.status) {
        return file.status !== 'error'
      }
      return true
    })
    onChange && onChange({ file, fileList, event })
  }
  render() {
    const { maxWidth, description, draggable, size, label, isRequired, children } = this.props
    const uncontrolledProps = _.omit(this.props, biciUploadUtils.commonControlledProps)
    const uploadProps = {
      ...uncontrolledProps,
      beforeUpload: this.handleBeforeUpload,
      onChange: this.handleChange
    }
    const formLabelStyle = getFormLabelStyle(size)

    if (draggable) {
      // 支持拖拽
      return (
        <div className="dpflex">
          {label && (
            <div className={formLabelStyle}>
              {isRequired && <span className="form-labelRequired">*</span>}
              {`${label}：`}
            </div>
          )}
          <div className="flex1" style={{ maxWidth }}>
            {/* 包一层div防止列表脱离文档流 */}
            <div>
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
                {description && <p className="ant-upload-hint">{description}</p>}
              </Dragger>
            </div>
          </div>
        </div>
      );
    }

    // 非拖拽文件上传
    return (
      <div className="dpflex">
        {label && (
          <div className={formLabelStyle}>
            {isRequired && <span className="form-labelRequired">*</span>}
            {`${label}：`}
          </div>
        )}
        <div className="flex1" style={{ maxWidth }}>
          <Upload {...uploadProps}>
            {children ? (
              children
            ) : (
              <Button size={size}>
                <UploadOutlined />
                上传文件
              </Button>
            )}
          </Upload>
          {description && <p className="mt8">{description}</p>}
        </div>
      </div>
    );
  }
}

BiciFileUpload.propTypes = commonPropTypes.commonPropTypes
BiciFileUpload.defaultProps = commonPropTypes.commonDefaultProps

export default BiciFileUpload
