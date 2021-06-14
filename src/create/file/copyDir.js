import fsModule from 'fs';
const fs = fsModule.promises;
import path from 'path';
import { logger } from '../../logger.js';
import { dirExists } from '../../lib/file.js';
import { renderFile, renderFileName } from '../file/renderFile.js';
import { TemplateExt } from '../../constants.js';

async function copyFile({ src, dest, viewModel }) {
  const isTemplateFile = src.includes(TemplateExt);
  if (isTemplateFile) {
    return await renderFile({ src, dest, viewModel });
  }

  await fs.copyFile(src, dest);
  logger.debug(`File copied: ${dest}`);
}

export async function copyDir({ src, dest, viewModel }) {
  logger.trace({ msg: 'copyDir', src, dest });

  const entries = await fs.readdir(src, { withFileTypes: true });

  if (!(await dirExists(dest))) {
    await fs.mkdir(dest);
  }

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, renderFileName(entry.name, viewModel));
    if (entry.isDirectory()) {
      await copyDir({ src: srcPath, dest: destPath, viewModel });
    } else {
      await copyFile({ src: srcPath, dest: destPath, viewModel });
    }
  }
}
