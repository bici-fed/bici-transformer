/**
 * @File: 图片上传
 */

import React, { Component } from 'react'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, Modal, message } from 'antd';
import _ from 'lodash'
import * as commonPropTypes from '../commonPropTypes'
import * as biciUploadUtils from '../biciUploadUtils'

const Dragger = Upload.Dragger

// 图片上传 Button
const uploadButton = (
  <div>
    <PlusOutlined />
    <div className="ant-upload-text">上传</div>
  </div>
)

class BiciImageUpload extends Component {
  state = {
    previewVisible: false, // 图片预览模态窗显隐控制
    previewImgUrl: '' // 图片预览模态窗 图片 URL
  }
  // 点击 文件链接/图标 时的预览回调处理
  handlePreview = (file) => {
    this.setState({
      // 上传文件为图片，可展示本地缩略图。IE8/9 不支持浏览器本地缩略图展示（Ref），可以写 thumbUrl 属性来代替。
      previewImgUrl: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  // 处理关闭图片预览模态窗
  handleModalCancel = () => {
    this.setState({ previewVisible: false })
  }
  // 对上传文件进行限制
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
    const { width, description, draggable, maxListLength, fileList, modalWidth } = this.props
    const { previewVisible, previewImgUrl } = this.state
    const uncontrolledProps = _.omit(this.props, biciUploadUtils.commonControlledProps)
    const uploadProps = {
      ...uncontrolledProps,
      beforeUpload: this.handleBeforeUpload,
      onPreview: this.handlePreview,
      onChange: this.handleChange
    }

    return (
      <div style={{ width }}>
        {// 区分是否拖拽
          draggable ? (
            <Dragger {...uploadProps} listType="picture">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
              {description && <p className="ant-upload-hint">{description}</p>}
            </Dragger>
          ) : (
            <div>
              <Upload {...uploadProps} listType="picture-card">
                {fileList.length >= maxListLength ? null : uploadButton}
              </Upload>
              {description && <p className="mt6">{description}</p>}
            </div>
          )}

        {/* 图片预览模态窗 */}
        <Modal visible={previewVisible} footer={null} width={modalWidth} onCancel={this.handleModalCancel}>
          <img className="widthPct100" src={previewImgUrl} />
        </Modal>
      </div>
    );
  }
}

BiciImageUpload.propTypes = commonPropTypes.commonPropTypes
BiciImageUpload.defaultProps = commonPropTypes.commonDefaultProps

export default BiciImageUpload
