const buildings = require('./original/building_data.json');
const { parseSimpleInfo } = require('./parseCharacter');
const { filterHtmlTag } = require('./util/filterHtmlTag');
const uuid = require('uuid');

const { rooms, chars, buffs, customData } = buildings;

const path = require('path');
const fs = require('fs-extra');
const { writeFile } = require('./util/write');

const charMaps = parseSimpleInfo();

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
      description: filterHtmlTag(description),
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
          char: character.name,
          id: uuid.v4()
        });
      });
    });
  });

  return result;
}

function parseFurnitures() {
  const { furnitures } = customData;
  const keys = Object.keys(furnitures);
  return keys.map(key => {
    const furn = furnitures[key];
    const { id, name, type, ratiry, comfort, usage } = furn;
    return { id, name, type, ratiry, comfort, usage };
  });
}

function parseFurnCount() {
  const { themes } = customData;
  const keys = Object.keys(themes);
  const furnCountMap = {};

  keys.forEach(key => {
    const theme = themes[key];
    const { quickSetup = [] } = theme;

    const counts = {};
    quickSetup.forEach(item => {
      const id = item.furnitureId;
      const val = counts[id];
      if (!val) {
        counts[id] = 1;
      } else {
        counts[id] = val + 1;
      }
    });

    furnCountMap[key] = counts;
  });

  return furnCountMap;
}

function parseFurnGroups() {
  const { groups } = customData;
  const keys = Object.keys(groups);
  return keys.map(key => {
    const group = groups[key];
    const { themeId, name, comfort, furniture } = group;
    return {
      themeId,
      name,
      comfort,
      furniture
    };
  });
}

function parseThemes() {
  const allFurns = parseFurnitures();
  const allFurnCount = parseFurnCount();
  const allGroups = parseFurnGroups();
  const { themes } = customData;
  const keys = Object.keys(themes);
  return keys.map(key => {
    const theme = themes[key];
    const { id, name } = theme;
    // themeId: {id: count}
    const curFurnCount = allFurnCount[id] || {};
    // 当前主题所有的 furnId
    const curThemeFurnIds = Object.keys(curFurnCount);
    const furnMaps = curThemeFurnIds.map(furnId => {
      const furn = allFurns.filter(af => af.id === furnId)[0];
      const furnCount = curFurnCount[furnId];
      return {
        ...furn,
        count: furnCount
      }
    });

    let fc = 0;
    let gc = 0;
    furnMaps.forEach(fm => fc += fm.comfort * fm.count);

    const groups = allGroups.filter(ag => ag.themeId === id);
    groups.forEach(g => gc += g.comfort);

    return {
      id,
      name,
      groups,
      furnitures: furnMaps,
      totalComfort: (fc + gc)
    };
  });
}

exports.exportBuffs = function() {
  const curDir = path.join(__dirname, 'char');
  fs.ensureDir(curDir);

  const data = parseCharBuffs();
  writeFile(curDir, 'buffs.json', data);

  const buildingDir = path.join(__dirname, 'building');
  fs.ensureDir(buildingDir);
  const themes = parseThemes();
  writeFile(buildingDir, 'furnitures.json', themes);
}
