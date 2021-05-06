/**
 * @Docs: https://github.com/supasate/connected-react-router#usage
 */

import React, { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import store, { history } from './store'
import RouterLayout from './routes/RouterLayout'

export default class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <DragDropContextProvider backend={HTML5Backend}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <RouterLayout/>
            </ConnectedRouter>
          </Provider>
        </DragDropContextProvider>
      </ConfigProvider>
    );
  }
}
