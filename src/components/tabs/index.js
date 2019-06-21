import React, { Component } from 'react';
import './index.scss';

import classNames from 'classnames';
import Pane from './Pane';
import Bar from './Bar';

/**
 * panes: []
 *
 * <Tab.Pane></Tab.Pane>
 */
export default class Tabs extends Component {

  static defaultProps = {
    onChange: () => {},
  };


  static getDerivedStateFromProps(nextProps) {
    const newState = {};
    if ('active' in nextProps) {
      newState.active = this.decoKey(nextProps.active);
    }

    return newState;
  }

  constructor(props) {
    super(props);

    const { defaultActive, children } = props;
    const panes = React.Children.toArray(children);

    this.state = {
      active: defaultActive
        ? this.decoKey(defaultActive)
        : panes.length > 0
          ? panes[0].key
          : ''
    };
  }

  decoKey(key) {
    return `.$${key}`;
  }

  handleBarClick = (item) => {
    const { active } = this.state;
    if (active !== item.key) {
      this.setState({
        active: item.key
      }, () => {
        this.props.onChange(item.key.substring(2));
      });
    }
  };

  renderTabPanes(panes, active) {
    const activePane = panes.filter(pane => pane.key === active)[0];
    if (activePane) {
      return React.cloneElement(activePane, { active: true })
    }
  }

  getBars(panes) {
    return panes.map(pane => {
      const { key, props } = pane;
      return {
        key,
        bar: props.bar
      };
    });
  }

  renderTabBar(bars, active) {
    return (
      <Bar
        active={active}
        items={bars}
        onClick={this.handleBarClick}
      />
    );
  }

  getActiveKey(panes) {
    const { active } = this.state;
    if (active) {
      return active;
    }

    const firstKey = panes[0].key;
    return this.decoKey(firstKey);
  }

  render() {
    const {
      className,
      children,
    } = this.props;

    const clazz = classNames('oli-tabs', className);

    const panes = React.Children.toArray(children);
    const bars = this.getBars(panes);
    const active = this.getActiveKey(panes);

    return (
      <div className={clazz}>
        {this.renderTabBar(bars, active)}
        {this.renderTabPanes(panes, active)}
      </div>
    );
  }
}

Tabs.Pane = Pane;

