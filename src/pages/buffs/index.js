import React from 'react';
import './index.scss';

import { Layout, Table, Tabs, Tag } from '../../components';

import buffs from '../../data/char/buffs.json';

import _ from 'underscore';

export default class AKBuffs extends React.Component {

  state = {
    groups: {}
  };

  constructor(props) {
    super(props);

    const columns = [
      {
        title: '干员',
        key: 'char',
        dataIndex: 'char',
        sortable: true,
      },
      {
        title: '阶段',
        key: 'phase',
        dataIndex: 'phase',
        sortable: true,
      },
      {
        title: '等级',
        key: 'level',
        dataIndex: 'level',
        sortable: true,
      },
      {
        title: '技能',
        key: 'name',
        dataIndex: 'name',
        sortable: true,
        render: (text, row) => {
          const { bgColor, color } = row;
          return (
            <Tag className="buff-name" style={{color, backgroundColor: bgColor}}>{text}</Tag>
          );
        }
      },
      {
        title: '房间',
        key: 'room',
        dataIndex: 'room',
      },
      {
        title: '描述',
        key: 'description',
        dataIndex: 'description',
      }
    ];

    const groups = _.groupBy(buffs, 'room');
    this.state = {
      groups,
      columns
    };
  }

  render() {
    const { groups, columns } = this.state;

    return (
      <Layout className="buffs-wrapper">
        <Layout.Content>
          <Tabs>
            {
              Object.keys(groups).map(room => {
                const groupData = groups[room];
                return (
                  <Tabs.Pane key={room} bar={room}>
                    <Table dataSource={groupData} columns={columns}/>
                  </Tabs.Pane>
                );
              })
            }
          </Tabs>
        </Layout.Content>
      </Layout>
    );
  }

}
