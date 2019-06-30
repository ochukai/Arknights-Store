import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';

import { Card, Rate, Tag } from '../../components';
import history from '../../history';

export default class CharItem extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCardClick = () => {
    const {item} = this.props;
    history.push(`/char/${item.id}`);
  };

  render() {
    const {
      className,
      item,
    } = this.props;

    const { tagList = [] } = item;
    const clazz = classNames('simple-char-item', className);
    const style = {};
    if (item.color) {
      style.border = `1px solid ${item.color}`;
      if (item.color === '#ffffff') {
        style.border = `1px solid #399c9c`;
      }
    }

    return (
      <Card className={clazz} onClick={this.handleCardClick}>
        <h3 title={item.description}>
          {item.name} <small>{item.profession}</small>
          {item.team !== '无团队' && <Tag style={style}>{item.team}</Tag>}
        </h3>
        <Rate className={`char-rarity-${item.star}`} value={item.star} />
        <div className="char-tags-wrapper">
          {tagList.map(tag => <Tag key={tag} className="char-tag">{tag}</Tag>)}
        </div>
      </Card>
    );
  }
}
