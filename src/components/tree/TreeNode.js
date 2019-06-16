import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import _ from 'underscore';

import Icon from '../icon';

import { ExpandContext } from './treeContext';

export default class TreeNode extends Component {

  static defaultProps = {
    children: [],
    expand: false,
  };

  constructor(props) {
    super(props);

    this.state = { };
  }

  handleSwitchIconClick = (e) => {
    e.stopPropagation();

    const { item } = this.props;
    this.changeExpandKeys(item[this.idProp], item);
  };

  handleClick = (e) => {
    e.stopPropagation();

    const { item } = this.props;
    this.clickToExpand
      ? this.handleSwitchIconClick(e)
      : this.handleTreeNodeClick(item);
  };

  renderChildren(children) {
    if (children.length === 0) {
      return;
    }

    const { level, treeNodeRender } = this.props;
    const newLevel = level + 1;
    return (
      <ul className="oli-child-tree">
        {children.map((child, index) => (
          <TreeNode
            key={index}
            level={newLevel}
            treeNodeRender={treeNodeRender}
            item={child}
          />
        ))}
      </ul>
    );
  }

  renderSwitchIcon(expandKeys) {
    const { item } = this.props;
    const expand = expandKeys.includes(item[this.idProp]);
    const icon = expand
      ? 'nodeexpand'
      : 'nodecollapse';

    return (
      <Icon
        className="oli-tree-node-switch-icon"
        type={icon}
        onClick={this.handleSwitchIconClick}
      />
    );
  }

  renderTitle(item) {
    const title = item[this.titleProp];

    if (_.isString(title)) {
      return <span>{title}</span>
    }

    return title
  }

  render() {
    const {
      level,
      treeNodeRender,
      className,
      item,
    } = this.props;

    const clazz = classNames('oli-tree-node', className);

    return (
      <ExpandContext.Consumer>
        {({
          idProp,
          titleProp,
          childrenProp,
          expandKeys,
          toggleExpandKeys,
          clickToExpand,
          handleTreeNodeClick
        }) => {
          this.handleTreeNodeClick = handleTreeNodeClick;
          this.changeExpandKeys = toggleExpandKeys;
          this.idProp = idProp;
          this.titleProp = titleProp;
          this.childrenProp = childrenProp;
          this.clickToExpand = clickToExpand;

          const expand = expandKeys.includes(item[idProp]);

          const children = item[childrenProp];
          const hasChildren = children && _.isArray(children) && children.length > 0;

          return (
            <li className={clazz} onClick={this.handleClick}>
              <div className="oli-tree-node-content">
                <div className="oli-tree-node-switch-icon-wrapper">
                  {hasChildren && this.renderSwitchIcon(expandKeys, toggleExpandKeys)}
                </div>
                <div className="oli-tree-node-title-wrapper">
                  {
                    treeNodeRender
                      ? treeNodeRender(item, level)
                      : this.renderTitle(item)}
                </div>
              </div>

              { expand ? this.renderChildren(children) : null}
            </li>
          );
        }}
      </ExpandContext.Consumer>
    );
  }
}
