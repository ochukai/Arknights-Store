import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import _ from 'lodash';

import materialItems from '../../data/items/material_items.json';

import { Material, Tree, Layout } from '../../components';

import MaterialTreeNode from './MaterialTreeNode';

export default class AKMaterial extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      items: _.clone(materialItems),
      flatItems: [],
    };
  }

  updateInnerCount(item, count) {
    if (item.children.length === 0) {
      return;
    }

    item.children.forEach(ic => {
      ic.req = count;
      this.updateInnerCount(ic, count * ic.count);
    });
  }

  computeCount = (item, result) => {
    const { id, count = 1, req = 0, rarity, children = [] } = item;
    if (!req) { // 没有需求就算了
      return;
    }

    console.log(item);

    let exist = false;
    result.forEach(dummy => {
      if (dummy.id === item.id) {
        dummy.count += req * count;
        exist = true;
      }
    });

    if (!exist) {
      result.push({
        id: id,
        count: req * count,
        rarity: rarity,
      });

      exist = true;
    }

    if (children.length > 0) {
      children.forEach(foo => this.computeCount(foo, result));
    }
  };

  handleCounterChange = (item, value) => {
    const { id } = item;
    const { items } = this.state;

    const newItems = _.clone(items);
    const cur = newItems.filter(i => i.id === id)[0];
    if (cur) {
      cur.req = value;
      this.updateInnerCount(cur, value);
    }

    const newFlatItems = [];
    newItems.forEach(ni => {
      if (ni.children && ni.children.length > 0) {
        ni.children.forEach(foo => this.computeCount(foo, newFlatItems));
      } else {
        this.computeCount(ni, newFlatItems);
      }
    });

    this.setState({
      items: newItems,
      flatItems: newFlatItems
    });
  };

  treeNodeRender = (item, level) => {
    return (
      <MaterialTreeNode
        item={item}
        level={level}
        onCounterChange={this.handleCounterChange}
      />
    );
  };

  renderSider(flatItems = []) {
    console.log(flatItems, );

    const grouped = _.groupBy(flatItems, 'rarity');

    return (
      <React.Fragment>
        <h2>汇总</h2>
        <hr />
        {
          Object.keys(grouped).reverse().map(key => {
            const items = grouped[key];
            return (
              <div>
                <h3>{key}</h3>
                <div className="flat-item-group-wrapper">
                  {items.map(fi => (
                    <Material key={fi.id} id={fi.id} count={fi.count}/>
                  ))}
                </div>
              </div>
            );
          })
        }
      </React.Fragment>
    );
  }

  render() {
    const { className } = this.props;
    const { items, flatItems } = this.state;

    const clazz= classNames('oli-material-calculator', className);

    return (
      <Layout hasSider={true}>
        <Layout.Content>
          <div className={clazz}>
            {items.map((item, index) => (
              <Tree
                data={item}
                key={index}
                clickToExpand={true}
                treeNodeRender={this.treeNodeRender}
              />
            ))}
          </div>
        </Layout.Content>

        <Layout.Sider width={400}>
          {flatItems.length > 0 && this.renderSider(flatItems)}
        </Layout.Sider>
      </Layout>
    );
  }
}
