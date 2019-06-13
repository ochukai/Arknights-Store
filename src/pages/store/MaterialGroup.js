import React from 'react';

import Card from '../../components/card';
import Material from '../../components/material';
import Counter from '../../components/counter';

import './MaterialGroup.scss';

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
        {data.mas.map((id, index) => <MaterialCard key={index} id={`${id}`} req={0} />)}
      </div>
    );
  }
}

class MaterialCard extends React.Component {
  render() {
    const { id, req } = this.props;
    return (
      <Card className="material-card">
        <Material id={id} noCount />
        <Counter value={req} name="Require"/>
      </Card>
    );
  }
}

export default MaterialGroup;
