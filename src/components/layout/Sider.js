import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

export default class Sider extends Component {

  static defaultProps = {
    dark: false,
    width: 200,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      children,
      dark,
      width,
    } = this.props;

    const siderStyle = {
      flex: `0 0 ${width}px`,
      maxWidth: width,
      minWidth: width,
      width,
    };

    const clazz = classNames('oli-layout-sider', className, {
      'oli-layout-sider-dark': dark
    });

    const innerClazz = classNames('oli-layout-sider-children');

    return (
      <header className={clazz} style={siderStyle}>
        <div className={innerClazz}>
          {children}
        </div>
      </header>
    );
  }
}
