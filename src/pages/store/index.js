import React from 'react';
import MaterialGroup from './MaterialGroup';
import { category } from '../../components/material/types';

import './index.scss';

export default class AKStore extends React.Component {
  render() {
    const cgs = category;

    return (
      <div className="store-wrapper">
        {cgs.map((cg, index) => <MaterialGroup key={index} data={cg} />)}
      </div>
    );
  }
}
