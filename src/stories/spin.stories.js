import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Spin } from '../components';

storiesOf('Spin', module)
  .add('normal', () => <Spin />)
  .add('large', () => <Spin size="large" />)
  .add('small', () => <Spin size="small" />)
  ;
