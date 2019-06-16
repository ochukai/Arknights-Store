import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { Tree, Material, Counter } from '../components';

import items from '../data/items/material_items.json';

const treeData = {
  title: '0-0',
  id: '0-0',
  children: [
    {
      title: '0-0-0',
      id: '0-0-0',
      children: [
        { title: '0-0-0-0', id: '0-0-0-0' },
        { title: '0-0-0-1', id: '0-0-0-1' },
        { title: '0-0-0-2', id: '0-0-0-2' },
      ],
    },
    {
      title: '0-0-1',
      id: '0-0-1',
      children: [
        { title: '0-0-1-0', id: '0-0-1-0' },
        { title: '0-0-1-1', id: '0-0-1-1' },
        { title: '0-0-1-2', id: '0-0-1-2' },
      ],
    },
    {
      title: '0-0-2',
      id: '0-0-2',
    },
  ],
};

storiesOf('Tree', module)
  .add('normal', () => <Tree data={treeData} />)
  .add('custom render', () => {
    function treeNodeRender(item, level) {
      if (level === 0) {
        return (
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',

            }}>
            <Material id={item.id} noCount size={60} />
            <Counter />
          </div>
        );
      } else {
        return (
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',

            }}>
            <Material id={item.id} noCount size={50} />
            <div>
              <span>{item.name}</span> - <span>{item.count}</span>
            </div>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        {
          items.map(item => (
            <Tree
              key={item.title}
              data={item}
              treeNodeRender={treeNodeRender}
            />
          ))
        }
      </React.Fragment>
    );
  });
;
