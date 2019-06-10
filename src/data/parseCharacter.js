const characters = require('./original/character_table.json');

const keys = Object.keys(characters);

const path = require('path');
const fs = require('fs-extra');
const stringify = require("json-stringify-pretty-compact");

const curDir = path.join(__dirname, 'char');
fs.ensureDir(curDir);

keys.forEach((key) => {
  const value = characters[key];
  if (key.indexOf('char_') > -1) {
    // const name = key.split('_')[2];
    const fileName = key + '.json';

    fs.writeFileSync(
      path.join(curDir, fileName),
      stringify(value)
    );
  }
});
