/**
 * @File: 覆盖 CRA 默认配置
 * @Docs：
 *   @react-app-rewired: https://github.com/timarney/react-app-rewired
 *   @customize-cra: https://github.com/arackaf/customize-cra#using-the-plugins
 *   @babel-plugin-import: https://github.com/ant-design/babel-plugin-import
 *   @useEslintRc(): https://github.com/arackaf/customize-cra#useeslintrc
 *   @addLessLoader(loaderOptions): https://github.com/arackaf/customize-cra#addlessloaderloaderoptions
 *   @https://pro.ant.design/docs/use-components-alone-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD
 *   @https://ant.design/docs/react/use-with-create-react-app-cn
 */

const { override, addWebpackAlias, addLessLoader, useEslintRc, useBabelRc } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  addLessLoader({
    modifyVars: {
      '@font-size-base': '12px',
      '@table-padding-vertical': '6px',
      '@table-padding-horizontal': '6px',
      '@modal-head-padding': '12px',
      '@checkbox-size': '14px',
      '@radio-size': '14px',
      '@tabs-bar-margin': '0 0 10px 0',
      '@tabs-horizontal-margin': '0',
      '@tabs-horizontal-padding': '10px 12px',
      '@tabs-horizontal-padding-sm': '6px 10px',
      '@tabs-vertical-padding': '6px 16px',
      '@tabs-vertical-margin': '0',
      '@slider-margin': '12px 6px',
      '@tree-title-height': '20px',
      '@tree-child-padding': '14px',
    },
    javascriptEnabled: true // https://github.com/ant-design/ant-design/issues/7927
  }),
  useBabelRc(),
  useEslintRc()
)
