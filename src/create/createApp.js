import path from 'path';
import { ManifestoFileName } from '../constants/constants.js';
import { createRootDir } from './file/createRootDir.js';
import { runDirectives } from './runDirectives.js';
import { validateConfig } from './validateConfig.js';
import { readJsonFile } from '../lib/file.js';
import { getTemplateDir } from './file/getTemplateDir.js';
import { logger } from '../logger.js';

async function readManifesto(templateDir) {
  const manifestoPath = path.join(templateDir, ManifestoFileName);
  return await readJsonFile(manifestoPath);
}

export async function createApp(config) {
  const templateDir = getTemplateDir(config);
  const manifesto = await readManifesto(templateDir);

  await validateConfig(config, manifesto);
  const dir = await createRootDir(config);
  await runDirectives({ config, dir, manifesto, templateDir });
  logger.info(`${config.name} created, in dir ${dir}`);
}
