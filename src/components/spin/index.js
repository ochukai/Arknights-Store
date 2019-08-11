import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

export default class Spin extends Component {

  static defaultProps = {
    size: 'default', // small, large, xlarge
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      size,
      style = {}
    } = this.props;

    const clazz = classNames('oli-spin', className, size);
    return (
      <div className={clazz} style={style}>
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
}
