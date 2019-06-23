import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import _ from 'underscore';
import isMobile from '../../common/isMobile';

export default class Sider extends Component {

  static defaultProps = {
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
      const { hideOn } = this.props;

      if (_.isString(hideOn) && hideOn === 'mobile') {
        this.setState({
          show: !isMobile()
        });
      } else {
        const match = window.matchMedia(`(max-width: ${this.props.hideOn}px)`);
        this.handleWidthChange(match);
        match.addListener(this.handleWidthChange);
      }
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
      width,
    } = this.props;

    const siderStyle = {
      flex: `0 0 ${width}px`,
      maxWidth: width,
      minWidth: width,
      width,
    };

    if ('fixed' in this.props) {
      siderStyle.position = 'fixed';
      siderStyle.height = '100%';
    }

    const clazz = classNames('oli-layout-sider', className, {
      'oli-layout-sider-dark': 'dark' in this.props,
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
