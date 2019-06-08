const { enemies } = require('./enemy_database.json');

const path = require('path');
const fs = require('fs-extra');
const stringify = require("json-stringify-pretty-compact");

const curDir = path.join(__dirname, 'enemy');
fs.ensureDir(curDir);

const result = [];

enemies.forEach(enemy => {
  const { Key, Value } = enemy;
  Value
    .filter(dummy => dummy.enemyData.name.m_defined)
    .forEach(dummy => {
      const { level, enemyData } = dummy;
      const { name, description, attributes, lifePointReduce, talentBlackboard } = enemyData;
      const ene = {};
      ene.name = name.m_value;
      ene.description = description.m_value;
      ene.lifePointReduce = lifePointReduce.m_value;

      const { maxHp, atk, def, magicResistance, moveSpeed, attackSpeed, baseAttackTime } = attributes;
      ene.hp = maxHp.m_value;
      ene.atk = atk.m_value;
      ene.def = def.m_value;
      ene.magicResistance = magicResistance.m_value;
      ene.moveSpeed = moveSpeed.m_value;
      ene.attackSpeed = baseAttackTime.m_value;

      ene.series = Key;
      result.push(ene);
    });
});

fs.writeFileSync(
  path.join(curDir, 'enemys.json'),
  stringify(result)
);
