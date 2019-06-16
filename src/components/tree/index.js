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
 *   id,
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
    data: {},
    idProp: 'id',
    titleProp: 'title',
    childrenProp: 'children',
    clickToExpand: false,

    afterTreeNodeClose:() => {},
    afterTreeNodeOpen:() => {},
  };

  constructor(props) {
    super(props);

    const {
      idProp,
      titleProp,
      childrenProp,
      clickToExpand,
    } = props;

    this.state = {
      expandKeys: tableContext.expandKeys,
      // 放在里面只有一个意思，就是通过 Provider 传给下面的组件使用
      toggleExpandKeys: this.toggleExpandKeys,
      idProp,
      titleProp,
      childrenProp,
      clickToExpand,
      handleTreeNodeClick: this.handleTreeNodeClick
    };
  }

  toggleExpandKeys = (key, item) => {
    const { expandKeys } = this.state;
    const isExpand = expandKeys.includes(key);

    if (isExpand) { // 展开了就关闭
      this.setState({
        expandKeys: expandKeys.filter(k => k !== key)
      }, () => {
        console.log('tree node colspa');
        this.props.afterTreeNodeClose(key, item);
      });
    } else {
      const dummyExpandKeys = _.clone(expandKeys);
      dummyExpandKeys.push(key);
      this.setState({
        expandKeys: dummyExpandKeys
      }, () => {
        console.log('tree node expand');
        this.props.afterTreeNodeOpen(key, item);
      });
    }
  };

  handleTreeNodeClick = (node) => {
    console.log('handle tree node click', node);
  };

  renderTreeNodes(data) {
    const { treeNodeRender } = this.props;
    const rootNode = (
      <TreeNode
        level={0}
        treeNodeRender={treeNodeRender}
        item={data}
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
