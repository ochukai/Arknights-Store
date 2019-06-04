import React from 'react';
import './App.scss';

import { HashRouter, Route, Link } from "react-router-dom";

import Menu, { MenuItem } from './components/menu';

import Demo from './pages/demo';
import AkMaterial from './pages/material';

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <div className="app-container">
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

          <div>
            <Route exact path="/" component={Index} />
            <Route exact path="/demo" component={Demo} />
            <Route path="/akma" component={AkMaterial} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;

class Index extends React.Component {
  render() {
    return (
      <div>
        <ul style={{margin: '20px 0'}}>
          <li><Link to="/akma">AK 材料计算器</Link></li>
        </ul>
      </div>
    );
  }
}

