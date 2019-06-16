import React from 'react';
import classNames from 'classnames';

import { storeIds, byId, iconMaps } from './data';
import './index.scss';

export default class Material extends React.Component {

  static defaultProps = {
    id: 0,
    size: 70
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

    const { count, size } = this.props;
    const { name, rarity } = item;
    const maClazz = classNames('oli-material', `rarity-${rarity}`);
    const style = {
      width: size,
      height: size,
    };

    return (
      <div className={maClazz} style={style}>
        <img src={image} alt={name} title={name} />
        {
          !('noCount' in this.props) && (
            <span className="count">{count}</span>
          )
        }
      </div>
    );
  }
}

Material.storeIds = storeIds();
