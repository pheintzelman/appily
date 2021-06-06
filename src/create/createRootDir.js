import fsModule from 'fs';
const fs = fsModule.promises;
import { DefaultAppName } from '../constants.js';
import { logger } from '../logger.js';
import { dirExists } from '../lib/file.js';

// If the dir already exists append the next number
async function getDirName(name, count = 0) {
  const dir = count === 0 ? name : `${name}${count}`;

  if ((await dirExists(dir)) && count <= 100) {
    return getDirName(name, count + 1);
  }

  return dir;
}

export async function createRootDir(config) {
  const name = config.name ?? DefaultAppName;
  const dir = await getDirName(name);

  await fs.mkdir(dir);
  logger.debug(`Dir created: ${dir}`);
  return dir;
}
