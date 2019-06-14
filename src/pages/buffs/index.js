import React from 'react';
import './index.scss';

import { Layout, Table, Tag } from '../../components';

import buffs from '../../data/char/buffs.json';

import _ from 'underscore';

export default class AKBuffs extends React.Component {

  state = {
    groups: {}
  };

  componentDidMount() {
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
    this.setState({
      groups,
      columns
    });
  }

  render() {
    const { groups, columns } = this.state;

    return (
      <Layout className="buffs-wrapper">
        <Layout.Content>
          {
            Object.keys(groups).map(room => {
              const groupData = groups[room];
              return (
                <React.Fragment key={room}>
                  <Table dataSource={groupData} columns={columns} header={<h2>{room}</h2>} />
                </React.Fragment>
              );
            })
          }
        </Layout.Content>
      </Layout>
    );
  }

}
