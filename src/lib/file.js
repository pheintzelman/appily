import fsModule from 'fs';
const fs = fsModule.promises;
import { logger } from '../logger.js';

export async function readJsonFile(path) {
  const file = await fs.readFile(path, 'utf8');
  return JSON.parse(file);
}

export async function dirExists(dir) {
  try {
    await fs.access(dir);
    return true;
  } catch {
    return false;
  }
}

async function mkdirAsyncSafeHelper(dir) {
  if (!(await dirExists(dir))) {
    logger.trace({ msg: 'mkdir', dest: dir });
    return await fs.mkdir(dir);
  }
}

const dirMap = {};
export async function mkdirAsyncSafe(dir) {
  if (dirMap[dir]) {
    return dirMap[dir];
  }

  const promise = mkdirAsyncSafeHelper(dir);
  dirMap[dir] = promise;
  return promise;
}
