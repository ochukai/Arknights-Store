import React from 'react';
import MaterialGroup from './MaterialGroup';

import { category } from '../../components/material/types';
import { Layout, Button } from '../../components';

import './index.scss';

export default class AKStore extends React.Component {
  render() {
    const cgs = category;

    return (
      <Layout className="store-wrapper" hasSider={true}>
        <Layout.Content>
          {cgs.map((cg, index) => <MaterialGroup key={index} data={cg} />)}
        </Layout.Content>
        <Layout.Sider width={150}>
          {/* <Button>清空</Button> */}
        </Layout.Sider>
      </Layout>
    );
  }
}
