import fsModule from 'fs';
import path from 'path';
import { DefaultAppName } from '../../constants/constants.js';
import { logger } from '../../logger.js';
import * as file from '../../lib/file.js';
import { snakeCase } from '../../lib/case.js';

// Needed because es6 doesn't allow re-writing modules
/*let importedDependencies = { fs: fsModule.promises, file };
let dependencies = { ...importedDependencies };
const { mkdir } = dependencies.fs;
const fs = dependencies.fs;
const { dirExists } = dependencies.file;
*/
const fs = fsModule.promises;
let { dirExists } = file;
let { mkdir } = fs;
export function mockDependencies(mockedDependencies = {}) {
  ({ dirExists } = mockedDependencies.file ?? file);
  ({ mkdir } = mockedDependencies.fs ?? fs);
}

// If the dir already exists append the next number
async function getRootDirName(baseDir, name, count = 0) {
  const dir = count === 0 ? name : `${name}${count}`;
  const rootDir = path.join(baseDir, dir);

  if ((await dirExists(rootDir)) && count <= 100) {
    return getRootDirName(baseDir, name, count + 1);
  }

  return rootDir;
}

async function handleOverwrite(baseDir, name) {
  const dir = path.join(baseDir, name);

  if (!(await dirExists(dir))) {
    await mkdir(dir);
  }

  return dir;
}

export async function createRootDir({ name, dir }, { overwrite = false }) {
  const appName = name ? snakeCase(name) : DefaultAppName;
  const baseDir = dir ?? '';

  if (overwrite) {
    return await handleOverwrite(baseDir, appName);
  }

  const rootDir = await getRootDirName(baseDir, appName);
  await mkdir(rootDir);
  logger.debug(`Dir created: ${rootDir}`);
  return rootDir;
}
