
const stringify = require("json-stringify-pretty-compact");
const fs = require('fs-extra');
const path = require('path');

exports.writeFile = function (dir, fileName, value, callback) {
  let jsonValue = stringify(value, {
    maxLength: 120
  });

  if (callback) {
    jsonValue = callback(jsonValue);
  }

  fs.writeFileSync(path.join(dir, fileName), jsonValue);
}
