import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import _ from 'underscore';

import Button from '../button';

export default class Counter extends Component {

  static defaultProps = {
    value: 0, // default value
    min: 0,
    max: 99,
    gap: 1, // 每次加减多少，默认 1
  };

  constructor(props) {
    super(props);

    const { value } = this.props;
    const defaultValue = !_.isUndefined(value) && this.isValid(value)
      ? value
      : 0;

    this.state = {
      value: defaultValue,
    };
  }

  isValid(value) {
    const { min, max } = this.props;
    if (!_.isNumber(value)) {
      return false;
    }

    return value >= min && value <= max;
  }

  handleValueChange = (type) => {
    const { value } = this.state;
    const { gap } = this.props;
    const newValue = type === 1
      ? value + gap
      : value - gap;

    if (this.isValid(newValue)) {
      this.setState({
        value: newValue
      })
    }
  };

  handlePlusClick = () => {
    this.handleValueChange(1);
  };

  handleMinusClick = () => {
    this.handleValueChange(2);
  };

  render() {
    const { name } = this.props;
    const { value } = this.state;
    const counterClazz = classNames({
      'oli-counter': true,
    });

    return (
      <div className={counterClazz}>
        <div className="value-control">
          <span>{value}</span>
          <Button
            className="left"
            icon="plus"
            size="xs"
            round="true"
            onClick={this.handlePlusClick}
          />
          <Button
            className="right"
            icon="minus"
            size="xs"
            round="true"
            onClick={this.handleMinusClick}
          />
        </div>
        <div className="label">
          <span>{name}</span>
        </div>
      </div>
    );

  }
}
