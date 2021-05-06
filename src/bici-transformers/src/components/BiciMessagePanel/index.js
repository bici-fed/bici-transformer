import React, { Component } from 'react'
import { BellOutlined } from '@ant-design/icons';
import { Drawer, Tabs, List, Avatar, Spin, Button, Collapse, Badge } from 'antd';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import styles from './biciMessagePanel.css'

const TabPane = Tabs.TabPane
const Panel = Collapse.Panel
const ListItem = List.Item
const ListItemMeta = List.Item.Meta

class BiciMessagePanel extends Component {

  state = {
    visible: false, //抽屉显示
    loading: false, //加载状态
  }

  handleOnOpen = () => { this.setState({ visible: true }) }
  handleOnClose = () => { this.setState({ visible: false }) }

  handleInfiniteOnLoad = (hasMore, id, index) => {
    const { onInfiniteLoad } = this.props
    if (hasMore === true) {
      this.setState({
        loading: true,
      }, () => {
        onInfiniteLoad && onInfiniteLoad(id, index)
        this.setState({ loading: false })
      })
    }
  }
  handleAttention = (moduleId, item) => {
    const { onAttention } = this.props
    onAttention && onAttention(moduleId, item)
  }

  handleCollapseChange = (appendixId) => {
    const { onCollapseChange } = this.props
    onCollapseChange && onCollapseChange(appendixId)
  }

  renderMessageList = () => {
    const { loading } = this.state
    const { accordion, messageList } = this.props
    let list = _.cloneDeep(messageList)
    const badgeStyle = {
      minWidth: '10px',
      height: '14px',
      lineHeight: '14px',
    }
    return (
      list.length ?
        <Collapse
          bordered={false}
          onChange={(id) => { this.handleCollapseChange(id) }}
          accordion={accordion}
        >
          {
            list.map((messList, index) => {
              return (
                <Panel
                  key={messList.id}
                  header={
                    <div className={styles.messageContentWrapper}>
                      <div className={styles.messageContent}>
                        {/* <Avatar className="mr16" src={messList.avatar} /> */}
                        <div>
                          <Badge
                            count={messList.count}
                            style={
                              messList.count > 99 ?
                                {
                                  ...badgeStyle,
                                  right: '-12px',
                                  padding: '0 4px',
                                }
                                :
                                {
                                  ...badgeStyle,
                                  right: '-8px',
                                }}
                          >
                            <div className={styles.title}>
                              {messList.name ? messList.name : "暂无标题"}
                            </div>
                          </Badge>
                          <div className={styles.content}>
                            {
                              messList.messageList.length ?
                                messList.messageList[0].title ? messList.messageList[0].title : ''
                                : '暂无消息'
                            }
                          </div>
                        </div>
                      </div>
                      <div className={styles.messageTime}>
                        {
                          messList.messageList.length ? messList.messageList[0].date : null
                        }
                      </div>
                    </div>
                  }
                  disabled={messList.messageList.length ? false : true}
                >
                  <div className={styles.infiniteContainer}>
                    <InfiniteScroll
                      initialLoad={false}
                      pageStart={0}
                      loadMore={() => { this.handleInfiniteOnLoad(messList.hasMore, messList.id, index) }}
                      hasMore={!loading && messList.hasMore}
                      useWindow={false}
                    >
                      <List
                        size="small"
                        dataSource={messList.messageList}
                        renderItem={item => (
                          <ListItem key={item.id}>
                            <ListItemMeta
                              title={<div>{item.title ? item.title : '暂无消息标题'}</div>}
                              description={<div>{item.desc ? item.desc : '暂无消息描述'}</div>}
                            />
                            <div>{item.name ? `${item.name}:` : ''}{item.date}</div>
                          </ListItem>
                        )}
                      >
                        {loading && messList.hasMore &&
                          (
                            <div className={styles.loadingContainer}>
                              <Spin size="small" />
                            </div>
                          )
                        }
                      </List>
                    </InfiniteScroll>
                  </div>
                </Panel>
              )
            })
          }
        </Collapse> : <div className={styles.notAttention}>未关注任何消息</div>
    )
  }
  renderAttentionList = () => {
    const { attentionList } = this.props
    return (
      <List
        size="small"
        dataSource={attentionList}
        renderItem={item => (
          <ListItem key={item.id} style={{ paddingLeft: 8 }}>
            <ListItemMeta
              // avatar={<Avatar src={item.avatar} />}
              title={item.title ? item.title : "暂无标题"}
              description={item.desc ? item.desc : "暂无描述"}
            />
            <Button
              style={
                item.attention ?
                  { backgroundColor: 'rgb(204, 204, 204)', color: '#fff' }
                  :
                  { backgroundColor: 'rgb(255, 153, 0)', color: '#fff' }
              }
              size="small"
              onClick={() => { this.handleAttention(item.id, item) }}
            >
              {
                item.attention ? '已关注' : '关注'
              }
            </Button>
          </ListItem>
        )}
      />
    )
  }

  render() {
    const { visible } = this.state
    const { messageCount } = this.props
    const badgeStyle = {
      minWidth: '10px',
      height: '12px',
      lineHeight: '12px',
    }
    return (
      <div className="mr20">
        <Badge
          count={messageCount}
          style={
            messageCount > 99 ?
              {
                ...badgeStyle,
                right: '-6px',
                padding: '0 4px',
              }
              :
              {
                ...badgeStyle,
              }
          }
        >
          <BellOutlined onClick={this.handleOnOpen} style={{ fontSize: '14px' }} />
        </Badge>
        <Drawer
          width="760"
          placement="right"
          visible={visible}
          onClose={this.handleOnClose}
        >
          <Tabs defaultActiveKey="1" animated={false}>
            <TabPane tab="消息列表" key="1">
              <div>
                {
                  this.renderMessageList()
                }
              </div>
            </TabPane>
            <TabPane tab="关注列表" key="2">
              <div>
                {
                  this.renderAttentionList()
                }
              </div>
            </TabPane>
          </Tabs>
        </Drawer>
      </div>
    );
  }
}
BiciMessagePanel.propTypes = {
  messageCount: PropTypes.number, // 徽标数量
  accordion: PropTypes.bool, //是否为手风琴模式
  attentionList: PropTypes.array.isRequired, //关注列表
  messageList: PropTypes.array.isRequired, //消息列表
  onAttention: PropTypes.func, //是否关注
  onCollapseChange: PropTypes.func, //展开折叠面板
  onInfiniteLoad: PropTypes.func, //滚动加载
}

BiciMessagePanel.defaultProps = {
  accordion: false,
  attentionList: [],
  messageList: [],
}

export default BiciMessagePanel
