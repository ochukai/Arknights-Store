import React from 'react';
import './index.scss';

import furnitures from '../../data/building/furnitures.json';
import { Table } from '../../components';

export default class AKDorm extends React.PureComponent {

  static getDerivedStateFromProps(nextProps) {
    const { match } = nextProps;
    const id = match.params.id;
    const furn = furnitures.filter(furn => furn.id === id)[0];

    // scroll to top
    window.scrollTo(0, 0);

    return {
      id,
      furn,
    };
  }

  render() {
    const { furn } = this.state;
    const columns = [
      {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '数量',
        key: 'count',
        dataIndex: 'count',
        sortable: true
      },
      {
        title: '氛围',
        key: 'comfort',
        dataIndex: 'comfort',
        sortable: true
      }
    ];

    return (
      <div>
        <Table
          style={{width: 400}}
          size="small"
          header={<h3>{furn.name}</h3>}
          dataSource={furn.furnitures}
          columns={columns}
          footer={<p>总氛围：<strong>{furn.totalComfort}</strong></p>}
        />
      </div>
    );
  }
}
