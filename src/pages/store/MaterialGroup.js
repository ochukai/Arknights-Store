import React from 'react';
import store from 'store/dist/store.modern';

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
        {data.mas.map((id, index) => <MaterialCard key={index} id={`${id}`} />)}
      </div>
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
        <Material id={id} noCount />
        <Counter value={count} name="Require" onChange={this.handleValueChange} />
      </Card>
    );
  }
}

export default MaterialGroup;
