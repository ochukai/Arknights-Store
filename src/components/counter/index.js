import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import _ from 'underscore';

import Button from '../button';

export default class Counter extends Component {

  static defaultProps = {
    value: 0, // default value
    min: 0,
    max: 999,
    gap: 1, // 每次加减多少，默认 1
  };

  constructor(props) {
    super(props);

    const { value } = this.props;
    const defaultValue = !_.isUndefined(value) && this.check(value);
    this.state = {
      value: defaultValue,
      hover: false,
    };
  }

  check(value) {
    const { min, max } = this.props;
    if (!_.isNumber(value)) {
      return 0;
    }

    if (value > max) {
      return max;
    }

    if (value < min) {
      return min;
    }

    return value;
  }

  handleValueChange = (type, rate = 1) => {
    const { value } = this.state;
    const { gap } = this.props;
    const newValue = type === 1
      ? value + gap * rate
      : value - gap * rate;

    const checkedValue = this.check(newValue);
    if (checkedValue !== value) {
      this.setState({
        value: checkedValue
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(checkedValue);
        }
      });
    }
  };

  handlePlusClick = (e) => {
    e.stopPropagation();
    this.handleValueChange(1);
  };

  handleMinusClick = (e) => {
    e.stopPropagation();
    this.handleValueChange(2);
  };

  handlePlusTenClick = (e) => {
    e.stopPropagation();
    this.handleValueChange(1, 10);
  };

  handleMinusTenClick = (e) => {
    e.stopPropagation();
    this.handleValueChange(2, 10);
  };

  handleMouseEnter = () => {
    this.setState({hover: true});
  };

  handleMouseLeave = () => {
    this.setState({hover: false});
  };

  render() {
    const { value, hover } = this.state;
    const counterClazz = classNames({
      'oli-counter': true,
    });

    return (
      <div
        className={counterClazz}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {
          hover && (
            <div className="top fadeInDown animated">
              <Button
                icon="plus"
                size="xs"
                onClick={this.handlePlusClick}
              />
              <Button
                icon="plus"
                size="xs"
                onClick={this.handlePlusTenClick}
              >10</Button>
            </div>
          )
        }

        <div className="value-control">
          <span>{value}</span>
        </div>

        {
          hover && (
            <div className="bottom fadeInUp animated">
              <Button
                icon="minus"
                size="xs"
                onClick={this.handleMinusClick}
              />
              <Button
                icon="minus"
                size="xs"
                onClick={this.handleMinusTenClick}
              >10</Button>
            </div>
          )
        }
      </div>
    );
  }
}
