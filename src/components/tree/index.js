import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

import classNames from 'classnames';
import _ from 'underscore';

import TreeNode from './TreeNode';

import { tableContext, ExpandContext } from './treeContext';
/**
 * 只有一个根节点的树，不知道为啥都要写只有一个根节点的树，或许一棵树只有一个根吧
 *
 * data -> {
 *   key,
 *   icon, // 不是必须，但是可以有，支持组件
 *   title,
 *   children -> [ data ]
 * }
 *
 */
export default class Tree extends Component {

  static propTypes = {
    data: PropTypes.object,
  };

  static defaultProps = {
    data: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      expandKeys: tableContext.expandKeys,
      // 放在里面只有一个意思，就是通过 Provider 传给下面的组件使用
      toggleExpandKeys: this.toggleExpandKeys,
    };
  }

  toggleExpandKeys = (key) => {
    const { expandKeys } = this.state;
    const isExpand = expandKeys.includes(key);

    if (isExpand) { // 展开了就关闭
      this.setState({
        expandKeys: expandKeys.filter(k => k !== key)
      });
    } else {
      const dummyExpandKeys = _.clone(expandKeys);
      dummyExpandKeys.push(key);
      this.setState({
        expandKeys: dummyExpandKeys
      });
    }
  };

  handleTreeNodeClick = () => {

  };

  renderTreeNodes(data) {
    const { key, icon, title, children } = data;
    const rootNode = (
      <TreeNode
        key={key}
        oliTreeNodeId={key}
        icon={icon}
        title={title}
        children={children}
        onClick={this.handleTreeNodeClick}
      />
    );
    return rootNode;
  }

  render() {
    const {
      className,
      data,
    } = this.props;

    const clazz = classNames('oli-tree', className);
    return (
      <ExpandContext.Provider value={this.state}>
        <div className={clazz}>
          {this.renderTreeNodes(data)}
        </div>
      </ExpandContext.Provider>
    );
  }
}
