import React from 'react';
import './index.scss';

import { Layout, Table } from '../../components';

import enemys from '../../data/enemy/enemys.json';

export default class AKEnemys extends React.Component {
  render() {
    const columns = [
      {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
        sortable: true,
      },
      {
        title: 'Level',
        key: 'level',
        dataIndex: 'level',
        sortable: true,
      },
      {
        title: '血量',
        key: 'hp',
        dataIndex: 'hp',
        sortable: true,
      },
      {
        title: '攻击',
        key: 'atk',
        dataIndex: 'atk',
        sortable: true,
      },
      {
        title: '防御',
        key: 'def',
        dataIndex: 'def',
        sortable: true,
      },
      {
        title: '魔抗',
        key: 'magicResistance',
        dataIndex: 'magicResistance',
        sortable: true,
      },
      {
        title: '移动速度',
        key: 'moveSpeed',
        dataIndex: 'moveSpeed',
        sortable: true,
      },
      {
        title: '攻击速度',
        key: 'attackSpeed',
        dataIndex: 'attackSpeed',
        sortable: true,
      },
      {
        title: '逃跑扣费',
        key: 'lifePointReduce',
        dataIndex: 'lifePointReduce',
        sortable: true,
      }
    ];

    return (
      <Layout className="enemy-wrapper">
        <Layout.Content>
          <Table dataSource={enemys} columns={columns} />
        </Layout.Content>
        <Layout.Sider width={300} hideOn="mobile">
          <div style={{padding: '0 20px'}}>
            <p>
              <strong>防御</strong>：影响干员受到物理攻击时承受的伤害量。<br/> 1点防御=1点物理减伤。
            </p>
            <p>
              <strong>法术抗性</strong>：影响干员受到法术伤害时承受的伤害量。<br/>1点法术抗性=1%法术减伤。
            </p>
            对于敌我都有效的伤害公式为：
            <ul className="desc">
              <li><strong>1. 物理伤害</strong> 伤害量 = 攻击 - 防御 当伤害量小于5%攻击时，本次伤害量变为5%攻击(即保底伤害)</li>
              <li><strong>2. 法术伤害</strong> 伤害量 = 攻击 * (1 - 法抗%)</li>
            </ul>
          </div>
        </Layout.Sider>
      </Layout>
    );
  }
}
