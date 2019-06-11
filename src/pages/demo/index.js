import React from 'react';

import './index.scss';

import {
  Button,
  Icon,
  Card,
  Counter,
  Material,
  Drawer,
  Rate,
  Tag,
  Table,
  Tree,
  Layout
} from '../../components';

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

    const materialSequence = Material.storeIds;

    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '吴彦祖',
        age: 42,
        address: '西湖区湖底公园4号',
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

    const treeData = {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    };

    return (
      <div className="demo-container">
        <h1>Component Demo</h1>

        <Layout hasSider={true}>
          <Layout.Sider width={500}>
            <h2>Tree</h2>
            <Tree data={treeData} />
          </Layout.Sider>
          <Layout.Content>
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

            <h2>Rate</h2>
            <Rate value={5} />
            <br />
            <Rate value={6} icon="heart-fill" />

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
            <Table dataSource={dataSource} columns={columns} />

            <h2>Card</h2>
            <Card>
              <p>this is a card.</p>
            </Card>

            <h2>Counter</h2>
            <Counter name="需要" value={99} />
            {/* <Counter name="已有" /> */}

            <h2>Material</h2>
            <div className="matrial-wrapper">
              {materialSequence.map(num => <Material key={num} id={num} />)}
            </div>
          </Layout.Content>
        </Layout>


      </div>
    );
  }

}

export default Demo;
