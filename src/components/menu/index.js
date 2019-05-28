import React from 'react';

import classNames from 'classnames';
import './index.scss';

export default class Menu extends React.Component {

  static defaultProps = {
    type: 'horizontal', // vertical
  };

  render() {
    const { type, children } = this.props;
    const menuClazz = classNames('oli-menu', type);
    return (
      <ul className={menuClazz}>
        {children}
      </ul>
    );
  }

}

export class MenuItem extends React.Component {

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
