import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import _ from 'lodash';
import store from 'store';

import materialItems from '../../data/items/material_items.json';

import { Material, Tree, Layout } from '../../components';
import isMobile from '../../common/isMobile';

import MaterialTreeNode from './MaterialTreeNode';

export default class AKMaterial extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      items: _.clone(materialItems),
      flatItems: [],
      isMobile: isMobile(),
    };
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    const { items } = this.state;

    const newItems = _.clone(items);
    newItems.forEach(item => {
      const storeCount = store.get(item.id);
      item.store = storeCount || 0;
      item.count = 1;
    });

    this.setState({
      items: newItems
    });
  };

  updateInnerCount(item, count) {
    const storeCount = store.get(item.id);
    item.store = storeCount || 0;
    item.req = count;

    let needCount = count * item.count;
    if (needCount > 0) {
      if (storeCount >= needCount) { // 仓库富裕，子合成材料不需要算了。
        needCount = 0;
      } else {
        needCount -= item.store;
      }
    }

    if (item.children.length > 0) {
      item.children.forEach(ic => this.updateInnerCount(ic, needCount));
    }
  }

  computeRequestCount = (item, result) => {
    const {
      id,
      count = 1,
      req = 0,
      rarity,
      children = [],
      store = 0
    } = item;

    const realRequestCount = req * count;
    const requestExcludeStore = realRequestCount - store;
    if (requestExcludeStore <= 0) { // 库存够了
      return;
    }

    let exist = false;
    result.forEach(dummy => {
      if (dummy.id === id) {
        dummy.count += requestExcludeStore;
        exist = true;
      }
    });

    if (!exist) {
      result.push({
        id: id,
        count: requestExcludeStore,
        rarity: rarity,
      });

      exist = true;
    }

    if (children.length > 0) {
      children.forEach(foo => this.computeRequestCount(foo, result));
    }
  };

  handleCounterChange = (item, value) => {
    const { id } = item;
    const { items } = this.state;

    const newItems = _.clone(items);
    const cur = newItems.filter(i => i.id === id)[0];
    if (cur) {
      this.updateInnerCount(cur, value);
    }

    const newFlatItems = [];
    newItems.forEach(ni => {
      if (ni.children && ni.children.length > 0) {
        ni.children.forEach(foo => this.computeRequestCount(foo, newFlatItems));
      } else {
        this.computeRequestCount(ni, newFlatItems);
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
    const grouped = _.groupBy(flatItems, 'rarity');

    return (
      <div className="summary-wrapper">
        <h2>材料汇总</h2>
        <div className="summary-group-wrapper">
          {
            Object.keys(grouped).reverse().map(key => {
              const items = grouped[key];
              return (
                <div key={key}>
                  <h3>Level {key}</h3>
                  <div className="flat-item-group-wrapper">
                    {items.map(fi => (
                      <Material key={fi.id} id={fi.id} count={fi.count}/>
                    ))}
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

  render() {
    const { className } = this.props;
    const { items, flatItems } = this.state;

    const clazz= classNames('oli-material-calculator', className);
    const { isMobile } = this.state;

    return (
      <Layout>
        <Layout.Content>
          <div className={clazz}>
            {items.map((item, index) => (
              <Tree
                data={item}
                key={index}
                clickToExpand={false}
                treeNodeRender={this.treeNodeRender}
              />
            ))}
          </div>
        </Layout.Content>

        {!isMobile && (
          <Layout.Sider hideOn={768}>
            {flatItems.length > 0 && this.renderSider(flatItems)}
          </Layout.Sider>
        )}
      </Layout>
    );
  }
}
