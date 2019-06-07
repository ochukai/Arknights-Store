import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import contains from 'rc-util/lib/Dom/contains';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

import Icon from '../icon';

import './index.scss';

export default class Drawer extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    position: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
    overlay: PropTypes.bool
  };

  static defaultProps = {
    closable: true,
    header: false,
    overlay: false,
    position: 'right',
    open: false,
    style: {},
    width: 300,
  };

  $overlay = null;

  $drawer = null;

  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      hiddenOverlay: true,
      hiddenDrawer: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      nextProps.open
        ? this.handleOpenDrawer()
        : this.handleCloseDrawer();
    }
  }

  componentDidMount() {
    this.$drawer.addEventListener('webkitAnimationEnd', this.onAnimationEnded);
  }

  componentDidUpdate() {
    if (!this.clickOutsideHandler) {
      let currentDocument = this.getDocument();
      this.clickOutsideHandler = addEventListener(currentDocument, 'mousedown', this.onDocumentClick);
    }
  }

  componentWillUnmount() {
    this.$drawer.removeEventListener('webkitAnimationEnd', this.onAnimationEnded);
    this.clearOutsideHandler();
  }

  onAnimationEnded = () => {
    if (!this.state.open) {
      this.setState({
        hiddenOverlay: true,
        hiddenDrawer: true
      }, () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
      });
    }
  };

  handleCloseDrawer = () => {
    this.setState({
      open: false
    }, () => {
      this.clearOutsideHandler();

      if (this.props.onClose) {
        this.props.onClose();
      }
    });
  };

  handleOpenDrawer = () => {
    this.setState({
      hiddenOverlay: false,
      hiddenDrawer: false,
      open: true
    }, () => {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'relative';

      // const { position } = this.props;
      // if (position === 'right') {
      //   document.body.style.width = `calc(100% - 10px)`;
      // }
    });
  };

  getDocument() {
    return window.document;
  }

  clearOutsideHandler() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.clickOutsideHandler = null;
    }
  }

  getPopupDomNode() {
    return this.$drawer
      ? findDOMNode(this.$drawer)
      : null;
  }

  onDocumentClick = (event) => {
    if (!this.state.open) {
      return;
    }

    const target = event.target;
    const root = findDOMNode(this);
    const popupNode = this.getPopupDomNode();
    if (!contains(root, target) && !contains(popupNode, target)) {
      this.handleCloseDrawer();
    }
  };

  getOverlayClassName() {
    return classNames(
      'react-drawer-overlay',
      'overlay',
      'animated',
      {
        'fadeIn': this.state.open,
        'fadeOut': !this.state.open,
        'hidden': this.state.hiddenOverlay
      }
    );
  }

  getDrawerClassName() {
    const { open } = this.state;

    let start;
    const { position } = this.props;
    switch (position) {
      case 'top':
        start = open ? 'Down' : 'Up';
        break;
      case 'bottom':
        start = open ? 'Up' : 'Down';
        break;
      case 'left':
        start = 'Left';
        break;
      case 'right':
        start = 'Right';
        break;
      default:
        break;
    }

    let direction = open ? 'In' : 'Out';
    return classNames(
      'drawer',
      `drawer-${position}`,
      'animated',
      `fade${direction}${start}`, // slideInLeft
      {
        'hidden': this.state.hiddenDrawer
      }
    );
  }

  renderHeader(header) {
    return (
      <div className="drawer-header">
        <h2>{header}</h2>
      </div>
    );
  }

  renderClose() {
    return (
      <div className="drawer-close" onClick={this.handleCloseDrawer}>
        <Icon type="close" />
      </div>
    );
  }

  render() {
    const overlayClass = this.getOverlayClassName();
    const drawerClass = this.getDrawerClassName();

    const {
      overlay,
      children,
      header,
      style,
      closable,
      width,
      position
    } = this.props;

    const dummyStyle = {};
    if (position === 'right' || position === 'left') {
      dummyStyle.top = document.querySelector('html').scrollTop;
    }

    return (
      <div className="oli-drawer">
        {
          // 遮罩层
          overlay ? (
            <div
              ref={el => this.$overlay = el}
              className={overlayClass}
              onClick={this.handleCloseDrawer}
            />
          ) : null
        }

        <div
          className={drawerClass}
          style={{
            ...style,
            width,
            ...dummyStyle
          }}
          ref={el => this.$drawer = el}
        >
          {header ? this.renderHeader(header) : null}
          {closable ? this.renderClose() : null}

          <div className="drawer-wrapper">
            {children}
          </div>
        </div>
      </div>
    );
  }

}
