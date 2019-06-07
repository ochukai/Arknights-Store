import React from 'react';
import MaterialGroup from './MaterialGroup';
import { category } from '../../components/material/types';

import './index.scss';

export default class AkMaterial extends React.Component {
  render() {
    const cgs = category;

    return (
      <div className="material-wrapper">
        {cgs.map((cg, index) => <MaterialGroup key={index} data={cg} />)}
      </div>
    );
  }
}
