import React, { Component } from 'react';
import './NumberInput.scss';

import classNames from 'classnames';
import _ from 'underscore';

import Input from './';
import Button from '../button';

export default class NumberInput extends Component {

  static defaultProps = {
    value: 0,
    step: 1,
    min: 0,
    max: 999,
    onChange: () => {}
  };

  constructor(props) {
    super(props);

    const { value } = this.props;
    const defaultValue = !_.isUndefined(value) && this.check(value);
    this.state = {
      value: defaultValue,
    };
  }

  check(value) {
    const { min, max } = this.props;
    if (!_.isNumber(value) || _.isNaN(value)) {
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

  handleValueChange(type, rate = 1) {
    const { value } = this.state;
    const { step } = this.props;
    const newValue = type === 1
      ? value + step * rate
      : value - step * rate;

    const checkedValue = this.check(newValue);
    if (checkedValue !== value) {
      this.setState({
        value: checkedValue
      }, () => {
        this.props.onChange(checkedValue);
      });
    }
  }

  handlePlus = (e) => {
    e.stopPropagation();
    this.handleValueChange(1);
  };

  handleMinus = (e) => {
    e.stopPropagation();
    this.handleValueChange(2);
  };

  handleInputChange = (value) => {
    const checkedValue = this.check(value);
    this.setState({
      value: checkedValue
    }, () => {
      this.props.onChange(checkedValue);
    });
  };

  render() {
    const {
      className,
    } = this.props;

    const { value } = this.state;

    const clazz= classNames('oli-number-input', className);
    return (
      <div className="oli-number-input-wrapper">
        <Button
          className="left"
          icon="plus"
          size="small"
          round={true}
          onClick={this.handlePlus}
        />
        <Input
          className={clazz}
          type="number"
          value={value}
          onChange={this.handleInputChange}
        />
        <Button
          className="right"
          icon="minus"
          size="small"
          round={true}
          onClick={this.handleMinus}
        />
      </div>
    );
  }
}
