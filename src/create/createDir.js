const fsModule = require('fs');
const fs = fsModule.promises;
const { DefaultAppName } = require('../constants');
const { logger } = require('../logger');
const { dirExists } = require('../lib/file');

// If the dir already exists append the next number
async function getDirName(name, count = 0) {
  const dir = count === 0 ? name : `${name}${count}`;

  if ((await dirExists(dir)) && count <= 100) {
    return getDirName(name, count + 1);
  }

  return dir;
}

async function createDir(config) {
  const name = config.name ?? DefaultAppName;
  const dir = await getDirName(name);

  await fs.mkdir(dir);
  logger.debug(`Dir created: ${dir}`);
  return dir;
}

module.exports = { createDir };
