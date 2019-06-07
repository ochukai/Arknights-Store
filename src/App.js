import React from 'react';
import './App.scss';

import { HashRouter, Route, Link } from "react-router-dom";

import Menu from './components/menu';
import Layout from './components/layout';

import Demo from './pages/demo';
import AkMaterial from './pages/material';

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
                <Link to="/akma">AK 材料计算器</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/demo">组件展示</Link>
              </MenuItem>
            </Menu>
          </Header>
          <Content>
            <Route exact path="/" component={Index} />
            <Route exact path="/demo" component={Demo} />
            <Route path="/akma" component={AkMaterial} />
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
        <ul style={{ margin: '20px 0' }}>
          <li><Link to="/akma">AK 材料计算器</Link></li>
        </ul>
      </div>
    );
  }
}

