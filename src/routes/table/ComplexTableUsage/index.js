/**
 * @File: 表格-复杂表格
 */
import React, { Component } from 'react';
import { Button } from 'antd';
import { ComplexTable } from '@/bici-transformers/dist/bici-transformers';
// import ComplexTable from '@/bici-transformers/src/components/ComplexTable/index.js';
import _ from 'lodash';
import moment from 'moment';
import ApiDocument from './ApiDocument';
import { dataSource, personFilters, statusFilters, addressSelectData } from './mockData';

const columnWidth = ComplexTable.columnWidth;

export default class ComplexTableUsage extends Component {
  fetchTimeoutTimer = null;
  state = {
    pageCommand: {
      current: 1,
      pageSize: 10,
    },
    columns: [
      {
        title: <div>检测时间</div>,
        filterTagShowTitle: '检测时间自定义',
        dataIndex: 'detectionTime',
        width: 'nm',
        format: 'YYYY-MM-DD HH:mm:ss',
        // fixed: 'left',
        sorter: true,
        filterType: 'date',
        checkDisabled: true, // 禁止改变该列的列表选项
        handleSubmitDateRange: dateStrings => {
          console.log('> 查询日期: ', dateStrings);
        },
      },
      {
        title: '截止日期',
        dataIndex: 'deadDate',
        width: 'nm',
        sorter: true,
        filterType: 'date',
        format: 'YYYY-MM',
        mode: 'month',
        isRange: false,
        handleSubmitDatePicker: dateString => {
          console.log('> 查询日期: ', dateString);
        },
      },
      {
        title: '检测编号',
        dataIndex: 'detectionNo',
        width: columnWidth.nm,
        filterType: 'search',
        handleSubmitSearch: val => {
          console.log('> 查询检测编号值: ', val);
        },
      },
      {
        title: '检测地点',
        dataIndex: 'address',
        width: 'nm',
        filterType: 'select',
        selectData: addressSelectData,
        handleSubmitSelect: val => {
          console.log('> 查询检测地点: ', val);
        },
      },
      {
        title: '检测技术',
        dataIndex: 'detectionTech',
        width: 'hg',
      },
      {
        title: '检测范围',
        dataIndex: 'detectionRange',
        width: 'nm',
        filterType: 'range',
        handleSubmitRange: val => {
          console.log(`> 检测范围：`, val);
        },
      },
      {
        title: '样本总重',
        dataIndex: 'weight',
        width: 'nm',
        sorter: true,
      },
      {
        title: '预算',
        dataIndex: 'budget',
        width: 'nm',
        sorter: true,
        checkDefault: false, // 列表选项是否默认选中
      },
      {
        title: '负责人',
        dataIndex: 'person',
        width: 'nm',
        filterType: 'tagSelect',
        selectData: personFilters,
        handleSubmitSelect: val => {
          console.log('> 多选勾选值: ', val);
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 'nm',
        filters: statusFilters,
        filterMultiple: false,
      },
      {
        title: '检测结果',
        dataIndex: 'result',
        width: 'sm',
        checkDefault: false,
      },
      {
        title: '操作1',
        dataIndex: 'operation',
        width: 150,
        fixed: 'right',
        checkDisabled: true,
      },
    ],
    dataSource: [],
    selectedRowKeys: [], // 表格选中行
  };
  componentDidMount() {
    this.fetchTimeoutTimer = window.setTimeout(() => {
      this.requestTable();
    }, 1500);
  }
  componentWillUnmount() {
    this.fetchTimeoutTimer && window.clearTimeout(this.fetchTimeoutTimer);
  }
  // 模拟请求表格数据
  requestTable = () => {
    const { pageCommand } = this.state;
    this.setState({
      pageCommand: {
        ...pageCommand,
        total: 200, // 根据响应获取总条数
      },
      dataSource: dataSource,
    });
  };
  // 于表格外部改变筛选条件
  handleResetFilterTags = () => {
    this.tableDemo.setFilterTags([
      {
        // 检测地点
        dataIndex: 'address',
        filterType: 'select',
        val: 2,
      },
    ]);
  };
  handleTableChange = (pagination, filters, sorter) => {
    const { pageCommand } = this.state;

    if (!_.isEqual(pageCommand, pagination)) {
      this.setState(
        {
          pageCommand: pagination,
        },
        () => {
          this.requestTable();
        },
      );
    }
  };
  // 处理筛选条件标签改变
  handleFilterTagsChange = tagsArr => {
    console.log('> tagsArr', tagsArr);
  };
  // 处理选择行
  handleSelectRowChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  // 处理保存/重置列表选项
  handleSaveColumnOption = columnOption => {
    console.log('> columnOption', columnOption);
  };
  // 处理列表选项移动
  handleMoveColumn = (dragIndex, hoverIndex) => {
    const { columns } = this.state;
    const dragItem = columns[dragIndex];

    columns.splice(dragIndex, 1);
    columns.splice(hoverIndex, 0, dragItem);

    this.setState({
      columns,
    });
  };
  // 列表选项发生变化的回调
  onListOptinChange = (option, index, e) => {
    console.log('> option', option, '> index', index);
  };

  // 表格上方操作区域
  renderTableBarExtraContent = () => {
    return <Button size="small">导出</Button>;
  };

  renderTableExtraFooter = () => {
    // 渲染表格底部区域
    return (
      <div>
        <span>总计：</span>
        <span className="mr20">订货/入库/发货（吨）：2000/3520/480</span>
        <span className="mr20">总金额（元）：4525540</span>
      </div>
    );
  };

  // 渲染复杂表格用例
  renderComplexTable = () => {
    const { pageCommand, dataSource, selectedRowKeys, columns } = this.state;
    const rowSelection = {
      // 选中行配置
      selectedRowKeys,
      onChange: this.handleSelectRowChange,
    };

    // 初始化条件筛选标签
    const initialFilterTags = [
      {
        // 检测时间
        dataIndex: 'detectionTime',
        filterType: 'date',
        val: [moment('2018-06-01 18:11:56'), moment('2018-08-25 19:12:47')],
      },
      {
        // 截至日期
        dataIndex: 'deadDate',
        filterType: 'date',
        val: moment('2018-06-01'),
      },
      {
        // 检测编号
        dataIndex: 'detectionNo',
        filterType: 'search',
        val: '21-110',
      },
      {
        // 检测地点
        dataIndex: 'address',
        filterType: 'select',
        val: '2',
      },
      {
        // 检测范围
        dataIndex: 'detectionRange',
        filterType: 'range',
        val: [0, 10],
      },
      {
        // 负责人
        dataIndex: 'person',
        filterType: 'tagSelect',
        val: ['p1'], // 需和selectData对齐，若是对象数组此处为id数组
      },
      {
        dataIndex: 'status',
        filterType: 'check',
        val: ['2'],
      },
    ];

    return (
      <ComplexTable
        size="small"
        ref={el => {
          this.tableDemo = el;
        }}
        columns={columns}
        dataSource={dataSource}
        onChange={this.handleTableChange}
        rowSelection={rowSelection}
        pagination={pageCommand}
        initialFilterTags={initialFilterTags}
        hasColumnOption={true}
        // listOptionsIcon={<div>自定义</div>}
        saveColumnOptionCb={this.handleSaveColumnOption}
        rowKey="detectionNo"
        tableBarExtraContent={this.renderTableBarExtraContent()}
        tableExtraFooter={this.renderTableExtraFooter()}
        onFilterTagsChange={this.handleFilterTagsChange}
        handleMoveColumn={this.handleMoveColumn}
        onListOptinChange={this.onListOptinChange}
      />
    );
  };
  render() {
    return (
      <div className="pageWrapper">
        <p className="mb20 fstage20 fw600">复杂表格（ComplexTable）</p>

        {/* 布局模度 */}
        <p className="mb12 fstage16 fw500">布局模度</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">
            兼容最小浏览器窗口宽度 1366px 情况下，表格标准宽度为 1110 px；
          </li>
          <li className="circleLi">表格上方的筛选操作条与表格间距为 12px，各标签间间距为 8px；</li>
          <li className="circleLi">
            表格常见列宽分为 4
            档：小（Small）、正常（Normal）、大（Large）、巨大（Huge），对应最大展示中文字符数分别为
            4、6、10、16（字号 12px，无加粗），对应宽度分别为 80px、108px、132px、212px；
          </li>
          <li className="circleLi">
            表格整体尺寸（Size）使用默认尺寸（Default），对应其各单元格内边距为 8px，无外边框
          </li>
        </ul>

        {/* 通用功能 */}
        <p className="mb12 fstage16 fw500">通用功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">
            自动适配：当浏览器窗口宽度小于 1366px 时，表格自动展示横向滚动条；
          </li>
          <li className="circleLi">
            自动适配：当表格列较多，表格各列宽度和大于当前窗口下表格可展示区域宽度时，表格自动展示横向滚动条；
          </li>
          <li className="circleLi">
            自动适配：根据各列设定宽度及浏览器窗口当前宽度，自动计算横向滚动区域宽度（scrollX）；
          </li>
          <li className="circleLi">
            自动适配：当各列设定宽度和小于表格展示区域宽度时，取消固定列，以防止固定列重叠问题；
          </li>
          <li className="circleLi">对外接口：提供 4 档常见列宽供业务层调用，详细见布局模度；</li>
          <li className="circleLi">
            功能：列表选项功能，位于表格右上方，可进行各表格列的显隐控制，可配置允许/禁用某列的显隐控制，可保存/重置列表选项配置；
          </li>
          <li className="circleLi">
            功能：封装表格上方右侧操作区域，类似 AntD Tabs
            组件，可配置该区域展示组件，该区域位于“列表选项”按钮左侧；
          </li>
          <li className="circleLi">
            功能：点击某行时，某行背景高亮显示。（仍支持默认antd的onRow及rowClassName属性）
          </li>
          <li className="circleLi">
            功能：封装表格列的条件筛选控件，查询内容同步表格上方筛选条件标签的展示，支持以下筛选类型：
          </li>
          <li className="circleLi-2">日期范围查询（精确到日或时间，支持设置format）；</li>
          <li className="circleLi-2">日期查询（精确到日或时间，支持设置format）；</li>
          <li className="circleLi-2">模糊搜索查询；</li>
          <li className="circleLi-2">下拉单选查询；</li>
          <li className="circleLi-2">下拉多选查询（下拉数据格式均支持字符串数组或对象数组）；</li>
          <li className="circleLi-2">单选过滤查询；</li>
          <li className="circleLi-2">多选过滤查询</li>
          <li className="circleLi">功能：封装表格上方筛选条件标签区域，包括以下功能：</li>
          <li className="circleLi-2">标签以键值对方式展示；</li>
          <li className="circleLi-2">标签内容同步下方表格筛选查询操作；</li>
          <li className="circleLi-2">
            标签内容最多展示 30 个字符（不区分中英文，刚好可以展示下“XX日期：2018-03-24 ~
            2018-06-21”），超过展示字符数时会自动在标签左上方显示 Tooltip；
          </li>
          <li className="circleLi-2">
            当存在标签时，自动展示清除按钮，提供关闭单独标签及清除全部标签时的回调
          </li>
          <li className="circleLi">功能：封装底部分页器，默认包括以下功能：</li>
          <li className="circleLi-2">当前页面条数范围显示、总条数显示；</li>
          <li className="circleLi-2">上一页、下一页切换；</li>
          <li className="circleLi-2">页码省略及对省略页码的前后展开；</li>
          <li className="circleLi-2">选择每页展示条数（默认 10 条/页，可选 10、20、30、40；</li>
          <li className="circleLi">功能：点击表格行进行背景高亮显示；</li>
          <li className="circleLi">功能：表格底部区域可配置，一般用于展示统计信息；</li>
          <li className="circleLi">
            功能：列表选项支持拖拽功能，列顺序与表格展示的列顺序一一对应；
          </li>
        </ul>

        {/* 正在研发中的功能 */}
        <p className="mb12 fstage16 fw500">正在研发中的功能</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">
            自动适配：窗口内容高度大于应用层设定的内容展示高度时，表格自动展示纵向滚动条；
          </li>
        </ul>

        {/* 功能需求池 */}
        <p className="mb12 fstage16 fw500">功能需求池</p>
        <ul className="mb12 fstage14">
          <li className="circleLi">功能：当表格列内容小于最大展示宽度时，取消 Tooltip 显示</li>
        </ul>

        {/* 示例 */}
        <p className="mb12 fstage16 fw500">示例</p>
        <Button onClick={this.handleResetFilterTags}>更改筛选条件</Button>
        {this.renderComplexTable()}

        {/* 接口文档 */}
        <ApiDocument />
      </div>
    );
  }
}
