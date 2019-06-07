import React from 'react';
import './index.scss';

import Button from '../../components/button';
import Icon from '../../components/icon';
import Card from '../../components/card';
import Counter from '../../components/counter';
import Material from '../../components/material';

import _ from 'underscore';

function Demo() {
  const materialSequence = _.range(35);

  return (
    <div className="demo-container">
      <h1>Component Demo</h1>

      <h2>Button</h2>
      <div className="btn-wrapper">
        <Button size="small">确定</Button>
        <Button>你好</Button>
        <Button size="large">你好</Button>
        <Button type="danger">重置</Button>
        <Button size="small" round={true}>ak</Button>
        <Button round={true}>ak</Button>
        <Button size="large" round={true}>AK</Button>
        <Button icon="plus" size="xs" round={true} />
        <Button icon="plus" size="xs" />
        <Button icon="plus" size="xs">你好</Button>
        <Button icon="gift">你好</Button>
      </div>
      <h2>Icon</h2>
      <Icon type="heart" theme="fill" />

      <h2>Card</h2>
      <Card>
        <p>this is a card.</p>
      </Card>

      <h2>Counter</h2>
      <Counter name="需要" value={99}/>
      <Counter name="已有" />

      <h2>Material</h2>
      {materialSequence.map(num => <Material key={num} id={num} />)}

      <h2>Material</h2>
      {materialSequence.map(num => <Material key={num} id={num} />)}

      <h2>Material</h2>
      {materialSequence.map(num => <Material key={num} id={num} />)}

    </div>
  );
}

export default Demo;
