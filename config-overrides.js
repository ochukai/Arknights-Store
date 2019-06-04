/* config-overrides.js */
const path = require('path');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');

module.exports = function override(config, env) {
  // console.log('config', config);

  // const docPath = path.join(__dirname, 'doc');
  // config.output.path = docPath;

  config = rewireDefinePlugin(config, env, {
    __DEV__: false
  });

  return config;
};
