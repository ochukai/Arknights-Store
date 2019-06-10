
const stringify = require("json-stringify-pretty-compact");
const fs = require('fs-extra');
const path = require('path');

exports.writeFile = function (dir, fileName, value) {
  // fs.ensureDirSync(dir);
  fs.writeFileSync(
    path.join(dir, fileName),
    stringify(value, {
      maxLength: 80
    })
  );
}
