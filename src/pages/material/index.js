import React from 'react';
import MaterialGroup from './MaterialGroup';
import { category } from '../../components/material/types';

import './index.scss';

export default class AkMaterial extends React.Component {
  render() {
    const cgs = category;

    return (
      <div className="material-wrapper">
        <div className="material-inner-wrapper">
          <MaterialGroup data={cgs[0]} />
          <MaterialGroup data={cgs[1]} />
          <MaterialGroup data={cgs[2]} />
        </div>
        <div className="material-inner-wrapper">
          <MaterialGroup data={cgs[3]} />
          <MaterialGroup data={cgs[4]} />
          <MaterialGroup data={cgs[5]} />
        </div>
        <div className="material-inner-wrapper">
          <MaterialGroup data={cgs[6]} />
          <MaterialGroup data={cgs[7]} />
          <MaterialGroup data={cgs[8]} />
        </div>
      </div>
    );
  }
}
