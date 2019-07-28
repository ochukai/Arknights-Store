const teams = require('./original/handbook_team_table.json');
const keys = Object.keys(teams);

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
