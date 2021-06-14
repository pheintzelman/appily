import fsModule from 'fs';
const fs = fsModule.promises;
import path from 'path';
import { DefaultAppName } from '../../constants.js';
import { logger } from '../../logger.js';
import { dirExists } from '../../lib/file.js';

// If the dir already exists append the next number
async function getRootDirName(baseDir, name, count = 0) {
  const dir = count === 0 ? name : `${name}${count}`;
  const rootDir = path.join(baseDir, dir);

  if ((await dirExists(rootDir)) && count <= 100) {
    return getRootDirName(baseDir, name, count + 1);
  }

  return rootDir;
}

export async function createRootDir(config) {
  const name = config.name ?? DefaultAppName;
  const baseDir = config.dir ?? '';
  const rootDir = await getRootDirName(baseDir, name);

  await fs.mkdir(rootDir);
  logger.debug(`Dir created: ${rootDir}`);
  return rootDir;
}
