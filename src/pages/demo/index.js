import React from 'react';
import _ from 'underscore';

import './index.scss';

import Button from '../../components/button';
import Icon from '../../components/icon';
import Card from '../../components/card';
import Counter from '../../components/counter';
import Material from '../../components/material';
import Drawer from '../../components/drawer';
import Tag from '../../components/tag';
import Table from '../../components/table';

class Demo extends React.Component {
  state = {
    drawerOpen: false
  };

  handleOpenDrawer = () => {
    this.setState({
      drawerOpen: true
    });
  };

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false
    });
  };

  render() {
    const { drawerOpen } = this.state;

    const materialSequence = _.range(35);

    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sortable: true,
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    return (
      <div className="demo-container">
        <h1>Component Demo</h1>

        <h2>Button</h2>
        <div className="btn-wrapper">
          <Button size="small">确定</Button>
          <Button>你好</Button>
          <Button size="large">你好</Button>
          <Button type="danger">重置</Button>
          <Button size="small" round={true}>ak</Button>
          <Button round={true}>ak</Button>
          <Button size="large" round={true}>AK</Button>
          <Button icon="plus" size="xs" round={true} />
          <Button icon="plus" size="xs" />
          <Button icon="plus" size="xs">你好</Button>
          <Button icon="gift">你好</Button>
          <Button type="blue" icon="gift">你好</Button>
          <Button type="blue" icon="gift" />
        </div>

        <h2>Icon</h2>
        <Icon type="heart" theme="fill" />

        <h2>Tag</h2>
        <Tag>近卫</Tag>
        <Tag>辅助</Tag>
        <Tag>高级自身干员</Tag>
        <Tag closable={true}>高级自身干员</Tag>
        <br />
        <h3>Check Tag</h3>
        <Tag checkable>近卫</Tag>
        <Tag checkable>辅助</Tag>
        <Tag checkable defaultChecked={true}>高级自身干员</Tag>

        <h2>Drawer</h2>
        <Button onClick={this.handleOpenDrawer}>打开</Button>
        <Drawer
          header={'这是标题~'}
          position="right"
          onClose={this.handleDrawerClose}
          open={drawerOpen}
          gap={0}
          width={500}
        >
          <h1>这是内容~</h1>
        </Drawer>

        <h2>Table</h2>
        <Table dataSource={dataSource} columns={columns}/>

        <h2>Card</h2>
        <Card>
          <p>this is a card.</p>
        </Card>

        <h2>Counter</h2>
        <Counter name="需要" value={99} />
        {/* <Counter name="已有" /> */}

        <h2>Material</h2>
        {materialSequence.map(num => <Material key={num} id={num} />)}

      </div>
    );
  }

}

export default Demo;
