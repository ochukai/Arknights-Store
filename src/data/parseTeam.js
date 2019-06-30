const teams = require('./original/handbook_team_table.json');
const keys = Object.keys(teams);

const path = require('path');
const fs = require('fs-extra');

function parseTeams() {
  return keys.map(key => {
    const team = teams[key];
    const { teamID, teamName, color } = team;
    return {
      id: teamID,
      name: teamName,
      color: `#${color}`
    };
  });
}

exports.parseTeams = parseTeams;
