/**
 * @File: 复杂表格组件
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { BarsOutlined } from '@ant-design/icons';
import {
  Input,
  InputNumber,
  Select,
  Button,
  DatePicker,
  Menu,
  Dropdown,
  Checkbox,
  Divider,
  Tooltip,
  Table,
} from 'antd';
import _ from 'lodash';
import FilterTagsBar from './FilterTagsBar';
import MoveItem from './MoveItem';
import { BiciTable } from './BiciTable';
import BiciIcon from '../BiciIcon';
import * as dimensions from '../../static/dimensions';
import * as complexTableUtils from './complexTableUtils';
import * as columnOptionUtils from './columnOptionUtils';
import * as filterUtils from './FilterTagsBar/filterUtils';
import * as colors from '../../static/colors';
import * as bomUtils from '../../utils/bomUtils';
import styles from './complexTable.css';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const MonthPicker = DatePicker.MonthPicker;
const MenuItem = Menu.Item;
const chooseDividerStyle = {
  height: '22px',
  marginLeft: '16px',
  marginBottom: '-2px',
  width: '2px',
};
const optionWrapperStyle = { display: 'flex', alignItems: 'center' };
const optionIconStyle = { fontSize: '16px' };

/**
 * 表格列宽分档
 */
export const columnWidth = {
  sm: 80, // 最多展示4个中文字符
  nm: 108, // 最多展示6个中文字符
  lg: 132, // 最多展示10个中文字符
  hg: 212, // 最多展示16个中文字符
};

/**
 * 复杂表格组件
 */
const paginationDefaultCfg = {
  // 分页默认配置
  showSizeChanger: true,
  showQuickJumper: true,
  size: 'small',
  showTotal: (total, range) => `${range[0]}-${range[1]}条 共${total}条`,
};

