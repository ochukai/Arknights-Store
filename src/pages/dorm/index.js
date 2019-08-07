import React from 'react';
import './index.scss';

import furnitures from '../../data/building/furnitures.json';
import { Button } from '../../components';

import history from '../../history';

const dorms = furnitures.map(furn => ({ id: furn.id, name: furn.name, comfort: furn.totalComfort }));

class DormButton extends React.PureComponent {
  handleBtnClick = () => {
    const { dorm } = this.props;
    history.push(`/dorm/${dorm.id}`);
  };

  render() {
    const { dorm } = this.props;
    return (
      <li>
        <Button
          icon="skin-fill"
          onClick={this.handleBtnClick}
        >
          {dorm.name}（{dorm.comfort}）
        </Button>
      </li>
    );
  }
}

export default class AKDorms extends React.Component {
  render() {
    return (
      <ul className="oli-dorms-container">
        {dorms.map((dorm, index) => {
          return <DormButton key={index} dorm={dorm} />;
        })}
      </ul>
    );
  }
}
