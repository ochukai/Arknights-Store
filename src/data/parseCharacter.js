const characters = require('./original/character_table.json');

const keys = Object.keys(characters);

const path = require('path');
const fs = require('fs-extra');
const stringify = require("json-stringify-pretty-compact");

const curDir = path.join(__dirname, 'char');
fs.ensureDir(curDir);

const charMaps = [];

keys.forEach((key) => {
  const value = characters[key];
  value.id = key;

  if (key.indexOf('char_') > -1) {
    // const name = key.split('_')[2];
    const fileName = key + '.json';
    charMaps.push({
      id: key,
      name: value.name
    });

    // fs.writeFileSync(
    //   path.join(curDir, fileName),
    //   stringify(value)
    // );
  }
});

exports.charMaps = charMaps;
