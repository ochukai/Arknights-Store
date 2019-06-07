import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

export default class Footer extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      children,
    } = this.props;

    const clazz = classNames('oli-layout-footer', className);

    return (
      <footer className={clazz}>
        {children}
      </footer>
    );
  }
}
