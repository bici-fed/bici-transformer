/**
 * @File: 基础规范 - 字体
 */
import React, { Component } from 'react'
import styles from './fonts.module.css'
import imgFontStage from './imgs/font-stage.png'
import imgFontLineHeight from './imgs/font-lineHeight.png'
import imgFontWeight from './imgs/font-weight.png'
import imgFontColor from './imgs/font-color.png'

export default class Fonts extends Component {
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">字体</p>

        {/* 字体家族 */}
        <p className="mb12 fstage16 fw500">字体家族</p>
        <p className="mb12 fstage14">
          优秀的字体系统首先是要选择合适的字体家族。Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，
          来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。
        </p>
        <p className="mb12 fstage14">浏览器中应用页面体现的字体依用户系统类型及字体库支持情况，优先级由高至低依次采用下列字体：</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">-apple-system</li>
          <li className="circleLi">BlinkMacSystemFont</li>
          <li className="circleLi">"Segoe UI"</li>
          <li className="circleLi">Roboto</li>
          <li className="circleLi">"Helvetica Neue"</li>
          <li className="circleLi">Helvetica</li>
          <li className="circleLi">"PingFang SC"</li>
          <li className="circleLi">"Hiragino Sans GB"</li>
          <li className="circleLi">"Microsoft YaHei"</li>
          <li className="circleLi">SimSun</li>
          <li className="circleLi">sans-serif</li>
        </ul>
        <p className="mb12 fstage14">
          参考自：<a href="https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/" rel="noopener noreferrer" target="_blank">https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/</a>
        </p>
        <p className="mb12 fstage14">另外，在中后台系统中，数字经常需要进行纵向对比展示，我们单独将数字的字体设置为 Tahoma，使其为等宽字体。</p>
        <p className="mb12 fstage14">
          技术方案：<a href="http://stackoverflow.com/questions/13611420/set-a-font-specifically-for-all-numbers-on-the-page" rel="noopener noreferrer" target="_blank">http://stackoverflow.com/questions/13611420/set-a-font-specifically-for-all-numbers-on-the-page</a>
        </p>

        {/* 字阶与行高 */}
        <p className="mb12 fstage16 fw500">字阶与行高</p>
        <p className="mb12 fstage14">
          字阶和行高决定着一套字体系统的动态与秩序之美。字阶是指一系列有规律的不同尺寸的字体。行高可以理解为一个包裹在字体外面的无形的盒子。
        </p>
        <img src={imgFontStage} alt="img" className={styles.inset} />
        <p className="mt12 mb12 fstage14">Ant Design 受到 5 音阶以及自然律的启发定义了 10 个不同尺寸的字体以及与之相对应的行高。</p>
        <img src={imgFontLineHeight} alt="img" className={styles.inset} />
        <p className="mt12 mb12 fstage14">
          在我们的视觉体系中，我们建议的主要字体为 12，与之对应的行高为 20。其余的字阶的选择可根据具体情况进行自由的定义。建议在一个系统设计中（展示型页面除外），字阶的选择尽量控制在 3-5 种之间，保持克制的原则。
        </p>

        {/* 字重 */}
        <p className="mb12 fstage16 fw500">字重</p>
        <p className="mb12 fstage14">
          字重的选择同样基于秩序、稳定、克制的原则。多数情况下，只出现 regular 以及 medium 的两种字体重量，分别对应代码中的 400 和 500。在英文字体加粗的情况下会采用 semibold 的字体重量，对应代码中的 600。
        </p>
        <img src={imgFontWeight} alt="img" className={styles.inset} />

        {/* 字体颜色 */}
        <p className="mt20 mb12 fstage16 fw500">字体颜色</p>
        <p className="mb12 fstage14">文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。</p>
        <img src={imgFontColor} alt="img" className={styles.inset} />
        
        {/* 建议 */}
        <p className="mt20 mb12 fstage16 fw500">建议</p>
        <p className="mb12 fstage14">字体系统的构建，是『动态秩序之美』的第一步。在实际的设计中，我们还有三点建议：</p>
        <ul className="mb12 fstage14">
          <li className="circleLi"><span className="fw600">建立体系化的设计思路：</span>在同一个系统的 UI 设计中先建立体系化的设计思路，对主、次、辅助、标题、展示等类别的字体做统一的规划，再落地到具体场景中进行微调。建立体系化的设计思路有助于强化横向字体落地的一致性，提高字体应用的性价比，减少不必要的样式浪费。</li>
          <li className="circleLi"><span className="fw600">少即是多：</span>在视觉展现上能够用尽量少的样式去实现设计目的。避免毫无意义的使用大量字阶、颜色、字重强调视觉重点或对比关系。</li>
          <li className="circleLi"><span className="fw600">尝试让字体像音符一样跳跃：</span>在需要拉开差距的时候可以尝试在字阶表中跳跃的选择字体大小，会令字阶之间产生一种微妙的韵律感。</li>
        </ul>
      </div>
    )
  }
}
