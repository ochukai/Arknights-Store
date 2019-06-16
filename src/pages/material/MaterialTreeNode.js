import React, { Component } from 'react';
import './index.scss';

// import _ from 'lodash';
// import store from 'store';

import { Material, Counter } from '../../components';

export default class MaterialTreeNode extends Component {

  handleCounterChange = (value) => {
    const { item } = this.props;
    this.props.onCounterChange(item, value);
  };

  renderChildNode(item) {
    const { count, req = 0, name, id } = item;
    const total = count * req;
    // const storeCount = store.get(id);

    let descSpan;
    // if (storeCount && req) {
    //   const result = storeCount > total ? 0 : total - storeCount;
    //   descSpan = <span><strong>{count}</strong> * {req} = {total} - {storeCount} = {result}</span>
    // } else
    if (req) {
      descSpan = <span><strong>{count}</strong> * {req} = {total}</span>
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
      </div>
    );
  }

  render() {
    const { item, level } = this.props;
    if (level > 0) {
      return this.renderChildNode(item);
    }

    return (
      <div className="root-node-wrapper">
        <Material id={item.id} noCount size={60} />
        <h1>{item.name}</h1>
        <Counter onChange={this.handleCounterChange} />
      </div>
    );
  }
}
