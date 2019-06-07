import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import Icon from '../icon';

/**
 * dataSource -> { key/id, ...attrs }
 *
 * columns -> { key, dataIndex, title, width, className, sortable, render => {} }
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

  constructor(props) {
    super(props);
    this.state = {};
  }

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
    return (
      <thead className="oli-table-thead">
        <tr>
          {columns.map(col => {
            const { title, width, style, key, sortable } = col;
            const hasSort = !!sortable;
            const clazz = classNames({
              'oli-table-column-has-actions': hasSort,
              'oli-table-column-has-sorters': hasSort,
              'oli-table-column-sort': hasSort,
            });

            return (
              <th width={width} style={style} key={key} className={clazz}>
                <span className="oli-table-header-column">
                  <div className={hasSort ? 'oli-table-column-sorters' : ''}>
                    <span className="oli-table-column-title">{title}</span>
                    <span className="oli-table-column-sorter">
                      {
                        hasSort ? (
                          <div className="oli-table-column-sorter-inner oli-table-column-sorter-inner-full">
                            <Icon type="up" className="oli-table-column-sorter-up up"/>
                            <Icon type="down" className="oli-table-column-sorter-down down" />
                          </div>
                        ) : null
                      }
                    </span>
                  </div>
                </span>
              </th>
            )
          })}
        </tr>
      </thead>
    );
  }

  renderTBody(data, columns) {
    return (
      <tbody className="oli-table-tbody">
        {data.map((row, index) => {
          return (
            <tr className="oli-table-row" key={index}>
              {columns.map((col, colIndex) => {
                const { dataIndex, render } = col;
                const text = row[dataIndex];
                const value = render
                  ? render(text, row, index)
                  : text;

                return <td key={colIndex}>{value}</td>;
              })}
            </tr>
          )
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
    } = this.props;

    const clazz = classNames('oli-table', `oli-table-${size}`, className, {
      'oli-table-default': true,
      'oli-table-bordered': border,
    });

    return (
      <div className="oli-table-wrapper">
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
