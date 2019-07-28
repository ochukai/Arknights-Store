const fs = require('fs-extra');
const path = require('path');

const { exportBuffs } = require('./parseBuffs');
const { exportChars } = require('./parseCharacter');
const { exportEnemys } = require('./parseEnemy');
const { exportItems } = require('./parseItem');

// remove old data
['char', 'enemy', 'items'].forEach(dir => {
  const curDir = path.join(__dirname, dir);
  fs.removeSync(curDir);
});

exportChars();
exportBuffs();
exportEnemys();
exportItems();
