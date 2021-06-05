import fsModule from 'fs';
const fs = fsModule.promises;
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../logger.js';
import { dirExists } from '../lib/file.js';
import { renderFile } from './renderFile.js';
import { TemplateExt } from '../constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyFile({ src, dest, viewModel }) {
  const isTemplateFile = src.includes(TemplateExt);
  if (isTemplateFile) {
    return await renderFile({ src, dest, viewModel });
  }

  await fs.copyFile(src, dest);
  logger.debug(`File copied: ${dest}`);
}

async function copyTemplate({ src, dest, viewModel }) {
  logger.trace({ msg: 'copyDir', src, dest });

  const entries = await fs.readdir(src, { withFileTypes: true });

  if (!(await dirExists(dest))) {
    await fs.mkdir(dest);
  }

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile({ src: srcPath, dest: destPath, viewModel });
    }
  }
}

export async function renderTemplate(config, dest) {
  const { template } = config;
  const templateDir = path.resolve(__dirname, `../templates/${template}`);
  const src = path.join(templateDir, 'app');
  const viewModel = { appName: config.name };

  await copyTemplate({ src, dest, viewModel });
}
