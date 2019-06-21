/**
 * props: key, title, children, loading ...
 */
import React, { Component } from 'react';

import classNames from 'classnames';

export default class Pane extends Component {

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
      active
    } = this.props;

    const clazz = classNames('oli-tab-pane', className, {
      active
    });

    return (
      <div className={clazz}>
        {children}
      </div>
    );
  }
}
