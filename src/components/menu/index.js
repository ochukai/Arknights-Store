import React from 'react';

import classNames from 'classnames';
import './index.scss';

export default class Menu extends React.Component {

  static defaultProps = {
    type: 'horizontal', // vertical
    theme: 'dark',
  };

  render() {
    const {
      type,
      theme,
      children
    } = this.props;

    const menuClazz = classNames('oli-menu', type, theme);
    return (
      <ul className={menuClazz}>
        {children}
      </ul>
    );
  }
}

class MenuItem extends React.Component {

  render() {
    const { children } = this.props;
    const itemClazz = classNames('oli-menu-item');
    return (
      <li className={itemClazz}>
        {children}
      </li>
    )
  }
}

Menu.Item = MenuItem;

