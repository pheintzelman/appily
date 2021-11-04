/* config-overrides.js */
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const path = require('path');

module.exports = function override(config) {
  config.resolve.plugins.forEach((plugin) => {
    if (plugin instanceof ModuleScopePlugin) {
      plugin.allowedFiles.add(path.resolve('../shared/lib/validate.js'));
    }
  });

  return config;
};
