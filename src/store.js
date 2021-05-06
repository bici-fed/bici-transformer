/**
 * @File: 创建 Store 实例并 Export 出 Store 和 History
 */

import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import initialStore from '@/constants/initialStore'

export const history = createBrowserHistory()

function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      )
    )
  )
  return store
}

export default configureStore(initialStore)
