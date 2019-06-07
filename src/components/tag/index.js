import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import Icon from '../icon';

export default class Tag extends Component {

  static defaultProps = {
    onClose: () => { },
    onChange: () => { },
    // closable: false,
    // checkable: false,
    // checked: false,
    // color: 'blue', // 暂时没用
    defaultChecked: false,
  };

  static getDerivedStateFromProps(nextProps) {
    const newState = {};
    if ('color' in nextProps) {
      newState.hasColor = true;
    }

    if ('checkable' in nextProps && 'checked' in nextProps) {
      newState.checked = nextProps.checked;
    }

    return newState;
  }

  constructor(props) {
    super(props);

    const { defaultChecked } = props;
    this.state = {
      visible: true,
      checked: defaultChecked,
    };
  }

  setVisible(visible, e) {
    const { onClose } = this.props;
    if (onClose) {
      onClose(e);
    }

    if (e.defaultPrevented) {
      return;
    }

    if (!('visible' in this.props)) {
      this.setState({ visible });
    }
  }

  handleCloseClick = (e) => {
    this.setVisible(false, e);
  };

  handleClick = () => {
    if (('checkable' in this.props)) {
      this.setState({
        checked: !this.state.checked
      }, () => {
        const {checked} = this.state;
        console.log('after tag click', checked);
        this.props.onChange(checked);
      });
    }
  };

  render() {
    const {
      className,
      children,
      closable,
      checkable,
      style = {},
    } = this.props;

    const { checked, visible } = this.state;

    const clazz = classNames('oli-tag', className, {
      'oli-tag-checkable': checkable,
      'checked': checked
    });

    return visible ? (
      <div
        style={style}
        className={clazz}
        onClick={this.handleClick}
      >
        {children}
        {
          closable && (
            <Icon type="close" onClick={this.handleCloseClick} />
          )
        }
      </div>
    ) : '';
  }
}
