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
        {data.mas.map((ma, index) => <MaterialCard key={index} id={ma} exi={0} req={2} />)}
      </div>
    );
  }
}

class MaterialCard extends React.Component {
  render() {
    const { id, req } = this.props;
    return (
      <Card className="material-card">
        <Material id={id} noName={true} />
        <Counter value={req} name="需要"/>
      </Card>
    );
  }
}

export default MaterialGroup;
