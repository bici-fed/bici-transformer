/**
 * @File: 消息提示-消息通知
 */

import React, { Component } from 'react'

import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  MehOutlined,
  PlayCircleOutlined,
  SwapOutlined,
  UnlockOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import { Button } from "antd";
import { biciNotification } from 'bici-transformers'
import ApiDocument from './ApiDocument'

const messages = ["Apple", "Mango", "Banana", "Orange", "Watermelon", "Peach", "Litchi"]
const descriptions = [
  "t is well-known that fruit is good for our health and we should have more. Do you really understand what benefit it brings to us? Let me show you some.",
  "First of all, fruit is good for our skin. Fruit has rich trace elements and vitamin, which can nourish the skin. The makeup is hard to reach its effect. Besides, some fruit have the effect of delaying senescence for the elements their contain. So, eating more fruit can make skin better and look more beautiful.",
  "Secondly, fruit is good for our health. It helps to prevent and treat disease. Fruit is helpful to treat cardiovascular disease, dental ulcer and so on. The people who eat fruit often have less risk to get those diseases.",
  "Last, fruit is delicious. Different fruit have different tastes. Many people like eating it as snacks. For me, eating delicious food can make me feel happy. I often eat apple, pear, banana, litchi and so on. I like them.",
  "To sum up, fruit is really good for us, inside and outside. We should take some in our daily life, but we should not eat excessively.",
  "Gratitude grounds plentitude in the now. When you honor who you are, what you do, and what you have, your energy will change. You will start to glow. People will be drawn to you because that gratitude glow is rare in our current culture. I'm hoping to bring it back",
  "We're here, each and every one of us, because we have a unique gift to share. It's my wish that we're both bold and humble enough to embody our divine potential."
]
const icons = [
  <MehOutlined />,
  <PlayCircleOutlined />,
  <SwapOutlined />,
  <CloseCircleOutlined />,
  <UnlockOutlined />,
  <WarningOutlined />,
  <InfoCircleOutlined />,
]

export default class BiciNotificationUsage extends Component {
  changeNotificationType = (biciNotificationType) => {  // 打开不同类型的消息通知
    const randomIndex = parseInt(Math.random() * messages.length)
    switch (biciNotificationType) {
      case 'open1':
        biciNotification.open({
          message: '可自动关闭',
          description: descriptions[randomIndex],
        })
        break
      case 'open2':
        biciNotification.open({
          message: '需手动关闭',
          description: descriptions[randomIndex],
          disableAutoClosed: true,
        })
        break
      case 'open3':
        biciNotification.open({
          message: '可配置自定义图标',
          description: descriptions[randomIndex],
          icon: icons[randomIndex],
        })
        break
      case 'success':
        biciNotification.success({ message: '新增成功' })
        break
      case 'error' :
        biciNotification.error({ message: '新增失败' })
        break
      case 'info' :
        biciNotification.info({ message: '此合同创建于2018-6-19' })
        break
      case 'warn' :
        biciNotification.warn({ message: '该项无法移动' })
        break
      case 'warning' :
        biciNotification.warning({ message: '该项无法移动' })
        break
      default:
    }
  }

  render() {
    const { changeNotificationType } = this
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">消息提示（biciNotification）</p>
 
        {/* 通用功能 */}
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">类型：可自动关闭和手动关闭两种；</li>
          <li className="circleLi">数量限制：最多出现三条提示；</li>
          <li className="circleLi">位置： 弹出位置均为页面左下角，最新弹出的始终在最底部；</li>
          <li className="circleLi">延时关闭时间：当出现新的消息提示时，从下到上延时关闭的时间依次为 8s 、5s 、2s；</li>
        </ul>

        {/* 示例 */}
        <p className="mb12 fstage16 fw500">示例</p>

        <p className="mb12 mt20 fstage14 fw500">消息提示：自动关闭、手动关闭、自定义图标</p>
        <Button className="mr8" onClick={changeNotificationType.bind(this, 'open1')}>消息提示（自动关闭）</Button>
        <Button className="mr8" onClick={changeNotificationType.bind(this, 'open2')}>消息提示（手动关闭）</Button>
        <Button className="mr8" onClick={changeNotificationType.bind(this, 'open3')}>消息提示（自定义图标，自动关闭）</Button>

        <p className="mb12 mt20 fstage14 fw500">消息提示：成功、错误、警告、信息</p>
        <Button className="mr8" onClick={changeNotificationType.bind(this, 'success')}>消息提示（成功，自动关闭）</Button>
        <Button className="mr8" onClick={changeNotificationType.bind(this, 'error')}>消息提示（错误，自动关闭）</Button>
        <Button className="mr8" onClick={changeNotificationType.bind(this, 'warn')}>消息提示（警告，自动关闭）</Button>
        <Button className="mr8" onClick={changeNotificationType.bind(this, 'info')}>消息提示（信息，自动关闭）</Button>

        {/* 接口文档 */}
        <ApiDocument/>
      </div>
    )
  }
}
