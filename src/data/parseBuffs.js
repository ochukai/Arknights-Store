const buildings = require('./original/building_data.json');
const { charMaps } = require('./parseCharacter');

const { rooms, chars, buffs } = buildings;

const path = require('path');
const fs = require('fs-extra');
const { writeFile } = require('./util/write');

function parseRooms() {
  const keys = Object.keys(rooms);
  const roomMaps = keys.map(key => {
    const room = rooms[key];
    return {
      id: room.id,
      name: room.name,
      description: room.description
    }
  });

  return roomMaps;
}

const allRooms = parseRooms();

function parseBuffs() {
  const keys = Object.keys(buffs);
  const buffMaps = keys.map(key => {
    const buff = buffs[key];
    const { buffId, buffName, buffColor, textColor, roomType, description } = buff;
    const room = allRooms.filter(room => room.id === roomType)[0] || {};
    return {
      id: buffId,
      name: buffName,
      bgColor: buffColor,
      color: textColor,
      room: room.name,
      description,
    }
  });

  return buffMaps;
}

const allBuffs = parseBuffs();

const phaseMaps = {
  0: '初始',
  1: '精一',
  2: '精二'
};

function parseCharBuffs() {
  const result = [];

  const keys = Object.keys(chars);
  keys.forEach(key => {
    const char = chars[key];
    const { charId, buffChar } = char;
    buffChar.forEach(buff => {
      const { buffData = [] } = buff;
      buffData.forEach(rbd => {
        const buffEntity = allBuffs.filter(ab => ab.id === rbd.buffId)[0];
        const { cond } = rbd;
        const character = charMaps.filter(c => c.id === charId)[0];
        result.push({
          ...buffEntity,
          phase: phaseMaps[cond.phase],
          level: cond.level,
          char: character.name
        });
      });
    });
  });

  return result;
}


const curDir = path.join(__dirname, 'char');
fs.ensureDir(curDir);

const data = parseCharBuffs();
writeFile(curDir, 'buffs.json', data);
