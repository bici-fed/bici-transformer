import React from 'react';
import { Tooltip } from 'antd';
import _ from 'lodash';
import { columnWidth } from './index';

/**
 * 索引 ComplexTable 需进行处理的 props，其它 props 将不作处理传递给 AntD Table
 */
export const controlledProps = [
  // ComplexTable 自身的 props
  'minWidth',
  'tableBarExtraContent',
  'initialFilterTags',
  'onFilterTagsChange',
  'hasColumnOption',
  'initialColumnOption',
  'saveColumnOptionCb',
  'rowSymbol',
  'tableExtraFooter',

  // 二次处理 AntD Table 的 props
  'columns',
  'pagination',
  'scroll',
  'onRow',
  'onChange',
  'rowClassName',
];

/**
 * 初始化各类型筛选条件 state
 */
export const FILTER_TYPES = [
  // 表格列的条件筛选查询类型
  'search', // 模糊搜索
  'select', // 下拉单选搜索
  'date', // 选择日期，精确到日
  'tagSelect', // 标签下拉多选
  'range', // 范围数值
  // check 单选过滤、多选过滤
];

export const getFilterStates = (columns, filterTags) => {
  let filterStates = {};
  columns.forEach(column => {
    const {
      title,
      filterTagShowTitle, // fix：修复当自定义title为非字符串（element时），错误展示的问题
      dataIndex,
      filterType,
      selectData,
      filters,
      format = 'YYYY-MM-DD',
      isRange = true,
    } = column;
    if (_.isString(filterType)) {
      switch (filterType) {
        case FILTER_TYPES[0]: // 模糊搜索
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[0]}_title`] =
            filterTagShowTitle || title;
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[0]}_val`] = ''; // 文本框输入值
          break;
        case FILTER_TYPES[1]: // 下拉单选搜索
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[1]}_title`] =
            filterTagShowTitle || title;
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[1]}_val`] = undefined; // 下拉框选择值
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[1]}_selectData`] = selectData; // 下拉选择数据
          break;
        case FILTER_TYPES[2]: // 选择日期，精确到日
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[2]}_title`] =
            filterTagShowTitle || title;
          if (isRange) {
            filterStates[`filter_${dataIndex}_${FILTER_TYPES[2]}_val`] = [null, null];
          } else {
            filterStates[`filter_${dataIndex}_${FILTER_TYPES[2]}_val`] = null;
          }
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[2]}_format`] = format;
          break;
        case FILTER_TYPES[3]: // 选择日期，精确到日
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[3]}_title`] =
            filterTagShowTitle || title;
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[3]}_val`] = []; // 下拉框选择值
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[3]}_selectData`] = selectData; // 下拉选择数据
          break;
        case FILTER_TYPES[4]: // 选择范围数值
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[4]}_title`] =
            filterTagShowTitle || title;
          filterStates[`filter_${dataIndex}_${FILTER_TYPES[4]}_val`] = ['', ''];
          break;
      }
    }
    if (filters) {
      // 处理单选、多选过滤
      filterStates[`filter_${dataIndex}_check_title`] = filterTagShowTitle || title;
      filterStates[`filter_${dataIndex}_check_val`] = null;
      filterStates[`filter_${dataIndex}_check_checkData`] = filters;
    }
  });

  // 处理条件筛选标签初始化
  if (filterTags && filterTags.length !== 0) {
    filterTags.forEach(item => {
      const { dataIndex, filterType, val } = item;
      filterStates[`filter_${dataIndex}_${filterType}_val`] = val;
    });
  }
  return filterStates;
};

/**
 * 遍历 columns 并返回处理结果
 */
// 检查 column width 的合法性，若不合法，返回 false；合法情况下返回 Number 类型转化值
function getConvertedColumnWidth(srcWidth) {
  if (!srcWidth) {
    return false;
  }

  const numberedWidth = Number(srcWidth);
  if (!_.isNaN(numberedWidth)) {
    return numberedWidth;
  }
  if (!_.isString(srcWidth)) {
    return false;
  }

  // 处理 string 情况，可能是分档 'sm'、'nm'、'lg'、'hg' 中的一种，也可能是 'xxxpx' 或者一个非法字符串
  switch (srcWidth) {
    case 'sm':
      return columnWidth.sm;
    case 'nm':
      return columnWidth.nm;
    case 'lg':
      return columnWidth.lg;
    case 'hg':
      return columnWidth.hg;
    default:
      // 非分档字符串
      const pxIndex = srcWidth.indexOf('px');
      return pxIndex === -1 ? false : Number(srcWidth.slice(0, pxIndex));
  }
}

// 遍历 columns 并返回处理结果
export const mapColumns = (props, state) => {
  const { columns, hasColumnOption } = props;
  const { columnOption } = state;
  let scrollX = null; // scrollX 最终确定值
  let tempScrollX = 0; // scrollX 计算中间过程的累加器
  let logicalColumns = [];

  // 根据列表选项配置，过滤数组
  let filteredOptionColumns = columns;
  if (hasColumnOption) {
    // 使用列表选项来管理列的显示
    filteredOptionColumns = filteredOptionColumns.filter((column, index) => {
      if (columnOption[index].checked) {
        // 列表选项中被选中
        return true;
      }
      return false;
    });
  }

  if (!filteredOptionColumns || filteredOptionColumns.length === 0) {
    return {
      scrollX: tempScrollX,
      logicalColumns,
    };
  }

  // 首次遍历，确定各 Column.width 的合法性（是否是数字类型），并且动态计算 scroll.x
  for (let i = 0; i < filteredOptionColumns.length; i++) {
    // 进行 scroll.x 相关计算
    if (scrollX === null) {
      // 还未最终确定 scrollX
      const convertedColumnWidth = getConvertedColumnWidth(filteredOptionColumns[i].width);
      if (convertedColumnWidth === false) {
        // column.width 非法
        scrollX = 0;
        break;
      } else {
        // column.width 合法，进行累加
        tempScrollX += convertedColumnWidth;
      }
    }
  }
  scrollX = scrollX === null ? tempScrollX : scrollX; // 最终确定 scrollX

  // 逻辑化处理 Columns
  logicalColumns = filteredOptionColumns.map(column => {
    let columnExtends = {}; // 定制化处理 column

    // Tooltip 功能 @TODO：动态计算实际内容渲染宽度，去决定是否需要 ToolTip
    if (!column.render && scrollX !== 0) {
      columnExtends.render = (text, record, index) => {
        return (
          <div style={{ width: getConvertedColumnWidth(column.width) }} className="ellipsis">
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          </div>
        );
      };
    }
    return {
      ...column,
      ...columnExtends,
    };
  });
  return {
    columnsScrollX: scrollX, // 0 为非法
    logicalColumns,
  };
};
