import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

import Header from './Header';
import Content from './Content';
import Sider from './Sider';
import Footer from './Footer';

export default class Layout extends Component {

  static defaultProps = {
    hasSider: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      children,
      hasSider
    } = this.props;

    const layoutClazz = classNames('oli-layout', className, {
      'oli-layout-has-sider': hasSider
    });

    return (
      <section className={layoutClazz}>
        {children}
      </section>
    );
  }
}

Layout.Header = Header;
Layout.Content = Content;
Layout.Sider = Sider;
Layout.Footer = Footer;
