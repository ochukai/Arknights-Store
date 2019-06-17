import React, { Component } from 'react';
import './index.scss';

import memoizeOne from 'memoize-one';
// import _ from 'lodash';
import store from 'store';

import { Material, Counter } from '../../components';

import allItems from '../../data/items/items.json';

export const dropRateMaps = {
  5: '罕见',
  4: '小概率',
  3: '概率',
  2: '大概率',
  1: '固定',
};

export default class MaterialTreeNode extends Component {

  handleCounterChange = (value) => {
    const { item } = this.props;
    this.props.onCounterChange(item, value);
  };

  renderChildNode(item, drops) {
    const {
      count,
      req = 0,
      name,
      id,
      store = 0
    } = item;
    const total = count * req;

    let descSpan;
    if (store && req) {
      const result = store > total ? 0 : total - store;
      const style = {};
      if (result === 0) {
        style.textDecoration = 'line-through';
      }

      descSpan = (
        <span style={style}>
          <strong>{count}</strong> * {req} = {total} - {store}(库存) = <strong>{result}</strong>
        </span>
      );
    } else if (req) {
      descSpan = <span><strong>{count}</strong> * {req} = <strong>{total}</strong></span>
    } else {
      descSpan = <span><strong>{count}</strong></span>
    }

    return (
      <div className="child-node-wrapper">
        <Material id={id} noCount size={50} />
        <div className="mate-wrapper">
          <h2>{name}</h2>
          {descSpan}
        </div>
        {this.renderDrops(drops)}
      </div>
    );
  }

  findDrops = memoizeOne((id) => {
    const item = allItems.filter(ai => ai.id === id)[0];
    if (item) {
      return item.drops.map(drop => {
        const { occPer, stage = {} } = drop;
        return {
          occPer,
          code: stage.code
        }
      });
    }

    return [];
  });

  renderDrops(drops = []) {
    if (drops.length === 0) {
      return;
    }

    return (
      <div className="material-drops">
        {drops.map((drop, index) => {
          const { code, occPer } = drop;
          const style = {};
          switch(occPer) {
            case 5:
              style.color = 'red';
              break;
            case 4:
              style.color = 'orange';
              break;
            case 1:
              style.color = 'green';
              break;
          }

          return (
            <p
              key={index}
              style={style}
            >
              {drop.code}（{dropRateMaps[drop.occPer]}）
            </p>
          );
        })}
      </div>
    );
  }

  renderRootCount(item) {
    const { req = 0, store = 0 } = item;

    if (store === 0) {
      return;
    }

    if (req === 0) {
      return <span>{store}(库存)</span>;
    }

    const need = req - store;
    const result = need < 0 ? 0 : need;
    const style = {};
    if (result === 0) {
      style.textDecoration = 'line-through';
    }

    return (
      <span style={style}>
        {req} - {store}(库存) = <strong>{result}</strong>
      </span>
    );
  }

  render() {
    const { item, level } = this.props;
    const drops = this.findDrops(item.id);
    if (level > 0) {
      return this.renderChildNode(item, drops);
    }

    return (
      <div className="root-node-wrapper">
        <Material id={item.id} noCount size={60} />
        <div className="mate-wrapper">
          <h1>{item.name}</h1>
          {this.renderRootCount(item)}
        </div>
        <Counter onChange={this.handleCounterChange} />
        {this.renderDrops(drops)}
      </div>
    );
  }
}
