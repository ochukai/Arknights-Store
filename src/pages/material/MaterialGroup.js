import React from 'react';
import Card from '../../components/card';
import Material from '../../components/material';
import Counter from '../../components/counter';

import './MaterialGroup.scss';

const storeIds = Material.storeIds;

class MaterialGroup extends React.Component {

  static defaultProps = {
    data: {} // id, name, mas
  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { data } = this.props;

    return (
      <div className="material-group">
        <h3>{data.name}</h3>
        {storeIds.map((id, index) => <MaterialCard key={index} id={id} exi={0} req={2} />)}
      </div>
    );
  }
}

class MaterialCard extends React.Component {
  render() {
    const { id, req } = this.props;
    return (
      <Card className="material-card">
        <Material id={id} />
        <Counter value={req} name="Require"/>
      </Card>
    );
  }
}

export default MaterialGroup;
