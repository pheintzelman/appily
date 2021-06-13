import fsModule from 'fs';
const fs = fsModule.promises;
import mustache from 'mustache';
import { logger } from '../../logger.js';
import { TemplateExt } from '../../constants.js';

function renameDest(dest) {
  return dest.replace(TemplateExt, '');
}

export function renderFileName(fileName, viewModel) {
  return mustache.render(fileName, viewModel);
}

export async function renderFile({ src, dest: destIn, viewModel }) {
  const mustacheFile = await fs.readFile(src, 'utf8');
  const file = mustache.render(mustacheFile, viewModel);
  const dest = renameDest(destIn);

  await fs.writeFile(dest, file, 'utf8');
  logger.debug(`File rendered: ${dest}`);
}
