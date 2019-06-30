import './Main.scss';

import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import memoizeOne from 'memoize-one';
import loadable from '@loadable/component';

import { Layout, Menu, Icon, Button } from '../../components';

import Demo from '../demo';
import AkMaterial from '../material';
import AKStore from '../store';
import AKEnemys from '../enemys';
import AKBuffs from '../buffs';
import AKIndex from './Index';
import AKChars from '../chars';

import history from '../../history';

const { Sider, Footer, Header, Content } = Layout;
const MenuItem = Menu.Item;

const pathMaps = [
  { path: '/', name: '主页', component: AKIndex },
  { path: '/chars', name: '干员', component: AKChars },
  { path: '/store', name: '仓库', component: AKStore },
  { path: '/material', name: '材料计算', component: AkMaterial },
  { path: '/buffs', name: '基建技能', component: AKBuffs },
  { path: '/enemys', name: '敌人信息', component: AKEnemys },
  { path: '/demo', name: '组件展示', component: Demo }
];

class Main extends Component {

  static defaultProps = {

  };

  static getDerivedStateFromProps(nextProps) {
    // console.log(nextProps);

    const { location } = nextProps;
    const { pathname } = location;
    return {
      pathname
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderMenus() {
    return (
      <Menu type="vertical" theme="light">
        {pathMaps.map((pm, index) => (
          <MenuItem key={index}>
            <Link to={pm.path}>{pm.name}</Link>
          </MenuItem>
        ))}
      </Menu>
    );
  }

  renderRoutes() {
    return (
      <Switch>
        {/* {pathMaps.map((pm, index) => (
          <Route path={pm.path} component={pm.component}/>
        ))} */}
        <Route exact path="/" component={AKIndex} />
        <Route path="/demo" component={Demo} />
        <Route path="/material" component={AkMaterial} />
        <Route path="/store" component={AKStore} />
        <Route path="/buffs" component={AKBuffs} />
        <Route path="/enemys" component={AKEnemys} />
        <Route path="/chars" component={AKChars} />
        <Route path="/char/:id" component={loadable(() => import('../chars/Char'))} />
        {/* <Route component={NotFound}/> */}
      </Switch>
    );
  }

  getHeader = memoizeOne(path => {
    const router = pathMaps.filter(pm => pm.path === path)[0];
    if (router) {
      return router.name;
    }

    return '';
  });

  handleBackClick = (e) => {
    history.goBack();
  };

  renderHeader() {
    const { pathname } = this.state;
    const header = this.getHeader(pathname);
    if (!header && pathname.indexOf('/char/char_') === 0) {
      return <Button onClick={this.handleBackClick}>返回</Button>
    }

    return (
      <h2>
        <Icon type="heart-fill" /> {header}
      </h2>
    );
  }

  render() {
    const siderWidth = 250;
    const layouStyle = {
      paddingLeft: siderWidth,
    };

    const menus = this.renderMenus();
    const routes = this.renderRoutes();

    return (
      <React.Fragment>
        <Sider className="oli-layout-aside" fixed width={siderWidth}>
          <img
            className="sider-logo"
            alt="bluep-512"
            src={require('../../assets/images/bluep-512.png')}
          />
          <h1>Arknights Store</h1>
          {menus}
          <Footer>
            <p>I am ochukai</p>
            <iframe
              title="repo-addr"
              src="https://ghbtns.com/github-btn.html?user=ochukai&repo=Arknights-Store&type=star&count=false"
              frameBorder="0"
              scrolling="0"
              width="50px"
              height="20px"
            ></iframe>
          </Footer>
        </Sider>
        <Layout className="oli-layout-main" style={layouStyle}>
          <Header className="oli-layout-main-header">
            {this.renderHeader()}
          </Header>
          <Content className="oli-layout-main-content">
            {routes}
          </Content>
        </Layout>
      </React.Fragment>
    );
  }
}

// export default Main;
export default withRouter(Main);
