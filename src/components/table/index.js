import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import _ from 'underscore';

import Th from './Th';
import Tr from './Tr';

const sortSequences = [
  '', // 第三次点击复原
  'asc',
  'desc',
];

/**
 * dataSource -> { key/id, ...attrs }
 *
 * columns -> { key, dataIndex, title, width, className, sortable, sortFn, render => {} }
 *
 * header, footer
 *
 * border
 *
 * loading
 *
 * expandRowRender
 * expendRowKeys
 * expandRowByClick
 * expandIcon
 * identSize -> 15px
 * sortable
 *
 */
export default class Table extends Component {

  static defaultProps = {
    loading: false,
    border: true,
    columns: [],
    dataSource: [],
    size: 'middle',
  };

  state = {
    sortOrder: '',
    sortColumn: '',
    filters: [
      // column,
      // values
    ],
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  isSortSameColumn(name) {
    const { sortColumn } = this.state;
    if (!sortColumn) {
      return false; // 上次并没有排序
    }

    return sortColumn === name;
  }

  /**
   *
   * @param {*} name
   * @param {*} order // 第一次点击 顺序 排列
   */
  resetSort(name, order = sortSequences[1]) {
    // console.log('reset sort', name, order);

    this.setState({
      sortColumn: name,
      sortOrder: order,
    });
  }

  handleThClick = (th = {}) => {
    // console.log('handleThClick', th);

    const { name } = th;
    if (!this.isSortSameColumn(name)) {
      this.resetSort(name);
      return;
    }

    // 需要排序的列 没有变，要改变顺序
    const { sortOrder } = this.state;
    const lastIndex = _.indexOf(sortSequences, sortOrder);
    const nextIndex = lastIndex > -1
      ? lastIndex === sortSequences.length - 1 // 如果是最后一个 下次从第一个开始哦
        ? 0
        : lastIndex + 1
      : 1; // 上次不知道是什么值，这次 顺序

    this.resetSort(name, sortSequences[nextIndex]);
  };

  handleRowClick = () => {

  };

  renderTitle() {
    const { header } = this.props;
    if (!header) {
      return '';
    }

    return (
      <div className="oli-table-title">
        {header}
      </div>
    );
  }

  renderFooter() {
    const { footer } = this.props;
    if (!footer) {
      return '';
    }

    return (
      <div className="oli-table-footer">
        {footer}
      </div>
    );
  }

  renderTHead(columns) {
    const {
      sortColumn,
      sortOrder
    } = this.state;

    return (
      <thead className="oli-table-thead">
        <tr>
          {columns.map(col => {
            const { key, dataIndex } = col;
            const order = sortColumn === dataIndex
              ? sortOrder
              : '';

            return (
              <Th
                col={col}
                key={key}
                order={order}
                onClick={this.handleThClick}
              />
            );
          })}
        </tr>
      </thead>
    );
  }

  getColumn(name) {
    const { columns } = this.props;
    return columns.filter(col => col.dataIndex === name)[0];
  }

  computeTableData(data) {
    const {
      sortColumn,
      sortOrder
    } = this.state;

    let ret = data;
    if (sortColumn) {
      const column = this.getColumn(sortColumn);
      const { sortFn } = column;
      const sorter = sortFn || sortColumn;
      switch(sortOrder) {
        case 'asc':
          ret = _.sortBy(ret, sorter);
          break;

        case 'desc':
          ret = _.sortBy(ret, sorter).reverse();
          break;

        default:
          // 啥都不做
          break;
      }
    }

    return ret;
  }

  renderTBody(data, columns) {
    const computed = this.computeTableData(data);
    return (
      <tbody className="oli-table-tbody">
        {computed.map((row, index) => {
          const { id, key } = row;
          return (
            <Tr
              key={id || key || index}
              index={index}
              columns={columns}
              row={row}
              onClick={this.handleRowClick}
            />
          );
        })}
      </tbody>
    );
  }

  render() {
    const {
      className,
      columns,
      dataSource,
      border,
      size,
      style = {}
    } = this.props;

    const clazz = classNames('oli-table', `oli-table-${size}`, className, {
      'oli-table-default': true,
      'oli-table-bordered': border,
    });

    return (
      <div className="oli-table-wrapper" style={style}>
        <div className={clazz}>
          {this.renderTitle()}
          <div className="oli-table-content">
            <div className="oli-table-body">
              <table>
                {this.renderTHead(columns)}
                {this.renderTBody(dataSource, columns)}
              </table>
            </div>
            {this.renderFooter()}
          </div>
        </div>
      </div>
    );
  }
}
