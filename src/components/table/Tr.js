import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

export default class Tr extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      index,
      columns,
      row,
      className,
    } = this.props;

    const clazz= classNames('oli-table-row', className);

    return (
      <tr className={clazz}>
        {columns.map((col, colIndex) => {
          const { dataIndex, render } = col;
          const text = row[dataIndex];
          const value = render
            ? render(text, row, index)
            : text;

          return <td key={colIndex}>{value}</td>;
        })}
      </tr>
    );
  }
}
