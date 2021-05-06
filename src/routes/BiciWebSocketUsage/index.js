import React, { Component } from 'react'
import { BiciWebSocket } from 'bici-transformers'
import UsageDoc from './UsageDoc'
class BiciWebSocketUsage extends Component {
  componentDidMount() {
    const ws = new BiciWebSocket({
      baseUrl: 'ws://47.96.159.115:51060/ws',
      params: {
        type: 1,
        id: "36c119bea77b47da89dc5486a1fd21f9",
      },
      onOpen: (ev) => { ev.target.send('bici') },
      onMessage: (value) => {},
      debug: true
    }).init()
    console.log(ws)
  }
  render() {
    return (
      <UsageDoc />
    )
  }
}
export default BiciWebSocketUsage
