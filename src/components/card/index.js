import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

export default class Card extends Component {

  static defaultProps = {
    // width: 300, // default width
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      children,
      style = {},
      ...props
    } = this.props;

    const cardClazz = classNames('oli-card', className);

    const cardStyle = style;
    if ('width' in this.props) {
      cardStyle.width = this.props.width;
    }

    return (
      <div className={cardClazz} style={cardStyle} {...props}>
        {children}
      </div>
    );
  }
}
