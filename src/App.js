import React from 'react';
import './App.scss';

import { HashRouter, Route, Link } from "react-router-dom";

import { Layout, Menu } from './components';

import Demo from './pages/demo';
import AkMaterial from './pages/material';
import AKStore from './pages/store';
import AKEnemys from './pages/enemys';
import AKBuffs from './pages/buffs';

const MenuItem = Menu.Item;
const Header = Layout.Header;
const Content = Layout.Content;

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Layout className="app-container">
          <Header>
            <Menu>
              <MenuItem>
                <Link to="/">
                  <i className="ak-icon ak-home-fill"></i>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/store">我的仓库</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/material">材料计算器</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/buffs">基建技能</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/enemys">敌人信息</Link>
              </MenuItem>
              {/* <MenuItem>
                <Link to="/demo">组件展示</Link>
              </MenuItem> */}
            </Menu>
          </Header>
          <Content>
            <Route exact path="/" component={Index} />
            <Route exact path="/demo" component={Demo} />
            <Route path="/material" component={AkMaterial} />
            <Route path="/store" component={AKStore} />
            <Route path="/buffs" component={AKBuffs} />
            <Route path="/enemys" component={AKEnemys} />
          </Content>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;

class Index extends React.Component {
  render() {
    return (
      <div>
        <ol style={{ lineHeight: 2 }}>
          <li><Link to="/store">我的仓库</Link></li>
          <li><Link to="/material">材料计算器</Link></li>
          <li><Link to="/buffs">基建技能</Link></li>
          <li><Link to="/enemys">敌人信息</Link></li>
        </ol>


        <hr/>

        说明：待续~
      </div>
    );
  }
}

