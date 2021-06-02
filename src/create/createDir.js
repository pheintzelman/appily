const fsModule = require('fs');
const fs = fsModule.promises;
const { DefaultAppName } = require('../constants');
const { logger } = require('../logger');

async function createDir(config) {
  const name = config.name ?? DefaultAppName;
  await fs.mkdir(name);
  logger.debug(`Dir created: ${name}`);
}

module.exports = { createDir };
