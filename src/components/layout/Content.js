import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

export default class Content extends Component {

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

    const clazz = classNames('oli-layout-content', className);

    return (
      <main className={clazz}>
        {children}
      </main>
    );
  }
}
