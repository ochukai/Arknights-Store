import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

export default class AKMaterial extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className
    } = this.props;

    const clazz= classNames('oli-material', className);

    return (
      <div className={clazz}>
        Material
      </div>
    );
  }
}
