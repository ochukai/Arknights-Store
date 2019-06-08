import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

import Icon from '../icon';

export default class Th extends Component {

  static defaultProps = {
    col: {}
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (e) => {
    if (this.props.onClick) {
      const { col } = this.props;
      this.props.onClick({ name: col.dataIndex });
    }
  };

  renderSorter() {
    const { order } = this.props;
    const upClass = classNames('oli-table-column-sorter-up', 'up', {
      'on': order === 'asc'
    });

    const downClass = classNames('oli-table-column-sorter-down', 'down', {
      'on': order === 'desc'
    });

    return (
      <div className="oli-table-column-sorter-inner oli-table-column-sorter-inner-full">
        <Icon type="up" className={upClass} />
        <Icon type="down" className={downClass} />
      </div>
    );
  }

  render() {
    const { col, order } = this.props;
    const { title, width, style, key, sortable } = col;

    const hasSort = sortable;
    const clazz = classNames({
      'oli-table-column-has-actions': hasSort,
      'oli-table-column-has-sorters': hasSort,
      'oli-table-column-sort': hasSort,
    });

    const thProps = {
      key,
      width,
      style,
      className: clazz
    };

    if (hasSort) {
      thProps.onClick = this.handleClick;
    }

    return (
      <th {...thProps}>
        <span className="oli-table-header-column">
          <div className={hasSort ? 'oli-table-column-sorters' : ''}>
            <span className="oli-table-column-title">{title}</span>
            <span className="oli-table-column-sorter">
              { hasSort ? this.renderSorter() : null }
            </span>
          </div>
        </span>
      </th>
    )
  }
}
