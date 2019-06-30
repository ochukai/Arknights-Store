import React from 'react';
import _ from 'underscore';

import simpleInfo from '../../data/char/simples.json';
import CharItem from './CharItem.js';

const chars = _.sortBy(simpleInfo, o => -o.star);
const charGroups = _.groupBy(chars, 'star');
const stars = _.sortBy(_.keys(charGroups)).reverse();

export default function AKChars(props) {

  return (
    <div className="char-wrapper">
      <header>
        {/* <h1>char filters</h1> */}
      </header>

      {stars.map(key => {
        const group = charGroups[key];
        return (
          <div className="char-list" key={key}>
            {
              group.map(char => <CharItem key={char.id} item={char} />)
            }
          </div>
        );
      })}
    </div>
  );
};
