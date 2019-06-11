import React from 'react';
import classNames from 'classnames';

import { storeIds, byId, iconMaps } from './data';
import './index.scss';

export default class Material extends React.Component {

  static defaultProps = {
    id: 0
  };

  static getDerivedStateFromProps(nextProps) {
    const newState = {};
    if (nextProps.id) {
      const item = byId(nextProps.id);
      if (item) {
        const { iconId } = item;
        newState.image = iconMaps[iconId];
        newState.item = item;
      }
    }

    return newState;
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { item, image } = this.state;
    if (!item) {
      return <span>error</span>;
    }

    const { name, rarity } = item;
    const maClazz = classNames('oli-material', `rarity-${rarity}`);
    return (
      <div className={maClazz}>
        <img src={image} alt={name} title={name} />
        <span className="count">12</span>
      </div>
    );
  }
}

Material.storeIds = storeIds();
