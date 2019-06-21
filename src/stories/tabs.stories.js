import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tabs } from '../components';

storiesOf('Tabs', module)
  .add('normal', () => {
    return (
      <Tabs defaultActive="tab2">
        <Tabs.Pane key="tab1" bar="tab1">
          <h1>pane 1</h1>
        </Tabs.Pane>
        <Tabs.Pane key="tab2" bar="tab2">
          <h1>pane 2</h1>
        </Tabs.Pane>
        <Tabs.Pane key="tab3" bar="tab3">
          <h1>pane 3</h1>
        </Tabs.Pane>
      </Tabs>
    );
  });
  ;
