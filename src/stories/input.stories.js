import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Input, Icon, NumberInput } from '../components';

storiesOf('Input', module)
  .add('normal', () => <Input value={123} />)
  .add('number', () => <Input type="number" />)
  .add('disabled', () => <Input disabled />)
  .add('large', () => <Input size="large" />)
  .add('small', () => <Input size="small" />)
  .add('small', () => <Input size="small" />)
  .add('large prefix', () => <Input size="large" prefix={<Icon type="heart-fill" />} />)
  .add('prefix', () => <Input prefix={<Icon type="heart-fill" />} />)
  .add('suffix', () => <Input suffix={<Icon type="heart-fill" />} />)
  .add('numberInput', () => <NumberInput value={0} />)
  ;
