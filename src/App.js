import React from 'react';
import './App.scss';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Menu, { MenuItem } from './components/menu';

import Demo from './pages/demo';
import AkMaterial from './pages/material';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="app-container">
          <Menu>
            <MenuItem>
              <Link to="/demo">Component Demo</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/akma">材料计算</Link>
            </MenuItem>
          </Menu>

          <Route exact path="/demo" component={Demo} />
          <Route path="/akma" component={AkMaterial} />
        </div>
      </Router>
    );
  }
}

