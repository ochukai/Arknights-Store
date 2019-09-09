import React from 'react';
import store from 'store/dist/store.modern';

import storeItems from '../../data/items/store_items.json';
import { Card, Material, Layout, NumberInput } from '../../components';

import './index.scss';

const materialItems = storeItems.filter(si => si.sortId >= 100001 && si.sortId <= 100035);


export default class AKStore extends React.Component {
  render() {
    return (
      <Layout className="store-wrapper">
        <Layout.Content>
          <div className="material-group">
            {materialItems.map((si, index) => <MaterialCard key={index} id={si.id} />)}
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}


class MaterialCard extends React.Component {

  constructor(props) {
    super(props);
    const { id } = this.props;
    const count = store.get(id) || 0;

    this.state = {
      count,
    };
  }

  handleValueChange = (newValue) => {
    const { id } = this.props;
    this.setState({count: newValue}, () => {
      store.set(id, newValue);
    });
  };

  render() {
    const { id } = this.props;
    const { count } = this.state;
    return (
      <Card className="material-card">
        <Material id={id} noCount size={60} />
        <NumberInput value={count} onChange={this.handleValueChange} />
      </Card>
    );
  }
}
