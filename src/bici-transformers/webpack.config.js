/**
 * @Copyright: © 2014-2022 BICI All Rights Reserved,
 * webpack config for Bici FED web component library.
 */
'use strict';

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bici-transformers.js',
    library: 'biciTransformers',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/assets'),
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/components'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader'],
      },
    ],
  },
  externals: [
    'react',
    'react-dom',
    'react-router-dom',
    'prop-types',
    'classnames',
    'moment',
    'lodash',
    '@ant-design/icons',
    /^antd\/es\/.+$/,
  ],
  plugins: [new CleanWebpackPlugin()],
};
