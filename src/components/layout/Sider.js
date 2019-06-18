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
    this.state = {
      show: true,
    };
  }

  componentDidMount() {
    if ('hideOn' in this.props) {
      const match = window.matchMedia(`(max-width: ${this.props.hideOn}px)`);
      this.handleWidthChange(match);
      match.addListener(this.handleWidthChange);
    }
  }

  handleWidthChange = (e) => {
    console.log('handle width change', e);
    this.setState({
      show: !e.matches
    });
  };

  render() {
    // media query 的结果显示这个东西不适合显示
    const { show } = this.state;
    if (!show) {
      return null;
    }

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
      <aside className={clazz} style={siderStyle}>
        <div className={innerClazz}>
          {children}
        </div>
      </aside>
    );
  }
}