class ComplexTable extends Component {
  static columnWidth = columnWidth;
  constructor(props) {
    super(props);
    const { columns, initialFilterTags } = props;
    const filterStates = complexTableUtils.getFilterStates(columns, initialFilterTags); // 初始化各类型筛选条件 state
    const columnOptionStates = columnOptionUtils.getInitColumnOptionStates(props); // 根据传入的 columns 配置来初始化列表选项多选 state
    this.state = {
      rowId: '',
      ...filterStates,
      ...columnOptionStates,
    };
    this.fuzzyQueryOriginVale = '';
    this.tagSelectQueryOriginVale = '';
  }
  // 对外方法：设置当前筛选条件
  setFilterTags = toSetFilterTags => {
    const { columns } = this.props;
    const toSetFilterStates = complexTableUtils.getFilterStates(columns, toSetFilterTags);
    this.setState({ ...toSetFilterStates });
  };
  // 处理 模糊搜索 提交
  handleSubmitDropdownSearch = (valStr, cb) => {
    cb(this.state[valStr]);
  };
  // 模糊搜索 Column 项设置
  setSearchColumnItems = (extendColumn, column) => {
    const { size } = this.props;
    const { title, dataIndex, handleSubmitSearch } = column;
    const placeholder = `查询${title}`;
    const refStr = `filter_${dataIndex}_${complexTableUtils.FILTER_TYPES[0]}_ref`;
    const valStr = `filter_${dataIndex}_${complexTableUtils.FILTER_TYPES[0]}_val`;

    extendColumn.filterDropdown = ({ setSelectedKeys, confirm }) => (
      <div className={styles.filterDropdown}>
        <Input
          size={size}
          ref={ele => (this[refStr] = ele)}
          className={styles.searchInput}
          placeholder={placeholder}
          value={this.state[valStr]}
          onChange={e => {
            this.setState({ [valStr]: e.target.value });
            setSelectedKeys([]);
          }}
          onPressEnter={confirm}
        />
        <Button size={size} type="primary" onClick={confirm}>
          查询
        </Button>
      </div>
    );
    const filterIconStyle = {
      color: Boolean(this.state[valStr]) ? colors.BLUE_6 : colors.GREY_7,
    };
    extendColumn.filterIcon = <BarsOutlined style={filterIconStyle} />;
    extendColumn.onFilterDropdownVisibleChange = visible => {
      if (visible) {
        // 打开筛选条件 记录当前值
        this.fuzzyQueryOriginVale = _.clone(this.state)[valStr];
      }
      if (!visible && this.fuzzyQueryOriginVale !== this.state[valStr]) {
        // 关闭筛选条件 判断是否调用外部接口
        this.handleSubmitDropdownSearch(valStr, handleSubmitSearch);
      }
      setTimeout(() => visible && this[refStr].focus());
    };
  };
  // 范围数值查询 Column 项设置
  setRangeColumnItems = (extendColumn, column) => {
    const { size } = this.props;
    const { dataIndex, handleSubmitRange } = column;
    const refRange = `filter_${dataIndex}_${complexTableUtils.FILTER_TYPES[4]}_ref`;
    const valStr = `filter_${dataIndex}_${complexTableUtils.FILTER_TYPES[4]}_val`;
    const val = this.state[valStr];
    const [beginValue, endValue] = val;
    const prefixInputNumberStyle = { width: 80, marginRight: 8 };
    const shouldActiveFilterIcon = _.isNumber(beginValue) || _.isNumber(endValue);

    extendColumn.filterDropdown = ({ setSelectedKeys, confirm }) => (
      <div className={styles.filterDropdown}>
        <InputNumber
          size={size}
          ref={ele => (this[refRange] = ele)}
          style={prefixInputNumberStyle}
          value={beginValue}
          onPressEnter={confirm}
          onChange={value => {
            this.setState({ [valStr]: [value, endValue] });
            setSelectedKeys([]);
          }}
        />
        ~
        <InputNumber
          size={size}
          style={{ ...prefixInputNumberStyle, marginLeft: 8 }}
          value={endValue}
          onPressEnter={confirm}
          onChange={value => {
            this.setState({ [valStr]: [beginValue, value] });
            setSelectedKeys([]);
          }}
        />
        <Button
          size={size}
          type="primary"
          onClick={() => {
            confirm();
            handleSubmitRange([beginValue, endValue]);
          }}
        >
          查询
        </Button>
      </div>
    );
    const filterIconStyle = {
      color: shouldActiveFilterIcon ? colors.BLUE_6 : colors.GREY_7,
    };
    extendColumn.filterIcon = <BarsOutlined style={filterIconStyle} />;
    extendColumn.onFilterDropdownVisibleChange = visible => {
      if (visible) {
        setTimeout(() => this[refRange].focus());
      }
    };
  };
  // 处理 下拉单选 提交
  handleSubmitDropdownSelect = (valStr, cb, update, selectVal) => {
    update && update();
    this.setState(
      {
        [valStr]: selectVal,
      },
      () => {
        cb(selectVal);
      },
    );
  };
  // 下拉单选搜索 Column 项设置
  setSelectColumnItems = (extendColumn, column) => {
    const { size } = this.props;
    const { title, dataIndex, handleSubmitSelect, selectData } = column;
    const placeholder = `查询${title}`;
    const valStr = `filter_${dataIndex}_${complexTableUtils.FILTER_TYPES[1]}_val`;

    extendColumn.filterDropdown = ({ setSelectedKeys, confirm }) => (
      <div className={styles.filterDropdown}>
        <Select
          size={size}
          style={{ width: '100%' }}
          className={styles.selectInput}
          placeholder={placeholder}
          value={this.state[valStr]}
          onChange={this.handleSubmitDropdownSelect.bind(this, valStr, handleSubmitSelect, confirm)}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          }}
        >
          {selectData.map(item => {
            return (
              <Option value={String(item.id)} key={item.id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </div>
    );
    const filterIconStyle = {
      color: this.state[valStr] ? colors.BLUE_6 : colors.GREY_7,
    };
    extendColumn.filterIcon = <BarsOutlined style={filterIconStyle} />;
  };
  // 下拉多选
  setTagSelectColumnItems = (extendColumn, column) => {
    const { size } = this.props;
    const { title, dataIndex, selectData, handleSubmitSelect } = column;
    const placeholder = `查询${title}`;
    const valStr = `filter_${dataIndex}_${complexTableUtils.FILTER_TYPES[3]}_val`;
    const dropdownId = `CompleTable_filter_select_${dataIndex}`;

    extendColumn.filterDropdown = ({ setSelectedKeys, confirm }) => (
      <div className={styles.filterDropdown} style={{ padding: 16 }} id={dropdownId}>
        <Select
          size={size}
          mode="multiple"
          className={styles.tagSelect}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          placeholder={placeholder}
          value={this.state[valStr]}
          getPopupContainer={() => document.getElementById(dropdownId)}
          dropdownRender={menu => (
            <div
              onMouseDown={e => {
                e.preventDefault();
              }}
            >
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <Button size={size} type="primary" className={styles.tagSelectBtn} onClick={confirm}>
                查询
              </Button>
            </div>
          )}
          onChange={value => {
            let valueAry;
            if (Array.isArray(value)) {
              valueAry = value;
            } else {
              valueAry = value.split ? value.split(',') : [];
            }
            setSelectedKeys([]);
            this.setState({ [valStr]: valueAry });
          }}
        >
          {selectData.map(value => {
            if (typeof value === 'object') {
              return (
                <Option value={String(value.id)} key={value.id}>
                  {value.name}
                </Option>
              );
            } else {
              return <Option key={value}>{value}</Option>;
            }
          })}
        </Select>
      </div>
    );
    const filterIconStyle = {
      color: this.state[valStr].length ? colors.BLUE_6 : colors.GREY_7,
    };
    extendColumn.filterIcon = <BarsOutlined style={filterIconStyle} />;
    extendColumn.onFilterDropdownVisibleChange = visible => {
      if (visible) {
        // 打开筛选条件 记录当前值
        this.tagSelectQueryOriginVale = _.clone(this.state)[valStr];
      }
      if (!visible && this.tagSelectQueryOriginVale !== this.state[valStr]) {
        // 关闭筛选条件 判断是否调用外部接口
        this.handleSubmitDropdownSearch(valStr, handleSubmitSelect);
      }
    };
  };
  // 日期查询，Column 项设置，可以通过设置 format 控制日期格式，默认为 'YYYY-MM-DD'
  setDateColumnItems = (extendColumn, column) => {
    const { size } = this.props;
    const {
      dataIndex,
      handleSubmitDateRange,
      handleSubmitDatePicker,
      format = 'YYYY-MM-DD',
      isRange = true,
      mode = 'date',
    } = column;
    const valStr = `filter_${dataIndex}_${complexTableUtils.FILTER_TYPES[2]}_val`;
    const pickerOpenStr = `filter_${dataIndex}_${complexTableUtils.FILTER_TYPES[2]}_pickerOpen`;
    const otherProps = format.match(/h/i) ? { showTime: { format } } : {}; // 若有h（小时） 证明需要精确时间到时间选择
    const Picker = mode === 'month' ? MonthPicker : DatePicker;
    extendColumn.filterDropdown = ({ setSelectedKeys, confirm }) => (
      <div className={styles.filterDropdown}>
        {isRange ? (
          <RangePicker
            size={size}
            format={format}
            value={this.state[valStr]}
            allowClear={false}
            open={this.state[pickerOpenStr]}
            onOpenChange={status => {
              this.setState({ [pickerOpenStr]: status }, () => setSelectedKeys([]));
            }}
            onChange={dates => {
              setSelectedKeys([]);
              const dateStrings = [dates[0].format(format), dates[1].format(format)];
              this.setState(
                {
                  [valStr]: [dates[0], dates[1]],
                },
                () => {
                  if (!format.match(/h/i)) {
                    confirm && confirm();
                    handleSubmitDateRange(dateStrings);
                  }
                },
              );
            }}
            onOk={dates => {
              confirm && confirm();
              const dateStrings = [dates[0].format(format), dates[1].format(format)];
              this.setState(
                {
                  [valStr]: [dates[0], dates[1]],
                },
                () => {
                  handleSubmitDateRange(dateStrings);
                },
              );
            }}
            {...otherProps}
          />
        ) : (
          <Picker
            // mode={mode}
            size={size}
            format={format}
            value={this.state[valStr]}
            allowClear={false}
            open={this.state[pickerOpenStr]}
            onOpenChange={status => {
              this.setState({ [pickerOpenStr]: status }, () => setSelectedKeys([]));
            }}
            onChange={date => {
              setSelectedKeys([]);
              confirm && confirm();
              const dateString = date.format(format);
              this.setState(
                {
                  [valStr]: date,
                },
                () => {
                  handleSubmitDatePicker(dateString);
                },
              );
            }}
            {...otherProps}
          />
        )}
      </div>
    );
    let filterIconStyle = {};
    if (isRange) {
      filterIconStyle = {
        color: this.state[valStr][0] ? colors.BLUE_6 : colors.GREY_7,
      };
    } else {
      filterIconStyle = {
        color: this.state[valStr] ? colors.BLUE_6 : colors.GREY_7,
      };
    }
    extendColumn.filterIcon = <BarsOutlined style={filterIconStyle} />;
    extendColumn.onFilterDropdownVisibleChange = visible => {
      if (!visible) {
        this.setState({ [pickerOpenStr]: false });
      }
    };
  };
  // 取得用于最终提供给 Table 使用的 scroll 配置
  getScrollCfg = columnsScrollX => {
    const { minWidth, scroll, rowSelection } = this.props;

    if (scroll) {
      return scroll;
    }

    let distScrollCfg = { x: columnsScrollX > minWidth ? columnsScrollX : minWidth };
    if (rowSelection) {
      // 若表格包含复选列，那么动态计算的 scrollX 应加上操作列宽度
      distScrollCfg.x = distScrollCfg.x + 62;
    }
    return distScrollCfg;
  };
  // 组件化处理 Columns
  getComponentizedColumns = (logicalColumns, columnsScrollX) => {
    if (logicalColumns.length === 0) {
      return [];
    }

    const { minWidth } = this.props;
    const isLtMinWidth = columnsScrollX < minWidth;

    return logicalColumns.map(column => {
      const { dataIndex, filterType, filters } = column;
      let extendColumn = {};

      if (_.isString(filterType)) {
        switch (filterType) {
          case complexTableUtils.FILTER_TYPES[0]: // 模糊搜索
            this.setSearchColumnItems(extendColumn, column);
            break;
          case complexTableUtils.FILTER_TYPES[1]: // 下拉单选搜索
            this.setSelectColumnItems(extendColumn, column);
            break;
          case complexTableUtils.FILTER_TYPES[2]: // 按日期查询，精确到日
            this.setDateColumnItems(extendColumn, column);
            break;
          case complexTableUtils.FILTER_TYPES[3]: // 下拉多选搜索
            this.setTagSelectColumnItems(extendColumn, column);
            break;
          case complexTableUtils.FILTER_TYPES[4]: // 范围数值查询
            this.setRangeColumnItems(extendColumn, column);
            break;
        }
      }
      // 处理单选、多选过滤
      if (filters) {
        extendColumn.filteredValue = this.state[`filter_${dataIndex}_check_val`] || null;
      } // 受控的单选、多选过滤
      // 若表格各列宽度和小于可展示最小宽度，则取消固定列
      // if (isLtMinWidth) { extendColumn.fixed = false }
      return {
        ...column,
        ...extendColumn,
      };
    });
  };

  getRowClassName = (record, index) => {
    const { rowClassName, rowKey = 'id' } = this.props;
    if (rowClassName) {
      return rowClassName(record, index);
    }
    return record[rowKey] === this.state.rowId && this.state.rowId && this.state.rowId !== 0
      ? 'complexTable-highlightRow'
      : '';
  };

  // 处理筛选标签关闭，更新筛选值，并传递应用层当前筛选条件
  handleAfterTagClose = (closedTag, uiState) => {
    const { filterType } = closedTag;
    const { stateStr } = uiState;
    let { toSetVal } = uiState;
    if (filterType === 'select') {
      toSetVal = undefined;
    }
    this.setState({ [stateStr]: toSetVal }, () => {
      const { onFilterTagsChange } = this.props;
      onFilterTagsChange && onFilterTagsChange(closedTag);
    });
  };
  // 处理筛选标签清空
  handleClearAllTags = toSetState => {
    this.setState(toSetState, () => {
      const { onFilterTagsChange } = this.props;
      onFilterTagsChange && onFilterTagsChange(null);
    });
  };
  handleColumnOptionVisibleChange = visible => {
    this.setState({ columnOptionVisible: visible });
  };
  // 处理 Table onChange
  handleComplexTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (!_.isEmpty(filters)) {
      // set filters 相关 state
      let toSetState = {};
      _.forOwn(filters, (value, key) => {
        const valStateStr = `filter_${key}_check_val`;
        toSetState[valStateStr] = value;
      });
      this.setState(toSetState, () => {
        onChange(pagination, filters, sorter);
      });
    } else {
      onChange(pagination, filters, sorter);
    }
  };
  // 处理列表选项 checkbox 选择
  handleCheckChange = (option, index, e) => {
    const { onListOptinChange } = this.props;
    const { checkDisabled } = option;
    if (checkDisabled) {
      return;
    }

    const { columnOption } = this.state;
    let cloneColumnOption = _.cloneDeep(columnOption);
    cloneColumnOption[index].checked = e.target.checked;
    this.setState({ columnOption: cloneColumnOption }, () => {
      onListOptinChange && onListOptinChange(option, index, e);
    });
  };
  // 处理点击列表选项 - 保存
  handleClickSaveColumOption = () => {
    const { saveColumnOptionCb } = this.props;
    this.setState(
      {
        columnOptionVisible: false,
      },
      () => {
        const { columnOption } = this.state;
        saveColumnOptionCb(columnOption);
      },
    );
  };
  // 处理点击列表选项 - 重置
  handleClickResetColumnOption = () => {
    const { columns, saveColumnOptionCb } = this.props;
    const toResetColumnOptionStates = columnOptionUtils.getColumnOptionStatesByColumns(columns);
    this.setState(
      {
        columnOptionVisible: false,
        columnOption: toResetColumnOptionStates,
      },
      () => {
        saveColumnOptionCb(toResetColumnOptionStates);
      },
    );
  };
  // 处理复杂表格进入浏览器全屏模式
  handleRequestFullScreen = () => {
    const tableDom = ReactDOM.findDOMNode(this.biciComplexTable);
    bomUtils.toFullVideo(tableDom);
  };
  // 处理列表选项拖拽
  handleMoveOption = (index, endIndex) => {
    const { handleMoveColumn } = this.props;
    if (!handleMoveColumn) {
      return;
    }
    const { columnOption } = this.state;
    const dragItem = columnOption[index];
    columnOption.splice(index, 1);
    columnOption.splice(endIndex, 0, dragItem);
    handleMoveColumn(index, endIndex);
    this.setState({
      columnOption,
    });
  };

  handleOnRow = (record, index) => {
    // 点击行
    const { onRow, rowKey = 'id' } = this.props;
    const additionalFunc = () => this.setState({ rowId: record[rowKey] });
    if (onRow) {
      const result = onRow(record, index);
      return {
        ...result,
        onClick: () => {
          result.onClick && result.onClick();
          additionalFunc();
        },
      };
    } else {
      return { onClick: additionalFunc };
    }
  };

  renderTableBar = () => {
    const {
      tableBarExtraContent,
      onFilterTagsChange,
      hasColumnOption,
      saveColumnOptionCb,
      handleMoveColumn,
      listOptionsIcon,
      size,
    } = this.props;
    let optionDropDown = null;

    // 列表选项配置
    if (hasColumnOption) {
      const { columnOptionVisible, columnOption } = this.state;
      const columnMenu = ( // 构造列表选项菜单
        <Menu className={styles.columnOptionMenu}>
          {columnOption.map((option, index) => {
            const { title, checkDisabled, checked } = option;
            const isItemChecked = checkDisabled ? true : checked;
            const draggable = !!handleMoveColumn;
            return (
              <MenuItem className={styles.menuItem} key={index}>
                <MoveItem index={index} handleEndDrag={this.handleMoveOption} draggable={draggable}>
                  <Checkbox
                    checked={isItemChecked}
                    disabled={checkDisabled}
                    onChange={this.handleCheckChange.bind(this, option, index)}
                  >
                    {title}
                  </Checkbox>
                </MoveItem>
              </MenuItem>
            );
          })}
          {saveColumnOptionCb && (
            <MenuItem key="saveColumnOption" className="cursorDefault">
              <Button
                size={size}
                onClick={this.handleClickSaveColumOption}
                type="primary"
                className="mr6"
              >
                保存
              </Button>
              <Button size={size} onClick={this.handleClickResetColumnOption}>
                重置
              </Button>
            </MenuItem>
          )}
        </Menu>
      );

      optionDropDown = (
        <Dropdown
          overlay={columnMenu}
          placement="bottomLeft"
          trigger={['click']}
          visible={columnOptionVisible}
          onVisibleChange={this.handleColumnOptionVisibleChange}
        >
          <Tooltip placement="right" title="点击选择列表选项">
            {listOptionsIcon ? (
              listOptionsIcon
            ) : (
              <BiciIcon type="list-options" style={optionIconStyle} />
            )}
          </Tooltip>
        </Dropdown>
      );
    }
    console.log('this.state', this.state);
    // 复杂表格全屏按钮 @暂时注释
    // const fullScreenBtn = allowFullScreen && (<Button className="ml8" onClick={this.handleRequestFullScreen}>全屏</Button>)
    const fullScreenBtn = null;

    if (!tableBarExtraContent && !onFilterTagsChange && !hasColumnOption) {
      return null;
    }
    return (
      <div
        className={[size === 'small' ? styles.tableBar_small : styles.tableBar]}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {optionDropDown && (
          <div style={optionWrapperStyle}>
            {optionDropDown}
            <Divider type="vertical" style={chooseDividerStyle} />
          </div>
        )}
        <div className={styles.filterTagsWrapper}>
          {onFilterTagsChange && (
            <FilterTagsBar
              filterTags={filterUtils.getFilterTagsByState(this.state)}
              handleAfterTagClose={this.handleAfterTagClose}
              handleClearAllTags={this.handleClearAllTags}
            />
          )}
        </div>
        <div style={{ marginLeft: 'auto' }}>{tableBarExtraContent}</div>
        {fullScreenBtn}
      </div>
    );
  };

  render() {
    const { pagination, tableExtraFooter, isSimplify } = this.props;
    const uncontrolledProps = _.omit(this.props, complexTableUtils.controlledProps);
    const paginationCfg = pagination === false ? false : { ...paginationDefaultCfg, ...pagination };

    const { logicalColumns, columnsScrollX } = complexTableUtils.mapColumns(this.props, this.state); // 逻辑化 Columns
    const scrollCfg = this.getScrollCfg(columnsScrollX); // 得到用于 Table 的 scroll 配置
    const componentizedColumns = this.getComponentizedColumns(logicalColumns, columnsScrollX); // 组件化 C, columnsScrollXolumns
    const Component = isSimplify ? BiciTable : Table;
    return (
      <div
        ref={el => {
          this.biciComplexTable = el;
        }}
      >
        {this.renderTableBar()}
        <Component
          bordered
          columns={componentizedColumns}
          pagination={paginationCfg}
          scroll={scrollCfg}
          rowClassName={this.getRowClassName}
          onRow={this.handleOnRow}
          onChange={this.handleComplexTableChange}
          {...uncontrolledProps}
        />
        {tableExtraFooter}
      </div>
    );
  }
}

ComplexTable.propTypes = {
  minWidth: PropTypes.number, // 表格最小展示宽度，小于该宽度表格会展示横向滚动条
  tableBarExtraContent: PropTypes.element, // 表格上方区域右侧的额外内容
  initialFilterTags: PropTypes.array, // 初始化条件筛选标签
  onFilterTagsChange: PropTypes.oneOfType([
    // 条件筛选标签改变触发的回调
    PropTypes.func,
    PropTypes.bool,
  ]),
  hasColumnOption: PropTypes.bool, // 是否显示列表选项控制
  initialColumnOption: PropTypes.array, // 初始化列表选项配置，一般是应用层通过接口请求获得
  saveColumnOptionCb: PropTypes.func, // 处理保存列表选项的回调
  rowSymbol: PropTypes.string, // dataSource 行数据中的唯一键，设置了字符串类型的 rowKey 时（推荐）不必设置此值，用于点击表格行高亮功能
  allowFullScreen: PropTypes.bool, // 是否显示复杂表格全屏功能按钮
  tableExtraFooter: PropTypes.element, // 表格底部区域
  listOptionsIcon: PropTypes.element, // 自定义列表选项图标
  isSimplify: PropTypes.bool, // 减少其不要的渲染（行选中等操作，支持大数据多行展示）

  // 仅对进行了 format 的 AntD props 进行类型检测
  columns: PropTypes.array.isRequired, // AntD - 表格列的配置描述
  handleMoveColumn: PropTypes.func, // 列表项排序
  pagination: PropTypes.oneOfType([
    // AntD - 分页器，设为 false 时不展示和进行分页
    PropTypes.object,
    PropTypes.bool,
  ]),
  scroll: PropTypes.object, // AntD - 横向或纵向支持滚动，也可用于指定滚动区域的宽高度
  size: PropTypes.oneOf(['small', 'default']), // 控制按钮大小
};

ComplexTable.defaultProps = {
  minWidth: dimensions.PAGER_MAIN_WIDTH,
  onFilterTagsChange: false,
  hasColumnOption: false,
  allowFullScreen: false,
  tableExtraFooter: null,
  listOptionsIcon: null,
  isSimplify: false,

  pagination: false,
  size: 'default',
};

export default DragDropContext(HTML5Backend)(ComplexTable);
