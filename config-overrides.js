/* config-overrides.js */

const rewireDefinePlugin = require('react-app-rewire-define-plugin');

module.exports = function override(config, env) {

  config = rewireDefinePlugin(config, env, {
    __DEV__: false
  });

  return config;
};
