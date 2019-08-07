
import React, { Component } from 'react';
// import { Link } from "react-router-dom";

import { Tag } from '../../components';

export default class Index extends Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <Tag>0.9.2</Tag>
            <span>2019-08-06 23:33</span>
          </div>
          <p>添加宿舍列表</p>
        </div>
        <div>
          <div>
            <Tag>0.9.1</Tag>
            <span>2019-06-30 23:33</span>
          </div>
          <p>添加干员资料和立绘</p>
        </div>
      </div>
    );
  }
}
