import React from 'react';
import classNames from 'classnames';

import { byId, imageList } from './data/akmaterial';
import './index.scss';

import '../../assets/images/material/0.png';

export default class Material extends React.Component {

  static defaultProps = {
    id: 0
  };

  constructor(props) {
    super(props);

    const { id } = props;
    const cur = byId(id);
    const image = imageList[id];

    this.state = {
      image,
      ma: cur
    };
  }

  render() {
    const { id } = this.props;
    const { ma, image } = this.state;

    const maClazz = classNames('oli-material');
    return (
      <div className={maClazz}>
        <img src={image} alt={ma.name} title={ma.name} />
        <p>{ma.name}</p>
      </div>
    );
  }
}
