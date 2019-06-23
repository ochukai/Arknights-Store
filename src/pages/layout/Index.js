
import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Index extends Component {
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
