import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

import Header from './Header';
import Content from './Content';
import Sider from './Sider';
import Footer from './Footer';
import isTypeOf from '../../common/isTypeOf';

export default class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      children,
      style,
    } = this.props;

    const childArr = React.Children.toArray(children);
    const hasSider = childArr.some(ele => isTypeOf(ele, 'Sider'));

    const layoutClazz = classNames('oli-layout', className, {
      'oli-layout-has-sider': hasSider
    });

    return (
      <section className={layoutClazz} style={style}>
        {children}
      </section>
    );
  }
}

Layout.Header = Header;
Layout.Content = Content;
Layout.Sider = Sider;
Layout.Footer = Footer;
