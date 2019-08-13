const characters = require('./original/character_table.json');
// const handbook = require('./original/handbook_info_table.json');
const keys = Object.keys(characters);

const path = require('path');
const fs = require('fs-extra');

const { writeFile } = require('./util/write');
const { filterHtmlTag } = require('./util/filterHtmlTag');
const { parseSimpleSkillInfo } = require('./parseSkill');
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

const simpleSkillInfo = parseSimpleSkillInfo();

const imageList = {};
const charPhases = [];
const evolveCosts = [];
const skillLvlup = [];
const skill810s = [];

function parseSimpleInfo() {
  return keys
    // .filter(key => key.indexOf('char_') > 0)
    .map((key) => {
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
        phases,
        skills = [], // 技能专精
        allSkillLvlup, // 普通技能前七级
        // potentialRanks, // 天赋
      } = value;

      if (key.indexOf('char_') === 0) {
        const phaseDummy = [];
        const ecDummy = [];
        let lel = 0;
        phases.forEach((p, index) => {
          const { attributesKeyFrames, evolveCost = [] } = p;
          if (index === 0) {
            let { data } = attributesKeyFrames[0];
            const title = '初始';
            ['maxHp', 'atk', 'def'].forEach(attr => {
              phaseDummy.push({
                level: 1,
                title,
                attr,
                value: data[attr],
              })
            });
          }

          // 精英化材料
          if (index !== 0 && evolveCost.length > 0) {
            ecDummy.push(evolveCost);
          }

          const title = index === 0
            ? '初始满级'
            : index === 1
              ? '精一满级'
              : '精二满级';

          const { level, data } = attributesKeyFrames[1];
          lel += level;

          ['maxHp', 'atk', 'def'].forEach(attr => {
            phaseDummy.push({
              level: lel,
              title,
              attr,
              value: data[attr],
            })
          });
        });

        charPhases.push({ id: key, phases: phaseDummy });
        evolveCosts.push({ id: key, evolveCost: ecDummy });

        // skill
        const skillDummy = skills.map(skill => {
          const { skillId, levelUpCostCond } = skill;
          const costs = levelUpCostCond.map(cond => cond.levelUpCost);
          const name = simpleSkillInfo[skillId];
          return {
            id: skillId,
            name,
            costs
          };
        });

        skill810s.push({
          id: key,
          skills: skillDummy.filter(skill => skill.costs.length > 0)
        });

        const allSkillDummy = allSkillLvlup.map(skill => skill.lvlUpCost);
        skillLvlup.push({ id: key, skillLvlUp: allSkillDummy });
      }

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
  writeFile(curDir, 'phases.json', charPhases);
  writeFile(curDir, 'evolveCosts.json', evolveCosts);
  writeFile(curDir, 'skillLvlup.json', skillLvlup);
  writeFile(curDir, 'skill810s.json', skill810s);

  writeFile(curDir, 'images.js', imageList, (value) => {
    value = value.replace(/\"require/ig, 'require');
    value = value.replace(/\)\"/ig, ')');
    return `export const imageMaps = ${value};`;
  });
}

exports.parseSimpleInfo = parseSimpleInfo;
exports.exportChars = write;
