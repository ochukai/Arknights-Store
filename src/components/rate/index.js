import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

import Icon from '../icon';

export default class Rate extends Component {

  static defaultProps = {
    defaultValue: 0
  };

  static getDerivedStateFromProps(nextProps) {
    const newState = {};
    if ('value' in nextProps) {
      newState.value = nextProps.value;
    }

    return newState;
  }

  constructor(props) {
    super(props);

    const { defaultValue } = props;
    this.state = {
      value: defaultValue
    };
  }

  renderItems(num) {
    if (!num) {
      return '';
    }

    const iconType = 'icon' in this.props
      ? this.props.icon
      : 'star-fill';

    const items = [];
    let index = 0;
    while(index < num) {
      items.push(
        <li className="oli-rate-item" key={index}>
          <Icon type={iconType} />
        </li>
      );

      index ++;
    }

    return items;
  }

  render() {
    const {
      className,
    } = this.props;

    const { value } = this.state;

    const clazz = classNames('oli-rate', className);

    return (
      <ul className={clazz}>
        { this.renderItems(value) }
      </ul>
    );
  }
}
