/**
 * @File: 文件上传用例
 */

import React, { Component } from 'react'
import { Divider } from 'antd'
import { BiciFileUpload, BiciImageUpload } from 'bici-transformers'
import ApiDocument from './ApiDocument'

const initialFileList = [{ // 初始文件列表
  uid: -1,
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}, {
  uid: -2,
  name: 'yyy.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}]
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJuYmYiOjE1Mjc0NzEzNTAsInRlbmFudElkIjoxMSwiaXNzIjoiMTY2IiwiZXhwIjoxNTI3NTU3NzUwLCJ1c2VybmFtZSI6ImhhbmNoYW4ifQ.Drujr985LI9h7Ro4VIlUyt5WTFY9IBHZOPshsJv7JsM3Gd_ldcdRJ51bN-XDiAI8gZYyjpfulPMIuenq_06hUA'
const downloadPath = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' // 文件预览或图片下载时的接口
const uploadAction = '//jsonplaceholder.typicode.com/posts/'
const description = '这里是描述文字。Eg.支持扩展名：.jpg, .png, .jepg..'
const headers = { token: '124' }

export default class BiciUploadUsage extends Component {
  state = {
    fileList: [...initialFileList]
  }
  handleChange = ({ fileList }) => {
    console.log(fileList)
    this.setState({ fileList })
  }
  render() {
    const { fileList } = this.state
    return (
      <div className="pageWrapper">
        <div className="clearfix">
          <p className="mb20 fstage20 fw600">文件上传（BiciFileUpload、BiciImageUpload）</p>

          {/* 布局模度 */}
          <p className="mb12 fstage16 fw500">布局模度</p>
          <ul className="mb12 fstage14">
            <li className="circleLi">两个组件（BiciFileUpload、BiciImageUpload）默认宽度为 336px，支持自定义设置宽度；</li>
            <li className="circleLi">非可拖放情况下，描述信息位于组件下方，间距 8px，可拖放情况下，描述信息位于拖放区域内；</li>
          </ul>
           
          {/* 通用功能 */}
          <p className="mb12 fstage16 fw500">通用功能</p>
          <ul className="mb12 fstage14">
            <li className="circleLi">提示文案：固定的提示文案展示区域；</li>
            <li className="circleLi">拖放上传：可配置是否出现拖拽区域，支持点击和拖拽文件至区域上传；</li>
            <li className="circleLi">文件上传数量限制：默认允许最多上传 10 个文件，支持配置；</li>
            <li className="circleLi">文件上传大小限制：默认允许上传文件的大小不超过 5M，支持配置；</li>
            <li className="circleLi">一次性选取多个文件批量上传：默认支持批量上传，可以在一次文件选择中选择多个文件进行上传；</li>
            <li className="circleLi">文件预览：预览图片以模态窗的形式展示，word/excel/ppt/pdf 以创建浏览器新窗口的方式在线预览；</li>
            <li className="circleLi">上传按钮：文件上传组件非拖拽的情况按钮可自定义；</li>
          </ul>

          {/* 示例 */}
          <p className="mb12 fstage16 fw500">示例（PS：模拟的文件上传服务，上传后文件都是小姐姐(*^▽^*)）</p>

          {/* 图片上传 */}
          <Divider>图片上传 BiciImageUpload</Divider>
          <BiciImageUpload
            description="设置允许文件上传最大数量为5"
            token={token}
            downloadPath={downloadPath}
            action={uploadAction}
            fileList={initialFileList}
            maxListLength={5}
            headers={headers}
            onChange={this.handleChange}
          />

          {/* 图片上传 - 可拖拽 */}
          <Divider>图片上传（可拖拽） BiciImageUpload</Divider>
          <BiciImageUpload
            description="设定支持上传文件大小最大不超过 2M"
            token={token}
            downloadPath={downloadPath}
            action={uploadAction}
            fileList={initialFileList}
            maxFileSizeM={2}
            draggable
            headers={headers}
            onChange={this.handleChange}
          />

          {/* 文件上传 */}
          <Divider>文件上传 BiciFileUpload</Divider>
          <BiciFileUpload
            description={description}
            action={uploadAction}
            fileList={fileList}
            headers={headers}
            onChange={this.handleChange}
          />

          {/* 文件上传 - 可拖拽 */}
          <Divider>文件上传（可拖拽）BiciFileUpload</Divider>
          <BiciFileUpload
            description={description}
            token={token}
            downloadPath={downloadPath}
            action={uploadAction}
            fileList={initialFileList}
            draggable
            headers={headers}
            onChange={this.handleChange}
          />

          {/* 接口文档 */}
          <ApiDocument />
        </div>
      </div>
    )
  }
}
