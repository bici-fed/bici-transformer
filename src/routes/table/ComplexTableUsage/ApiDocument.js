/**
 * @File: 复杂表格 API
 */

import React, { Component } from 'react'
import { Table } from 'antd'
import { apiStaticColumns, apiPropsColumns, apiMethodsColumns } from '../../../data/apiDocument'

export default class ApiDocument extends Component {
  render() {
    const staticDataSource = [
      {
        params: 'ComplexTable.columnWidth',
        description: '表格列常用宽度分为 4 档，分别为 sm: 80px；nm: 108px；lg: 132px；hg: 212px',
        val: '{ sm: 80, nm: 108, lg: 132, hg: 212 }',
      },
    ]
    const propsDataSource = [
      {
        params: 'minWidth',
        description: '表格最小展示宽度，小于该宽度表格会展示横向滚动条',
        type: 'number',
        defaultVal: '1110。该值为兼容最小窗口宽度 1366px 情况下的右侧界面显示主区域最大展示宽度。',
        isRequired: '否',
      },
      {
        params: 'tableBarExtraContent',
        description: '设置表格上方条件筛选标签区域右侧的额外内容',
        type: 'PropTypes.element',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'listOptionsIcon',
        description: '自定义表格列表选项图标',
        type: 'PropTypes.element',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'tableExtraFooter',
        description: '设置表格下方区域内容',
        type: 'PropTypes.element',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'initialFilterTags',
        description:
          '初始化条件筛选标签。数据类型是一个筛选条件对象数组，其中 filterType 支持 date（日期选择）, search（精确搜索）, select（下拉选择）, tagSelect（下拉多选）, check（单选或多选过滤）类型',
        type: '[{ dataIndex, filterType, val }, ...]',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'onFilterTagsChange',
        description: '条件筛选标签改变时触发的回调，若不设该属性则不会出现表格上方的条件筛选标签区域',
        type: 'function | false',
        defaultVal: 'false',
        isRequired: '否',
      },
      {
        params: 'onListOptinChange',
        description: '列表选择发生变化的回调',
        type: 'function | false',
        defaultVal: 'false',
        isRequired: '否',
      },
      {
        params: 'hasColumnOption',
        description: '是否显示列表选项。若要应用列表选项相关功能，必须设置该 prop 为 true',
        type: 'boolean',
        defaultVal: 'false',
        isRequired: '否',
      },
      {
        params: 'initialColumnOption',
        description: '初始化列表选项配置，一般是应用层通过接口请求获得。',
        type: '[{ dataIndex, title, checkDisabled, checked }, ...]',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'saveColumnOptionCb',
        description:
          '处理保存/重置列表选项的回调，参数 columnOption 为当前/要去重置为的列表选项配置，结构同 initialColumnOption。',
        type: 'function(columnOption)',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'rowSymbol',
        description:
          'dataSource 行数据中的唯一键，设置了字符串类型的 rowKey 时（推荐）不必设置此值，用于点击表格行高亮功能',
        type: 'string',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'columns',
        description:
          'AntD：表格列的配置描述。复杂表格组件对该 API 进行了扩展，详细见下方 ComplexTable Column Extends API',
        type: 'ColumnProps[]',
        defaultVal: '-',
        isRequired: '是',
      },
      {
        params: 'pagination',
        description:
          'AntD: 分页器，设为 false 时不展示和进行分页。由于我们的应用场景均为受控分页，因此复杂表格组件 pagination 默认设为 false，另外对分页器进行了展示格式的封装',
        type: 'object',
        defaultVal: 'false',
        isRequired: '否',
      },
    ]

    const columnExtendsDataSource = [
      {
        params: 'width',
        description: 'AntD: 列宽度。复杂表格组件扩展了该用法，允许传入字符串类型的分档值 "sm"、"nm"、"lg"、"hg"',
        type: 'string | number',
        defaultVal: '-',
        isRequired: '是',
      },
      {
        params: 'filterType',
        description:
          '条件筛选类型。日期选择 "date"，精确搜索 "search"，下拉单选 "select"，下拉多选 "tagSelect"，范围数值 "range"',
        type: 'string',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'isRange',
        description: '条件筛选类型为date时，isRange控制是否是选择日期范围',
        type: 'boolean',
        defaultVal: 'true',
        isRequired: '否',
      },
      {
        params: 'format',
        description: '条件筛选类型为date时，format控制日期字符串格式',
        type: 'string',
        defaultVal: 'YYYY-MM-DD',
        isRequired: '否',
      },
      {
        params: 'selectData',
        description: '若 filterType 为 "select"，提供下拉选择数据',
        type: '[{ id: number, name: string }, ...]',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'handleSubmitDateRange',
        description: '处理日期范围查询的回调，参数为起止日期的字符串',
        type: 'function(dateStrings: [string, string])',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'handleSubmitDatePicker',
        description: '处理日期查询的回调，参数为日期的字符串',
        type: 'function(dateString: string)',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'handleSubmitSearch',
        description: '处理精确搜索查询的回调，参数为查询值',
        type: 'function(val: string)',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'handleSubmitSelect',
        description: '处理下拉单选查询的回调，参数为下拉选择值',
        type: 'function(val: string)',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'handleSubmitRange',
        description: '处理范围数值查询的回调，参数为范围值',
        type: 'function(val: [number, number])',
        defaultVal: '-',
        isRequired: '否',
      },
      {
        params: 'checkDefault',
        description:
          '当 hasColumnOption 为 true 时（即开启了显示列表选项功能），通过该属性设置该列是否在列表选项中默认被选中',
        type: 'boolean',
        defaultVal: 'true',
        isRequired: '否',
      },
      {
        params: 'checkDisabled',
        description: '当 hasColumnOption 为 true 时（即开启了显示列表选项功能），通过该属性设置该列是否禁止更改勾选',
        type: 'boolean',
        defaultVal: 'false',
        isRequired: '否',
      },
    ]

    const methodDataSource = [
      {
        method: 'setFilterTags(toSetFilterTags)',
        description: '设置复杂表格的条件筛选',
        params: 'toSetFilterTags: [{ dataIndex, filterType, val }, ...]， 同 initialFilterTags',
      },
    ]

    return (
      <div className="mt12">
        <p className="mb12 fstage16 fw500">ComplexTable Static API</p>
        <Table
          columns={apiStaticColumns}
          dataSource={staticDataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />

        <p className="mt12 mb12 fstage16 fw500">ComplexTable Props API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={propsDataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />

        <p className="mt12 mb12 fstage16 fw500">ComplexTable Column Extends API</p>
        <Table
          columns={apiPropsColumns}
          dataSource={columnExtendsDataSource}
          rowKey="params"
          size="middle"
          bordered
          pagination={false}
        />

        <p className="mt12 mb12 fstage16 fw500">ComplexTable Methods</p>
        <Table
          columns={apiMethodsColumns}
          dataSource={methodDataSource}
          rowKey="method"
          size="middle"
          bordered
          pagination={false}
        />
      </div>
    )
  }
}
