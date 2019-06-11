const { enemies } = require('./original/enemy_database.json');

const path = require('path');
const fs = require('fs-extra');
const stringify = require("json-stringify-pretty-compact");

const curDir = path.join(__dirname, 'enemy');
fs.ensureDir(curDir);

const result = [];

let lastName = '';
let lastMoveSpeed = 0;
let lastAtkSpeed = 0;
let lastReduce = 0;

enemies.forEach(enemy => {
  const { Key, Value } = enemy;
  lastName = '';
  lastMoveSpeed = 0;
  lastAtkSpeed = 0;
  lastReduce = 0;

  Value
    // .filter(dummy => dummy.enemyData.name.m_defined)
    .forEach(dummy => {
      const { level, enemyData } = dummy;
      const { name, description, attributes, lifePointReduce, talentBlackboard } = enemyData;
      const ene = {};
      ene.name = name.m_value;
      if (!ene.name) {
        ene.name = lastName;
      }

      ene.description = description.m_value;
      ene.lifePointReduce = lifePointReduce.m_value;
      if (!ene.lifePointReduce) {
        ene.lifePointReduce = lastReduce;
      }

      const { maxHp, atk, def, magicResistance, moveSpeed, attackSpeed, baseAttackTime } = attributes;
      ene.hp = maxHp.m_value;
      ene.level = level;
      ene.atk = atk.m_value;
      ene.def = def.m_value;
      ene.magicResistance = magicResistance.m_value;

      ene.moveSpeed = moveSpeed.m_value;
      if (!ene.moveSpeed) {
        ene.moveSpeed = lastMoveSpeed;
      }

      ene.attackSpeed = baseAttackTime.m_value;
      if (!ene.attackSpeed) {
        ene.attackSpeed = lastAtkSpeed;
      }

      ene.series = Key;
      result.push(ene);

      lastName = ene.name;
      lastReduce = ene.lifePointReduce;
      lastAtkSpeed = ene.attackSpeed;
      lastMoveSpeed = ene.moveSpeed;
  });
});

fs.writeFileSync(
  path.join(curDir, 'enemys.json'),
  stringify(result)
);
