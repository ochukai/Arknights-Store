import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import _ from 'underscore';

export default class Input extends Component {

  static defaultProps = {
    size: 'default',
    prefix: null,
    suffix: null,
    type: 'text', // text, email, number, password,
    onChange: () => {}
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
      value: defaultValue,
    };
  }

  handleChange = (e) => {
    const { value } = e.target;

    const { type } = this.props;
    let convertValue = value;
    if (type === 'number') {
      convertValue = Number(value);
      if (_.isNaN(convertValue)) {
        return;
      }
    }

    this.setState({
      value: convertValue
    }, () => {
      this.props.onChange(convertValue);
    });
  };

  renderInputWithAddon(input, prefix, suffix, clazz) {
    return (
      <div className={clazz}>
        {
          !!prefix && (
            <div className="oli-input-prefix">
              {prefix}
            </div>
          )
        }
        {input}
        {
          !!suffix && (
            <div className="oli-input-suffix">
              {suffix}
            </div>
          )
        }
      </div>
    );
  }

  render() {
    const {
      className,
      size,
      prefix,
      suffix,
    } = this.props;

    const { value } = this.state;

    const clazz = classNames('oli-input', {
      'oli-input-lg': size === 'large',
      'oli-input-sm': size === 'small',
      'has-prefix': prefix !== null,
      'has-suffix': suffix !== null,
    }, className);

    const inputProps = {
      className: clazz,
      value,
      onChange: this.handleChange
    };

    if ('disabled' in this.props) {
      inputProps.disabled = true;
    }

    const input = <input {...inputProps} />;

    if (prefix || suffix) {
      const wrapperClass = classNames('oli-input-wrapper', {
        'lg': size === 'large',
        'sm': size === 'small',
      });
      return this.renderInputWithAddon(input, prefix, suffix, wrapperClass);
    }

    return input;
  }
}
