import path from 'path';
import { ManifestoFileName } from '../constants/constants.js';
import { createRootDir } from './file/createRootDir.js';
import { runDirectives } from './runDirectives.js';
import { validateConfig } from './config/validateConfig.js';
import { readJsonFile } from '../lib/file.js';
import { getTemplateDir } from './file/getTemplateDir.js';
import { logger } from '../logger.js';
import { normalizeConfig } from './config/normalizeConfig.js';
import { getViewModel } from './viewModel/getViewModel.js';
import { normalizeManifesto } from './manifesto/normalizeManifesto.js';

async function readManifesto(templateDir) {
  const manifestoPath = path.join(templateDir, ManifestoFileName);
  return await readJsonFile(manifestoPath);
}

export async function createApp(config, options = {}) {
  const { overwrite = false } = options;
  const normalizedConfig = normalizeConfig(config);

  const templateDir = getTemplateDir(normalizedConfig);
  const manifesto = await readManifesto(templateDir);
  const normalizedManifesto = normalizeManifesto(manifesto);

  logger.trace({ normalizedConfig, normalizedManifesto });
  await validateConfig(normalizedConfig, normalizedManifesto);
  const dir = await createRootDir(normalizedConfig, options);
  const viewModel = getViewModel({
    config: normalizedConfig,
    dir,
    manifesto: normalizedManifesto
  });

  if (overwrite) {
    logger.info({ mode: 'overwrite', dir });
  }

  const metaData = {
    config: normalizedConfig,
    dir,
    manifesto: normalizedManifesto,
    templateDir
  };
  await runDirectives({
    viewModel,
    metaData
  });

  logger.info(`${normalizedConfig.name} created, in dir ${dir}`);
}
