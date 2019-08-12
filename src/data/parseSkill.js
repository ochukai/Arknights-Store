const skills = require('./original/skill_table.json');

// const path = require('path');
// const fs = require('fs-extra');
// const { writeFile } = require('./util/write');
// const _ = require('underscore');

const keys = Object.keys(skills);

function parseSimpleSkillInfo() {
  const result = {};
  keys.forEach(key => {
    const value = skills[key];
    result[key] = value.levels[0].name;
  });

  return result;
}

exports.parseSimpleSkillInfo = parseSimpleSkillInfo;
