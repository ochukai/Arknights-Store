import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

export default class Icon extends Component {

  static defaultProps = {
    type: 'gift', // default icon is a gift
    theme: 'outlined', // outlined,
    rotate: 0,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      type,
      theme,
      className,
      ...props
    } = this.props;

    const cls = theme === 'fill'
      ? `ak-${type}-fill`
      : `ak-${type}`;

    const iconClazz = classNames('ak-icon', className, cls);

    return (
      <i className={iconClazz} {...props}></i>
    );
  }
}
