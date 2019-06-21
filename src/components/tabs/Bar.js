import React, { Component } from 'react';

import classNames from 'classnames';

export default class Bar extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLiClick = () => {

  };

  render() {
    const {
      className,
      items,
      active,
      onClick
    } = this.props;

    const clazz = classNames('oli-tabbar', className);
    return (
      <ul className={clazz}>
        {
          items.map(item => {
            return (
              <BarItem
                key={item.key}
                item={item}
                active={item.key === active}
                onClick={onClick}
              />
            );
          })
        }
      </ul>
    );
  }
}


class BarItem extends React.Component {

  handleLiClick = () => {
    const { item } = this.props;
    this.props.onClick(item);
  };

  render () {
    const { item, active } = this.props;
    const liClazz = classNames({
      active
    });

    return (
      <li
        className={liClazz}
        key={item.key}
        onClick={this.handleLiClick}
      >
        {item.bar}
      </li>
    );
  }
}
