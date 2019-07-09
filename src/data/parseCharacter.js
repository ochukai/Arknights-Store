const characters = require('./original/character_table.json');
const handbook = require('./original/handbook_info_table.json');
const { handbookDict } = handbook;
const keys = Object.keys(characters);

const path = require('path');
const fs = require('fs-extra');
const { writeFile } = require('./util/write');
const { filterHtmlTag } = require('./util/filterHtmlTag');
const { parseTeams } = require('./parseTeam');

const teams = parseTeams();
const professionMaps = {
  'PIONEER': '前锋',
  'WARRIOR': '近卫',
  'SNIPER': '阻击',
  'TANK': '重装',
  'MEDIC': '医疗',
  'SUPPORT': '辅助',
  'CASTER': '术士',
  'SPECIAL': '特种'
};

const imageList = {};

function parseSimpleInfo() {
  return keys.map((key) => {
    const value = characters[key];
    const {
      name,
      description,
      team,
      appellation,
      position,
      tagList = [],
      itemObtainApproach,
      rarity,
      profession,
    } = value;

    let realTags = tagList;
    if (tagList === null) {
      realTags = [];
    }

    const professionName = professionMaps[profession];
    // realTags.unshift(professionName);
    // realTags.unshift(position);
    const star = rarity + 1;
    if (itemObtainApproach !== null) {
      const path = star >= 4
        ? `require('../../assets/images/${key}_2.png')`
        : `require('../../assets/images/${key}_1.png')`;
      imageList[key] = path;
    }

    const teamObj = teams.filter(t => t.id === team)[0];
    return {
      id: key,
      name,
      appellation,
      description: filterHtmlTag(description),
      team: teamObj.name,
      color: teamObj.color,
      obtain: itemObtainApproach,
      position,
      // star: repeat('★', (rarity + 1)),
      star,
      profession: professionName, // 职业
      tagList: realTags,
    };
  })
  .filter(si => si.obtain !== null);
}

function write() {
  const curDir = path.join(__dirname, 'char');
  fs.ensureDirSync(curDir);

  const simpleInfo = parseSimpleInfo();
  writeFile(curDir, 'simples.json', simpleInfo);

  writeFile(curDir, 'images.js', imageList, (value) => {
    value = value.replace(/\"require/ig, 'require');
    value = value.replace(/\)\"/ig, ')');
    return `export const imageMaps = ${value};`;
  });
}

write();
exports.parseSimpleInfo = parseSimpleInfo;
