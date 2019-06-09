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

  handleSwitchIconClick = () => {
    const { oliTreeNodeId } = this.props;
    this.changeExpandKeys(oliTreeNodeId);
  };

  renderChildren(children) {
    if (children.length === 0) {
      return;
    }

    return (
      <ul className="oli-child-tree">
        {children.map((child, index) => (
          <TreeNode oliTreeNodeId={child.key} {...child} key={index} />
        ))}
      </ul>
    );
  }

  renderSwitchIcon(expandKeys) {
    const { oliTreeNodeId } = this.props;
    const expand = expandKeys.includes(oliTreeNodeId);
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

  renderIcon(icon) {
    if (_.isString(icon)) {
      return <Icon type={icon} />;
    }

    return icon;
  }

  renderTitle(title) {
    if (_.isString(title)) {
      return <span>{title}</span>
    }

    return title
  }

  render() {
    const {
      className,
      icon,
      title,
      children,
      oliTreeNodeId
    } = this.props;

    const clazz = classNames('oli-tree-node', className);
    const hasChildren = children && children.length > 0;

    return (
      <ExpandContext.Consumer>
        {({expandKeys, toggleExpandKeys}) => {
          this.changeExpandKeys = toggleExpandKeys;
          const expand = expandKeys.includes(oliTreeNodeId);

          return (
            <li className={clazz}>
              <div className="oli-tree-node-content">
                <div className="oli-tree-node-switch-icon-wrapper">
                  {hasChildren && this.renderSwitchIcon(expandKeys, toggleExpandKeys)}
                </div>
                <div className="oli-tree-node-icon-wrapper">
                  {icon ? this.renderIcon() : null}
                </div>
                <div className="oli-tree-node-title-wrapper">
                  {this.renderTitle(title)}
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
